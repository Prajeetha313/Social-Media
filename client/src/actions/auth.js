import { 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT, 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    FETCH_USER_SUCCESS, 
    USER_UPDATE_SUCCESS, 
    USER_UPDATE_FAIL, 
    POST_FETCH_FAIL, 
    POST_FETCH_SUCCESS, 
    IMAGE_POST_SUCCESS, 
    IMAGE_POST_FAIL, 
    USER_DELETE_SUCCESS, 
    USER_DELETE_FAIL, 
    UPDATE_PASSWORD_SUCCESS, 
    UPDATE_PASSWORD_FAIL,
    ADD_OR_UNFRIEND_SUCCESS,
    ADD_OR_UNFRIEND_FAIL,
    LIKE_OR_UNLIKE_SUCCESS,
    LIKE_OR_UNLIKE_FAIL,
    ADD_COMMENT_FAIL, 
    ADD_COMMENT_SUCCESS,
} from "./types";

import axios from 'axios';
import authServices from "../services/authServices";
import '../components/Login'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const USER_API_URL = "http://localhost:8800/api/users/";


export const login = (email, password) => (dispatch)=>{
    return authServices.login(email, password).then(
        (data) => {
            console.log(data)
            dispatch({
                type : LOGIN_SUCCESS, 
                payload : {user : data}, 
            });
            toast.success('Login successful!!', {
                position: "top-center", 
                autoClose: 1000, 
                hideProgressBar: false, 
                closeOnClick: true, 
                pauseOnHover: true, 
                draggable: true, 
                progress: undefined, 
            });
            return Promise.resolve();
        }, 
        (error) => {
            if(error.response.status === 404)
            {
                toast.error('User not found!!', {
                    position: "top-center", 
                    autoClose: 1000, 
                    hideProgressBar: false, 
                    closeOnClick: true, 
                    pauseOnHover: true, 
                    draggable: true, 
                    progress: undefined, 
                });
            }
            else if(error.response.status === 400)
            {
                toast.error('Invalid Password!!', {
                    position: "top-center", 
                    autoClose: 1000, 
                    hideProgressBar: false, 
                    closeOnClick: true, 
                    pauseOnHover: true, 
                    draggable: true, 
                    progress: undefined, 
                });
            }
            const message = error.message
            dispatch({
                type : LOGIN_FAIL, 
                loggedIn : false
            });
            return Promise.reject();
        }
    )
}

