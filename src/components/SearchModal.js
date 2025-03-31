import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SearchModal({ query, onClose, userRole, onEdit }) {
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products/search?query=${encodeURIComponent(query)}`)
;
        setResults(res.data);
        if (res.data.length === 0) setMessage('No results found.');
      } catch (err) {
        setMessage('Search failed.');
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div onClick={onClose} style={overlayStyle}>
      <div onClick={(e) => e.stopPropagation()} style={modalStyle}>
        <button onClick={onClose} style={closeBtn}>❌</button>
        <h3 style={{ textAlign: 'center' }}>Search Results</h3>
        {message && <p style={{ textAlign: 'center' }}>{message}</p>}

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={cellStyle}>Cat.Num</th>
              <th style={cellStyle}>Name</th>
              <th style={cellStyle}>Department</th>
              <th style={cellStyle}>Status</th>
              <th style={cellStyle}>Amount</th>
              {userRole === 'admin' && <th style={cellStyle}>Edit</th>}
            </tr>
          </thead>
          <tbody>
            {results.map(p => (
              <tr key={p._id}>
                <td style={cellStyle}>{p.catNum}</td>
                <td style={cellStyle}>{p.name}</td>
                <td style={cellStyle}>{p.department}</td>
                <td style={cellStyle}>{p.status}</td>
                <td style={cellStyle}>{p.amount}</td>
                {userRole === 'admin' && (
                  <td style={cellStyle}>
                    <button onClick={() => onEdit(p)} style={editBtn}>🖉</button>
                  </td>
                )}
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

const editBtn = {
  backgroundColor: 'orange',
  color: '#000',
  border: 'none',
  padding: '4px 8px',
  borderRadius: '4px',
  cursor: 'pointer'
};
