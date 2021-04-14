import { UserModel } from './src/models/user_model';

const users = [{
    id:       '0df71432-7b42-4eb3-bb11-def8334c4101',
    login:    'natallia',
    password: 'secret',
    age:       18
}, {
    id:       '3dd71432-7b42-4eb3-bb11-def8334c5101',
    login:    'olga',
    password: 'qwerty',
    age:       19
}, {
    id:       '5c563ad5-eedc-40c1-a0fb-a96f921804ae',
    login:    'alex',
    password: 'newpassword',
    age:       20
}];

async function createUsers() {
    await UserModel.sync({ force: true });
    await UserModel.bulkCreate(users);
}

createUsers();
