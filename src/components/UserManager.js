import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config';


export default function UserManager({ onClose }) {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users`, { //שינוי
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers(res.data);
    } catch (err) {
      setMessage('Failed to load users');
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      setMessage('Failed to delete user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div onClick={onClose} style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backdropFilter: 'blur(4px)',
      backgroundColor: 'rgba(0,0,0,0.4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingTop: '100px',
      zIndex: 9999
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        backgroundColor: '#111',
        padding: '20px',
        borderRadius: '10px',
        color: '#fff',
        maxHeight: '70vh',
        overflowY: 'auto',
        boxShadow: '0 0 15px #0ff'
      }}>
        <h3 style={{ textAlign: 'center' }}>Manage Users</h3>
        {message && <p>{message}</p>}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map(user => (
            <li key={user._id} style={{ marginBottom: '10px' }}>
              {user.username} ({user.role})
              <button onClick={() => deleteUser(user._id)} style={{
                marginLeft: '10px',
                backgroundColor: 'red',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>❌</button>
            </li>
          ))}
        </ul>
        <button onClick={onClose} style={{
          marginTop: '10px',
          backgroundColor: '#333',
          color: '#fff',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '5px'
        }}>Close</button>
      </div>
    </div>
  );
}
