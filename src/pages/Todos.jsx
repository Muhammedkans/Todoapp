import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deletTodo, fetchTodos } from '../features/todoSlice';

const Todos = () => {
  const dispatch = useDispatch();
  const { loading, todos, error } = useSelector((state) => state.todo);
  const [text, setText] = useState('');
 
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (text.trim() !== '') {
      dispatch(addTodo(text));
      setText('');
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deletTodo(id));
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

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul>
        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo._id} >
              <span>{todo.title}</span> {/* or todo.text if your backend sends "text" */}
              <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No todos available</p>
        )}
      </ul>
    </div>
  );
};

export default Todos;
