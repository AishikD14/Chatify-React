import React from 'react';
import './Message.scss';

const Message = ({user, text, name, type}) => {
    let isSentByCurrentUser = false;

    if(user === name){
        isSentByCurrentUser = true;
    }

    return(
        isSentByCurrentUser 
        ? (
            <div className="message-body">
                <div className="messageContainer justifyEnd">
                    {type!=="personal" && <p className="sentText pr-10">{name}</p>}
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark">{text}</p>
                    </div>
                </div>
            </div>
        )
        : (
            <div className="message-body">
                <div className="messageContainer justifyStart">
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark">{text}</p>
                    </div>
                    {type!=="personal" && <p className="sentText pl-10">{user}</p>}
                </div>
            </div>
        )
    )
    
}

export default Message;