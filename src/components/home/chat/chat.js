import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import custom from '../../environment';
import history from '../../../history';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
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
    const [anchorEl, setAnchorEl] = useState(null);

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
    const [modal, setModal] = useState(false);

    useEffect(() => {
        setToken(tokens);
        setPicture(pictures);
        setPicVersion(versions);
        setName(names);
        setEmail(emails);
    },[tokens, pictures, versions, names, emails]);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const addToContact = () => {
        setAnchorEl(null);
    }

    const openContact = () => {
        setAnchorEl(null);
    }

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
                    <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={openContact}>Contact Info</MenuItem>
                    <MenuItem onClick={addToContact}>Add to contacts</MenuItem>
                </Menu>
                    </Toolbar>
                </AppBar>
            </div>  
        </div>
    )
}

export default Chat;