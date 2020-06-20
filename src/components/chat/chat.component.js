import React, {Component} from 'react';
// import axios from 'axios';
// import history from '../../history';
// import { Link } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { stateToProps, DispatchToProps } from '../../reducerfunctions';
// import custom from '../environment';
import './chat.scss';

let socket;

class Chat extends Component{
    constructor(props){
        super(props);

        this.state = {
            userToken: this.props.userToken,
            name: "",
            room: "",
            ENDPOINT: "localhost:5000"
        }
    }

    componentDidMount(){
        const { name, room } = queryString.parse(this.props.location.search);

        socket = io(this.state.ENDPOINT)

        this.setState({
            name: name,
            room: room
        })

        socket.emit('join', { name, room }, () => {
           
        });
    }

    componentWillUnmount(){
        socket.emit('disconnect');
        socket.off();
    }

    render(){
        return(
            <div className="chat-body">
                <h1>Chat</h1>  
                
            </div>
        );
    }
}

export default connect(stateToProps, DispatchToProps)(Chat);