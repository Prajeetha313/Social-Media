import React from 'react'
import { useSelector } from 'react-redux'
import Login from './components/Login'
import Profile from './components/Profile'
import { selectUser } from './reducer/userSlice'
import Home from './components/Home'
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom'
import NavBar from './components/navBar'
import Register from './components/Register'
import FriendSuggestion from './components/FriendSuggestion'
import Post from './components/Post'
import PostedImage from './components/PostedImage'
import DeleteAccount from './components/DeleteAccount'
import ChangePassword from './components/ChangePassword'
import ViewOtherProfile from './components/ViewOtherProfile'
import GetSinglePost from './components/GetSinglePost'



const App = () => {
  const user = useSelector(selectUser);


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route 
              exact path='/Login'
              element = {<Login />}
          />
          <Route
              path='/Register'
              element = {<Register />}
          />
          <Route
              path='/Home'
              element = {<Home />}
          />
          <Route
              path='/Profile'
              element = {<Profile />}
          />
          <Route
              path='/NavBar'
              element = {<NavBar />}
          />
          <Route
              path='/FriendSuggestion'
              element = {<FriendSuggestion />}
          />
          <Route
              path='/Post'
              element = {<Post />}
          />
          <Route
              path='/PostedImage'
              element = {<PostedImage />}
          />
          <Route
              path='/DeleteAccount'
              element = {<DeleteAccount />}
          />
          <Route
              path='/ChangePassword'
              element = {<ChangePassword />}
          />
          <Route
              path='/ViewOtherProfile/:id'
              element = {<ViewOtherProfile />}
          />
          <Route
              path='/GetSinglePost/:id'
              element = {<GetSinglePost />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App