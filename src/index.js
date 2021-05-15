import express from 'express';
import { envConfig } from './config/env_config';
import { errorMiddleware, loggerMiddleware } from './middlewares/index';
import { router as userRouter } from './routers/user_routers';
import { router as groupRouter } from './routers/group_routers';
import { router as userGroupRouter } from './routers/usergroup_routers';
import { logger } from './utils/logger';

const app = express();
app.listen(envConfig.port, () => {
    logger.info(`Server starts at http://localhost:${envConfig.port}`);
});

app.use(express.json());
app.use(loggerMiddleware);
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/user_groups', userGroupRouter);
app.use(errorMiddleware);

process.on('uncaughtException', err => {
    logger.error(err.name, `Uncaught exception thrown: ${err}`);
    process.exit(1);
}).on('unhandledRejection', (err, p) => {
    logger.error(err.name, `Unhandled rejection at Promise: ${p}`);
});
