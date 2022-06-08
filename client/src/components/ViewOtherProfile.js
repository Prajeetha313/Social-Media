import React from 'react'
import NavBar from './navBar'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FaUserFriends } from 'react-icons/fa'
import { IoImage } from 'react-icons/io5'


const ViewOtherProfile = () => {
    const [otherUsername, setOtherUsername] = useState("");
    const [postedImages, setpostedImages ] = useState([]);
    const [otherEmail, setOtherEmail] = useState("");
    const [otherMobile, setOtherMobile] = useState("");
    const [otherDesc, setOtherDesc] = useState("");
    const [otherProfileimg, setOtherProfileimg] = useState("");
    const [otherFriend, setOtherFriend] = useState([]);

    const params = useParams();

    useEffect(() => {
        const token = 'Bearer ' + localStorage.getItem("token");
        axios
          .get(`http://localhost:8800/api/users/${params.id}`, {
              headers : {
                  'Authorization' : token
              }
          }).then((res) =>{
            console.log(res.data)
            setOtherUsername(res.data.user.username);
            setOtherEmail(res.data.user.email)
            setOtherDesc(res.data.user.desc);
            setOtherMobile(res.data.user.mobile);
            setOtherProfileimg(res.data.user.profileImg);
            setOtherFriend(res.data.user.friend);
            setpostedImages(res.data.post)
          });

      }, []);
    
    
    return (
        <div>
        <NavBar />
            <div id = "container"> 
                <div className='col1'>
                    <label><img src={otherProfileimg} /></label>    
                </div>
                <div className='col2'>
                    <div className='col2Container'>
                        Username<input type="text" 
                            label = "username"
                            value={otherUsername}
                            disabled={true} 
                            autoComplete='off' 
                        /><br /><br /> 
                        Email<input type="text" 
                            label="email" 
                            value={otherEmail} 
                            disabled={true} 
                        /><br /><br />
                        Mobile<input type="text" 
                            label="mobile" 
                            value={otherMobile} 
                            disabled={true}       
                            autoComplete='off'
                        /><br /> <br /> 
                        Bio<input type="text" 
                            label="desc" 
                            value={otherDesc} 
                            disabled={true}    
                            autoComplete='off'
                        /><br />
                    </div>
                </div>
            </div>
            <div style={{paddingRight:'100px', paddingTop:'40px', float:'right', textAlign:'center'}}>
                <div className="col s12 m7">
                    <div className="card horizontal">
                    <div className="card-stacked" style={{width:'100px'}}>
                        <div className="card-content">
                        <p>{otherFriend.length}</p>
                        </div>
                        <div className="card-action">
                        <a href="#" style={{color:'teal', fontSize:'30px'}}><FaUserFriends /></a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div style={{paddingRight:'100px', paddingTop:'40px', float:'right', textAlign:'center'}}>
                <div className="col s12 m7">
                    <div className="card horizontal">
                    <div className="card-stacked" style={{width:'100px'}}>
                        <div className="card-content">
                        <p>{postedImages.length}</p>
                        </div>
                        <div className="card-action">
                        <a href="#" style={{color:'teal', fontSize:'30px'}}><IoImage /></a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className='postedImage' style={{paddingTop:'60px'}}>
                    <div className='gallery'>
                    {postedImages.map((index)=>{
                        console.warn(index)
                        return (
                            <div className='pics' key={index} onClick={event => window.location.href=`/GetSinglePost/${index._id}`} >
                                <img src = {index.img} style={{width:"100%"}} />
                            </div>
                        )
                    })}
                </div>
            </div>
            
      </div>
    )
}

export default ViewOtherProfile