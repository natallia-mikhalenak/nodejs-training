import { UserController } from '../user_controller';
import { UserService } from '../../../services/user_service';

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

const users = [{
    id: '0df71432-7b42-4eb3-bb11-def8334c4101',
    login: 'natallia',
    password: 'Secret1',
    age: 18
}, {
    id: '3dd71432-7b42-4eb3-bb11-def8334c5101',
    login: 'olga',
    password: 'qwerty',
    age: 19
}];

describe('UserController', () => {
    let nextFn;
    beforeEach(() => {
        nextFn = jest.fn();
    });

    describe('getUser() method', () => {
        const req = { params: { id: users[0].id } };

        it('should return existing user', async () => {
            jest.spyOn(UserService.prototype, 'getUser').mockImplementation(() => users[0]);
            const jsonCall = jest.fn();

            await UserController.getUser(req, { json: jsonCall }, nextFn);
            expect(jsonCall.mock.calls[0][0]).toBe(users[0]);
        });

        it('should error code 400 if user is not found', async () => {
            jest.spyOn(UserService.prototype, 'getUser').mockImplementation(() => undefined);
            const statusCall = jest.fn();

            await UserController.getUser(req, { status: statusCall }, nextFn);
            expect(statusCall.mock.calls[0][0]).toBe(404);
        });
    });

    describe('addUser() method', () => {
        it('should return added user', async () => {
            jest.spyOn(UserService.prototype, 'addUser').mockImplementation(() => users[0]);
            const jsonCall = jest.fn();
            const req = { body: users[0] };

            await UserController.addUser(req, { json: jsonCall }, nextFn);
            expect(jsonCall.mock.calls[0][0]).toBe(users[0]);
        });
    });

    describe('getUsersByLogin() method', () => {
        it('should return limited number of users filtered by login', async () => {
            jest.spyOn(UserService.prototype, 'getUsersByLogin').mockImplementation(() => users);
            const jsonCall = jest.fn();
            const req = { query: { limit: 1, loginSubString: 'user' } };

            await UserController.getUsersByLogin(req, { json: jsonCall }, nextFn);
            expect(jsonCall.mock.calls[0][0]).toBe(users);
        });
    });

    describe('updateUser() method', () => {
        it('should return code 200', async () => {
            jest.spyOn(UserService.prototype, 'updateUser').mockImplementation();
            const statusCall = jest.fn();
            const req = { body: { id: '5c563ad5-eedc-40c1-a0fb-a96f921804ae', password: 'newpass' } };

            await UserController.updateUser(req, { status: statusCall }, nextFn);
            expect(statusCall.mock.calls[0][0]).toBe(200);
        });
    });

    describe('deleteUser() method', () => {
        it('should return code 200', async () => {
            jest.spyOn(UserService.prototype, 'deleteUser').mockImplementation();
            const statusCall = jest.fn();
            const req = { params: { id: users[0].id } };

            await UserController.deleteUser(req, { status: statusCall }, nextFn);
            expect(statusCall.mock.calls[0][0]).toBe(200);
        });
    });
});
