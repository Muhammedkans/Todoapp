import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


const API  = import.meta.env.VITE_API_URL + "/todo"



export const fetchTodos = createAsyncThunk( "todo/fetchTodos" , async (_, thunkAPI)=>{
  try{
    const token = localStorage.getItem("token");
const response = await axios.get(API, {
headers: {
        Authorization: `Bearer ${token}`
      }   
 });
 console.log(response.data);
  return response.data;
  }
  catch(error){
    return thunkAPI.rejectWithValue(error.response.data.message)
  }

});


export const addTodo =createAsyncThunk("Todo/addtodo",async (text , thunkAPI)=>{

  try{
    console.log(API);
    const token = localStorage.getItem("token");
    console.log(token)
const response = await axios.post(API,{title: text}, 
{
headers: {
        Authorization: `Bearer ${token}`
      }   
 }
);
console.log( "add todo", response);
 return response.data.newTodo;
  }catch(error){
    console.log(error);
   return thunkAPI.rejectWithValue(error.response.data.message);
  }
});


export const deletTodo = createAsyncThunk("Todo/deletetodo", async (id,thunkAPI)=>{
 try{
  const token = localStorage.getItem("token");
  await axios.delete(`${API}/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(id);
    console.log("suceess ");
  return id;
 }catch(error){
  console.error(error);
   return thunkAPI.rejectWithValue(error.response.data.message);
 }
});


const todoSlice = createSlice({
  name: "Todo",
  initialState:{
    todos:[],
    loading:false,
    error:null,
  },
  extraReducers:(builder)=>{
   builder.addCase(fetchTodos.pending, (state)=>{
    state.loading = true;
    state.error = null;
   })

   builder.addCase(fetchTodos.fulfilled, (state , action)=>{
     state.loading = false;
      state.todos = action.payload.todo;
   });

   builder.addCase(fetchTodos.rejected , (state, action)=>{
    state.loading = false;
    state.error = action.payload;
   })

   builder.addCase(addTodo.fulfilled, (state, action)=>{
      state.todos.push(action.payload);
   });

   builder.addCase(deletTodo.fulfilled,(state, action)=>{
    state.todos = state.todos.filter((todo)=>todo._id !==action.payload);
   });

  }

})


export default todoSlice.reducer;