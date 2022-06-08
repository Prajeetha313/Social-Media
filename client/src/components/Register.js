import React, { useState } from 'react';
import './Register.css'
import { register } from '../actions/auth'
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';


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
            toast.error('Please fill out all the fields!!', {
                position: "top-center", 
                autoClose: 1000, 
                hideProgressBar: false, 
                closeOnClick: true, 
                pauseOnHover: true, 
                draggable: true, 
                progress: undefined, 
            });
        } else if(password !== cpassword) {
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
        <div className="register-photo">
         <ToastContainer />
            <div className="form-container">
                <div className="image-holder1"></div>
                <form method="post" onSubmit={(e)=>handleSubmit(e)} >
                    <h2 className="text-center"><strong>User Registration</strong></h2>
                    <div className="form-group">
                        <input type="text" 
                            id="username" 
                            placeholder="Username..." 
                            value={username} 
                            onChange={(e)=>setUsername(e.target.value)} 
                            className="form-control" 
                            autoComplete='off' /><br/>
                    </div>
                    <div className="form-group"> 
                        <input type="email" 
                            id="email" 
                            placeholder="Email..." 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)} 
                            className="form-control" 
                            autoComplete='off' /><br/>
                    </div>
                    <div className="form-group"> 
                        <input type="password" 
                            id="password" 
                            placeholder="Password..." 
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)} 
                            className="form-control" 
                            autoComplete='off' /><br/>
                    </div>
                    <div className="form-group"> 
                        <input type="password" 
                            id="cpassword"
                            placeholder="Confirm Password..." 
                            value={cpassword} 
                            onChange={(e)=>setCpassword(e.target.value)} 
                            className="form-control" 
                            autoComplete='off' /><br/>
                    </div>
                    <div className="form-group"> 
                        <input type="tel" 
                            id="mobile" 
                            placeholder="Mobile number..." 
                            className="form-control" 
                            value={mobile} 
                            onChange={(e)=>setMobile(e.target.value)} 
                            autoComplete='off' /><br/>
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" className="btn btn-info" value="Sign Up" id="submitButton" />
                    </div><br/>
                    <a className="already" href="/Login">Already hav an account?<strong> Login here</strong>.</a>
                </form>
            </div>
        </div>
    
        </>
    );
}


export default Register;