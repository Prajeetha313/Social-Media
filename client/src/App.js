import React from 'react'
import { useSelector } from 'react-redux'
import Login from './components/Login'
import { selectUser } from './reducer/userSlice'
import Home from './components/Home'
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom'


const App = () => {
  const user = useSelector(selectUser);


  return (
    <div>
      {/* { user ? <Home /> : <Login /> } */}

      <BrowserRouter>
        <Routes>
          <Route 
              exact path='/Login'
              element = {<Login />}
          />
          <Route
              path='/home'
              element = {<Home />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App