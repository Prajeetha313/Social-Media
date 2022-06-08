import React from 'react'
import NavBar from './navBar'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { deleteAccount } from '../actions/auth';
import './DeleteAccount.css'


const DeleteAccount = () => {

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user)
    if(user === null){
        return window.location.replace('/Login')
    }
    let profileImage = JSON.parse(localStorage.getItem("profileImg"))
    let username = JSON.parse(localStorage.getItem("username"))
    let userId = JSON.parse(localStorage.getItem("_id"))
    
    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(deleteAccount());
    };
  return (
    <div>
        <NavBar />  

        <div style={{paddingTop:'50px', paddingLeft:'50px'}}>
            <div className="card2">
                <div className="container3">
                    <h5><b>Delete Account</b></h5> 
                    <img src={profileImage} alt="Sample" style={{ height: `200px`}}/>
                    <div style={{paddingTop:'20px', paddingBottom:'20px'}}>
                        <p>{username}</p>
                        <div style={{paddingTop:'20px'}}>
                            <Button className="btn btn-sm btn-primary" onClick={(e)=>submitHandler(e)} style={{backgroundColor:'teal', color:'white', fontFamily:'cursive', width:'100%'}} type="submit" >Delete Account</Button>   
                        </div>
                    </div>
                </div>
                </div>
            </div>
    </div>
  )
}

export default DeleteAccount