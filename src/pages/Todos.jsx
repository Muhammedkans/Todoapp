import React, { useEffect, useState } from 'react';
import { useAddTodos, deleteTodo, useTodos } from '../features/todos/hooks/useTodos';
 import { useQueryClient } from "@tanstack/react-query";

const Todos = () => {
  const queryClient = useQueryClient();
  const [page,setPage] =useState(1);
 console.log(useTodos())
  const {data, isError, isLoading,error } = useTodos(page);
  console.log(data);
  const {mutate, isPending} =useAddTodos()
 const {mutate:deleteTodos } = deleteTodo()
  
  const [text, setText] = useState('');
 
 
  const handleAddTodo =  () => {
    if (text.trim() !== '') {
      mutate(text);
      setText('');
    }
  };

  const handleDeleteTodo = (id) => {
       deleteTodos(id)
  };

  return (
    <div>
      <input
        value={text}
        type="text"
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={handleAddTodo}>Add</button>

      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}

      <ul>
        {data && data.todos && data.todos.length > 0 ? (
          data.todos.map((todo) => (
            <li key={todo._id} >
              <span>{todo.title}</span> {/* or todo.text if your backend sends "text" */}
              <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No todos available</p>
        )}
      </ul>

      <button disabled={page===1} onClick={()=>{setPage(p=> Math.max(p-1,1))}}>Previous</button>
      <button onClick={()=> {
        if(data.hasMore){
          setPage(p=>p+1);
        }
      }  }>Next</button>
    </div>
  );
};

export default Todos;
