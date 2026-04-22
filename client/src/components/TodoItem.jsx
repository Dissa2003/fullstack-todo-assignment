import React from 'react';
import { Trash2, CheckCircle, Circle } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`todo-item ${todo.done ? 'completed' : ''}`}>
      <div className="todo-content" onClick={() => onToggle(todo._id)}>
        {todo.done ? (
          <CheckCircle color="#22c55e" size={24} />
        ) : (
          <Circle color="#94a3b8" size={24} />
        )}
        <span className="todo-text">{todo.title}</span>
      </div>
      <button className="delete-btn" onClick={() => onDelete(todo._id)}>
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default TodoItem;