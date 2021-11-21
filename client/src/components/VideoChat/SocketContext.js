import React, {createContext, useState, useRef, useEffect} from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:5200');

const ContextProvider = ({children}) => {

    const [stream, setStream] = useState(null);
    const [me,setMe] = useState('');
    const [userId,setUserId] = useState('');
    const [call,setCall] = useState({});
    const [callAccepted,setCallAccepted] = useState(false);
    const [callEnded,setCallEnded] = useState(false);
    const [name,setName] = useState('');
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video:true, audio: true })
        .then((currentStream) => {
            setStream(currentStream);
            console.log(currentStream);
            myVideo.current.srcObject = currentStream;
        })
        socket.on('me', (id) => setMe(id));
        socket.on('callUser', ({from,name:callerName, signal}) => {
            setCall({isReceivedCall: true, from, name: callerName, signal});
        });
        socket.on("CallEnded", () => {
            console.log(me);
            setCallEnded(true);
            connectionRef.current.destroy();
            // window.location.reload();
        });
    },[]);

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({ initiator: false, trickle: false, stream});
        peer.on('signal', (data) =>{
            socket.emit('answerCall', {signal: data, to: call.from});
        });
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });
        peer.signal(call.signal);
        connectionRef.current = peer;
    }

    const callUser = (id) => {
        console.log(id);
        setUserId(id);
        const peer = new Peer({ initiator: true, trickle: false, stream});
        peer.on('signal', (data) =>{
            socket.emit('callUser', {userToCall: id, signalData: data, from: me, name });
        });
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });
        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });
        connectionRef.current = peer;
    }

    const leaveCall = () => {
        // setCallEnded(true);
        console.log("A");
        socket.emit('leaveCall',userId);
        // connectionRef.current.destroy();
        // window.location.reload();
    }

    const toggleMic = () => {
        const enabled = stream.getAudioTracks()[0].enabled;
        if (enabled) {
            stream.getAudioTracks()[0].enabled = false;
        } else {
            stream.getAudioTracks()[0].enabled = true;
        }
    }

    const toggleVideo = () => {
        let enabled = stream.getVideoTracks()[0].enabled;
        if (enabled) {
            stream.getVideoTracks()[0].enabled = false;
        } else {
            stream.getVideoTracks()[0].enabled = true;
        }
    }

    return (
        <SocketContext.Provider value={{ stream, me, call, callAccepted, callEnded, name, setName, myVideo, userVideo, answerCall, callUser, leaveCall, toggleMic, toggleVideo}}>
            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext };