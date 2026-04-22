-- =============================================================================
-- MIGRATION 0002 — pg_cron agregação mensal de cliques
-- =============================================================================
-- Roda dia 1 de cada mês às 03:00 UTC: chama aggregate_click_events()
-- Isso agrega o mês anterior em click_monthly e limpa raw > 6 meses.
-- =============================================================================

create extension if not exists pg_cron;

-- Remove job existente (idempotente)
do $$
declare
  j record;
begin
  for j in select jobid from cron.job where jobname = 'hsr_aggregate_clicks' loop
    perform cron.unschedule(j.jobid);
  end loop;
end
$$;

select cron.schedule(
  'hsr_aggregate_clicks',
  '0 3 1 * *',
  $$select public.aggregate_click_events()$$
);
