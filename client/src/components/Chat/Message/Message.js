import React, {useEffect} from 'react'
import './styles.css';
import {ReactComponent as MaskBoy} from '../../../images/maskboy.svg';

function Message({own, text, createdAt, user}) {
    useEffect(() => {
        console.log(user);
    }, [user])
    return (
        <div className={own ? "message own": "message"}>
            <div className="messageTop">
                <MaskBoy className="messageImg"/>
                {/*<p className="messageText">{user?.name}</p>*/}
                <p className="messageText">{text}</p>
            </div>
            {/*<div className="messageBottom">{createdAt}</div>*/}
        </div>
    )
}

export default Message
