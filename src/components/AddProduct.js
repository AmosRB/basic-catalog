import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config';



export default function AddProduct({ onClose, onAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    description: '',
    status: 'in',
    amount: 0
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/products`, formData); // שינוי להתחברות מרחוק
      setMessage('Product added!');
      onAdded(); // 👈 trigger refresh
      setTimeout(onClose, 1000);      
    } catch (err) {
      setMessage('Failed to add product');
    }
  };

  return (
    <div onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex', justifyContent: 'center',
      alignItems: 'flex-start', paddingTop: '100px',
      zIndex: 9999
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        backgroundColor: '#111',
        color: '#fff',
        padding: '25px',
        borderRadius: '10px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 0 20px #0ff'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 10, right: 15,
          background: 'transparent', color: '#fff',
          border: 'none', fontSize: '20px', cursor: 'pointer'
        }}>❌</button>

        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Product</h3>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Name:</label><br />
            <input name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Department:</label><br />
            <select
  name="department"
  value={formData.department}
  onChange={handleChange}
  required
  style={{ width: '100%', padding: '8px' }}
>
  <option value="">Select department</option>
  <option value="HOME">HOME</option>
  <option value="GARDEN">GARDEN</option>
  <option value="KITCHEN">KITCHEN</option>
  <option value="VEHICLE">VEHICLE</option>
  <option value="WEARABLE">WEARABLE</option>
</select>

          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Description:</label><br />
            <textarea name="description" value={formData.description} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Status:</label><br />
            <select name="status" value={formData.status} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
              <option value="in">in</option>
              <option value="out">out</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Amount:</label><br />
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
          </div>
          <button type="submit" style={{
            width: '100%', padding: '10px',
            backgroundColor: '#0ff', color: '#000',
            border: 'none', borderRadius: '5px',
            fontWeight: 'bold'
          }}>Add</button>
        </form>

        {message && <p style={{ textAlign: 'center', marginTop: '15px' }}>{message}</p>}
      </div>
    </div>
  );
}
