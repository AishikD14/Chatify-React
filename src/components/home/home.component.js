import React, {Component} from 'react';
import axios from 'axios';
import history from '../../history';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { stateToProps, DispatchToProps } from '../../reducerfunctions';
import custom from '../environment';
import './home.scss';

class Home extends Component{
    constructor(props){
        super(props);

        this.state = {
            userToken: this.props.userToken
        }
    }
    // componentDidMount(){
    //     axios.post(custom.URL + "/user/forgot_password",user, custom.options)
    //         .then(res => {
    //             console.log(res.data);
    //             if(res.status === 200){
    //                 alert("Password  reset link has been sent to your email");
    //                 history.push('/');
    //             }
    //             else{
    //                 alert("Email is not registered");
    //             }
    //         })
    //         .catch(function(error){
    //             alert("Something went wrong");
    //             console.log(error);
    //         });
    // }
    // onSubmitForgot(e){
    //     e.preventDefault();
    //     const user = {
    //         email: this.state.email
    //     }
    //     console.log(user);

    //     axios.post(custom.URL + "/user/forgot_password",user, custom.options)
    //         .then(res => {
    //             console.log(res.data);
    //             if(res.status === 200){
    //                 alert("Password  reset link has been sent to your email");
    //                 history.push('/');
    //             }
    //             else{
    //                 alert("Email is not registered");
    //             }
    //         })
    //         .catch(function(error){
    //             alert("Something went wrong");
    //             console.log(error);
    //         });
    //     this.setState({
    //         email: ""
    //     })
        
    // }

    render(){
        return(
            <h1>Hi</h1>     
        );
    }
}

export default connect(stateToProps, DispatchToProps)(Home);