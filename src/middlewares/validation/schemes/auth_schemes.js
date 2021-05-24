import Joi from 'joi';
import { USER_FIELDS } from './user_schemes';

export const authSchema = Joi.object({
    login: USER_FIELDS.LOGIN,
    password: USER_FIELDS.PASSWORD
});
