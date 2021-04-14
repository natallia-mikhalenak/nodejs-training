import { prepareErrorMessage } from '../../utils/errors_utils';
import { UserModel } from '../../models/user_model';
import { UserService } from '../../services/user_service';

const userService = new UserService(UserModel);

export class UserController {
    static async getUser(req, res, next) {
        const id = req.params.id;
        try {
            const user = await userService.getUser(id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json(prepareErrorMessage(`User with id: ${id} is not found`));
            }
        } catch (err) {
            return next(err);
        }
    }

    static async addUser(req, res, next) {
        try {
            const user = await userService.addUser(req.body);
            res.json(user);
        } catch (err) {
            return next(err);
        }
    }

    static async getUsersByLogin(req, res, next) {
        try {
            const { limit, loginSubString } = req.query;
            const users = await userService.getUsersByLogin(loginSubString, limit);

            res.json(users);
        } catch (err) {
            return next(err);
        }
    }

    static async updateUser(req, res, next) {
        try {
            await userService.updateUser(req.body);
            res.status(200).end();
        } catch (err) {
            return next(err);
        }
    }

    static async deleteUser(req, res, next) {
        try {
            await userService.deleteUser(req.params.id);
            res.status(200).end();
        } catch (err) {
            return next(err);
        }
    }
}
