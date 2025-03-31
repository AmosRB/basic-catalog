import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RemoveProduct({ onClose, onRemoved }) {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/products');
      setProducts(res.data);
    } catch (err) {
      setMessage('Failed to load products');
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setProducts(products.filter(p => p._id !== id));
      setMessage('Product deleted');
      onRemoved(); // ריענון בטבלת section6
    } catch (err) {
      setMessage('Failed to delete product');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div onClick={onClose} style={overlayStyle}>
      <div onClick={(e) => e.stopPropagation()} style={modalStyle}>
        <button onClick={onClose} style={closeBtn}>❌</button>
        <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Remove Products</h3>
        {message && <p style={{ textAlign: 'center' }}>{message}</p>}

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={cellStyle}>Cat.Num</th>
              <th style={cellStyle}>Name</th>
              <th style={cellStyle}>Department</th>
              <th style={cellStyle}>Status</th>
              <th style={cellStyle}>Amount</th>
              <th style={cellStyle}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td style={cellStyle}>{p.catNum}</td>
                <td style={cellStyle}>{p.name}</td>
                <td style={cellStyle}>{p.department}</td>
                <td style={cellStyle}>{p.status}</td>
                <td style={cellStyle}>{p.amount}</td>
                <td style={cellStyle}>
                  <button onClick={() => deleteProduct(p._id)} style={deleteBtn}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  backdropFilter: 'blur(4px)',
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
  maxWidth: '800px',
  maxHeight: '70vh',
  overflowY: 'auto',
  boxShadow: '0 0 20px #0ff',
  position: 'relative'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff',
  color: '#000'
};

const cellStyle = {
  border: '1px solid #ccc',
  padding: '6px',
  textAlign: 'center'
};

const deleteBtn = {
  backgroundColor: 'red',
  color: '#fff',
  border: 'none',
  padding: '4px 8px',
  borderRadius: '4px',
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
