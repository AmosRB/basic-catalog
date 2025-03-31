import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config';


export default function Login({ onLogin, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/login`, { username, password });//שינוי 

      localStorage.setItem('token', res.data.token);
      onLogin(res.data.role, res.data.username);
      setMessage('Login successful!');
    } catch (err) {
      setMessage('Login failed: ' + (err.response?.data?.error || 'Server error'));
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '120px',
        zIndex: 9999,
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        backgroundColor: 'rgba(0,0,0,0.2)'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          backgroundColor: '#000',
          color: '#fff',
          padding: '30px',
          borderRadius: '10px',
          maxWidth: '400px',
          width: '90%',
          boxShadow: '0 0 20px #0ff',
          pointerEvents: 'auto',
          opacity: 0,
          transform: 'translateY(-20px)',
          animation: 'fadeIn 0.4s ease-out forwards'
        }}
      >
        <button onClick={onClose} style={{
          position: 'absolute', top: 10, right: 15,
          background: 'transparent', border: 'none',
          color: '#fff', fontSize: '20px', cursor: 'pointer'
        }}>❌</button>

        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h3>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '10px' }}>
            <label>Username:</label><br />
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '8px', borderRadius: '5px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Password:</label><br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px', borderRadius: '5px' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px',
            backgroundColor: '#0ff', color: '#000',
            border: 'none', borderRadius: '5px',
            fontWeight: 'bold' }}>Login</button>
        </form>
        <p style={{ marginTop: '15px', textAlign: 'center' }}>{message}</p>
      </div>
    </div>
  );
}
