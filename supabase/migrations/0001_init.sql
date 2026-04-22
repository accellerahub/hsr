-- =============================================================================
-- MIGRATION 0001 — Admin painel HSR | Fase A
-- =============================================================================
-- Tabelas: profiles, ctas, cta_locations, faqs, click_events, click_monthly, audit_log
-- Auth: roles (master | editor) via profiles.role
-- RLS: admin-only write; public read CTAs/FAQs; click_events insert público (via service)
-- =============================================================================

create extension if not exists pgcrypto;

-- -----------------------------------------------------------------------------
-- PROFILES — extensão do auth.users com role
-- -----------------------------------------------------------------------------
create type user_role as enum ('master', 'editor');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role user_role not null default 'editor',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "profiles_select_self_or_master"
  on profiles for select
  using (
    auth.uid() = id
    or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'master')
  );

create policy "profiles_update_master_only"
  on profiles for update
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'master'));

-- Trigger: cria profile automaticamente após signup
create or replace function handle_new_user()
returns trigger
security definer
set search_path = public
language plpgsql
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'editor')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- -----------------------------------------------------------------------------
-- CTAS — call-to-actions editáveis
-- -----------------------------------------------------------------------------
create table ctas (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  label text not null,
  url text not null,
  description text,
  is_active boolean not null default true,
  updated_by uuid references auth.users(id),
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table ctas enable row level security;

create policy "ctas_select_public"
  on ctas for select
  using (true);

create policy "ctas_write_admin"
  on ctas for all
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('master', 'editor')))
  with check (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('master', 'editor')));

create index ctas_key_idx on ctas(key);

-- -----------------------------------------------------------------------------
-- CTA_LOCATIONS — onde cada CTA aparece (info dropdown admin)
-- -----------------------------------------------------------------------------
create table cta_locations (
  id uuid primary key default gen_random_uuid(),
  cta_id uuid not null references ctas(id) on delete cascade,
  label text not null,
  page text not null,
  component text
);

alter table cta_locations enable row level security;

create policy "cta_locations_select_admin"
  on cta_locations for select
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('master', 'editor')));

create index cta_locations_cta_id_idx on cta_locations(cta_id);

-- -----------------------------------------------------------------------------
-- FAQS
-- -----------------------------------------------------------------------------
create table faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  position int not null default 0,
  is_active boolean not null default true,
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table faqs enable row level security;

create policy "faqs_select_public"
  on faqs for select
  using (is_active = true);

create policy "faqs_select_admin_all"
  on faqs for select
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('master', 'editor')));

create policy "faqs_write_admin"
  on faqs for all
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('master', 'editor')))
  with check (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('master', 'editor')));

create index faqs_position_idx on faqs(position);

-- -----------------------------------------------------------------------------
-- CLICK_EVENTS — raw clicks (retenção 6 meses)
-- -----------------------------------------------------------------------------
create table click_events (
  id bigserial primary key,
  cta_key text not null,
  created_at timestamptz not null default now(),
  user_agent text,
  referrer text,
  ip_hash text
);

alter table click_events enable row level security;

-- Insert via service_role only (API route usa admin client)
create policy "click_events_select_admin"
  on click_events for select
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('master', 'editor')));

create index click_events_created_at_idx on click_events(created_at desc);
create index click_events_cta_key_idx on click_events(cta_key);

-- -----------------------------------------------------------------------------
-- CLICK_MONTHLY — agregado histórico (6 meses)
-- -----------------------------------------------------------------------------
create table click_monthly (
  id uuid primary key default gen_random_uuid(),
  cta_key text not null,
  month date not null,
  count int not null default 0,
  unique(cta_key, month)
);

alter table click_monthly enable row level security;

create policy "click_monthly_select_admin"
  on click_monthly for select
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('master', 'editor')));

create index click_monthly_month_idx on click_monthly(month desc);

-- Função: agrega mês anterior + limpa raw > 6 meses
create or replace function aggregate_click_events()
returns void
security definer
set search_path = public
language plpgsql
as $$
declare
  target_month date := date_trunc('month', now() - interval '1 month')::date;
  cutoff timestamptz := now() - interval '6 months';
begin
  insert into click_monthly (cta_key, month, count)
  select
    cta_key,
    date_trunc('month', created_at)::date,
    count(*)
  from click_events
  where date_trunc('month', created_at)::date = target_month
  group by cta_key, date_trunc('month', created_at)::date
  on conflict (cta_key, month) do update set count = excluded.count;

  delete from click_events where created_at < cutoff;

  delete from click_monthly where month < (date_trunc('month', now()) - interval '6 months')::date;
end;
$$;

-- -----------------------------------------------------------------------------
-- AUDIT_LOG — quem editou o quê
-- -----------------------------------------------------------------------------
create table audit_log (
  id bigserial primary key,
  user_id uuid references auth.users(id),
  user_email text,
  action text not null,
  entity text not null,
  entity_id text,
  diff jsonb,
  created_at timestamptz not null default now()
);

alter table audit_log enable row level security;

create policy "audit_log_select_master_only"
  on audit_log for select
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'master'));

create index audit_log_created_at_idx on audit_log(created_at desc);
create index audit_log_entity_idx on audit_log(entity, entity_id);

-- -----------------------------------------------------------------------------
-- UPDATED_AT trigger genérico
-- -----------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger ctas_updated_at before update on ctas
  for each row execute function set_updated_at();

create trigger faqs_updated_at before update on faqs
  for each row execute function set_updated_at();

create trigger profiles_updated_at before update on profiles
  for each row execute function set_updated_at();
