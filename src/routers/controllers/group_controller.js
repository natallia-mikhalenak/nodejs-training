import { prepareErrorMessage } from '../../utils/errors_utils';
import { GroupModel } from '../../models/index';
import { GroupService } from '../../services/index';
import { ErrorMethodLogger } from '../../utils/logger';

const groupService = new GroupService(GroupModel);

export class GroupController {
    @ErrorMethodLogger()
    static async getGroupById(req, res, next) {
        const id = req.params.id;
        try {
            const group = await groupService.getGroupById(id);
            if (group) {
                res.json(group);
            } else {
                res.status(404).json(prepareErrorMessage(`Group with id: ${id} is not found`));
            }
        } catch (err) {
            return next(err);
        }
    }

    @ErrorMethodLogger()
    static async addGroup(req, res, next) {
        try {
            const group = await groupService.addGroup(req.body);
            res.json(group);
        } catch (err) {
            return next(err);
        }
    }

    @ErrorMethodLogger()
    static async getGroups(req, res, next) {
        try {
            const groups = await groupService.getGroups();
            res.json(groups);
        } catch (err) {
            return next(err);
        }
    }

    @ErrorMethodLogger()
    static async updateGroup(req, res, next) {
        try {
            await groupService.updateGroup(req.body);
            res.status(200).end();
        } catch (err) {
            return next(err);
        }
    }

    @ErrorMethodLogger()
    static async deleteGroup(req, res, next) {
        try {
            await groupService.deleteGroup(req.params.id);
            res.status(200).end();
        } catch (err) {
            return next(err);
        }
    }
}
