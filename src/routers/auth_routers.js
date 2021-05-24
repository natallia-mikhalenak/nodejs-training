import { Router } from 'express';
import { AuthController } from './controllers/auth_controller';
import { validateSchema, VALIDATION_NAMES } from '../middlewares/validation/validation_middleware';
import { authSchema } from '../middlewares/validation/schemes/index';

export const router = Router();

router.post('/login', validateSchema(authSchema, VALIDATION_NAMES.BODY), AuthController.login);
