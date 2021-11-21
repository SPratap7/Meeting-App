import React from 'react'
import {ReactComponent as MaskBoy} from '../../../images/maskboy.svg';
import './styles.css';

function ChatOnline() {
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                <MaskBoy className="conversationImg"/>

                </div>
            </div>
        </div>
    )
}

export default ChatOnline
