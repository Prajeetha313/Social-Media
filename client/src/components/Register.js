import React, { useState } from 'react';
import './Register.css'
import axios from 'axios'
import { register } from '../actions/auth'
import { useDispatch } from 'react-redux';


const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [mobile, setMobile] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) =>{
        e.preventDefault();
        var valid = false;
        if(!username || !email || !password || !cpassword || !mobile){
            valid = false;
            document.getElementById("registerError").innerHTML = "Please fill out all the fields"
        } else if(password !== cpassword) {
            valid = false;
            document.getElementById("registerError").innerHTML = "Password mismatch!!"
        }
        else {
            valid = true;
        }

        if(valid === true)
        {
            dispatch(register({
                username : username, 
                email : email, 
                password : password,  
                cpassword : cpassword, 
                mobile : mobile
            }));
        }
    } 

    return (
        <>
        <div class="register-photo">
            <div class="form-container">
                <div class="image-holder1"></div>
                <form method="post" onSubmit={(e)=>handleSubmit(e)} >
                    <h2 class="text-center"><strong>User Registration</strong></h2>
                    <span id="registerError"></span>
                    <div class="form-group">
                        <input type="text" 
                            id="username" 
                            placeholder="Username..." 
                            value={username} 
                            onChange={(e)=>setUsername(e.target.value)} 
                            class="form-control" 
                            autoComplete='off' /><br/>
                    </div>
                    <div class="form-group"> 
                        <input type="email" 
                            id="email" 
                            placeholder="Email..." 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)} 
                            class="form-control" 
                            autoComplete='off' /><br/>
                    </div>
                    <div class="form-group"> 
                        <input type="password" 
                            id="password" 
                            placeholder="Password..." 
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)} 
                            class="form-control" 
                            autoComplete='off' /><br/>
                    </div>
                    <div class="form-group"> 
                        <input type="password" 
                            id="cpassword"
                            placeholder="Confirm Password..." 
                            value={cpassword} 
                            onChange={(e)=>setCpassword(e.target.value)} 
                            class="form-control" 
                            autoComplete='off' /><br/>
                    </div>
                    <div class="form-group"> 
                        <input type="tel" 
                            id="mobile" 
                            placeholder="Mobile number..." 
                            class="form-control" 
                            value={mobile} 
                            onChange={(e)=>setMobile(e.target.value)} 
                            autoComplete='off' /><br/>
                    </div>
                    
                    <div class="form-group">
                        <input type="submit" class="btn btn-info" value="Sign Up" id="submitButton" />
                    </div><br/>
                    <a class="already" href="/Login">Already hav an account?<strong> Login here</strong>.</a>
                </form>
            </div>
        </div>
    
        </>
    );
}


export default Register;