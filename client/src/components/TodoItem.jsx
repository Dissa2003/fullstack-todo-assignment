import React, { useState } from 'react';
import { Trash2, CheckCircle, Circle, Pencil, X, Check } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.description || '');

  const [editError, setEditError] = useState('');

  const handleSave = () => {
    if (!editTitle.trim()) {
      setEditError('Title is required.');
      return;
    }
    if (editTitle.trim().length < 2) {
      setEditError('Title must be at least 2 characters.');
      return;
    }
    if (editTitle.length > 100) {
      setEditError('Title cannot exceed 100 characters.');
      return;
    }
    setEditError('');
    onUpdate(todo._id, { title: editTitle.trim(), description: editDesc.trim() });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDesc(todo.description || '');
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSave(); }
    if (e.key === 'Escape') handleCancel();
  };

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr);
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  if (editing) {
    return (
      <div className="todo-item editing">
        <input
          className={`edit-input ${editError ? 'input-error' : ''}`}
          value={editTitle}
          onChange={(e) => { setEditTitle(e.target.value); if (editError) setEditError(''); }}
          onKeyDown={handleKeyDown}
          autoFocus
          maxLength={101}
          aria-invalid={!!editError}
          aria-describedby="edit-title-error"
        />
        {editError && (
          <p className="field-error" id="edit-title-error" role="alert">{editError}</p>
        )}
        <textarea
          className="edit-textarea"
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Description (optional)..."
          rows={2}
          maxLength={300}
        />
        <div className="edit-actions">
          <span className={`char-count ${editTitle.length > 80 ? 'warn' : ''}`}>
            {editTitle.length}/100
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="save-btn" onClick={handleSave} title="Save">
              <Check size={16} /> Save
            </button>
            <button className="cancel-btn" onClick={handleCancel} title="Cancel">
              <X size={16} /> Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.done ? 'completed' : ''}`}>
      <button
        className="toggle-btn"
        onClick={() => onToggle(todo._id)}
        title={todo.done ? 'Mark undone' : 'Mark done'}
      >
        {todo.done
          ? <CheckCircle size={22} className="icon-done" />
          : <Circle size={22} className="icon-circle" />}
      </button>

      <div className="todo-content">
        <span className="todo-title">{todo.title}</span>
        {todo.description && (
          <span className="todo-description">{todo.description}</span>
        )}
        <span className="todo-time">{timeAgo(todo.createdAt)}</span>
      </div>

      <div className="todo-actions">
        <button className="edit-btn" onClick={() => setEditing(true)} title="Edit">
          <Pencil size={16} />
        </button>
        <button className="delete-btn" onClick={() => onDelete(todo._id)} title="Delete">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;