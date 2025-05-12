import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';

const Navbar = () => {
  const dispatch   = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state)=> state.auth);

 const handleClick =() =>{
   dispatch(logout());
   navigate("/login");
 }

  return (
    <nav>

<h1>Todo App</h1>

{
  user ?  
 <>
<Link to="/"> Todo </Link>
 <button onClick={handleClick}>Logout </button>
 </>
  : 
  <>
  <Link to="/login"> Login</Link>
  <Link to="/register"> Register</Link>
  </>
}
    </nav>
  )
}

export default Navbar