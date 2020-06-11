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
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.onSubmitRegister = this.onSubmitRegister.bind(this);
        this.clearVal = this.clearVal.bind(this);

        this.state = {
            email: "",
            password: "",
            name: ""
        }
    }
    componentDidMount(){
        document.querySelector('.img__btn').addEventListener('click', function () {
            document.querySelector('.cont').classList.toggle('s--signup');
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
    onChangeUserName(e){
        this.setState({
            name: e.target.value
        })
    }
    clearVal(e){
        this.setState({
            email: "",
            password: "",
            name: ""
        })
    }
    onSubmitLogin(e){
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: sha256(this.state.password)
        }
        console.log(user);

        axios.post("http://localhost:5000/users/login",user)
            .then(res => {
                console.log(res.data[0].username);
                if(res.data.length === 1){
                    if(user.username === "admin"){
                        history.push('/exercise');
                    }
                    else{
                        this.props.setUser(user.username);
                        history.push('/exer_list_user');
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
            password: ""
        })
    }
    onSubmitRegister(e){
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: sha256(this.state.password),
            name: this.state.name
        }
        console.log(user);

        axios.post("http://localhost:5000/users/login",user)
            .then(res => {
                console.log(res.data[0].username);
                if(res.data.length === 1){
                    if(user.username === "admin"){
                        history.push('/exercise');
                    }
                    else{
                        this.props.setUser(user.username);
                        history.push('/exer_list_user');
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
            name: ""
        })
    }

    render(){
        return(
            <div className="login-body" translate="no">
                <div className="cont s--signup">
                    <form className="form sign-in" onSubmit={this.onSubmitLogin}>
                        <h2>Welcome back,</h2>
                        <label>
                            <span>Email</span>
                            <input type="email" required value={this.state.email} onChange={this.onChangeEmail}/>
                        </label>
                        <label>
                            <span>Password</span>
                            <input type="password" required value={this.state.password} onChange={this.onChangePassword}/>
                        </label>
                        <p className="forgot-pass">Forgot password?</p>
                        <button type="submit" className="submit">Sign In</button>
                        <button type="button" className="fb-btn">Connect with <span>facebook</span></button>
                    </form>
                    <div className="sub-cont">
                        <div className="img">
                            <div className="img__text m--up">
                                <h2>New here?</h2>
                                <p>Sign up and discover great amount of new opportunities!</p>
                            </div>
                            <div className="img__text m--in">
                                <h2>One of us?</h2>
                                <p>If you already has an account, just sign in. We've missed you!</p>
                            </div>
                            <div className="img__btn" onClick={this.clearVal}>
                                <span className="m--up">Sign Up</span>
                                <span className="m--in">Sign In</span>
                            </div>
                        </div>
                        <form className="form sign-up" onSubmit={this.onSubmitRegister}>
                            <h2>Time to feel like home,</h2>
                            <label>
                                <span>Name</span>
                                <input type="text" required value={this.state.name} onChange={this.onChangeUserName}/>
                            </label>
                            <label>
                                <span>Email</span>
                                <input type="email" required value={this.state.email} onChange={this.onChangeEmail}/>
                            </label>
                            <label>
                                <span>Password</span>
                                <input type="password" required value={this.state.password} onChange={this.onChangePassword}/>
                            </label>
                            <button type="submit" className="submit">Sign Up</button>
                            <button type="button" className="fb-btn">Join with <span>facebook</span></button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(stateToProps, DispatchToProps)(Login);