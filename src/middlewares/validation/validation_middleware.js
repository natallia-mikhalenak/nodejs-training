import { prepareSchemaErrorMessage } from '../../utils/errors_utils';

export const VALIDATION_NAMES = {
    PARAMS: 'params',
    BODY: 'body',
    QUERY: 'query'
};

export const validateSchema = (schema, fieldName) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[fieldName]);
        if (error && error.isJoi) {
            res.status(400).json(prepareSchemaErrorMessage(error.details));
        } else {
            return next();
        }
    };
};

export const errorMiddleware = (err, req, res, next) => {
    if (err) {
        res.status(500).json({ status: 'failed', errors: [`Failed to process request: ${err.message}`] });
    }
    next();
};
