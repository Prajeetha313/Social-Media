import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './navBar';
import './Post.css';
import { postImage  } from '../actions/auth';
import { TextField, Button } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import FileBase from 'react-file-base64';


const Post = () => {

    const [postData, setPostData] = useState({
        img : '', 
        desc : ''
    });
    // const [caption, setCaption] = useState("")


    const dispatch = useDispatch();


    const {user} = useSelector(state => state.user)
    console.log(postData)
    if(user === null){
        return window.location.replace('/Login')
    }

    const removeSelectedImage = () => {
        setPostData({img:'', desc:''});
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(postData)
        dispatch(postImage(postData));
        removeSelectedImage();
    }
  return (
    <div>
        <NavBar />
        <ToastContainer toastStyle={{ fontFamily: "cursive" }} />

        <div id = "imagecontainer"> 
            <div className='col1'>
                <form onSubmit={submitHandler}>
                    <br/>


                    {(postData.img!=='') && (
                        <div style={{alignItems:'center'}}>
                            <img 
                                src={postData.img}
                            />
                            <input type="text" 
                                label='Add caption'
                                id='addCaption'
                                autoComplete='off'
                                style={{width:'450px', margin:'10px'} }
                                onChange={(e)=>setPostData({...postData, desc:e.target.value})}
                            /><br />
                            <button type="submit">Upload</button>
                            <button onClick={removeSelectedImage} >Remove</button>
                        </div>
                    )} 
                    {(postData.img==='') && (
                        <div className='imgButton'>
                            <img 
                                src="http://127.0.0.1:8887/uploads/imageUpload.png" 
                            />
                            <FileBase type="file" multiple={false} onDone={({base64}) =>setPostData({...postData, img : base64})} />
                                
                        </div>
                    )}






                        
                </form>
            </div>
        </div>
    </div>
  )
}

export default Post