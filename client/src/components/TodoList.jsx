import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { ClipboardList } from 'lucide-react';

const FILTERS = ['All', 'Active', 'Done'];

const TodoList = ({ todos, onToggle, onDelete, onUpdate }) => {
  const [filter, setFilter] = useState('All');

  const filtered = todos.filter((t) => {
    if (filter === 'Active') return !t.done;
    if (filter === 'Done') return t.done;
    return true;
  });

  const doneCount = todos.filter((t) => t.done).length;
  const activeCount = todos.length - doneCount;

  return (
    <div className="todo-list-wrapper">
      <div className="list-header">
        <div className="list-stats">
          <span className="stat"><strong>{activeCount}</strong> active</span>
          <span className="stat-divider">·</span>
          <span className="stat"><strong>{doneCount}</strong> done</span>
        </div>

        <div className="filter-tabs">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <ClipboardList size={40} className="empty-icon" />
          <p>{filter === 'Done' ? 'No completed tasks yet.' : filter === 'Active' ? 'All tasks done!' : 'No tasks yet. Add one above.'}</p>
        </div>
      ) : (
        <div className="todo-list">
          {filtered.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;