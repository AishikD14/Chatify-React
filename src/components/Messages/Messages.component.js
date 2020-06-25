import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from "../Message/Message.component";
import './Messages.scss';

const Messages = ({messages, name}) => (
    <div className="messages-body">
        <ScrollToBottom className="messages">
            {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
        </ScrollToBottom>
    </div>
)

export default Messages;