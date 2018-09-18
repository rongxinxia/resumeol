import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

import {loginUser} from '../../actions/authActions'

class Login extends Component {

    state = {
      email: '',
      password: '',
      error: {}
    };

    onSubmit = (value) => {
    value.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(user);
    }

    onChange = (value) => {
    this.setState({ [value.target.name]: value.target.value });
    }

    componentDidMount(){
        if(this.props.auth.isAuth){
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuth){
            this.props.history.push('/dashboard')
        }

        if(nextProps.error){
            this.setState({error: nextProps.error})
        }
    }

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const actions ={loginUser}

const mapState = (state) =>{
    console.log(state)
    return ({
        auth: state.auth,
        error: state.error
    });
};

export default connect(mapState, actions)(withRouter(Login));
