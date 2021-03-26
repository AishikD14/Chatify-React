import React, {Component} from 'react';
import axios from 'axios';
import history from '../../history';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { stateToProps, DispatchToProps } from '../../reducerfunctions';
import $ from 'jquery';
import custom from '../environment';
import Contacts from './contacts/contacts';
import Chat from './chat/chat';
import './home.scss';

class Home extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeRoom = this.onChangeRoom.bind(this);
        this.getUserDetails = this.getUserDetails.bind(this);

        this.state = {
            token: this.props.userToken,
            name: "",
            room: "",
            profilepic: this.props.profilePic,
            modalShow: false
        }
    }
    componentDidMount(){
        $(document).mouseup(function(e){
            var kebabMenu = $(".kebab .dropdown");
            if($(".kebab .dropdown").hasClass("active")){
                if(e.which === 1){
                    if(!kebabMenu.is(e.target) && kebabMenu.has(e.target).length === 0){
                        let dropdown = document.querySelector('.dropdown');
                        dropdown.classList.toggle('active');
                    }
                }
            }
            var kebabMenu1 = $(".kebab .dropdown1");
            if($(".kebab .dropdown1").hasClass("active")){
                if(e.which === 1){
                    if(!kebabMenu1.is(e.target) && kebabMenu1.has(e.target).length === 0){
                        let dropdown = document.querySelector('.dropdown1');
                        dropdown.classList.toggle('active');
                    }
                }
            }
        })

        if (this.state.token === '' || this.state.token === null || this.state.token === undefined) {
            if(localStorage.getItem("sessionToken") === '' || localStorage.getItem("sessionToken") === null || localStorage.getItem("sessionToken") === undefined){
                history.push("/");
            }
            else{
                this.setState({
                    token: localStorage.getItem('sessionToken')
                });
                this.props.setUser(localStorage.getItem('sessionToken'));
                this.getUserDetails(localStorage.getItem('sessionToken'));
            }
        } 
    }
    getUserDetails(token){
        let payload = {
            "token": token
        }
        this.setState({
            modalShow: true
        })
        axios.post(custom.URL + "/user/get_session", payload, custom.options)
            .then((res) => {
                this.setState({
                    modalShow: false
                })
                if (res.status === 200) {
                    // console.log(res.data);
                    this.props.setSession(res.data);
                }
                else{
                    history.push("/");
                }
            })
            .catch((err) => {
                this.setState({
                    modalShow: false
                })
                console.log(err);
            });
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
                {this.state.modalShow && <div className="spinner-body">
                    <div className="spinner-border text-success" role="status"></div>
                </div>}
                
                <div className="row home-content">
                    <div className={`contact-tab ${this.props.contactView}`}>
                        <Contacts />
                    </div>
                    <div className={`chat-tab ${this.props.chatView}`}>
                        <Chat />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(stateToProps, DispatchToProps)(Home);