import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
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
import PrivateRoute from '../src/component/common/PrivateRoute'
import DashBoard from '../src/component/dashboard/dashBoard'
import CreateProfile from '../src/component/createProfile/createProfile'
import EditProfile from '../src/component/editProfile/editProfile';
import AddEducation from '../src/component/editProfile/addEducation'
import AddExperience from '../src/component/editProfile/addExperience'
import Profile from '../src/component/profile/Profile'
import Profiles from '../src/component/profiles/Profiles'
// check for local storage token

if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  // set current user
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    store.dispatch(logoutUser)
    //redirect
    window.location.href = '/login';
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
      <div className="App">
      <Navbar/>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:handle" component={Profile} />
        <Switch>
              <PrivateRoute exact path="/dashboard" component={DashBoard} />
        </Switch>
        <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
        </Switch>
        <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
        </Switch>
        <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
        </Switch>
        <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
        </Switch>

      <Footer/>
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
