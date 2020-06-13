import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import history from '../../history';
import { sha256 } from 'js-sha256';
import './register.scss';

export default class Register extends Component{
    constructor(props){
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCnfPassword = this.onChangeCnfPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            password: "",
            cnf_password: "",
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
    onChangeUserName(e){
        this.setState({
            name: e.target.value
        })
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
    onChangeCnfPassword(e){
        this.setState({
            cnf_password: e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            cnf_password: this.state.cnf_password
        }
        console.log(user);

        if(user.cnf_password !== user.password){
            alert("Password and Confirm password fields should be same");
            return;
        }
        user.password = sha256(this.state.password);
        axios.post("http://localhost:5000/users/register",user)
            .then(res => {
                if(res.data ==="Success"){
                    history.push('/');
                }
                else{
                    alert("Username already exists");
                }
            })
            .catch(function(error){
                alert("Something went wrong");
                console.log(error);
            });
        this.setState({
            name: "",
            email: "",
            password: "",
            cnf_password: ""
        })
    }

    render(){
        return(
            <div className="register-body">
                <img className="wave" src={require("../../assets/wave.png")} alt="wave"/>    
                <div className="container">
                    <div className="img">
                        <img src={require("../../assets/login.svg")} alt="background"/>
                    </div>
                    <div className="login-content">
                        <form onSubmit={this.onSubmit}>
                            <img src={require("../../assets/avatar.svg")} alt="avatar"/>
                            <h2 className="title">Welcome</h2>
                            <div className="input-div one">
                                <div className="i">
                                        <i className="fas fa-user"></i>
                                </div>
                                <div className="div">
                                        <h5>Name</h5>
                                        <input type="text" className="input" required value={this.state.name} onChange={this.onChangeUserName}/>
                                </div>
                            </div>
                            <div className="input-div">
                                <div className="i">
                                        <i className="fas fa-user"></i>
                                </div>
                                <div className="div">
                                        <h5>Email</h5>
                                        <input type="email" className="input" required value={this.state.email} onChange={this.onChangeEmail}/>
                                </div>
                            </div>
                            <div className="input-div">
                                <div className="i"> 
                                        <i className="fas fa-lock"></i>
                                </div>
                                <div className="div">
                                        <h5>Password</h5>
                                        <input type="password" className="input" required value={this.state.password} onChange={this.onChangePassword}/>
                                </div>
                            </div>
                            <div className="input-div pass">
                                <div className="i"> 
                                        <i className="fas fa-lock"></i>
                                </div>
                                <div className="div">
                                        <h5>Confirm Password</h5>
                                        <input type="password" className="input" required value={this.state.cnf_password} onChange={this.onChangeCnfPassword}/>
                                </div>
                            </div>
                            <Link to={"/"} className="signin-link">Click to Sign In</Link>
                            <input type="submit" className="btn" value="Register" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}