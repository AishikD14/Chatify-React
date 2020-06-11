import React, {Component} from 'react';
import axios from 'axios';
import history from '../history';

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
            <div className="text-center">
                <h1 style={{marginTop:15+'px'}}>Welcome to your Personal Exercise Tracker</h1>
                <br />
                <br />
                <h4>Enter your details below to register</h4>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" required className="form-control" value={this.state.username} onChange={this.onChangeUserName} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" required className="form-control" value={this.state.password} onChange={this.onChangePassword} />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" required className="form-control" value={this.state.cnf_password} onChange={this.onChangeCnfPassword} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}