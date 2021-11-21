let users = [];
export const addChatUser = (userId,socketId) => {
    !users.some((user) => user.userId === userId) && 
        users.push({userId,socketId});
}
export const removeChatUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
}
export const getChatUser = (userId) => {
    return users.find((user) => user.userId === userId);
}