import * as api from '../api/index.js';

export const getUsers = ( userIds ) => async () => {
    try {
        console.log(userIds);
        const { data } = await api.getUsers(userIds);
        console.log(data);
        return data;
    }
    catch (error) {
        console.log(error);
    }
}