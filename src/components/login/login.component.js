import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import history from '../../history';
import { connect } from 'react-redux';
import { sha256 } from 'js-sha256';
import { stateToProps, DispatchToProps } from '../../reducerfunctions';
import custom from '../environment';
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
            remember: false,
            modalShow: false,
            token: localStorage.getItem('sessionToken')
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
        if (this.state.token!== '' || this.state.token !== null || this.state.token !== undefined) {
            this.checkToken();
        }
    }

    checkToken() {
        let payload = {
          "token": this.state.token
        };
        this.setState({
            modalShow: true
        });
        axios.post(custom.URL + '/user/get_session', payload, custom.options)
        .then((res) => {
            this.setState({
                modalShow: false
            });
            if (res.status === 200) {
                this.props.setSession(res.data);
                this.props.setUser(this.state.token);
                this.setState({
                    modalShow: false
                })
                history.push('/profile');
            }
        })
        .catch(function(error){
            alert("Something went wrong");
            console.log(error);
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
        const remember = this.state.remember;
        const user = {
            email: this.state.email,
            password: sha256(this.state.password)
        }
        console.log(user, this.state.remember);
        this.setState({
            modalShow: true
        })
        axios.post(custom.URL + "/user/login",user, custom.options)
            .then(res => {
                // console.log(res.data.token);
                if(res.status === 200){
                    if(user.email === "admin@admin"){
                        history.push('/admin');
                    }
                    else{
                        this.props.setUser(res.data.token);
                        // console.log(this.state.remember);
                        if(remember){
                            localStorage.setItem('sessionToken',res.data.token);
                        }
                        this.setState({
                            token: res.data.token
                        })
                        this.checkToken();
                    }
                }
                else{
                    this.setState({
                        modalShow: false
                    })
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
            <div>
                {this.state.modalShow && <div className="spinner-body">
                    <div className="spinner-border text-success" role="status"></div>
                </div>}
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
                                        <i className="fas fa-envelope"></i>
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
                                <div className="col-xs-12 col-sm-6">
                                    <Link to={"/forgot_pass"} className="forgot-link">Forgot Password?</Link>
                                </div>
                            </div>
                            <input type="submit" className="btn" value="Login" />
                        </form>
                    </div>
                </div>
            </div>
            </div>     
        );
    }
}

export default connect(stateToProps, DispatchToProps)(Login);