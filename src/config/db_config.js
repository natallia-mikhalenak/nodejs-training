export const dbConfig = {
    database:  process.env.DB_NAME || 'db_main',
    schema: process.env.DB_SCHEMA_NAME || 'db_schema',
    userName: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'root',
    port: process.env.DB_PORT || '5432',
    dialect: 'postgres',
    protocol: 'postgres'
};
