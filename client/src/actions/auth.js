import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

import authServices from "../services/authServices";


export const login = (email, password) => (dispatch)=>{
    return authServices.login(email, password).then(
        (data) => {
            dispatch({
                type : LOGIN_SUCCESS, 
                payload : {user : data}, 
            });
            return Promise.resolve();
        }, 
        (error) => {
            if(error.response.status === 404)
            {
                document.getElementById("errorId").innerHTML = "User not found"
            }
            else if(error.response.status === 400)
            {
                document.getElementById("errorId").innerHTML = "Invalid Password"
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

// export const register = (email, password, cpassword, mobile, username) => (dispatch)=>{
//     return authServices.register(email, password, cpassword, mobile, username).then(
//         (data) => {
//             dispatch({
//                 type : REGISTER_SUCCESS, 
//                 payload : {user : data}, 
//             });
//             return Promise.resolve();
//         }, 
//         (error) => {
//             if(error.response.status === 404)
//             {
//                 document.getElementById("errorId").innerHTML = "User not found"
//             }
//             else if(error.response.status === 400)
//             {
//                 document.getElementById("errorId").innerHTML = "Invalid Password"
//             }
//             const message = error.message
//             dispatch({
//                 type : REGISTER_FAIL, 
//                 loggedIn : false
//             });
//             return Promise.reject();
//         }
//     )
// }

export const logout = () => (dispatch) => {
    authServices.logout();
    dispatch({
        type : LOGOUT
    })
}