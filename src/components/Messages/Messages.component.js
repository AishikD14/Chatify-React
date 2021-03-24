import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from "../Message/Message.component";
import './Messages.scss';

const Messages = ({messages, name, type}) => (
    <div className="messages-body">
        <ScrollToBottom className="messages">
            {messages.map((message) => <div key={message._id}><Message user={message.user} text={message.text} name={name} type={type}/></div>)}
        </ScrollToBottom>
    </div>
)

export default Messages;