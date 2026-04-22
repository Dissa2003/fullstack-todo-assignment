import React, { useState } from 'react';
import { PlusCircle, ChevronDown, ChevronUp } from 'lucide-react';

const validate = (title, description) => {
  const errors = {};
  if (!title.trim()) {
    errors.title = 'Title is required.';
  } else if (title.trim().length < 2) {
    errors.title = 'Title must be at least 2 characters.';
  } else if (title.length > 100) {
    errors.title = 'Title cannot exceed 100 characters.';
  }
  if (description.length > 300) {
    errors.description = 'Description cannot exceed 300 characters.';
  }
  return errors;
};

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [touched, setTouched] = useState({ title: false, description: false });

  const errors = validate(title, description);
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ title: true, description: true });
    if (!isValid) return;
    onAdd(title.trim(), description.trim());
    setTitle('');
    setDescription('');
    setExpanded(false);
    setTouched({ title: false, description: false });
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, title: true }))}
          placeholder="Add a new task..."
          className={`form-input ${touched.title && errors.title ? 'input-error' : ''}`}
          maxLength={101}
          aria-invalid={!!(touched.title && errors.title)}
          aria-describedby="title-error"
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
        <button type="submit" className="add-btn" title="Add task">
          <PlusCircle size={24} />
        </button>
      </div>

      {touched.title && errors.title && (
        <p className="field-error" id="title-error" role="alert">{errors.title}</p>
      )}

      {expanded && (
        <>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, description: true }))}
            placeholder="Add a description (optional)..."
            className={`form-textarea ${touched.description && errors.description ? 'input-error' : ''}`}
            rows={3}
            maxLength={301}
            aria-invalid={!!(touched.description && errors.description)}
            aria-describedby="desc-error"
          />
          {touched.description && errors.description && (
            <p className="field-error" id="desc-error" role="alert">{errors.description}</p>
          )}
        </>
      )}

      <div className="form-meta">
        <span className={`char-count ${title.length > 80 ? 'warn' : ''} ${title.length > 100 ? 'error' : ''}`}>
          {title.length}/100
        </span>
        {expanded && (
          <span className={`char-count ${description.length > 280 ? 'warn' : ''} ${description.length > 300 ? 'error' : ''}`}>
            {description.length}/300
          </span>
        )}
        <span className="form-hint">Press Enter to add</span>
      </div>
    </form>
  );
};

export default TodoForm;