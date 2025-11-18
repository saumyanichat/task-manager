import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { getTasks, createTask, updateTask, deleteTask } from '../services/task';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Dashboard(){
  const { user, token, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');

  const load = async (f='') => {
    const { data } = await getTasks(token, f);
    setTasks(data);
  };

  useEffect(()=>{ if(token) load(filter); }, [token, filter]);

  const handleCreate = async (taskData) => {
    await createTask(token, taskData);
    load(filter);
  };

  const toggleComplete = async (task) => {
    await updateTask(token, task._id, { completed: !task.completed });
    load(filter);
  };

  const handleDelete = async (id) => {
    await deleteTask(token, id);
    load(filter);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Welcome, {user?.name}</h1>
        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          <button className="btn-logout" onClick={logout}>Log out</button>
        </div>
      </header>

      <div className="main-container">
        <TaskForm onCreate={handleCreate} />

        <div className="filter-container">
          <button 
            className={`filter-btn ${filter === '' ? 'active' : ''}`}
            onClick={()=>setFilter('')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'today' ? 'active' : ''}`}
            onClick={()=>setFilter('today')}
          >
            Today
          </button>
          <button 
            className={`filter-btn ${filter === 'week' ? 'active' : ''}`}
            onClick={()=>setFilter('week')}
          >
            Week
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={()=>setFilter('completed')}
          >
            Completed
          </button>
        </div>

        <TaskList tasks={tasks} onToggle={toggleComplete} onDelete={handleDelete} />
      </div>
    </div>
  );
}
