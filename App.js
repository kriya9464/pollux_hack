import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Askdoubt from './components/Askdoubt';
import Login from './components/auth/Login';
import userSlice, { selectUser } from './features/userSlice';

//import { auth,  } from "./firebase-config";




  function App() {
    const user = useSelector(selectUser);

  return (
    <div className="App">
      {" "}
      {user ? (
        <Askdoubt />
      ) : (
          <Login/>
      )}
    </div>
  );
                }

export default App;
