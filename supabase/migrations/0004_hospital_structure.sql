-- =============================================================================
-- MIGRATION 0004 — Hospital Structure (CRUD admin)
-- =============================================================================
-- Entidade gerenciável da seção "Estrutura Hospitalar" do site.
-- Campos espelham SERVICOS_DATA.items em src/lib/constants.ts.
-- =============================================================================

create table hospital_structure (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  icon text not null default 'building-2',
  image_url text,
  position int not null default 0,
  is_active boolean not null default true,
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table hospital_structure enable row level security;

create policy "hospital_structure_select_public"
  on hospital_structure for select
  using (is_active = true);

create policy "hospital_structure_select_admin_all"
  on hospital_structure for select
  using (public.is_admin());

create policy "hospital_structure_write_admin"
  on hospital_structure for all
  using (public.is_admin())
  with check (public.is_admin());

create index hospital_structure_position_idx on hospital_structure(position);
create index hospital_structure_slug_idx on hospital_structure(slug);

create trigger hospital_structure_updated_at before update on hospital_structure
  for each row execute function set_updated_at();

-- -----------------------------------------------------------------------------
-- Seed inicial — mirror dos 7 itens atuais de SERVICOS_DATA.items
-- -----------------------------------------------------------------------------
insert into hospital_structure (slug, title, description, icon, image_url, position)
values
  ('centro-cirurgico', 'Centro Cirúrgico', '22 salas equipadas com tecnologia de última geração para procedimentos de alta complexidade.', 'scalpel', '/assets/images/servicos/centro-cirurgico.jpg', 1),
  ('internacao', 'Unidade de Internação', 'Acomodações projetadas para conforto e recuperação, com monitoramento contínuo e equipe dedicada.', 'bed', '/assets/images/servicos/internacao.jpg', 2),
  ('imd', 'IMD Instituto Médico e Diagnóstico', 'O IMD do Hospital São Rafael reúne consultas e exames em um só lugar, com mais precisão, agilidade e muito mais conforto.', 'microscope', '/assets/images/servicos/imd.jpg', 3),
  ('laboratorio', 'Laboratório', 'Análises clínicas com agilidade e precisão, integradas ao fluxo pré e pós-operatório.', 'flask', '/assets/images/servicos/laboratorio.jpg', 4),
  ('hiperbarica', 'Terapia Hiperbárica', 'Tecnologia de ponta para aceleração da recuperação e prevenção de complicações pós-cirúrgicas.', 'activity', '/assets/images/servicos/hiperbarica.jpeg', 5),
  ('centro-convencoes', 'Centro de Convenções', 'Espaço dedicado a simpósios, treinamentos, confraternizações técnico-científicas e troca de conhecimento.', 'presentation', '/assets/images/servicos/centro-convencoes.jpg', 6),
  ('praca-alimentacao', 'Praça de Alimentação', 'Opções gastronômicas para pacientes, acompanhantes e equipe, com ambiente acolhedor.', 'utensils', '/assets/images/servicos/praca-alimentacao.jpg', 7);
