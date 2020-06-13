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
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCnfPassword = this.onChangeCnfPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            password: "",
            cnf_password: ""
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
            username: e.target.value
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
            username: this.state.username,
            password: this.state.password,
            cnf_password: this.state.cnf_password
        }
        // console.log(user);

        if(user.cnf_password !== user.password){
            alert("Password and Confirm password fields should be same");
            return;
        }

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
            username: "",
            password: "",
            cnf_password: ""
        })
    }

    render(){
        return(
            // <div className="text-center">
            //     <h1 style={{marginTop:15+'px'}}>Welcome to your Personal Exercise Tracker</h1>
            //     <br />
            //     <br />
            //     <h4>Enter your details below to register</h4>
            //     <form onSubmit={this.onSubmit}>
            //         <div className="form-group">
            //             <label>Username</label>
            //             <input type="text" required className="form-control" value={this.state.username} onChange={this.onChangeUserName} />
            //         </div>
            //         <div className="form-group">
            //             <label>Password</label>
            //             <input type="password" required className="form-control" value={this.state.password} onChange={this.onChangePassword} />
            //         </div>
            //         <div className="form-group">
            //             <label>Confirm Password</label>
            //             <input type="password" required className="form-control" value={this.state.cnf_password} onChange={this.onChangeCnfPassword} />
            //         </div>
            //         <div className="form-group">
            //             <input type="submit" value="Register" className="btn btn-primary" />
            //         </div>
            //     </form>
            // </div>
        
            <div className="login-body">
                <img className="wave" src={require("../../assets/wave.png")} alt="wave"/>    
                <div className="container">
                    <div className="img">
                        <img src={require("../../assets/bg.svg")} alt="background"/>
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
                            <Link to={"/register"}>Forgot Password?</Link>
                            <input type="submit" className="btn" value="Register" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}