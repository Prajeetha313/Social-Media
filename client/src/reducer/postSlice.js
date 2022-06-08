import {
    POST_FETCH_FAIL, 
    POST_FETCH_SUCCESS, 
    IMAGE_POST_FAIL, 
    IMAGE_POST_SUCCESS, 
    LIKE_OR_UNLIKE_SUCCESS, 
    LIKE_OR_UNLIKE_FAIL, 
    ADD_COMMENT_FAIL, 
    ADD_COMMENT_SUCCESS,
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_FAIL,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAIL,
    EDIT_POST_SUCESS,
    EDIT_POST_FAIL
} from '../actions/types';

const initialState = {
    fetchError : false, 
    post : {}, 
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case POST_FETCH_SUCCESS :
            return {
                ...state, 
                fetchError : false, 
                post : payload.post, 
            }
        case POST_FETCH_FAIL : 
            return {
                ...state, 
                fetchError : true,
                post : {},  
            }
        case IMAGE_POST_SUCCESS : 
            return {
                ...state, 
                fetchError : false, 
            }
        case IMAGE_POST_FAIL :
            return {
                ...state, 
                fetchError : false, 
            }
        case LIKE_OR_UNLIKE_SUCCESS:
            return {
                ...state, 
                loggedIn : true, 
                error : false, 
            }
        case LIKE_OR_UNLIKE_FAIL:
            return {
                ...state, 
                loggedIn : true, 
                error : true, 
            }
        case ADD_COMMENT_SUCCESS:
            return {
                ...state, 
                loggedIn : true, 
                error : false, 
            }
        case ADD_COMMENT_FAIL:
            return {
                ...state, 
                loggedIn : true, 
                error : true,
            }
        case EDIT_COMMENT_SUCCESS:
            return {
                ...state, 
                loggedIn : true, 
                error : false, 
            }
        case EDIT_COMMENT_FAIL:
            return {
                ...state, 
                loggedIn : true, 
                error : true,
            }
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state, 
                loggedIn : true, 
                error : false, 
            }
        case DELETE_COMMENT_FAIL:
            return {
                ...state, 
                loggedIn : true, 
                error : true,
            }
        case DELETE_POST_SUCCESS:
            return {
                ...state, 
                loggedIn : true, 
                error : false, 
            }
        case DELETE_POST_FAIL:
            return {
                ...state, 
                loggedIn : true, 
                error : true,
            }
        case EDIT_POST_SUCESS:
            return {
                ...state, 
                loggedIn : true, 
                error : false, 
            }
        case EDIT_POST_FAIL:
            return {
                ...state, 
                loggedIn : true, 
                error : true,
            }
        default :
            return state;
    }
}

export const selectPost = (state) => state.post