import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getCurrentProfile, deletaAccount} from '../../actions/profileAction';
import {Link} from 'react-router-dom'


import Spinner from '../common/Spinner'
import ProfileActions from './profileActions';
import Experience from './Experience';
import Education from './Eduaction';


class dashBoard extends Component {
    componentDidMount(){
        this.props.getCurrentProfile()
        console.log(this.props)
    }

    onDelete = (e) =>{
        this.props.deleteAccount();
    }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if(profile==null || loading){
        dashboardContent = <Spinner/>
    }else{
        if(Object.keys(profile).length > 0){
            dashboardContent = (
              <div>
                <p className="lead text-muted">
                  Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                </p>
                <ProfileActions />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
                <div style={{ marginBottom: '60px' }} />
                <button
                  onClick={this.onDelete}
                  className="btn btn-danger"
                >
                  Delete My Account
                </button>
              </div>
            );
        }else{
            dashboardContent = (
                <div>
                  <p className="lead text-muted">Welcome {user.name}</p>
                  <p>You have not yet setup a profile, please add some info</p>
                  <Link to="/create-profile" className="btn btn-lg btn-info">
                    Create Profile
                  </Link>
                </div>
            )
        }
    }

    return (
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4">Dashboard</h1>
                {dashboardContent}
              </div>
            </div>
          </div>
        </div>
      );

  }
}

const mapState = state => ({
    profile: state.profile,
    auth: state.auth
  });

const actions = {
    getCurrentProfile,
    deletaAccount
}
export default connect(mapState,actions)(dashBoard)
