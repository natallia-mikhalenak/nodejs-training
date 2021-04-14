import { generateId } from './data_utils';
import { sortByFieldName, limitArray } from './data_utils';

const USERS_STORAGE = new Map();

const getUserById = (id) => {
    const user =  USERS_STORAGE.get(id);
    if (user && !user.isDeleted) {
        return user;
    }
};

export const getUser = (id) => {
    const user = getUserById(id);
    if (user) {
        return { data: user };
    }
    return { error: `Cannot find the used with id: ${id}` };
};

export const createUser = (user) => {
    const id = generateId();
    USERS_STORAGE.set(id, {
        id,
        ...user,
        isDeleted: false
    });
    return { data: { id } };
};

export const deleteUser = (id) => {
    const user = getUserById(id);
    if (user) {
        USERS_STORAGE.set(user.id, {
            ...user,
            isDeleted: true
        });
        return { data: { status: 'success', message: 'User was deleted' } };
    }
    return { error: `Cannot find the used with id: ${id}` };
};

export const updateUser = (user) => {
    const oldUser = getUserById(user.id);
    if (oldUser) {
        user = {
            ...user,
            isDeleted: oldUser.isDeleted
        };
        USERS_STORAGE.set(user.id, user);
        return { data: user };
    }
    return { error: `Cannot find the used with id: ${user.id}` };
};

export const getAutoSuggestUsers = (loginSubString, limit) => {
    const users = Array.from(USERS_STORAGE.values())
        .filter((user) => !user.isDeleted && user.login.includes(loginSubString));
    const autoSuggestedUsers = limitArray(sortByFieldName(users, 'login'), limit);
    return { data: autoSuggestedUsers };
};

export const isLoginExists = (login) => {
    return !!Array.from(USERS_STORAGE.values()).find((user) => user.login === login);
};
