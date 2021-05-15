import winston from 'winston';

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ]
});

export const ErrorMethodLogger = () => {
    return (target, name, descriptor) => {
        const original = descriptor.value;
        descriptor.value = async (...args) => {
            try {
                await original.apply(this, args);
            } catch (err) {
                logger.error(`Method '${name}' was called with ${args}`, err.message);
                throw err;
            }
        };
    };
};
