import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth'
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) =>{
        e.preventDefault();

        dispatch(login({
            email : email, 
            password : password,  
        }));
    }

  return (
    <div className="register-photo">
        <div className="form-container">
            <div className="image-holder1"></div>
            <form method="post" onSubmit={(e)=>handleSubmit(e)} >
                <h2 className="text-center"><strong>User Login</strong></h2>
                <span id="errorId"></span>

                <div className="form-group">
                    <input type="email"
                    id="email" 
                    placeholder="Enter the Email-ID..." 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)} 
                    className="form-control" 
                    autoComplete='off' />
                    <br/>
                </div>
                
                <div className="form-group">
                    <input type="password" 
                    id="password" 
                    placeholder="Enter the Password..." 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)} 
                    className="form-control" 
                    autoComplete = 'off' />
                    <br/>
                </div>
                
                <div className="form-group">
                    <input type="submit" className="btn btn-info" value="Sign In" id="submitButton" />
                </div><br/>
                <a className="already" href="/Register">New user don't have an account?<strong> Register here</strong>.</a>
            </form>
        </div>
    </div>
  )
}

export default Login