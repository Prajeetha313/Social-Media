import axios from 'axios';


const API_URL = "http://localhost:8800/api/auth/";
const USER_API_URL = "http://localhost:8800/api/users/";
const POST_API_URL = "http://localhost:8800/api/posts/";

const token = 'Bearer ' + localStorage.getItem("token");

const login = async (email, password) => {
    const res = await axios
        .post(API_URL + 'login', {
            email,
            password
        })
        if(res.data.token) {
            localStorage.setItem("token", res.data.token);
            window.location.replace('/Home')
        }
        return res.data.user[0];
};

const postImage = async (post) => {
    const res = await axios
        .post(POST_API_URL + 'upload', post, {
            headers: {
                Authorization : token
            }
        })
    console.log(res)
    return res.data;
}

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

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

const addBio = async (username, mobile, desc, profileImg) => {
    const res = await axios
        .put(USER_API_URL + 'UpdateProfile', {
            username : username, 
            mobile : mobile, 
            desc : desc, 
            profileImg : profileImg,
        }, {
            headers : {
                'Authorization' : token
            }
        })
        window.location.reload('/Profile')
        return res.data
}

const getAllPost = async() => {
    const res = await axios
        .get(POST_API_URL + 'getAllPost', {
            headers : {
                'Authorization' : token
            }
        })
    return res.data
}

const deleteAccount = async () => {
    const res = await axios
        .delete(USER_API_URL + `DeleteAccount`, {
            headers : {
                'Authorization' : token
            }
        })
    return res.data
}

const ChangeCurrentPassword = async (oldpassword, newpassword) => {
    const res = await axios
        .post(USER_API_URL + 'ChangeCurrentPassword', {
            oldpassword, newpassword
        }, {
            headers : {
                'Authorization' : token
            }
        })
        return res.data
}

const AddFriend = async (id) => {
    const url = USER_API_URL + `${id}/friend`
    console.log(url)
    const res = await axios
        .get(url, {
            headers : {
                'Authorization' : token
            }
        })
        return res.data
}

const likePost = async(id) => {
    const url = POST_API_URL + `${id}/like`
    const res = await axios
        .get(url, {
            headers : {
                'Authorization' : token
            }
        })
        return res.data
}

const unlikePost = async(id) => {
    const url = POST_API_URL + `${id}/unlike`
    const res = await axios
        .get(url, {
            headers : {
                'Authorization' : token
            }
        })
        return res.data
}

const addComment = async(comment, id) => {
    const url = POST_API_URL + `${id}/comment`
    const res = await axios
        .put(url, {comment}, {
            headers : {
                'Authorization' : token
            }
        })
        return res.data
}


export default { 
    login, 
    logout, 
    register, 
    addBio, 
    getAllPost, 
    postImage, 
    deleteAccount, 
    ChangeCurrentPassword,
    AddFriend, 
    likePost, 
    unlikePost, 
    addComment,
};
