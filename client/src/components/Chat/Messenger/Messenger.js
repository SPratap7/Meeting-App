import React, {useEffect, useState, useRef} from 'react'
import { io } from 'socket.io-client';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import {InputBase} from '@material-ui/core';
import './styles.css';
import Conversation from '../Conversation/Conversation';
import Message from '../Message/Message';
import { useDispatch } from 'react-redux';
import { getConversations, getMessages, createMessage} from '../../../actions/message';
import { getUsers } from '../../../actions/user';
import AddChatMenu from '../Menu/AddChatMenu';

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    chatBoxBottom: {
        width: 'calc(100% - 10vw)',
        backgroundColor: '#66DE93',
        borderRadius: '0.5vh',
    },
    menu: {
      marginRight:'7vw',

    },
}));


function Messenger() {
    const socket = useRef();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [sendMessage,setSendMessage] = useState({conversationId: null, senderId: null, text: ""});
    const [receiveMessage,setReceiveMessage] = useState(null);
    const [message,setMessage] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [conversations,setConversations] = useState([]);
    const [members, setMembers] = useState([]);
    const dispatch = useDispatch();
    const classes = useStyles();
    const scrollRef = useRef();
    
    useEffect(() => {
      dispatch(getConversations(user?.result?._id))
      .then((result) => {
        console.log(result); 
        setConversations(result);
      });
      socket.current = io("ws://localhost:5100");
      socket.current.on("getMessage", data => {
        const newMessage = { senderId: data?.senderId, receiver: data?.receiver, text: data?.text, createdAt: data?.createdAt };
        setReceiveMessage(newMessage);
      });
    },[]);

    useEffect(() => {
      console.log(receiveMessage);
      receiveMessage && 
      currentChat?.members?.includes(receiveMessage.senderId) &&
      setMessage((prev) => [...prev, receiveMessage]);
    },[receiveMessage]);

    useEffect(() => {
      dispatch(getMessages(currentChat?._id))
      .then((result) => {
        console.log(result);
        setMessage(result);
      });
    },[currentChat]);

    useEffect(() => {
        console.log(user);
        socket.current.emit("addUser", user?.result?._id);
    },[user]);

    useEffect(() => {
      scrollRef?.current?.scrollIntoView({behavior: "smooth"});
    },[message]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(currentChat);
        const friendId = currentChat.members.filter( member => member !== user?.result?._id);
        const newMessage = { senderId: user?.result?._id, receivers: friendId, text: sendMessage?.text, createdAt: Date.now() };
        socket.current.emit("sendMessage", newMessage);
        console.log(newMessage);
        dispatch(createMessage(sendMessage));
        setMessage([...message, newMessage]);
        setSendMessage({...sendMessage, text: ""});
    }

    const handleConversationChange = (conversation) => {
      setCurrentChat(conversation);
      dispatch(getUsers(conversation.members))
      .then((result) => {
          console.log(result);
          setMembers(result);
      });
      console.log(conversation.members);
      setSendMessage({...sendMessage, conversationId: conversation?._id, senderId: user?.result?._id});
    }

    const handleMessageChange = (e) => {
        console.log(e.target.value);
        setSendMessage({...sendMessage, text: e.target.value});
    }

    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    { conversations ? conversations.map( c =>(
                      <div onClick={() => handleConversationChange(c)} style={{backgroundColor: '#32535d'}}>
                        <Conversation conversation={c}/>
                      </div>
                    )) : <></>}
                    <AddChatMenu conversations={conversations} setConversations={setConversations}/>
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                  {
                    currentChat ? (
                    <>
                      <div className="chatBoxTop">
                        { message.map( m =>(
                          <div ref={scrollRef}>
                            <Message own={ m?.senderId == user?.result?._id } text={m?.text} createdAt={m?.createdAt} user={members[m?.senderId]}/>
                            <br/>
                          </div>
                        ))}
                      </div>
                      <div className="chatBoxBottom">
                          <TextField
                              id="outlined-multiline-flexible"
                              multiline
                              rowsMax={4}
                              className={classes.chatBoxBottom}
                              onChange={handleMessageChange}
                              value={sendMessage?.text}
                              variant="outlined"
                          />
                          <button className="chatSubmitButton" onClick={handleSubmit}>Submit</button>
                      </div>
                    </>) : (<span>Open a conversation to start</span>)
                  }
                </div>
            </div>
        </div>
    )
}

export default Messenger
