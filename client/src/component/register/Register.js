import React, { Component } from 'react'
import classnames from 'classnames';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'


import {register} from '../../actions/authActions'

class Register extends Component {

    state={
      name: '',
      email: '',
      password: '',
      password2: '',
      error: {}
    }

    onChange=(value)=>{
        //console.log(value.target.name)
        this.setState({[value.target.name]:value.target.value})
    }

    onSubmit=(value)=>{
        value.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        //console.log(newUser)

        this.props.register(newUser,this.props.history)
    }

    componentDidMount(){
        if(this.props.isAuth){
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.error){
            this.setState({error:nextProps.error})
        }
    }


  render() {
      const {error} = this.state
    return (
        <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames('form-control form-control-lg', {'is-invalid': error.name})}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {error.name && (<div className="invalid-feedback">{error.name}</div>)}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames('form-control form-control-lg', {'is-invalid': error.email})}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {error.email && (<div className="invalid-feedback">{error.email}</div>)}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {'is-invalid': error.password})}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {error.password && (<div className="invalid-feedback">{error.password}</div>)}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {'is-invalid': error.password2})}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {error.password2 && (<div className="invalid-feedback">{error.password2}</div>)}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const actions = {register}

const mapState = (state) =>{
    return ({
        auth: state.auth,
        error: state.error
    })
}

export default connect(mapState,actions)(withRouter(Register));