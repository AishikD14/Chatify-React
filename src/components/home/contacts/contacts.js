import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setChat} from '../../../actions/chat';
// import {setsession} from '../../../actions/session';
import custom from '../../environment';
import history from '../../../history';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import {Image, CloudinaryContext} from 'cloudinary-react';
import './contacts.scss';

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


const Contacts = () => {

    const classes = useStyles();

    const tokens = useSelector(state => state.login.userToken);
    const pictures = useSelector(state => state.session.profilePic);
    const versions = useSelector(state => state.session.picVersion);
    const [token, setToken] = useState("");
    const [picture, setPicture] = useState("");
    const [picVersion, setPicVersion] = useState("");
    const [modal, setModal] = useState(false);
    const [contactList, setContactList] = useState([]);
    
    const dispatch = useDispatch();

    useEffect(() => {
        setToken(tokens);
        setPicture(pictures);
        setPicVersion(versions);
    },[tokens, pictures, versions]);
    
    const logoutHandleClose = () => {
        localStorage.setItem('sessionToken', '');
        history.push("/");
    }

    const profileHandleClose = () => {
        history.push("/profile");
    }

    const getContacts = () => {
        if(token !== "" ){
            setModal(true);
            axios.get(custom.URL + "/user/get_contacts", custom.options)
                .then((res) => {
                    setModal(false);
                    if(res.status === 200){
                        console.log(res.data);
                        setContactList(res.data);
                    }
                    else{
                        console.log("No contacts");
                    }
                })
                .catch((err) => {
                    setModal(false);
                    console.log(err);
                });
        }
    }

    useEffect(() => {
        getContacts();
    // eslint-disable-next-line
    },[token]);

    const openChat = (contact) => {
        dispatch(setChat(contact));
    }

    const kebab = () => {
        var middle = document.querySelector('.middle'),
        cross = document.querySelector('.cross'),
        dropdown = document.querySelector('.dropdown');

        middle.classList.toggle('active');
        cross.classList.toggle('active');
        dropdown.classList.toggle('active');
    }

    return(
        <div className="contacts-body">
            {modal && <div className="spinner-body">
                <div className="spinner-border text-success" role="status"></div>
            </div>}
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <CloudinaryContext cloudName="chatify">
                            <Image publicId={picture} version={picVersion} />
                        </CloudinaryContext> &nbsp;
                        <Typography variant="h6" className={classes.title}>
                            Chatify
                        </Typography>
                        <div className="kebab" onClick={kebab}>
                            <figure></figure>
                            <figure className="middle"></figure>
                            <p className="cross">x</p>
                            <figure></figure>
                            <ul className="dropdown">
                            <li><p onClick={profileHandleClose}>Profile</p></li>
                            <li><p onClick={logoutHandleClose}>Logout</p></li>
                            </ul>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        
            <div className="contact-list">
                {contactList.map((contact) => {
                    return(
                    <div className="contact" key={contact.email} onClick={() => {openChat({contact})}}>
                        <div className="left-item">
                            <CloudinaryContext cloudName="chatify">
                                <Image publicId={contact.profilePic} version={contact.picVersion} />
                            </CloudinaryContext>
                        </div>
                        <div className="right-item">
                            <p className="contact-name" value={contact.email}>{contact.userName}</p>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Contacts;