import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';
import { envConfig } from './../config/env_config';

export const jwtMiddleware = (req, res, next) => {
    if (req.path === '/login') {
        return next();
    }

    const token = req.headers['access-token'];
    if (!token) {
        res.status(401).send('Unauthorized');
    } else {
        jwt.verify(token, envConfig.jwtSecret, (err) => {
            if (err) {
                logger.error('Error of jwt verify', err.message);
                res.status(403).send('Forbidden Error');
            }
            return next();
        });
    }
};
