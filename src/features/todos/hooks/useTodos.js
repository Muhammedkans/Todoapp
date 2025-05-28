import {useMutation, useQuery, useQueryClient}  from "@tanstack/react-query"
import axios from "axios"
const API  = import.meta.env.VITE_API_URL + "/todo"

export const useTodos = (page = 1)=>{
  return useQuery({
    queryKey: ["todos",page],
    queryFn:async ()=>{
      const token = localStorage.getItem("token");
      const res =await axios.get(`${API}?page=${page}&limit=5`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      return {
        todos: res.data.todo,
        hasMore: res.data.hasmore
    }
  }
  })
}


export const useAddTodos =()=>{
  const queryClient = useQueryClient()
   return useMutation({
    mutationFn: async (newTodo)=>{
       const token = localStorage.getItem("token");
     const res =  await axios.post(API,{title:newTodo},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
     
       console.log(res)
      return res.data;
      
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
    
   })
}


export const deleteTodo =()=>{
  const queryClient = useQueryClient();
   return useMutation({
    mutationFn: async(id)=>{
      const token = localStorage.getItem("token")
      await axios.delete(`${API}/${id}`,{headers:{Authorization:`Bearer ${token}`}})
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['todos']})
    }
   })
  
}

