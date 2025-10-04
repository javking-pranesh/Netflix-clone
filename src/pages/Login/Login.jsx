import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {
  const location = useLocation()
  const [signInState , setSignInState] = useState("Sign In")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    setName("")
    setEmail("")
    setPassword("")
  }, [location.pathname])

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if(signInState === "Sign In"){
      await login(email,password)
    } else {
      await signup(name,email,password)
    }
    setLoading(false);
  }

  const switchForm = (state) => {
    setSignInState(state)
    setName("")
    setEmail("")
    setPassword("")
  }

  return (
    loading ? <div className="login_spinner">
      <img src={netflix_spinner} alt="" />
    </div>
    :
    <div className='login'>
      <img src={logo} alt="Netflix Logo" />
      <div className="login-form">
        <h1>{signInState}</h1>
        <form onSubmit={user_auth}>
          {signInState === "Sign Up" &&
            <input value={name} onChange={ (e)=> setName(e.target.value)} type="text" placeholder='Your Name'/>
          }
          <input value={email} onChange={ (e)=> setEmail(e.target.value)} type="email" placeholder='Email'/>
          <input value={password} onChange={ (e)=> setPassword(e.target.value)} type="password" placeholder='Password'/>
          <button type='submit'>{signInState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox"/>
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signInState === "Sign In" ? (
            <p>
              New to Netflix? 
              <span onClick={() => switchForm("Sign Up")}>Sign Up Now</span>
            </p>
          ) : (
            <p>
              Already have account? 
              <span onClick={() => switchForm("Sign In")}>Sign In Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
