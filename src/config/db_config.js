import dotenv from 'dotenv';
dotenv.config();

export const dbConfig = {
    database:  process.env.DB_NAME,
    schema: process.env.DB_SCHEMA_NAME,
    userName: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    protocol: 'postgres'
};
