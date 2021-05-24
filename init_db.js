import { UserModel, GroupModel, UserGroupModel } from './src/models/index';
import { PERMISSIONS } from './src/utils/constants';

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
}, {
    id: '5c563ad5-eedc-40c1-a0fb-a96f921804ae',
    login: 'alex',
    password: 'newpassword',
    age: 20
}];

const groups = [{
    id: '486e88f1-134c-405a-b5a1-9dc71206ad81',
    name: 'Readers',
    permissions: [PERMISSIONS.READ]
}, {
    id: '4a01bb3e-9b46-40f8-8656-96f049299bce',
    name: 'Admins',
    permissions: Object.values(PERMISSIONS)
}];

async function initDB() {
    await UserModel.sync({ force: true });
    await UserModel.bulkCreate(users);
    await GroupModel.sync({ force: true });
    await GroupModel.bulkCreate(groups);
    await UserGroupModel.sync({ force: true });
}

initDB();
