import * as api from '../api/index.js';

export const getConversations = ( userId ) => async () => {
    try {
        const { data } = await api.getConversations(userId);
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

export const createConversation = ( membersEmail, currentEmail, roomName ) => async () => {
    try {
        membersEmail.push(currentEmail);
        let newConversation = {membersEmail,roomName};
        console.log(newConversation);
        const { data } = await api.createConversation(newConversation);
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

export const getMessages = ( conversationId ) => async () => {
    try {
        console.log(conversationId);
        const { data } = await api.getMessages(conversationId);
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

export const createMessage = ( newMessage ) => async () => {
    try {
        const { data } = await api.createMessage(newMessage);
        return data;
    }
    catch (error) {
        console.log(error);
    }
}