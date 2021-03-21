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

    const token = useSelector(state => state.login.userToken);
    var chatPicture = useSelector(state => state.chat.picture);
    var chatPicVersion = useSelector(state => state.chat.picVersion);
    var chatName = useSelector(state => state.chat.name);
    var chatEmail = useSelector(state => state.chat.email);
    const selfName = useSelector(state => state.session.userName);
    const selfEmail = useSelector(state => state.session.email);

    // const [message, setMessage] = useState("");
    // const [messages, setMessages] = useState([]);
    // const [modal, setModal] = useState(false);

    const ENDPOINT = custom.URL;
    let socket;

    useEffect(() => {
        // console.log(token);
        if(token !== ""){
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
            socket = io(ENDPOINT);
            socket.emit('join', { name, room }, (callback) => {
                console.log(callback);
            });

            socket.on('message', (message) => {
                console.log(message.text);
            })

            return () => {
                socket.emit('disconnect');
                socket.off();
            }
        }
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

    const kebab = () => {
        // var middle = document.querySelector('.middle1');
        // var cross = document.querySelector('.cross1');
        var dropdown = document.querySelector('.dropdown1');

        // middle.classList.toggle('active');
        // cross.classList.toggle('active');
        dropdown.classList.toggle('active');
    }

    return(
        <div className="chat-body">
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
        </div>
    )
}

export default Chat;