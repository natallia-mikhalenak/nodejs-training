import { Router } from 'express';
import { UserController } from './controllers/user_controller';
import { validateSchema, VALIDATION_NAMES } from '../middlewares/validation/validation_middleware';
import { userSchema, createUserSchema, searchUserSchema } from '../middlewares/validation/user_schemes';

export const router = Router();

router.get('/:id', UserController.getUser);
router.post('/', validateSchema(createUserSchema, VALIDATION_NAMES.BODY), UserController.addUser);
router.get('/', validateSchema(searchUserSchema, VALIDATION_NAMES.QUERY), UserController.getUsersByLogin);
router.put('/', validateSchema(userSchema, VALIDATION_NAMES.BODY), UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
