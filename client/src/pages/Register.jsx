import React, { useState, useContext } from 'react';
import { register as apiRegister } from '../services/auth';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({ name:'', email:'', password:''});
  const { setUser, setToken } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiRegister(form);
      setUser(data.user);
      setToken(data.token);
      nav('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Error registering');
    }
  };

  return (
    <div className="app-container">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Register</h2>
            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              style={{ marginTop: '1rem' }}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
          <form onSubmit={submit} className="auth-form">
            <div className="form-group">
              <input 
                className="input"
                placeholder="Name" 
                value={form.name} 
                onChange={e => setForm({...form, name: e.target.value})} 
                required
              />
            </div>
            <div className="form-group">
              <input 
                className="input"
                placeholder="Email" 
                type="email"
                value={form.email} 
                onChange={e => setForm({...form, email: e.target.value})} 
                required
              />
            </div>
            <div className="form-group">
              <input 
                className="input"
                placeholder="Password" 
                type="password" 
                value={form.password} 
                onChange={e => setForm({...form, password: e.target.value})} 
                required
                minLength={6}
              />
            </div>
            <button type="submit" className="btn-primary">Register</button>
          </form>
          <div className="auth-link">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
