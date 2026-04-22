import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, ""); 
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input 
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit" className="add-btn">
        <PlusCircle size={28} />
      </button>
    </form>
  );
};

export default TodoForm;