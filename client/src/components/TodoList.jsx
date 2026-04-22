import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return <p className="no-tasks">No tasks yet! Add one above.</p>;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem 
          key={todo._id} 
          todo={todo} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default TodoList;