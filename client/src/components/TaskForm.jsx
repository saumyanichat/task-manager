import React, { useState } from 'react';

export default function TaskForm({ onCreate }){
  const [form, setForm] = useState({ title: '', description: '', dueDate: '' });

  const submit = (e) => {
    e.preventDefault();
    onCreate({
      title: form.title,
      description: form.description,
      dueDate: form.dueDate ? new Date(form.dueDate) : null
    });
    setForm({ title: '', description: '', dueDate: '' });
  };

  return (
    <div className="form-container">
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--text)' }}>Create New Task</h2>
      <form onSubmit={submit} className="auth-form">
        <div className="form-group">
          <input 
            className="input"
            value={form.title} 
            onChange={e => setForm({...form, title: e.target.value})} 
            placeholder="Task Title" 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            className="input"
            value={form.description} 
            onChange={e => setForm({...form, description: e.target.value})} 
            placeholder="Description (optional)" 
          />
        </div>
        <div className="form-group">
          <input 
            className="input"
            type="date" 
            value={form.dueDate} 
            onChange={e => setForm({...form, dueDate: e.target.value})} 
          />
        </div>
        <button type="submit" className="btn-primary">Create Task</button>
      </form>
    </div>
  )
}
