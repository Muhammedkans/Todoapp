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
    try{
       const response = await axios.post("http://localhost:7777/user/login/todo",formData);
    }catch(error){
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
   
  }
);


const authSlice = createSlice({
  name:"auth",
  initialState:{
    user:null,
    token:token,
    loading:false,
    error:null
  },
  reducers:{
    logout:(state)=>{
      state.user = null;
      state.token =null;
      localStorage.removeItem("token");
    }
  },
  extraReducers:(builder)=>{
    
    builder.addCase(registerUser.pending, (state)=>{
     state.user = true;
     state.error = null;
    })

    builder.addCase(registerUser.fulfilled , (state,action)=>{
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token',action.payload.token)
    })

    builder.addCase(registerUser.rejected,(state,action)=>{
      state.loading =false;
      state.error = action.payload;
    })


    builder.addCase(loginUser.pending, (state)=>{
       state.loading = true;
       state.error =  null;
    })

    builder.addCase(loginUser.fulfilled, (state, action)=>{
       state.loading = false;
       state.user = action.payload.user;
       state.token = action.payload.token;
       localStorage.setItem('token',action.payload.token)
    })

    builder.addCase(loginUser.rejected, (state, action)=>{
    state.loading = false;
    state.error = action.payload;
    })
  }
})


export const { logout} = authSlice.actions;

export default authSlice.reducer;


