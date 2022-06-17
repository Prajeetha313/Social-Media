
import React, { useEffect, useRef, useState } from 'react'
import NavBar from './navBar'
import { connect } from "react-redux";
import './Profile.css'
import { profile } from '../actions/auth';
import { addBio } from '../actions/auth'
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import PostedImage from './PostedImage';
import { FaUserFriends } from 'react-icons/fa'
import { IoImage } from 'react-icons/io5'
import FileBase from 'react-file-base64';




const Profile = (props) => {
    const[username, setUsername] = useState("");
    const[mobile, setMobile] = useState("");
    const[desc, setDesc] = useState("");
    const[profileImg, setProfileimg] = useState('');


    const dispatch = useDispatch();


    const {user} = useSelector(state => state.user)

    console.warn(user.username);
    let emailId = JSON.parse(localStorage.getItem("email"))
    let friendLen = JSON.parse(localStorage.getItem("user")).friend.length;

    const posts = useSelector(state => state.post.post)
    let postLen = posts.length;


    useEffect(() => {
        dispatch(profile());
        setUsername(JSON.parse(localStorage.getItem("username")));
        setMobile(localStorage.getItem("mobile"));
        setDesc(JSON.parse(localStorage.getItem("desc")));
        setProfileimg(JSON.parse(localStorage.getItem("profileImg")))
    }, []);

    
    if(user === null){
        return window.location.replace('/Login')
    }

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(addBio({username : username, mobile : mobile, desc : desc, profileImg: profileImg}));
    };

    return (
      <div>
        <NavBar />
            <div id = "container"> 
                <div className='col1'>
                    <label><img src={profileImg} />
                        <FileBase type="file" multiple={false} onDone={({base64}) =>setProfileimg(base64)} />
                    </label>
                    
                    
                    <Button className="btn btn-sm btn-primary" type="submit" onClick={(e)=>submitHandler(e)} >Edit Profile</Button>   
                    
                </div>
                <div className='col2'>
                    <div className='col2Container'>
                        Username<input type="text" 
                            label = "username"
                            onChange={(e) => setUsername(e.target.value)} 
                            value={username}
                            autoComplete='off' 
                        /><br /><br /> 
                        Email<input type="text" 
                            label="email" 
                            value={emailId} 
                            disabled='true' 
                        /><br /><br />
                        Mobile<input type="text" 
                            label="mobile" 
                            value={mobile} 
                            onChange={(e) => setMobile(e.target.value)}      
                            autoComplete='off'
                        /><br /> <br /> 
                        Bio<input type="text" 
                            label="desc" 
                            value={desc} 
                            onChange={(e) => setDesc(e.target.value)}   
                            autoComplete='off'
                        /><br />
                    </div>
                </div>
            </div>
            <div style={{paddingRight:'100px', paddingTop:'40px', float:'right', textAlign:'center'}}>
                <div className="col s12 m7">
                    <div className="card horizontal">
                    <div className="card-stacked" style={{width:'100px'}}>
                        <div className="card-content">
                        <p>{friendLen}</p>
                        </div>
                        <div className="card-action">
                        <a href="#" style={{color:'teal', fontSize:'30px'}}><FaUserFriends /></a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div style={{paddingRight:'100px', paddingTop:'40px', float:'right', textAlign:'center'}}>
                <div className="col s12 m7">
                    <div className="card horizontal">
                    <div className="card-stacked" style={{width:'100px'}}>
                        <div className="card-content">
                        <p>{postLen}</p>
                        </div>
                        <div className="card-action">
                        <a href="#" style={{color:'teal', fontSize:'30px'}}><IoImage /></a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className='postedImage' style={{paddingTop:'60px'}}>
                <PostedImage />
            </div>
            
      </div>
    );
};

const mapStateToProps = state => ({
    user : state.user
});

export default connect(mapStateToProps)(Profile);