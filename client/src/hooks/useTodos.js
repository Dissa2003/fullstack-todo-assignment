import { useState, useEffect } from 'react';
import * as api from '../api/todoApi';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const { data } = await api.getTodos();
      setTodos(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (title, description) => {
    try {
      await api.createTodo({ title, description });
      fetchTodos();
    } catch (err) { console.error("Add Error:", err); }
  };

  const removeTodo = async (id) => {
    try {
      await api.deleteTodo(id);
      fetchTodos();
    } catch (err) { console.error("Delete Error:", err); }
  };

  const toggleDone = async (id) => {
    try {
      await api.toggleTodoDone(id);
      fetchTodos();
    } catch (err) { console.error("Toggle Error:", err); }
  };

  return { todos, loading, addTodo, removeTodo, toggleDone };
};