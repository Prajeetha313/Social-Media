import axios from 'axios';

const API_URL = "http://localhost:8800/api/auth/";
const login = (email, password) => {
    return axios
        .post(API_URL + 'login', {
            email,
            password
        })
        .then((res)=> {
            console.log(res.data.user[0])
            if(res.data.token) {
                localStorage.setItem("token", JSON.stringify(res.data.token));
                localStorage.setItem("user", JSON.stringify(res.data.user[0]._id));
                localStorage.setItem("username", JSON.stringify(res.data.user[0].username));
                window.location.replace('/Home')
            }
            return res.data;
        });
};

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    window.location.replace("/Login")
}

export default { login, logout };