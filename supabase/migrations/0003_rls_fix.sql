-- =============================================================================
-- MIGRATION 0003 — Fix RLS infinite recursion em profiles
-- =============================================================================
-- Problema: policies que consultam profiles dentro de profiles (ou via EXISTS
-- em outras tabelas) causam recursão infinita quando o planner tenta avaliar
-- a política da subquery.
--
-- Solução: funções SECURITY DEFINER para ler role sem recursão de RLS.
-- =============================================================================

create or replace function public.current_user_role()
returns text
language sql
security definer
stable
set search_path = public
as $$
  select role::text from public.profiles where id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('master', 'editor')
  );
$$;

create or replace function public.is_master()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'master'
  );
$$;

-- -----------------------------------------------------------------------------
-- PROFILES — reescreve sem recursão
-- -----------------------------------------------------------------------------
drop policy if exists "profiles_select_self_or_master" on public.profiles;
drop policy if exists "profiles_update_master_only" on public.profiles;

create policy "profiles_select_self_or_master"
  on public.profiles for select
  using (id = auth.uid() or public.is_master());

create policy "profiles_update_master_only"
  on public.profiles for update
  using (public.is_master());

-- -----------------------------------------------------------------------------
-- CTAS
-- -----------------------------------------------------------------------------
drop policy if exists "ctas_write_admin" on public.ctas;

create policy "ctas_write_admin"
  on public.ctas for all
  using (public.is_admin())
  with check (public.is_admin());

-- -----------------------------------------------------------------------------
-- CTA_LOCATIONS
-- -----------------------------------------------------------------------------
drop policy if exists "cta_locations_select_admin" on public.cta_locations;

create policy "cta_locations_select_admin"
  on public.cta_locations for select
  using (public.is_admin());

-- -----------------------------------------------------------------------------
-- FAQS
-- -----------------------------------------------------------------------------
drop policy if exists "faqs_select_admin_all" on public.faqs;
drop policy if exists "faqs_write_admin" on public.faqs;

create policy "faqs_select_admin_all"
  on public.faqs for select
  using (public.is_admin());

create policy "faqs_write_admin"
  on public.faqs for all
  using (public.is_admin())
  with check (public.is_admin());

-- -----------------------------------------------------------------------------
-- CLICK_EVENTS
-- -----------------------------------------------------------------------------
drop policy if exists "click_events_select_admin" on public.click_events;

create policy "click_events_select_admin"
  on public.click_events for select
  using (public.is_admin());

-- -----------------------------------------------------------------------------
-- CLICK_MONTHLY
-- -----------------------------------------------------------------------------
drop policy if exists "click_monthly_select_admin" on public.click_monthly;

create policy "click_monthly_select_admin"
  on public.click_monthly for select
  using (public.is_admin());

-- -----------------------------------------------------------------------------
-- AUDIT_LOG
-- -----------------------------------------------------------------------------
drop policy if exists "audit_log_select_master_only" on public.audit_log;

create policy "audit_log_select_master_only"
  on public.audit_log for select
  using (public.is_master());
