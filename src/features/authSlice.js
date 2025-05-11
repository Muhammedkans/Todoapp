import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



const token  = localStorage.getItem("token")|| null;

const registerUser = createAsyncThunk('auth/register', async (formData ,thunkAPI)=>{
try{
  const response = await axios.post("http://localhost:7777/user/register/todo",formData);

  return response.data;
}catch(error){
  return thunkAPI.rejectWithValue(error.response.data.message);
}
});


const loginUser  = createAsyncThunk(
  "auth/login", async(formData , thunkAPI)=>{
    const response = await axios.post("")
  }
)