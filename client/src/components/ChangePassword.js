import React, { useState, useEffect } from 'react'
import NavBar from './navBar'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { ChangeCurrentPassword } from '../actions/auth';
import { ToastContainer, toast } from 'react-toastify';


import './ChangePassword.css'

const ChangePassword = () => {
    const [ oldpassword, setOldpassword ] = useState("");
    const [ newpassword, setNewpassword ] = useState("");
    const [ conformnewpassword, setConformnewpassword ] = useState("");


    const dispatch = useDispatch();
    var {user} = useSelector(state => state.user)


    const submitHandler = (e) => {
        e.preventDefault();
        var valid = false;
        if(!oldpassword || !newpassword || !conformnewpassword){
            valid = false;
            toast.error('Please fill out all the fields!!', {
                position: "top-center", 
                autoClose: 1000, 
                hideProgressBar: false, 
                closeOnClick: true, 
                pauseOnHover: true, 
                draggable: true, 
                progress: undefined, 
            }); 
        } else if(newpassword !== conformnewpassword) {
            valid = false;
            toast.error('Password mismatch!!', {
                position: "top-center", 
                autoClose: 1000, 
                hideProgressBar: false, 
                closeOnClick: true, 
                pauseOnHover: true, 
                draggable: true, 
                progress: undefined, 
            }); 
        }
        else {
            valid = true;
        }

        if(valid === true)
        {
            dispatch(ChangeCurrentPassword({
                oldpassword : oldpassword, 
                newpassword : newpassword,  
            }));
        }
    };

    
    if(user === null){
        return window.location.replace('/Login')
    }
  return (
    <div>
        <NavBar />
        <ToastContainer toastStyle={{ fontFamily: "cursive" }} />
        <div style={{paddingTop:'50px', paddingLeft:'50px'}}>
            <div className="card1">
                <div className="container2">
                    <h5><b>Change Password</b></h5> 
                    <p style={{paddingTop:'10px', paddingBottom:'10px'}}>Enter the credentials to Change your password</p>
                    <div style={{paddingTop:'10px', paddingBottom:'20px'}}>
                        <input type="password"
                            id="oldpassword" 
                            placeholder="Current Password..." 
                            value={oldpassword} 
                            onChange={(e)=>setOldpassword(e.target.value)} 
                            className="form-control" 
                            autoComplete='off' />
                            <br/>
                        <input type="password"
                            id="newpassword" 
                            placeholder="New Password..." 
                            value={newpassword} 
                            onChange={(e)=>setNewpassword(e.target.value)} 
                            className="form-control" 
                            autoComplete='off' />
                            <br/>
                        <input type="password"
                            id="conformnewpassword" 
                            placeholder="Conform Password..." 
                            value={conformnewpassword} 
                            onChange={(e)=>setConformnewpassword(e.target.value)} 
                            className="form-control" 
                            autoComplete='off' />
                            <br/>
                        <div style={{paddingTop:'20px'}}>
                            <Button style={{width:'100%', height:'50px', backgroundColor:'teal', color: 'white', fontFamily:'cursive'}} onClick={(e)=>submitHandler(e)}>Change Password</Button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
    </div>
  )
}

export default ChangePassword