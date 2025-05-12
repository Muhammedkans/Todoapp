import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/authSlice';

const Login = () => {
  const dispatch = useDispatch();

  const  {loading , error,} = useSelector((state)=>state.auth);

 

  const [formData , setFormData] = useState({
    email:"",
    password:"",
  })

  const handleChange =(e)=>{
      setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit =(e)=>{
   e.preventDefault();
   dispatch(loginUser(formData));
  }

  return (
    <div>

   <form  onSubmit={handleSubmit}>
  <input name='email' placeholder='Email' value={formData.email} type='email' onChange={handleChange} required/>

  <input type='email' name='password' placeholder='password' value={formData.password} onChange={handleChange} required/>

  <button>
  
  {loading ? "Loginggg" : "Login"}

  </button>

  {error && <p>{error} </p>}

   </form>


    </div>
  )
}

export default Login