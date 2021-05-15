import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/db_config';
import { logger } from '../utils/logger';

export const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.userName,
    dbConfig.password,
    {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        schema: dbConfig.schema
    }
);

sequelize.authenticate().catch((err) =>
    logger.error('DB error', err)
);
