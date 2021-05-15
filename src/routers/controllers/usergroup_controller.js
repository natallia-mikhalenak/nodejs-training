import { UserGroupService, UserService, GroupService } from '../../services/index';
import { UserModel, GroupModel, UserGroupModel } from '../../models/index';
import { ErrorMethodLogger } from '../../utils/logger';

const groupService = new GroupService(GroupModel);
const userService = new UserService(UserModel);

const userGroupService = new UserGroupService(UserGroupModel, userService, groupService);

export class UserGroupController {
    @ErrorMethodLogger()
    static async addUsersToGroup(req, res, next) {
        try {
            await userGroupService.addUsersToGroup(req.body);
            res.status(200).end();
        } catch (err) {
            return next(err);
        }
    }
}
