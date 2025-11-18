import React, { useState, useContext } from 'react';
import { login as apiLogin } from '../services/auth';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({ email:'', password:''});
  const { setUser, setToken } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiLogin(form);
      setUser(data.user);
      setToken(data.token);
      nav('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="app-container">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Login</h2>
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
              />
            </div>
            <button type="submit" className="btn-primary">Login</button>
          </form>
          <div className="auth-link">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
