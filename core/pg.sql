CREATE OR REPLACE FUNCTION get_film (p_pattern VARCHAR)
  RETURNS TABLE (
    tablename VARCHAR,
    datacount INT
  )
AS $$
BEGIN
 RETURN QUERY
 SELECT relname AS tablename, n_live_tup AS datacount
 FROM pg_stat_user_tables
 ORDER BY n_live_tup DESC;
END; $$
LANGUAGE 'plpgsql';