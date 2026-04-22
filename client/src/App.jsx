import React from 'react';
import { useTodos } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const { todos, loading, addTodo, removeTodo, toggleDone } = useTodos();

  return (
    <div className="container">
      <h1 className="header">M_Lithium TODOs</h1>
      
      <TodoForm onAdd={addTodo} />

      {loading ? (
        <p className="loading">Loading tasks...</p>
      ) : (
        <TodoList 
          todos={todos} 
          onToggle={toggleDone} 
          onDelete={removeTodo} 
        />
      )}
    </div>
  );
}

export default App;