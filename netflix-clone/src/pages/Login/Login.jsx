import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'

const Login = () => {

  const [signInState , setSignInState]= useState("Sign In");

  return (
    <div className='login'>
      <img src={logo} alt="" />
      <div className="login-form">
        <h1>{signInState}</h1>
        <form action="">
          {signInState === "Sign Up" ? <input type="text" placeholder='Your Name'/> : <></>}
          <input type="email" placeholder='Email'/>
          <input type="password" placeholder='Password'/>
          <button>{signInState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox"/>
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need help?</p>
          </div>
        </form>
        <div className="form-switch">

          {
            signInState=== "Sign In" 
            ? <p>New to Netflix? <span onClick={() =>{setSignInState("Sign Up")}}>Sign Up Now</span></p> 
            : <p>Already have account? <span onClick={() =>{setSignInState("Sign In")}}>Sign In Now</span ></p>
          }
          
          
        </div>
      </div>
    </div>
  )
}

export default Login
