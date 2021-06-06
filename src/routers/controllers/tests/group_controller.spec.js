import { GroupController } from '../group_controller';
import { GroupService } from '../../../services/group_service';

jest.mock('../../../utils/logger.js', () => ({ ErrorMethodLogger: () => {
    return (target, name, descriptor) => {
        const original = descriptor.value;
        descriptor.value = async (...args) => {
            try {
                await original.apply(this, args);
            } catch (err) {
                throw err;
            }
        };
    };
} }));

const groups = [{
    id: '486e88f1-134c-405a-b5a1-9dc71206ad81',
    name: 'Readers',
    permissions: []
}, {
    id: '4a01bb3e-9b46-40f8-8656-96f049299bce',
    name: 'Admins',
    permissions: []
}];

describe('GroupController', () => {
    let nextFn;
    beforeEach(() => {
        nextFn = jest.fn();
    });

    describe('getGroupById() method', () => {
        const req = { params: { id: groups[0].id } };

        it('should return existing group', async () => {
            jest.spyOn(GroupService.prototype, 'getGroupById').mockImplementation(() => groups[0]);
            const jsonCall = jest.fn();

            await GroupController.getGroupById(req, { json: jsonCall }, nextFn);
            expect(jsonCall.mock.calls[0][0]).toBe(groups[0]);
        });

        it('should error code 400 if group is not found', async () => {
            jest.spyOn(GroupService.prototype, 'getGroupById').mockImplementation(() => undefined);
            const statusCall = jest.fn();

            await GroupController.getGroupById(req, { status: statusCall }, nextFn);
            expect(statusCall.mock.calls[0][0]).toBe(404);
        });
    });

    describe('addGroup() method', () => {
        it('should return added group', async () => {
            jest.spyOn(GroupService.prototype, 'addGroup').mockImplementation(() => groups[0]);
            const jsonCall = jest.fn();
            const req = { body: groups[0] };

            await GroupController.addGroup(req, { json: jsonCall }, nextFn);
            expect(jsonCall.mock.calls[0][0]).toBe(groups[0]);
        });
    });

    describe('getGroups() method', () => {
        it('should return groups', async () => {
            jest.spyOn(GroupService.prototype, 'getGroups').mockImplementation(() => groups);
            const jsonCall = jest.fn();

            await GroupController.getGroups({}, { json: jsonCall }, nextFn);
            expect(jsonCall.mock.calls[0][0]).toBe(groups);
        });
    });

    describe('updateGroup() method', () => {
        it('should return code 200', async () => {
            jest.spyOn(GroupService.prototype, 'updateGroup').mockImplementation();
            const statusCall = jest.fn();
            const req = { body: { id: '486e88f1-134c-405a-b5a1-9dc71206ad81', name: 'newGroup' } };

            await GroupController.updateGroup(req, { status: statusCall }, nextFn);
            expect(statusCall.mock.calls[0][0]).toBe(200);
        });
    });

    describe('deleteGroup() method', () => {
        it('should return code 200', async () => {
            jest.spyOn(GroupService.prototype, 'deleteGroup').mockImplementation();
            const statusCall = jest.fn();
            const req = { params: { id: groups[0].id } };

            await GroupController.deleteGroup(req, { status: statusCall }, nextFn);
            expect(statusCall.mock.calls[0][0]).toBe(200);
        });
    });
});
