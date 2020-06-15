import React, {Component} from 'react';
import axios from 'axios';
import history from '../../history';
import { Link } from 'react-router-dom';
import custom from '../environment';
import './forgotPass.scss';

class ForgotPass extends Component{
    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmitForgot = this.onSubmitForgot.bind(this);

        this.state = {
            email: ""
        }
    }
    componentDidMount(){
        const inputs = document.querySelectorAll(".input");
        function addcl(){
            let parent = this.parentNode.parentNode;
            parent.classList.add("focus");
        }
        function remcl(){
            let parent = this.parentNode.parentNode;
            if(this.value === ""){
                parent.classList.remove("focus");
            }
        }
        inputs.forEach(input => {
            input.addEventListener("focus", addcl);
            input.addEventListener("blur", remcl);
        });
    }
    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    } 
    onSubmitForgot(e){
        e.preventDefault();
        const user = {
            email: this.state.email
        }
        console.log(user);

        axios.post(custom.URL + "/user/forgot_password",user, custom.options)
            .then(res => {
                console.log(res.data);
                if(res.status === 200){
                    alert("Password  reset link has been sent to your email");
                    history.push('/');
                }
                else{
                    alert("Email is not registered");
                }
            })
            .catch(function(error){
                alert("Something went wrong");
                console.log(error);
            });
        this.setState({
            email: ""
        })
        
    }

    render(){
        return(
            <div className="forgot-body">
                <img className="wave" src={require("../../assets/wave.png")} alt="wave"/>    
                <div className="container">
                    <div className="img">
                        <img src={require("../../assets/login.svg")} alt="background"/>
                    </div>
                    <div className="login-content">
                        <form onSubmit={this.onSubmitForgot}>
                            <img src={require("../../assets/avatar.svg")} alt="avatar"/>
                            <h2 className="title">Forgot Pass</h2>
                            <div className="input-div one">
                                <div className="i">
                                        <i className="fas fa-envelope"></i>
                                </div>
                                <div className="div">
                                        <h5>Email</h5>
                                        <input type="email" className="input" required value={this.state.email} onChange={this.onChangeEmail}/>
                                </div>
                            </div>
                            <Link to={"/"} className="signin-link">Ready to Sign In</Link>
                            <input type="submit" className="btn" value="Get Reset Link" />
                        </form>
                    </div>
                </div>
            </div>
                    
        );
    }
}

export default ForgotPass;