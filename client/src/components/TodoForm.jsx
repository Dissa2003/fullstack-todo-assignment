import React, { useState } from 'react';
import { PlusCircle, ChevronDown, ChevronUp } from 'lucide-react';

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), description.trim());
    setTitle('');
    setDescription('');
    setExpanded(false);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="form-input"
          maxLength={100}
        />
        <button
          type="button"
          className="expand-btn"
          onClick={() => setExpanded((v) => !v)}
          title="Add description"
          aria-label="Toggle description"
        >
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <button type="submit" className="add-btn" disabled={!title.trim()} title="Add task">
          <PlusCircle size={24} />
        </button>
      </div>

      {expanded && (
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description (optional)..."
          className="form-textarea"
          rows={3}
          maxLength={300}
        />
      )}

      <div className="form-meta">
        <span className={`char-count ${title.length > 80 ? 'warn' : ''}`}>
          {title.length}/100
        </span>
        <span className="form-hint">Press Enter to add</span>
      </div>
    </form>
  );
};

export default TodoForm;