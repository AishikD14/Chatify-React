import React from 'react';
import './Input.scss';

const Input = ({message, setMessage, sendMessage}) => (
    <div className="input-body">
        <form className="form">
            <input 
                className="input"
                type="text"
                placeholder="Type a message ..."
                value={message}
                onChange={(event) => setMessage(event)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />
            <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button>
        </form>
    </div>
)

export default Input;