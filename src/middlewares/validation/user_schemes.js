import Joi from 'joi';

const USER_FIELDS = {
    ID: Joi.string().guid({
        version: [
            'uuidv4'
        ]
    }).required(),
    LOGIN: Joi.string().required(),
    PASSWORD: Joi.string().pattern(/^(?=.*\d)(?=.*[a-zA-Z]).{1,}$/).required(),
    AGE: Joi.number()
        .integer()
        .min(4)
        .max(130).required(),
    IS_DELETED: Joi.boolean().required()
};

export const userSchema = Joi.object({
    id: USER_FIELDS.ID,
    login: USER_FIELDS.LOGIN,
    password: USER_FIELDS.PASSWORD,
    age: USER_FIELDS.AGE
});

export const createUserSchema = Joi.object({
    login: USER_FIELDS.LOGIN,
    password: USER_FIELDS.PASSWORD,
    age: USER_FIELDS.AGE
});

export const searchUserSchema = Joi.object({
    loginSubString: USER_FIELDS.LOGIN,
    limit: Joi.number()
        .integer()
        .min(1).required()
});
