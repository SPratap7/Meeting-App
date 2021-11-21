import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})
//MEETING APIs
export const fetchMeetings = ( userId ) => API.get(`/meeting/${userId}`);
export const createMeeting = ( newMeeting ) => API.post('/meeting',newMeeting);
export const updateMeeting = ( meetingId, updatedMeeting ) => API.patch(`/meeting/${meetingId}`,updatedMeeting);
export const deleteMeeting = ( meetingId ) => API.delete(`/meeting/${meetingId}`);

//AUTHENTICATION APIs
export const login = ( formData ) => API.post('/user/login', formData);
export const signup = ( formData ) => API.post('/user/signup', formData);
export const getUsers = ( userIds ) => API.get(`/user/${userIds}`);


//MEESSAGES APIs
export const getConversations = ( userId ) => API.get(`/chat/conversations/${userId}`);
export const createConversation = ( newConversation) => API.post(`/chat/conversations`, newConversation);
export const getMessages = ( conversationId ) => API.get(`/chat/messages/${conversationId}`);
export const createMessage = ( newMessage ) => API.post(`/chat/messages`, newMessage);