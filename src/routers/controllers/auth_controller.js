import jwt from 'jsonwebtoken';
import { prepareErrorMessage } from '../../utils/errors_utils';
import { UserModel } from '../../models/index';
import { UserService } from '../../services/index';
import { ErrorMethodLogger } from '../../utils/logger';
import { envConfig } from '../../config/env_config';

const userService = new UserService(UserModel);

export class AuthController {
    @ErrorMethodLogger()
    static async login(req, res, next) {
        const { login, password } = req.body;
        try {
            const user = await userService.getUserByLoginPassword(login, password);
            if (!user) {
                res.status(404).json(prepareErrorMessage('Incorrect login or password.'));
            } else {
                jwt.sign({ id: user.id }, envConfig.jwtSecret, { expiresIn: envConfig.jwtExpiresIn }, (err, token) => {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).send({ token });
                });
            }
        } catch (err) {
            return next(err);
        }
    }
}
