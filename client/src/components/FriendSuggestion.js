import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './navBar';
import axios from 'axios'
import './FriendSuggestion.css'
import { IoPersonAdd } from 'react-icons/io5'
import { CCard, CCardBody, CCardTitle, CCardText, CButton, CCol, CRow  } from '@coreui/react'
import { AddFriend } from '../actions/auth';
import { ToastContainer } from 'react-toastify';
import { FaAddressCard } from 'react-icons/fa'
import { IoPersonRemoveSharp } from 'react-icons/io5'
import { IoPersonAddSharp } from 'react-icons/io5'
import { BsSearch } from 'react-icons/bs'


const FriendSuggestion = () => {
    const inputEl = useRef("");
    const [ allUsers, setAlluser ] = useState([])
    const [ friends, setFriends ] = useState([]);
    const [searchTerm, setSearchTerm ] = useState("");
    const [searchResult, setSearchResult ] = useState([]);

    const {user} = useSelector(state => state.user)

    let friend = JSON.parse(localStorage.getItem("user")).friend;

    useEffect(async () => {
      const token = 'Bearer ' + localStorage.getItem("token");
      await axios
        .get('http://localhost:8800/api/users/viewAllUsers', {
            headers : {
                'Authorization' : token
            }
        }).then((res) =>{
        console.log(res.data)
        setAlluser(res.data)
        setSearchResult(res.data)
        })
        setFriends(friend)
        // setSearchResult(allUsers)
    }, []);


    const dispatch = useDispatch();

    if(user === null){
      return window.location.replace('/Login')
    }

    const addFriendSubmit = (e) => {
      e.preventDefault();
      const id = e.currentTarget.id;
      console.log(id);
      dispatch(AddFriend(id));
    }

    const getSearchTerm = () =>{
          setSearchTerm(inputEl.current.value);
          if(searchTerm!== "")
          {
            const newList = allUsers.filter((allUser) => {
              return Object.values(allUser)
                  .join(" ")
                  .toLowerCase().
                  includes(searchTerm.toLowerCase());
            });
            setSearchResult(newList);
          }
          else{
            setSearchResult(allUsers)
          }
    }


  return (
    <div>
      <NavBar />
      <div>
      <ToastContainer toastStyle={{ fontFamily: "cursive" }} />
          
        <div className='cardss3' style={{textAlign:'center', paddingTop:'30px'}}>
          <input style={{width:'750px', border: '1px solid grey', paddingLeft:'10px'}}
              ref={inputEl}
              type="text"
              placeholder = "Search"
              className='prompt'
              value={searchTerm}
              onChange={getSearchTerm}

          /><i className='searchIcon'><BsSearch /></i>
          {

          searchResult.map((index)=>{
            console.log("index", index._id)
            return (
              <div className='cards3' key={index._id}>
                <div style={{paddingTop:'20px'}}></div>
                <CCard style={{width:'800px', paddingBottom:'20px'}}>
                <div className='homeHeaderImg' style={{paddingTop:'20px'}}>
                        <img src={index.profileImg} />
                    </div>
                  <CCardBody style={{paddingTop:'20px'}}>
                    <CCardText style={{float:'left', textAlign:'left', paddingLeft:'20px'}}>
                    <p><b>{index.username}</b></p>
                    <p>Email : {index.email}</p>
                    <p>Mobile : {index.mobile}</p>
                    {index.desc && <p>Bio : {index.desc}</p>}
                    

                    </CCardText><br />
                    <span style={{float:'right', paddingRight:'70px'}}>
                    {
                      (friend.includes(index._id)) 
                      ? <CButton href="#" style={{width:'100px'}} id={index._id} onClick={addFriendSubmit}><IoPersonRemoveSharp style={{height:'auto'}} /></CButton>
                      : <CButton href="#" style={{width:'100px'}} id={index._id} onClick={addFriendSubmit}><IoPersonAddSharp style={{height:'auto'}} /></CButton>
                    }
                    &ensp;
                    
                    <CButton href={`/ViewOtherProfile/${index._id}`} style={{width:'100px'}}><FaAddressCard style={{height:'auto'}} /></CButton>
                    </span>
                    <div style={{paddingTop:'20px'}}></div>
                  </CCardBody>
                </CCard>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FriendSuggestion