import React, { useState } from 'react';
import axios from 'axios';

export default function EditProduct({ product, onClose, onSaved }) {
  const [formData, setFormData] = useState({
    name: product.name || '',
    department: product.department || '',
    description: product.description || '',
    status: product.status || 'in',
    amount: product.amount || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/products/${product._id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      onSaved(); // הודע ל-App לרענן
      onClose();
    } catch (err) {
      console.error('Failed to save', err);
    }
  };

  return (
    <div onClick={onClose} style={overlayStyle}>
      <div onClick={(e) => e.stopPropagation()} style={modalStyle}>
        <button onClick={onClose} style={closeBtn}>❌</button>
        <h3 style={{ textAlign: 'center' }}>Edit Product</h3>

        <form onSubmit={handleSave}>
          {['name', 'department', 'description', 'status', 'amount'].map(field => (
            <div key={field} style={{ marginBottom: '10px' }}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label><br />
              {field === 'status' ? (
                <select name="status" value={formData.status} onChange={handleChange} style={inputStyle}>
                  <option value="in">in</option>
                  <option value="out">out</option>
                </select>
              ) : (
                <input
                  type={field === 'amount' ? 'number' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  style={inputStyle}
                />
              )}
            </div>
          ))}
          <button type="submit" style={saveBtn}>Save</button>
        </form>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.6)',
  backdropFilter: 'blur(5px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: '100px',
  zIndex: 9999
};

const modalStyle = {
  backgroundColor: '#111',
  color: '#fff',
  padding: '20px',
  borderRadius: '10px',
  width: '90%',
  maxWidth: '500px',
  boxShadow: '0 0 20px #0ff',
  position: 'relative'
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '5px'
};

const saveBtn = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  fontWeight: 'bold',
  backgroundColor: '#0ff',
  border: 'none',
  cursor: 'pointer'
};

const closeBtn = {
  position: 'absolute',
  top: 10,
  right: 15,
  background: 'transparent',
  color: '#fff',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer'
};
