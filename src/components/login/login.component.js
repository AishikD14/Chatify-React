import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import history from '../../history';
import { connect } from 'react-redux';
import { sha256 } from 'js-sha256';
import { stateToProps, DispatchToProps } from '../../reducerfunctions';
import './login.scss';

class Login extends Component{
    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRemember = this.onChangeRemember.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);

        this.state = {
            email: "",
            password: "",
            remember: false
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
    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }
    onChangeRemember(e){
        this.setState({
            remember: e.target.checked
        })
    }
    onSubmitLogin(e){
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: sha256(this.state.password)
        }
        console.log(user, this.state.remember);

        axios.post("http://localhost:5000/users/login",user)
            .then(res => {
                console.log(res.data[0].username);
                if(res.data.length === 1){
                    if(user.username === "admin"){
                        history.push('/admin');
                    }
                    else{
                        this.props.setUser(user.username);
                        if(this.state.remember){
                            localStorage.setItem('sessionToken',user.username);
                        }
                        history.push('/home');
                    }
                }
                else{
                    alert("Incorrect username or password");
                }
            })
            .catch(function(error){
                alert("Something went wrong");
                console.log(error);
            });
        this.setState({
            email: "",
            password: "",
            remember: false
        })
    }

    render(){
        return(
            <div className="login-body">
                <img className="wave" src={require("../../assets/wave.png")} alt="wave"/>    
                <div className="container">
                    <div className="img">
                        <img src={require("../../assets/login.svg")} alt="background"/>
                    </div>
                    <div className="login-content">
                        <form onSubmit={this.onSubmitLogin}>
                            <img src={require("../../assets/avatar.svg")} alt="avatar"/>
                            <h2 className="title">Welcome</h2>
                            <div className="input-div one">
                                <div className="i">
                                        <i className="fas fa-user"></i>
                                </div>
                                <div className="div">
                                        <h5>Email</h5>
                                        <input type="email" className="input" required value={this.state.email} onChange={this.onChangeEmail}/>
                                </div>
                            </div>
                            <div className="input-div pass">
                                <div className="i"> 
                                        <i className="fas fa-lock"></i>
                                </div>
                                <div className="div">
                                        <h5>Password</h5>
                                        <input type="password" className="input" required value={this.state.password} onChange={this.onChangePassword}/>
                                </div>
                            </div>
                            <div className="remember">
                                <input type="checkbox" checked={this.state.remember} onChange={this.onChangeRemember}/>
                                &nbsp;<label> Remember me</label>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <Link to={"/register"} className="register-link">New User? Click here</Link>
                                </div>
                                <div className="col-xs-12 col-sm-6" >
                                    <Link to={"/register"} className="forgot-link">Forgot Password?</Link>
                                </div>
                            </div>
                            <input type="submit" className="btn" value="Login" />
                        </form>
                    </div>
                </div>
            </div>
                    
        );
    }
}

export default connect(stateToProps, DispatchToProps)(Login);