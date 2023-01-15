import React from 'react'
import Header from './Header.js'
/* import Sidebar from './Sidebar.js' */
import Feed from './Feed.js'
import './CSS/Askdoubt.css';

function Askdoubt() {
  return (
    <div className='doubt'>
        <Header/>
        <div className="askdoubt_contents">
          <div className="askdoubt_content">
           {/*  <Sidebar /> */}
            <Feed />
          </div>
        </div>
    </div>
  )
}

export default Askdoubt