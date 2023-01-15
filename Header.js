import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { Search } from '@mui/icons-material';
import { Avatar} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import './CSS/header.css';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { logout, selectUser } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function Header() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
  const [search, setSearch]=useState("");
    const handleLogOut = () =>{
        if(window.confirm('You want to LogOut')){
          signOut(auth).then(()=>{
            dispatch(logout())
            console.log('logged out')
          }).catch(()=>{
            console.log('error')
          });
        }
        
      }

      const onChange = async (value)=>{
        await axios.get('/api/questions').then((res)=>{
          /* res.map((items) =>{
            if(items.questionName == value)
             {
              setSearch=items.questionName
            }
          }) */
          console.log(res);
      }).catch((e)=>{
          console.log(e);
      })
      }

  return (
    <div className='header'>
        <div className='header_content'>
            <div className="header_logo">
                <img src="https://www.computerhope.com/jargon/d/dd.jpg"  /></div>
                <div className="header_search">
                    <Search />
                    <input type="text" placeholder='Search questions' className="search" value={search} onChange={(e)=> setSearch(e.target.value)} />
                    </div>
                <div className="header_icons">
                <div className="header_icon"><HomeIcon /></div>
                <div className="header_icon">
                    <CategoryIcon />
                </div>
                <div className="header_icon">
                    <NotificationsSharpIcon />
                </div>
               {/*
                <div className="header_icons"></div> */}
                </div>
             
                    {/* <div className="header_quesbtn"><Button className="quesbtn"></Button>Add Questions</div> */}
                    <div className="header_profile" onClick= {handleLogOut}>
                        <Avatar src={user?.photo}/>
                    </div>
                </div>
            </div>
        
    
  )
}

export default Header