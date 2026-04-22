import React from 'react';
import { useTodos } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const { todos, loading, addTodo, updateTodo, removeTodo, toggleDone } = useTodos();

  return (
    <div className="container">
      <h1 className="header">TODOs</h1>

      <TodoForm onAdd={addTodo} />

      {loading ? (
        <div className="loading-wrapper">
          <span className="spinner" />
          <p className="loading">Loading tasks...</p>
        </div>
      ) : (
        <TodoList
          todos={todos}
          onToggle={toggleDone}
          onDelete={removeTodo}
          onUpdate={updateTodo}
        />
      )}
    </div>
  );
}

export default App;