import React, {Component} from 'react';
// import axios from 'axios';
// import history from '../../history';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { stateToProps, DispatchToProps } from '../../reducerfunctions';
// import custom from '../environment';
import './home.scss';

class Home extends Component{
    constructor(props){
        super(props);

        this.state = {
            userToken: this.props.userToken,
        }
    }

    render(){
        return(
            <div className="home-body">
                <h1>Hi {this.props.userName}</h1>  
                <Link to={"/profile"}>Profile</Link>
            </div>
        );
    }
}

export default connect(stateToProps, DispatchToProps)(Home);