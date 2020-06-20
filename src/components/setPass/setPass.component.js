import React, {Component} from 'react';
import axios from 'axios';
import history from '../../history';
import { Link } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import custom from '../environment';
import './setPass.scss';

class SetPass extends Component{
    constructor(props){
        super(props);

        this.onChangeCnfPassword = this.onChangeCnfPassword.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmitReset = this.onSubmitReset.bind(this);

        this.state = {
            cnf_password: "",
            password: "",
            token: this.props.match.params.token,
            showPass: false,
            modalShow: true
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
        axios.get(custom.URL + "/user/check_reset_token/"+this.state.token, custom.options)
            .then(response => {
                if(response.status === 200 || response.status === 304 ){
                    this.setState({
                        showPass: true,
                        modalShow: false
                    })
                }
            })
            .catch(function(error){
                alert("Something went wrong");
                console.log(error);
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
    onChangeCnfPassword(e){
        this.setState({
            cnf_password: e.target.value
        })
    } 
    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }
    onSubmitReset(e){
        e.preventDefault();

        if(this.state.password !== this.state.cnf_password)
        {
            alert("Password and Confirm Password should match");
            return
        }
        else{
            const user = {
                newPassword: this.state.password,
                token: this.state.token
            }
            console.log(user);
    
            user.newPassword = sha256(user.newPassword);
            this.setState({
                modalShow: true
            })
    
            axios.post(custom.URL + "/user/reset_password",user, custom.options)
                .then(res => {
                    console.log(res.data);
                    if(res.status === 200){
                        this.setState({
                            modalShow: false
                        })
                        alert("Password successfully reset");
                        history.push('/');
                    }
                })
                .catch(function(error){
                    alert("Something went wrong");
                    console.log(error);
                });
            this.setState({
                password: "",
                cnf_password: ""
            })
        }
    }

    render(){
        return(
            <div>
                {this.state.modalShow && <div className="spinner-body">
                    <div className="spinner-border text-success" role="status"></div>
                </div>}
                <div className="set-pass-body">
                <img className="wave" src={require("../../assets/wave.png")} alt="wave"/>    
                <div className="container">
                    <div className="img">
                        <img src={require("../../assets/login.svg")} alt="background"/>
                    </div>
                    <div className="login-content">
                        {this.state.showPass && <form onSubmit={this.onSubmitReset}>
                            <img src={require("../../assets/avatar.svg")} alt="avatar"/>
                            <h2 className="title">Reset PASS</h2>
                            <div className="input-div one">
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
                            <input type="submit" className="btn" value="Reset Password" />
                        </form>}
                        {!this.state.showPass && <form>
                            <img src={require("../../assets/avatar.svg")} alt="avatar"/>
                            <h2 className="title">Oops! The link has expired</h2>
                            <Link to={"/"}>
                                <input type="submit" className="btn" value="Click to Sign In" />
                            </Link>
                        </form>}
                    </div>
                </div>
            </div>
            </div>     
        );
    }
}

export default SetPass;