import React from 'react';
import './navBar.css'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from '../actions/auth';
import { Button } from '@material-ui/core';

const NavBar = () => {
  const dispatch = useDispatch();
  var {user} = useSelector(state => state.user)
  const logOut = () => {
    dispatch(logout());
  }


    return(
        <>
            <div className="navbar">
 
              <div className="nav-header">
                <div className="nav-logo">
                  <div className="logo">SOCIAL MEDIA</div>
                </div>
              </div>

              <input type="checkbox" id="nav-check" />
              <div className="nav-btn">
                <label for="nav-check">
                  <span></span>
                  <span></span>
                  <span></span>
                </label>
              </div>

              <div className="nav-links">
                <a href="/Home">Home</a>
                <a href="/FriendSuggestion">Friend Suggestion</a>
                <a href="/Post">Post</a>

                <div className="dropdown">
                  <a className="dropBtn" href="#">Profile
                    <i className="fas fa-angle-down"></i>
                  </a>
                  <div className="drop-content">
                    <a href="/Profile">My Profile</a>
                    <div className="dropdown2">
                      <a className="dropBtn2" href="#">Settings
                        <i className="fas fa-angle-right"></i>
                      </a>
                      <div className="drop-content2">
                        <a href="/DeleteAccount">Delete Account</a>
                        <a href="/ChangePassword">Change Password</a>
                        
                      </div>
                    </div>
                    <div>
                      <a onClick={logOut}>Logout
                        </a>
                    </div>
                  </div>
                </div>
              </div>
              </div>
        </>
    );
}

export default NavBar;