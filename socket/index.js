import { Server } from 'socket.io';
//import dotenv from 'dotenv';
import {addChatUser,removeChatUser,getChatUser} from './chatUsers.js';
import {addVideoUser,removeVideoUser,getVideoUser} from './videoUsers.js';

const PORT = process.env.PORT || 5100;
const PORT2 = process.env.PORT2 || 5200;
//dotenv.config();

const io = new Server(PORT, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

const io1 = new Server(PORT2, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET","POST"]
    }
});

io.on('connection', (socket) => {
    //When Connect
    console.log("Chat User connected", socket.id);
    //Take UserId and SocketId from user
    socket.on('addUser', (userId) => {
        addChatUser(userId,socket.id);
        // io.emit("getUsers",users);
    });
    //get and send message
    socket.on('sendMessage',({senderId, receivers, text, createdAt}) => {
        for (let i = 0; i < receivers.length; i++) {
            const receiver = receivers[i];
            const user = getChatUser(receiver);
            user && io.to(user.socketId).emit("getMessage", {
                senderId, receiver, text, createdAt,
            })
        }
    });
    //When Disconnect
    socket.on('disconnect', () => {
        console.log("Chat SocketId: " + socket.id + " Disconnected");
        removeChatUser(socket.id);
        // io.emit("getUsers",users);
    });
})

io1.on('connection', (socket) => {
    console.log("Video User connected", socket.id);
    socket.emit('me',socket.id);
    socket.on('callUser', ({userToCall, signalData, from, name}) => {
        io1.to(userToCall).emit("callUser",{ signal: signalData, from, name});
    });
    socket.on('answerCall', (data) => {
        io1.to(data.to).emit("callAccepted", data.signal);
    });
    socket.on('leaveCall', (userId) => {
        console.log("Video User Leave", socket.id);
        io1.emit("CallEnded");
    });
    socket.on('disconnect', () => {
        console.log("Video User Disconnected", socket.id);
        socket.broadcast.emit("CallEnded");
    });
})