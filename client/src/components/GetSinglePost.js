import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import './GetSinglePost.css'
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { likePost } from '../actions/auth'
import { unlikePost } from '../actions/auth'
import { Button } from '@material-ui/core';
import { addComment } from '../actions/auth';
import { deletePost } from '../actions/auth';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { BsDot } from 'react-icons/bs'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import {toast} from 'react-toastify';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import {WhatsappShareButton} from 'react-share';
import {FaShareAlt} from 'react-icons/fa'

import 'react-responsive-modal/styles.css';
import { DELETE_COMMENT_FAIL, DELETE_COMMENT_SUCCESS, DELETE_POST_FAIL, DELETE_POST_SUCCESS, EDIT_COMMENT_FAIL, EDIT_COMMENT_SUCCESS, EDIT_POST_FAIL, EDIT_POST_SUCESS } from '../actions/types';


const GetSinglePost = () => {
  let userName = JSON.parse(localStorage.getItem("username"))

    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [profileImg, setProfileImg] = useState("");
    const [likeCount, setLikecount] = useState(0);
    const [comments, setComments] = useState([]);
    const [likeArr, setLikearr] = useState([]);
    const [desc, setDesc] = useState("");
    const [postedImg, setPostedImg] = useState("");
    const [postedId, setPostedId] = useState("");
    const [myComment, setMycomment] = useState("");
    const [edit, setEdit] = useState(false);
    const [commentEdit, setCommentedit] = useState("")


    const {user} = useSelector(state => state.user)

    let id = JSON.parse(localStorage.getItem("_id"))

    const params = useParams();
  // console.log(window.location.href)

    useEffect(() => {
        const token = 'Bearer ' + localStorage.getItem("token");
        axios
          .get(`http://localhost:8800/api/posts/${params.id}`, {
              headers : {
                  'Authorization' : token
              }
          }).then((res) =>{
            console.log(res)
            setUsername(res.data.username)
            setUserId(res.data.userId)
            setProfileImg(res.data.profileImg)
            setDesc(res.data.post.desc)
            setComments(res.data.post.comment)
            setPostedImg(res.data.post.img)
            setLikecount(res.data.post.likes.length)
            setLikearr(res.data.post.likes)
            setPostedId(res.data.post._id);
          })
      }, []);
      
      const dispatch = useDispatch();

      const editComment = (id, comments) => {
          document.getElementById('addCaption').value = comments
          setEdit(true);
          setCommentedit(id);
      }

      const like = (e) => {
        e.preventDefault();
        const id = e.currentTarget.id
        dispatch(likePost(id));
        setTimeout(async function(){
          window.location.replace(`/GetSinglePost/${id}`)
        }, 2000)
      }

      const unlike = (e) => {
        e.preventDefault();
        const id = e.currentTarget.id
        dispatch(unlikePost(id));
        setTimeout(async function(){
          window.location.replace(`/GetSinglePost/${id}`)
        }, 2000)
      }


      
      const deleteComment = async (commentId) => {
              const token = 'Bearer ' + localStorage.getItem("token");
              const url = `http://localhost:8800/api/posts/${params.id}/${commentId}/deletecomment`
              try{
                const res = await axios
                    .delete(url, {
                        headers : {
                            'Authorization' : token
                        }
                    })
                
                setTimeout(async function(){
                    window.location.replace(`/GetSinglePost/${params.id}`)
                  }, 500)
                dispatch({
                    type : DELETE_COMMENT_SUCCESS, 
                })
              }
              catch(error){
                    if(error.response.status === 403) {
                      toast.error("Error!! You can delete only your comment", {
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
                        toast.error("Something went wrong!!", {
                            position: "top-center", 
                            autoClose: 1000, 
                            hideProgressBar: false, 
                            closeOnClick: true, 
                            pauseOnHover: true, 
                            draggable: true, 
                            progress: undefined, 
                        });
                    }
                    dispatch({
                        type : DELETE_COMMENT_FAIL,
                    })
              }
      }

      const deletePost = async() => {
            const token = 'Bearer ' + localStorage.getItem("token");
            const url = `http://localhost:8800/api/posts/${params.id}`
            try{
              const res = await axios
                  .delete(url, {
                      headers : {
                          'Authorization' : token
                      }
                  })
              
              toast.success('Post Deleted Successfully!!', {
                position: "top-center", 
                autoClose: 1000, 
                hideProgressBar: false, 
                closeOnClick: true, 
                pauseOnHover: true, 
                draggable: true, 
                progress: undefined, 
              });
              setTimeout(async function(){
                  window.location.replace(`/Home`)
                }, 2000)
              dispatch({
                  type : DELETE_POST_SUCCESS,
              })
            }
            catch(error){
                  
                    toast.error("Something went wrong!!", {
                        position: "top-center", 
                        autoClose: 1000, 
                        hideProgressBar: false, 
                        closeOnClick: true, 
                        pauseOnHover: true, 
                        draggable: true, 
                        progress: undefined, 
                    });
                  dispatch({
                      type : DELETE_POST_FAIL,
                  })
            }
      }

      const editPost = async(e) => {
        console.log(desc);
        e.preventDefault();
        const token = 'Bearer ' + localStorage.getItem("token");
        const url = `http://localhost:8800/api/posts/${params.id}`
        try{
          const res = await axios
              .put(url, {desc : desc},  {
                  headers : {
                      'Authorization' : token
                  }
              })
          
          toast.success('Post Edited Successfully!!', {
            position: "top-center", 
            autoClose: 1000, 
            hideProgressBar: false, 
            closeOnClick: true, 
            pauseOnHover: true, 
            draggable: true, 
            progress: undefined, 
          });
          setTimeout(async function(){
              window.location.replace(`/GetSinglePost/${params.id}`)
            }, 2000)
          dispatch({
              type : EDIT_POST_SUCESS,
          })
        }
        catch(error){
                toast.error("Something went wrong!!", {
                    position: "top-center", 
                    autoClose: 1000, 
                    hideProgressBar: false, 
                    closeOnClick: true, 
                    pauseOnHover: true, 
                    draggable: true, 
                    progress: undefined, 
                });
              dispatch({
                  type : EDIT_POST_FAIL,
              })
        }
    
  }


      const submitComment = async (event) => {
        if(event.key === 'Enter')
        {
          if(edit === false) {
            console.log("hello")
            event.preventDefault();
            dispatch(addComment(myComment, params.id));
            setMycomment("");
          }
          else{
            event.preventDefault();
            setEdit(false);
            const token = 'Bearer ' + localStorage.getItem("token");
            const url = `http://localhost:8800/api/posts/${params.id}/${commentEdit}/editComment`
            try{
              const res = await axios
                  .put(url, {newComment : myComment}, {
                      headers : {
                          'Authorization' : token
                      }
                  })
              
                  window.location.replace(`/GetSinglePost/${params.id}`)
              dispatch({
                  type : EDIT_COMMENT_SUCCESS, 
              })
            }
            catch(error){
                  if(error.response.status === 403) {
                    toast.error("Error!! You can edit only your comment", {
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
                      toast.error("Something went wrong!!", {
                          position: "top-center", 
                          autoClose: 1000, 
                          hideProgressBar: false, 
                          closeOnClick: true, 
                          pauseOnHover: true, 
                          draggable: true, 
                          progress: undefined, 
                      });
                  }
                  dispatch({
                      type : EDIT_COMMENT_FAIL,
                  })
            }
            setCommentedit("");
            setMycomment("");
          }
        }
      }

      if(user === null){
        return window.location.replace('/Login')
      }

  return (
    
    
    <div className='newPage'>
        <ToastContainer toastStyle={{ fontFamily: "cursive" }} />
        <div className='postContainer'>
            <div className='postCol1'>
                <div className='singlepostheader'>
                    <div className='singlepostheaderImg'>
                        <img src = {profileImg} />
                    </div>
                    { username === userName && 
                        <div className='singlepostheaderUser' onClick={event => window.location.href=`/Profile`}>
                            {username}
                        </div>
                    }
                    {
                      username !== userName && 
                      <div className='singlepostheaderUser' onClick={event => window.location.href=`/ViewOtherProfile/${userId}`}>
                            {username}
                        </div>
                    }
                </div>
                <div className='singlepostbody'>
                    <img src = {postedImg} />
                </div>
                <div className='singlepostfooter' style={{paddingLeft:'10px'}}>
                        <p style={{paddingLeft:'10px', paddingBottom:'5px'}}>{desc}</p>
                        {
                        (likeArr.includes(id)) 
                        ? <Button id={postedId} onClick={unlike} ><AiFillLike style={{color:'teal', fontSize:'30px', cursor:'pointer'}} /><p style={{paddingLeft:'20px', fontSize:'20px'}}>{likeCount}</p></Button>
                        : <Button id={postedId} onClick={like} ><AiOutlineLike style={{color: 'teal', fontSize:'30px', cursor:'pointer'}} /><p style={{paddingLeft:'20px', fontSize:'20px'}}>{likeCount}</p></Button>
                        }
                            
                        <span style={{paddingLeft:'30px'}}>
                            {username === userName && 
                                    <Button onClick={deletePost} type="submit" style={{width:'170px', backgroundColor:'teal', color:'white'}}>
                                        DELETE POST
                                    </Button>
                            }
                        </span> 
                        
                        <span style={{paddingLeft:'20px'}}>
                            {username === userName && 
                        

                            <Popup trigger={<Button type="button" style={{width:'170px', backgroundColor:'teal', color:'white'}}>
                                EDIT POST 
                                </Button>
                              } modal>
                                  <span style={{maxWidth:"1000px", margin:"auto"}} >
                                          <center><h5>Edit Post</h5></center>
                                          <div class="input-container" style={{paddingLeft: '40px', paddingRight:'40px', paddingBottom:'20px'}}>
                                            <input 
                                                class="input-field" 
                                                type="text" 
                                                placeholder="Caption" 
                                                onChange = {(e)=>setDesc(e.target.value)}
                                            /><br />
                                            <center>
                                                <button type="submit" onClick={editPost} style={{width:'200px'}} class="btn">EDIT</button>  
                                            </center>
                                          </div>
                                  </span>
                            </Popup>

                            }
                          </span>
                          <WhatsappShareButton style={{float:'right', paddingLeft:'20px'}} url={window.location.href} >
                                  <FaShareAlt size={40} round={true} style={{color:'teal'}}/>
                          </WhatsappShareButton>
                          
                </div>
            </div>

            <div className='commentSection' style={{margin:'0 auto'}}>
              <div className='comment'>
                <input type="text" 
                    label='Add Comment...'
                    placeholder='Add Comment...'
                    id='addCaption'
                    autoComplete='off'
                    value={myComment}
                    onChange={(e)=>setMycomment(e.target.value)}
                    style={{width:'380px', margin:'10px'} }
                    onKeyDown={submitComment}
                /><br />
              </div>

              <div className='displayComment'>
                    <table>
                        <tbody style={{overflow:'hidden', overflowY:'scroll'}}>
                          <div style={{paddingTop:'10px'}}></div>
                          {comments.map((index) => {
                            return(
                              <div style={{paddingBottom: '10px', cursor:'pointer', color:'teal'}} key={index._id}>
                                <span style={{float:'right'}}>
                                  <BiEdit onClick = {() => {editComment(index._id, index.comments)}} />&ensp;
                                  <MdDelete onClick={()=>{deleteComment(index._id)}} /> 
                                </span>

                                  <tr>
                                    <p style={{paddingTop:'10px', fontSize:'12px', color:'teal'}}>{index.username} 
                                      <BsDot style={{fontSize:'20px', paddingTop: '8px'}} />
                                      &ensp;
                                      <small style={{color:'black', fontSize:'15px'}}>{index.comments}</small>
                                    </p>
                                  </tr>
                                </div>

                                  
                          )})}
                        </tbody>
                    </table> 
                </div>

            </div>

        </div>
    </div>
  )
}




export default GetSinglePost