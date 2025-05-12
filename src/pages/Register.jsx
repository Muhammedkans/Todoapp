import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../features/authSlice';

const Register = () => {
 const dispatch =useDispatch();
  const {loading , error} = useSelector((state)=>{
     return state.auth})

  const [form , setForm] = useState({
    name:"",
    email:"",
    password:"",
  })

  const handleChange = (e)=>{
   setForm({...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e)=>{
  e.preventDefault();
  dispatch(registerUser(form));
  }
  return (



    
    <div>
    <h1>Register</h1>

    <form onSubmit={handleSubmit} action="">

      <input placeholder='Name' type='text' name='name' value={form.name} onChange={handleChange} required />

      <input placeholder='Email' name='email' value={form.email} type='email' onChange={handleChange}  required/>
      
      <input type='password' placeholder='password' name='password' value={form.password} required onChange={handleChange}  />

      <button>
  
    {
      loading  ? "Registering" : "Register"
    }

      </button>
       {error &&  <p>{error}</p>}
    </form>


    </div>
  )
}

export default Register