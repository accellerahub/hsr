-- =============================================================================
-- MIGRATION 0005 — Hospital Structure: campos de página (hero + features)
-- =============================================================================
-- Amplia hospital_structure para armazenar os campos mínimos necessários para
-- renderizar uma página /servicos/[slug] derivada do template de serviço.
-- =============================================================================

alter table hospital_structure
  add column if not exists kicker text,
  add column if not exists subheadline text,
  add column if not exists pills text[] not null default '{}'::text[],
  add column if not exists features jsonb not null default '[]'::jsonb;

-- -----------------------------------------------------------------------------
-- Backfill dos 7 itens existentes (alinha com SERVICES_CONTENT)
-- -----------------------------------------------------------------------------

update hospital_structure
set
  kicker = 'CENTRO CIRÚRGICO',
  subheadline = 'Tecnologia robótica, laparoscopia avançada e equipe multidisciplinar integrada para o sucesso do seu procedimento.',
  pills = array['22 Salas Cirúrgicas','Tecnologia Robótica','Giro de Sala 40min','0,33% Taxa de Infecção']
where slug = 'centro-cirurgico';

update hospital_structure
set
  kicker = 'UNIDADE DE INTERNAÇÃO',
  subheadline = 'Acomodações projetadas para conforto e recuperação, com monitoramento contínuo e equipe dedicada 24h.',
  pills = array['65 Leitos','Monitoramento 24h','Conforto Hoteleiro']
where slug = 'internacao';

update hospital_structure set kicker = 'IMD' where slug = 'imd' and kicker is null;
update hospital_structure set kicker = 'LABORATÓRIO' where slug = 'laboratorio' and kicker is null;
update hospital_structure set kicker = 'TERAPIA HIPERBÁRICA' where slug = 'hiperbarica' and kicker is null;
update hospital_structure set kicker = 'CENTRO DE CONVENÇÕES' where slug = 'centro-convencoes' and kicker is null;
update hospital_structure set kicker = 'PRAÇA DE ALIMENTAÇÃO' where slug = 'praca-alimentacao' and kicker is null;
