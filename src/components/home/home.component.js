import React, {Component} from 'react';
// import axios from 'axios';
// import history from '../../history';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { stateToProps, DispatchToProps } from '../../reducerfunctions';
// import custom from '../environment';
import './home.scss';

class Home extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeRoom = this.onChangeRoom.bind(this);

        this.state = {
            userToken: this.props.userToken,
            name: "",
            room: ""
        }
    }
    onChangeName(e){
        this.setState({
            name: e.target.value
        })
    }
    onChangeRoom(e){
        this.setState({
            room: e.target.value
        })
    }
    render(){
        return(
            <div className="home-body">
                <h1>Hi {this.props.userToken}</h1>  
                <Link to={"/profile"}>Profile</Link>

                <div className="joinOuterContainer">
                    <div className="joinInnerContainer">
                        <h1 className="heading">Join</h1>
                        <div><input placeholder="Name" className="joinInput" type="text" onChange={this.onChangeName} /></div>
                        <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={this.onChangeRoom} /></div>
                        <Link onClick={event => (!this.state.name || !this.state.room)? event.preventDefault() : null} to={`/chat?name=${this.state.name}&room=${this.state.room}`}>
                            <button className="button mt-20" type="submit">Sign In</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(stateToProps, DispatchToProps)(Home);