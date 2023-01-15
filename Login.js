import React, { useEffect, useState } from 'react';
import './login.css';
import logo from './imgs/logo.jpeg';

//import { auth, provider } from '../../firebase';
//import {signInWithPopup} from 'firebase/auth';

import {useDispatch, useSelector} from "react-redux";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  
} from "firebase/auth";
import {login,logout, selectUser} from '../../features/userSlice';
//import { onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider} from '../../firebase';
import {signInWithPopup} from 'firebase/auth';
//import { selectUser } from '../../features/userSlice';

function Login() {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginState, setIsLoginState] = useState("login");
    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      isRegister ? handleLogin() : handleRegister();
    };
  
    useEffect(() => {
      onAuthStateChanged(auth,(authUser) => {
        if (authUser) {
          dispatch(
            login({
              id: authUser.uid,
              name: authUser.displayName ? authUser.displayName : authUser.email,
              lastsignIn: authUser.metadata.lastSignInTime,
              verified: String(authUser.emailVerified),
              pic: authUser.photoURL
                ? authUser.photoURL
                : "https://lh3.googleusercontent.com/ogw/ADea4I5bHBJbpIvco4Yh1ARth7_gu4dl_QnpyDAU0NW8=s32-c-mo",
            })
            
          );
        } else {
          dispatch(logout());
        }
      });
    }, [dispatch]);
  
    const handleLogin = () => {
  
      if(email!==""){
        signInWithPopup(auth,googleProvider).then((result)=>{
          console.log(result)
      }).catch((err)=>{
          console.log(err);
      })
      }
  
     
     /*  if (email && password !== "") {
      signInWithEmailAndPassword(auth,email, password)
          .then((data) => alert("Logged in successfully!!!"))
          .catch((err) => alert(err));
      } */
    };
    const handleRegister = () => {
      if (email && password !== "") {
        createUserWithEmailAndPassword(auth,email, password)
          .then((data) => alert("Registered Successfully"))
          .catch((err) => alert(err));
      }
    };
  
    const handleGoogle = () => {
      signInWithPopup(auth,googleProvider);
    };
   /* const handleFacebook = () => {
      auth.signInWithPopup(facebookProvider);
    };
    } */

  return (
    <div className="container">
            <div className="container-heading">
              
                
                <img
                  className="react"
                  alt=""
                  src={logo}
                ></img>{" "}
               
              
              <div className="content">
                <h3>{isRegister ? "Login" : "Register"}</h3>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  required={true}
                  placeholder="Enter your email"
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required={true}
                  placeholder="Enter your password"
                />
                <button onClick={handleSubmit} type="submit">
                  Done
                </button>
                {isLoginState === "login" && (
                  <>
                    <div className="providers">
                      <div onClick={handleGoogle} className="provider">
                        {/* <img src={} alt="google" /> */}
                      </div>
                   
                 
                  
                    </div>
                  </>
                )}
                <p>
                  {isRegister ? "New member? " : "Already registered? "}

                  <span onClick={() => setIsRegister((show) => !show)}>
                    {isRegister ? "Register" : "Login"}
                  </span>
                </p>
              </div>
            </div>
          </div>
  );
}

export default Login;