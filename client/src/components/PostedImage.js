import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery';
import './PostedImage.css'
import { connect } from "react-redux";
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPost } from '../actions/auth';
import CloseIcon from '@material-ui/icons/Close';
  
const PostedImage = () => {


    useEffect(() => {
        dispatch(getAllPost());
    }, []);

    const posts = useSelector(state => state.post.post)
    const image = posts;

    let dispatch = useDispatch();
    console.warn("post", posts)
    console.warn("image", image)

  return (
    <>
        <div className='gallery'>
            {Object.keys(posts).map((item, index)=>{
                return (
                    <div className='pics' key={index} onClick={event => window.location.href=`/GetSinglePost/${posts[index]._id}`} >
                        <img src = {posts[index].img} style={{width:"100%"}} />
                    </div>
                )
            })}
        </div>
    </>
    
  )
}

export default PostedImage;