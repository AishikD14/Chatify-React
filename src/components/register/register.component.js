import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import history from '../../history';
import { sha256 } from 'js-sha256';
import custom from '../environment';
import './register.scss';

export default class Register extends Component{
    constructor(props){
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCnfPassword = this.onChangeCnfPassword.bind(this);
        this.onChangeOtp = this.onChangeOtp.bind(this);
        this.onChangeMobile = this.onChangeMobile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitOtp = this.onSubmitOtp.bind(this);
        this.resendOTP = this.resendOTP.bind(this);

        this.state = {
            name: "",
            password: "",
            cnf_password: "",
            email: "",
            otp: "",
            otpButton: "Get OTP",
            otpSet: false,
            otpRecieved: '',
            showRegister: false,
            modalShow: false,
            mobile: ""
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
    componentDidUpdate(){
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
    onChangeOtp(e){
        this.setState({
            otp: e.target.value
        })
    }
    onChangeMobile(e){
        this.setState({
            mobile: e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        const user = {
            username: this.state.name,
            email: this.state.email,
            password: this.state.password,
            pic: "",
            mobile: this.state.mobile,
            status: "Hey There! I am using Chatify"
        }
        console.log(user);

        if(this.state.cnf_password !== user.password){
            alert("Password and Confirm password fields should be same");
            return;
        }
        else if(user.mobile.length !== 10){
            alert("Mobile number should be of 10 digits");
            return;
        }
        else{
            user.password = sha256(this.state.password);
            this.setState({
                modalShow: true
            })
            axios.post(custom.URL + "/user/register",user, custom.options)
                .then(res => {
                    if(res.status ===201){
                        this.setState({
                            modalShow: false
                        })
                        history.push('/');
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
    }
    resendOTP(e){
        this.setState({
            otpSet: false,
            modalShow: true
        })
        const user = {
            email: this.state.email
        }
        console.log(user);

        axios.post(custom.URL + "/user/request_otp", user, custom.options)
            .then(res => {
                if(res.status ===200){
                    this.setState({
                        otpSet: true,
                        otpRecieved: res.data.otp,
                        otpButton: "Submit OTP",
                        modalShow: false
                    })
                }
                else{
                    this.setState({
                        email: "",
                        modalShow: false
                    });
                    alert("Username already exists");
                }
            })
            .catch(function(error){
                alert("Something went wrong");
                console.log(error);
            });
    }
    onSubmitOtp(e){
        e.preventDefault();
        if(!this.state.otpSet){
            const user = {
                email: this.state.email
            }
            console.log(user);
            this.setState({
                modalShow: true
            })
            axios.post(custom.URL + "/user/request_otp", user, custom.options)
                .then(res => {
                    if(res.status ===200){
                        this.setState({
                            otpSet: true,
                            otpRecieved: res.data.otp,
                            otpButton: "Submit OTP",
                            modalShow: false
                        })
                        alert("Please check your email for OTP");
                    }
                    else{
                        this.setState({
                            email: "",
                            modalShow: false
                        });
                        alert("Email already exists");
                    }
                })
                .catch(function(error){
                    alert("Something went wrong");
                    console.log(error);
                });
        }
        else{
            if(sha256(this.state.otp) === this.state.otpRecieved){
                this.setState({
                    showRegister: true
                })
            }
            else{
                this.setState({
                    otp: ""
                })
                alert("Invalid OTP");
            }
        }
    }

    render(){
        return(
            <div>
                {this.state.modalShow && <div className="spinner-body">
                    <div className="spinner-border text-success" role="status"></div>
                </div>}
                <div className="register-body">
                <img className="wave" src={require("../../assets/wave.png")} alt="wave"/>    
                <div className="container">
                    <div className="img">
                        <img src={require("../../assets/login.svg")} alt="background"/>
                    </div>
                    <div className="login-content">
                        {!this.state.showRegister && <form onSubmit={this.onSubmitOtp}>
                            <img src={require("../../assets/avatar.svg")} alt="avatar"/>
                            <h2 className="title">Get Started</h2>
                            <div className="input-div">
                                <div className="i">
                                        <i className="fas fa-envelope"></i>
                                </div>
                                <div className="div">
                                        <h5>Email</h5>
                                        <input type="email" className="input" required value={this.state.email} onChange={this.onChangeEmail}/>
                                </div>
                            </div>
                            {this.state.otpSet && <div className="input-div">
                                <div className="i">
                                        <i className="fas fa-key"></i>
                                </div>
                                <div className="div">
                                        <h5>OTP</h5>
                                        <input type="number" className="input" required value={this.state.otp} onChange={this.onChangeOtp}/>
                                </div>
                            </div>}
                            {this.state.otpSet && <p className="resend-link" onClick={this.resendOTP}>Resend OTP</p>}
                            <input type="submit" className="btn" value={this.state.otpButton} />
                        </form>}
                        {this.state.showRegister && <form onSubmit={this.onSubmit}>
                            <img src={require("../../assets/avatar.svg")} alt="avatar"/>
                            <h2 className="title">Almost There</h2>
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
                                        <i className="fas fa-mobile"></i>
                                </div>
                                <div className="div">
                                        <h5>Mobile</h5>
                                        <input type="number" className="input" required value={this.state.mobile} onChange={this.onChangeMobile}/>
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
                        </form>}
                    </div>
                </div>
            </div>
            </div>
        );
    }
}