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
import InfoBar from '../InfoBar/InfoBar.component';
import Input from '../Input/Input.component';
import Messages from '../Messages/Messages.component';

let socket;

class Chat extends Component{
    constructor(props){
        super(props);

        this.onMessageChange = this.onMessageChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        this.state = {
            userToken: this.props.userToken,
            name: "",
            room: "",
            ENDPOINT: "localhost:5000",
            message: "",
            messages: []
        }
    }

    componentDidMount(){
        const { name, room } = queryString.parse(this.props.location.search);

        socket = io(this.state.ENDPOINT)

        this.setState({
            name: name,
            room: room
        })

        socket.emit('join', { name, room }, (callback) => {
           console.log(callback);

        });
        socket.on('message', (message) => {
            console.log(message);
            this.setState({
                messages: [...this.state.messages, message]
            })
            console.log(this.state.messages);
        })
    }

    // componentDidUpdate(prevProps, prevState){
    //     if(prevState.messages !== this.state.messages){
    //         socket.on('message', (message) => {
    //             console.log(message);
    //             this.setState({
    //                 messages: [...this.state.messages, message]
    //             })
    //         })
    //         console.log(this.state.messages);
    //     }
    // }

    componentWillUnmount(){
        socket.emit('disconnect');
        socket.off();
    }

    onMessageChange(e){
        this.setState({
            message: e.target.value
        })
        console.log(this.state.message);
    }

    sendMessage(e){
        e.preventDefault();
        console.log(this.state.message);
        if(this.state.message){
            socket.emit('sendMessage', this.state.message, () => {
                this.setState({
                    message: ''
                })
            })
        }
    }

    render(){
        return(
            <div className="chat-body">
                <div className="outerContainer">
                    <div className="container">
                        <InfoBar room={this.state.room} />
                        <Messages messages={this.state.messages} name={this.state.name}/>
                        <Input message={this.state.message} setMessage={this.onMessageChange} sendMessage={this.sendMessage}  />
                        {/* <input value={this.state.message} onChange={this.onMessageChange} onKeyPress={event => event.key === 'Enter' ? this.sendMessage(event) : null} />     */}
                    </div>    
                </div> 
            </div>
        );
    }
}

export default connect(stateToProps, DispatchToProps)(Chat);