export const register = (username, email, password, cpassword, mobile) => (dispatch)=>{
   
    return authServices.register(username, email, password, mobile).then(
        (data) => {
            dispatch({
                type : REGISTER_SUCCESS, 
            });
            toast.success('Registered successfully!!', {
                position: "top-center", 
                autoClose: 1000, 
                hideProgressBar: false, 
                closeOnClick: true, 
                pauseOnHover: true, 
                draggable: true, 
                progress: undefined, 
            });
            return Promise.resolve();
        }, 
        (error) => {
            if(error.response.status === 402)
            {
                toast.error('Already have an account!! Login to continue', {
                    position: "top-center", 
                    autoClose: 1000, 
                    hideProgressBar: false, 
                    closeOnClick: true, 
                    pauseOnHover: true, 
                    draggable: true, 
                    progress: undefined, 
                });
            }
            else if(error.response.status === 409)
            {
                toast.error('User already exists!!', {
                    position: "top-center", 
                    autoClose: 1000, 
                    hideProgressBar: false, 
                    closeOnClick: true, 
                    pauseOnHover: true, 
                    draggable: true, 
                    progress: undefined, 
                });
            }
            else if(error.response.status === 500)
            {
                toast.error('Something wend wrong!!', {
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
                type : REGISTER_FAIL,   
            });
            return Promise.reject();
        }
    )
}

export const addBio = (username, mobile, desc, profileImg) => (dispatch) => {
    return authServices.addBio(username, mobile, desc, profileImg).then(
        (data) => {
            dispatch({
                type : USER_UPDATE_SUCCESS,
                payload : {user : data}, 
            });
            return Promise.resolve();
        },
        (error) => {
            console.log(error)
            dispatch({
                type : USER_UPDATE_FAIL, 
            });
            return Promise.reject();
        }
    )
}

export const getAllPost = () => (dispatch) => {
    return authServices.getAllPost().then(
        (data) => {
            dispatch({
                type : POST_FETCH_SUCCESS, 
                payload : {post : data}, 
            });
            return Promise.resolve();
        }, 
        (error) => {
            console.log(error);
            dispatch({
                type : POST_FETCH_FAIL, 
            });
            return Promise.reject();
        }
    )
}


export const profile = () => {
    try{
        return async function (dispatch) {
            const token = 'Bearer ' + localStorage.getItem("token");
            console.log(token)
            const resp = await axios   
                .get(USER_API_URL + 'viewProfile', {
                    headers : {
                        'Authorization' : token 
                    }
                })
                console.log(resp.data);
                dispatch({
                    type : FETCH_USER_SUCCESS, 
                    payload : {user : resp.data}, 
                })
                dispatch({
                    type : LOGIN_SUCCESS, 
                    payload : {user : resp.data}, 
                })
        }
    }
    catch(error) {
        console.log(error)
    }
}

export const logout = () => (dispatch) => {
    authServices.logout();
    dispatch({
        type : LOGOUT
    })
}

export const postImage = (post) => (dispatch) => {
    authServices.postImage(post).then(
        (data) => {
            dispatch({
                type : IMAGE_POST_SUCCESS,
            });
            toast.success('Post uploaded successfully!!', {
                position: "top-center", 
                autoClose: 1000, 
                hideProgressBar: false, 
                closeOnClick: true, 
                pauseOnHover: true, 
                draggable: true, 
                progress: undefined, 
            });
            return Promise.resolve();
        },
        (error) => {
            console.log(error)
            dispatch({
                type : IMAGE_POST_FAIL, 
            });
            toast.error('Error!!!', {
                position: "top-center", 
                autoClose: 1000, 
                hideProgressBar: false, 
                closeOnClick: true, 
                pauseOnHover: true, 
                draggable: true, 
                progress: undefined, 
            });
            return Promise.reject();
        }
    )
}

export const deleteAccount = () => (dispatch) => {
    authServices.deleteAccount().then(
        () => {
            dispatch({
                type : USER_DELETE_SUCCESS, 
            });
            return Promise.resolve();
        }, 
        (error) => {
            console.log(error);
            dispatch({
                type : USER_DELETE_FAIL, 
            })
            return Promise.reject();
        }
    )
}

export const ChangeCurrentPassword = (oldpassword, newpassword) => (dispatch) => {
    return authServices.ChangeCurrentPassword(oldpassword, newpassword).then(
        (data) => {
            dispatch({
                type : UPDATE_PASSWORD_SUCCESS,
                payload : {user : data}, 
            });
            toast.success('Password updated successfully!!', {
                position: "top-center", 
                autoClose: 1000, 
                hideProgressBar: false, 
                closeOnClick: true, 
                pauseOnHover: true, 
                draggable: true, 
                progress: undefined, 
            });
            return Promise.resolve();
        },
        (error) => {
            console.log(error)
            if(error.response.status === 403)
            {
                toast.error('Please enter correct old password!!', {
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
                type : UPDATE_PASSWORD_FAIL, 
            });
            return Promise.reject();
        }
    )
}

export const AddFriend = (id) => (dispatch) => {
    return authServices.AddFriend(id).then(
        (data) => {
           dispatch({
                type : ADD_OR_UNFRIEND_SUCCESS, 
                payload : {user : data}, 
            })
            dispatch({
                type : LOGIN_SUCCESS, 
                payload : {user : data}, 
            })
            
                window.location.replace('/FriendSuggestion')

            return Promise.resolve();
        }, 
        (error) => {
            console.log(error)
            toast.error('Error!!', {
                position: "top-center", 
                autoClose: 1000, 
                hideProgressBar: false, 
                closeOnClick: true, 
                pauseOnHover: true, 
                draggable: true, 
                progress: undefined, 
            });
            dispatch({
                type : ADD_OR_UNFRIEND_FAIL, 
            })
            return Promise.reject();
        }
    )
}

export const likePost = (id) => (dispatch) => {
    console.log("id", id)
    return authServices.likePost(id).then(
        (data) => {
            dispatch({
                type : LIKE_OR_UNLIKE_SUCCESS, 
            })
            return Promise.resolve();
        },
        (error) => {
            toast.error('Failed to like the post!!', {
                position: "top-center", 
                autoClose: 1000, 
                hideProgressBar: false, 
                closeOnClick: true, 
                pauseOnHover: true, 
                draggable: true, 
                progress: undefined, 
            });
            dispatch({
                type : LIKE_OR_UNLIKE_FAIL, 
            })
            return Promise.reject();
        }
    )
}

export const unlikePost = (id) => (dispatch) => {
    console.log("id", id)
    return authServices.unlikePost(id).then(
        (data) => {
            dispatch({
                type : LIKE_OR_UNLIKE_SUCCESS, 
            })
            return Promise.resolve();
        },
        (error) => {
            toast.error('Failed to unlike the post!!', {
                position: "top-center", 
                autoClose: 1000, 
                hideProgressBar: false, 
                closeOnClick: true, 
                pauseOnHover: true, 
                draggable: true, 
                progress: undefined, 
            });
            dispatch({
                type : LIKE_OR_UNLIKE_FAIL,
            })
            return Promise.reject();
        }
    )
}

export const addComment = (comment, id) => (dispatch) => {
    return authServices.addComment(comment, id).then(
        (data) => {
           
            window.location.replace(`/GetSinglePost/${id}`)
              dispatch({
                type : ADD_COMMENT_SUCCESS, 
            })
            return Promise.resolve();
        },
        (error) => {
            if(error.response.status === 403) {
                toast.error("Error!! You can comment only on your/your friend's post", {
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
                type : ADD_COMMENT_FAIL,
            })
            return Promise.reject();
        }
    )
}
