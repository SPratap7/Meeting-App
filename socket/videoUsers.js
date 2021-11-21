let users = [];
export const addVideoUser = (userId,socketId) => {
    !users.some((user) => user.userId === userId) && 
        users.push({userId,socketId});
}
export const removeVideoUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
}
export const getVideoUser = (userId) => {
    return users.find((user) => user.userId === userId);
}