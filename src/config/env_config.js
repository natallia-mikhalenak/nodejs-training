export const envConfig = {
    port: Number(process.env.PORT) || 8080,
    jwtSecret: process.env.JWT_SECRET || 'secret',
    jwtExpiresIn: 180
};
