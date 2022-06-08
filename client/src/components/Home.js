import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { FaComment } from 'react-icons/fa'
import './Home.css'
import { ToastContainer } from 'react-toastify';
import { likePost } from '../actions/auth'
import { unlikePost } from '../actions/auth'
import { Button } from '@material-ui/core';

import NavBar from './navBar';

const Home = () => {
      const [ allPost, setAllPost ] = useState([])
      const {user} = useSelector(state => state.user)


      let id = JSON.parse(localStorage.getItem("_id"))

      useEffect(async () => {
        const token = 'Bearer ' + localStorage.getItem("token");
        await axios
          .get('http://localhost:8800/api/posts/getEveryonesPost', {
              headers : {
                  'Authorization' : token
              }
          }).then((res) =>{
            setAllPost(res.data)
          })
      }, []);
      console.log(allPost)

      const dispatch = useDispatch();

      const like = (e) => {
        e.preventDefault();
        const id = e.currentTarget.id
        dispatch(likePost(id));
        setTimeout(function(){
          window.location.replace('/Home')
        }, 2000)
      }

      const unlike = (e) => {
        e.preventDefault();
        const id = e.currentTarget.id
        dispatch(unlikePost(id));
        setTimeout(function(){
          window.location.replace('/Home')
        }, 2000)
      }


      if(user === null){
        return window.location.replace('/Login')
      }

  
  return (
    <>
      <div>
        <NavBar />
      </div>
      <ToastContainer toastStyle={{ fontFamily: "cursive" }} />
      <div>
        {allPost.map((index) => {
          return (
            <div style={{paddingTop:'25px', paddingBottom:'10px'}} key={index._id} >
              <div className='homecontainer'>
                <div style={{cursor:'pointer'}} onClick={event => window.location.href=`/GetSinglePost/${index.post._id}`}>
                  <div className='homeHeader'>
                    <div className='homeHeaderImg'>
                        <img src={index.profileImg} />
                    </div>
                    <div className='homeHeaderUser'>
                        {index.username}
                    </div>
                  </div>
                  <div className='homeBody'>
                      <img src={index.post.img} />
                  </div>
                </div>
                <div className='homefooter'>
                   {index.post.desc &&
                      <p style={{paddingLeft: '20px', paddingBottom:'10px'}}>{index.post.desc} <br /></p>
                   }
                    {
                      (index.post.likes.includes(id)) 
                      ? <Button id={index.post._id} onClick={unlike} ><AiFillLike style={{color:'teal', fontSize:'30px', cursor:'pointer'}} />&ensp;&ensp;<span style={{fontSize:'20px'}}>{index.post.likes.length}</span></Button>
                      : <Button id={index.post._id} onClick={like} ><AiOutlineLike style={{color: 'teal', fontSize:'30px', cursor:'pointer'}} />&ensp;&ensp;<span style={{fontSize:'20px'}}>{index.post.likes.length}</span></Button>
                    }
                    &ensp;
                      <FaComment id={index.post._id} style={{color:'teal', fontSize:'30px', float:'right', cursor:'pointer'}} 
                          onClick={event => window.location.href=`/GetSinglePost/${index.post._id}`}
                      />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Home
