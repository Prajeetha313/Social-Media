import axios from 'axios';

const API_URL = "http://localhost:8800/api/auth/";
const login = async (email, password) => {
    const res = await axios
        .post(API_URL + 'login', {
            email,
            password
        })
        if(res.data.token) {
            localStorage.setItem("token", JSON.stringify(res.data.token));
            localStorage.setItem("user", JSON.stringify(res.data.user[0]._id));
            localStorage.setItem("username", JSON.stringify(res.data.user[0].username));
            window.location.replace('/Home')
        }
        return res.data;
};

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    window.location.replace("/Login")
};

const register = async (username, email, password, mobile) => {
    const res = await axios
        .post(API_URL + 'register', {
            username, 
            email, 
            password, 
            mobile
        })
        window.location.replace("/Login")
        return res.data
}

export default { login, logout, register };
