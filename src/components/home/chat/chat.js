// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import custom from '../../environment';
// import history from '../../../history';
import { Link } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Image, CloudinaryContext} from 'cloudinary-react';
import io from 'socket.io-client';
// import Messages from '../../Messages/Messages.component';
import './chat.scss';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const Chat = () => {

    const classes = useStyles();

    const chatPicture = useSelector(state => state.chat.picture);
    const chatPicVersion = useSelector(state => state.chat.picVersion);
    const chatName = useSelector(state => state.chat.name);
    const chatEmail = useSelector(state => state.chat.email);
    const selfName = useSelector(state => state.session.userName);
    const selfEmail = useSelector(state => state.session.email);
    const showChat = useSelector(state => state.room.showChat);

    const [message, setMessage] = useState("");
    const [output, setOutput] = useState("");
    const [socket, setSocket] = useState();
    // const [messages, setMessages] = useState([]);
    // const [modal, setModal] = useState(false);

    const ENDPOINT = custom.URL;

    useEffect(() => {
        if(chatName !== "" && chatEmail !== ""){
            const name = selfName;
            var room = "";
            var sortValue = selfEmail.localeCompare(chatEmail);
            if(sortValue===-1){
                room = sha256(selfEmail + chatEmail);
            }
            else{
                room = sha256(chatEmail + selfEmail);
            }
            // eslint-disable-next-line
            let soc = io(ENDPOINT);
            setSocket(soc);

            soc.emit('join', { name, chatName, room }, (callback) => {
                console.log(callback);
            });

            soc.on('message', (message) => {
                setOutput(message.text);
            })

            return () => {
                soc.emit('disconnect');
                soc.off();
            }
        }
        // eslint-disable-next-line
    },[chatName, chatEmail]);

    // useEffect(() => {
    //     socket.on('message', (message) => {
    //         console.log(message);
    //         setMessages([...messages, message]);
    //         console.log(messages);
    //     })
    //     // eslint-disable-next-line
    // },[messages])

    const addToContact = () => {
        alert("Add to contact in progress");
    }

    const onChangeMessage = (e) => {
        setMessage(e.target.value);
    }

    const onSubmitMessage = (e) => {
        e.preventDefault();
        let text = message;
        let room = "";
        let name = selfName;
        var sortValue = selfEmail.localeCompare(chatEmail);
        if(sortValue===-1){
            room = sha256(selfEmail + chatEmail);
        }
        else{
            room = sha256(chatEmail + selfEmail);
        }
        socket.emit('sendMessage', { name, text, room}, (callback) => {
            console.log(callback);
        })
    }

    const kebab = () => {
        // var middle = document.querySelector('.middle1');
        // var cross = document.querySelector('.cross1');
        var dropdown = document.querySelector('.dropdown1');

        // middle.classList.toggle('active');
        // cross.classList.toggle('active');
        dropdown.classList.toggle('active');
    }

    return(
        <div className="chat">
            {!showChat && <div className="start-chat">
                <div className="img">
                    <img src={require("../../../assets/login.svg")} alt="background"/>
                </div>
                <p>Please click on a contact to start chatting</p>
            </div>}
            {showChat && <div className="chat-body">
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            {chatPicture && <CloudinaryContext cloudName="chatify">
                                <Image publicId={chatPicture} version={chatPicVersion} />
                            </CloudinaryContext>} &nbsp;
                            <Typography variant="h6" className={classes.title}>
                                <span className="header-name">{chatName}</span>
                            </Typography>
                            <div className="kebab" onClick={kebab}>
                                <figure></figure>
                                <figure className="middle1"></figure>
                                <p className="cross1">x</p>
                                <figure></figure>
                                <ul className="dropdown1">
                                <li><Link to={"/contact_info"}>Contact Info</Link></li>
                                <li><p onClick={addToContact}>Add to contacts</p></li>
                                </ul>
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>  
                <div className="chat-message">
                    <h2>{output}</h2>
                    {/* <Messages /> */}
                </div>
                <div className="chat-input">
                    <form onSubmit={onSubmitMessage}>
                        <input type="text" className="text" value={message} onChange={onChangeMessage} />
                        <input type="submit" className="btn" value="Send" />
                    </form>
                </div>
            </div>}
        </div>
    )
}

export default Chat;