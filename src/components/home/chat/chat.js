import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import custom from '../../environment';
// import history from '../../../history';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Image, CloudinaryContext} from 'cloudinary-react';
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

    const tokens = useSelector(state => state.login.userToken);
    const pictures = useSelector(state => state.chat.picture);
    const versions = useSelector(state => state.chat.picVersion);
    const names = useSelector(state => state.chat.name);
    const emails = useSelector(state => state.chat.email);
    const [token, setToken] = useState("");
    const [picture, setPicture] = useState("");
    const [picVersion, setPicVersion] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    // const [modal, setModal] = useState(false);

    useEffect(() => {
        setToken(tokens);
        setPicture(pictures);
        setPicVersion(versions);
        setName(names);
        setEmail(emails);
    },[tokens, pictures, versions, names, emails]);

    const addToContact = () => {
        alert("Add to contact in progress");
    }

    const kebab = () => {
        var middle = document.querySelector('.middle1'),
        cross = document.querySelector('.cross1'),
        dropdown = document.querySelector('.dropdown1');

        middle.classList.toggle('active');
        cross.classList.toggle('active');
        dropdown.classList.toggle('active');
    }

    console.log(token, email);

    return(
        <div className="chat-body">
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        {picture && <CloudinaryContext cloudName="chatify">
                            <Image publicId={picture} version={picVersion} />
                        </CloudinaryContext>} &nbsp;
                        <Typography variant="h6" className={classes.title}>
                            <span className="header-name">{name}</span>
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