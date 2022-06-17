import { LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT, 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    FETCH_USER_SUCCESS,
    FETCH_USER_FAIL, 
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    ADD_OR_UNFRIEND_SUCCESS,
    ADD_OR_UNFRIEND_FAIL,
} from '../actions/types';

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user 
        ? { error : false, loggedIn : true, user : [] } 
        : { error : false, loggedIn : false, user : null };

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case LOGIN_SUCCESS: 
            localStorage.setItem("user", JSON.stringify(payload.user))
            // localStorage.setItem("username", JSON.stringify(payload.user.username))
            // localStorage.setItem("_id", JSON.stringify(payload.user._id))
            // localStorage.setItem("email", JSON.stringify(payload.user.email))
            // localStorage.setItem("mobile", JSON.stringify(payload.user.mobile))
            // localStorage.setItem("profileImg", JSON.stringify(payload.user.profileImg))
            // localStorage.setItem("desc", JSON.stringify(payload.user.desc))
            // localStorage.setItem("friend", JSON.stringify(payload.user.friend))


            return {
                ...state, 
                loggedIn : true, 
                error : false, 
                user : payload.user, 
            }
        case LOGIN_FAIL:
            return {
                ...state, 
                error : true, 
                loggedIn : false, 
                user : null, 
            }
        case LOGOUT:
            return {
                ...state, 
                loggedIn : false, 
                error : false, 
                user : null,
            }
        case REGISTER_SUCCESS:
            return {
                ...state, 
                loggedIn : false, 
                error : false, 
                user : null, 
            }
        case REGISTER_FAIL:
            return {
                ...state, 
                error : true, 
                loggedIn : false, 
                user : null, 
            }
        case FETCH_USER_SUCCESS:
            return {
                ...state, 
                loggedIn: true, 
                error : false, 
                user : payload.user, 
            }
        case FETCH_USER_FAIL:
            return {
                ...state, 
                loggedIn : true,
                error: true,  
            }
        case USER_UPDATE_SUCCESS:
            return {
                ...state, 
                loggedIn : true, 
                error : false, 
                user : payload.user, 
            }
        case USER_UPDATE_FAIL:
            return {
                ...state, 
                loggedIn : true, 
                error : true, 
            }
        case USER_DELETE_SUCCESS:
            return {
                ...state, 
                loggedIn : false, 
                error: false, 
                user : null, 
            }
        case USER_DELETE_FAIL:
            return {
                ...state, 
                loggedIn : true, 
                error : true, 
            }
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state, 
                loggedIn : true, 
                error: false, 
                user : payload.user, 
            }
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state, 
                loggedIn : true, 
                error : true, 
            }
        case ADD_OR_UNFRIEND_SUCCESS:
            return {
                ...state, 
                loggedIn : true, 
                error : false, 
                user : payload.user, 
            }
        case ADD_OR_UNFRIEND_FAIL:
            return {
                ...state, 
                loggedIn : true, 
                error : true, 
            }
        default : 
            return state;
    }
}

export const selectUser = (state) => state.user.user
