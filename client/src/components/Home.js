import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectUser } from '../../src/reducer/userSlice'
import { logout } from '../actions/auth';
// import { selectUser } from '../reducer/userSlice'

const Home = () => {
  const username = localStorage.getItem("username")
  console.log(username)
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
  }
  const user = useSelector(selectUser);
  if(user === null){
    return window.location.replace('/Login')
  }

  return (
    <div>
        <h6>
          Hello {username}
        </h6>
        <br></br>
        <button onClick={logOut}>Logout</button>
    </div>
  )
}

export default Home