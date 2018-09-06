import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';

import Navbar from '../src/component/layout/navbar';
import Footer from '../src/component/layout/footer';
import Landing from '../src/component/layout/landing';
import Register from '../src/component/register/Register';
import Login from '../src/component/register/Login'
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import store from './store';


class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
      <Navbar/>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
      <Footer/>
      </div>
      </Router>
    );
  }
}

export default App;
