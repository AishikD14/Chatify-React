import React from 'react';
import { Router, Route } from "react-router-dom";
import history from './history';
import "bootstrap/dist/css/bootstrap.min.css";

import Login from './components/login/login.component';
// import Register from './components/register.component';
import { loginReducer } from './reducer/login-reducer';
import { Provider } from 'react-redux'; 
import { createStore, combineReducers } from 'redux';

const reducers = combineReducers({
  login: loginReducer
});

const store = createStore(reducers);

function App() {
  return (
    <Provider store = {store}>
      <Router history={history}>
        <div className="container">
          <Route path="/" exact component={Login} />
          {/* <Route path="/register" exact component={Register} /> */}

          {/* <Route path="/exercise" component={ExercisesList} />
          <Route path="/edit/:id" component={EditExercise} /> */}
        </div>
      </Router>
    </Provider>
  )
}

export default App;
