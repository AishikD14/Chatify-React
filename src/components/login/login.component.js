import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import history from '../../history';
import { connect } from 'react-redux';
import { stateToProps, DispatchToProps } from '../../reducerfunctions';

class Login extends Component{
    constructor(props){
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            password: ""
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
    onSubmit(e){
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        // console.log(user);

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
            username: "",
            password: ""
        })
    }

    render(){
        return(
            <div className="text-center">
                <h1 style={{marginTop:15+'px'}}>Welcome to your Personal Exercise Tracker</h1>
                <br />
                <br />
                <h4>Enter your details below to login</h4>
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
                        <span>
                            <input type="submit" value="Login" className="btn btn-primary" />
                            <button  value="Register" className="btn btn-primary" style={{marginLeft:5+'px'}}><Link to={"/register"} style={{color:'#fff', textDecoration: 'none'}}>Register</Link></button>
                        </span>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(stateToProps, DispatchToProps)(Login);