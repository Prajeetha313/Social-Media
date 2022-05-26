import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/types';
const user = JSON.parse(localStorage.getItem("user"));
const initialState = user 
        ? { loggedIn : true, user } 
        : { loggedIn : false, user : null };

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case LOGIN_SUCCESS: 
            return {
                ...state, 
                loggedIn : true, 
                user : payload.user, 
            }
        case LOGIN_FAIL:
            return {
                ...state, 
                loggedIn : false, 
                user : null, 
            }
        case LOGOUT:
            return {
                ...state, 
                loggedIn : false, 
                user : null,
            }
        default : 
            return state;
    }
}

export const selectUser = (state) => state.user.user