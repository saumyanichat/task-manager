import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('ptm_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('ptm_token') || null);

  useEffect(() => {
    if (user) localStorage.setItem('ptm_user', JSON.stringify(user));
    else localStorage.removeItem('ptm_user');
    if (token) localStorage.setItem('ptm_token', token);
    else localStorage.removeItem('ptm_token');
  }, [user, token]);

  const logout = () => { setUser(null); setToken(null); };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
