import React, {Component} from 'react';
// import axios from 'axios';
// import history from '../../history';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Image, CloudinaryContext} from 'cloudinary-react';
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
            room: "",
            profilepic: this.props.profilePic,
            modalShow: false
        }
    }
    // componentDidMount(){
    //     axios.get(this.props.profilePic)
    //         .then((res) => {
    //             this.setState({
    //                 profilepic: res
    //             })
    //         })
    // }
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
                {this.state.modalShow && <div className="spinner-body">
                    <div className="spinner-border text-success" role="status"></div>
                </div>}
                <h1>Hi {this.props.userName}</h1>  
                <CloudinaryContext cloudName="chatify">
                    <div>
                        {!this.state.update && <div><Image publicId={this.state.profilepic} version={this.props.picVersion} width="200" height="200" />
                        <br />
                        <br />
                        </div>}
                        {this.state.update && <div>
                        <img src={this.state.file} width="200" height="200" alt="profile" />
                        <br />
                        <br />
                        </div>}
                        <label className="custom-file-upload btn">
                            <input type="file" onChange={this.handleChange} accept="image/*"/>
                            Select Profile Picture
                        </label>
                        <br />
                        <button className="my-2 btn btn-green-style" onClick={this.uploadProfilePic}>Upload Profile Picture</button>
                    </div>
                </CloudinaryContext>
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