import React, {Component} from 'react';
// import axios from 'axios';
// import history from '../../history';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { stateToProps, DispatchToProps } from '../../reducerfunctions';
// import custom from '../environment';
import './home.scss';

class Home extends Component{
    constructor(props){
        super(props);

        this.state = {
            userToken: this.props.userToken
        }
    }

    render(){
        return(
            <div>
            <h1>Hi</h1>   
            
            </div>
        );
    }
}

export default connect(stateToProps, DispatchToProps)(Home);