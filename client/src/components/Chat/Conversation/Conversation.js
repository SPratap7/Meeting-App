import React,{useState, useEffect} from 'react';
import {ReactComponent as MaskBoy} from '../../../images/maskboy.svg';
import {ReactComponent as Room} from '../../../images/room.svg';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../../actions/user';
import './styles.css';

function Conversation({online, conversation}) {
    const [userName,setUserName] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        let currentUserId = JSON.parse(localStorage.getItem('profile'));
        currentUserId = currentUserId?.result?._id;
        let friendId = conversation.members.filter(member => member !== currentUserId);
        if(friendId.length > 1){
            friendId = friendId[0];
        }
        dispatch(getUsers(friendId))
        .then((result) => {
            console.log(friendId);
            setUserName(result[friendId]?.name);
        });
    },[]);

    return (
        <div className="conversation">
            {conversation?.roomName ?
                <Room className="conversationImg"/> : <MaskBoy className="conversationImg"/>
            }
            <span className="conversationName">{userName?.length ? conversation?.roomName ? conversation?.roomName : userName : ""}</span>
            <FiberManualRecordIcon className={online ? "onlineMark": "onlineMark not"}/>
        </div>
    )
}

export default Conversation
