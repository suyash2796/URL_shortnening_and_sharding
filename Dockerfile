FROM postgres
COPY table_sql.sql /docker-entrypoint-initdb.d