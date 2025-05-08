import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from './config';


function ScrollSections({ refresh, username, onNavigate }) {
  const [products, setProducts] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isHoveringLogin, setIsHoveringLogin] = useState(false);
  const [isHoveringDepartments, setIsHoveringDepartments] = useState(false);
;
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/products`); // שינוי להתחברות מרחוק
        setProducts(res.data);
        setLastUpdate(new Date());
      } catch (err) {
        console.error('Error loading products', err);
      }
    };
    fetchProducts();
  }, [refresh]);

  const renderTable = (department) => {
    const filtered = department === 'ALL'
      ? products
      : products.filter(p => p.department === department);

    return (
      <div style={{ overflowX: 'auto', marginTop: '20px' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#fff',
          color: '#000'
        }}>
          <thead>
            <tr>
              <th style={cellStyle}>Cat.Num</th>
              <th style={cellStyle}>Name</th>
              <th style={cellStyle}>Department</th>
              <th style={cellStyle}>Description</th>
              <th style={cellStyle}>Status</th>
              <th style={cellStyle}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(product => (
              <tr key={product._id}>
                <td style={cellStyle}>{product.catNum}</td>
                <td style={cellStyle}>{product.name}</td>
                <td style={cellStyle}>{product.department}</td>
                <td style={cellStyle}>{product.description}</td>
                <td style={cellStyle}>{product.status}</td>
                <td style={cellStyle}>{product.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const cellStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'center'
  };

  return (
    <div style={{ paddingTop: '10px', paddingBottom: '70px' }}>

      {/* SECTION 0 - HOME SCREEN */}
      <div
        id="section0"
        className="container-fluid p-0"
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: '100vh'
        }}
      >
        <img
  src="/high-strage.jpg"
  alt="high-strage"
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  }}
/>


        <div
          className="text-white d-flex justify-content-center align-items-center"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(3, 0, 0, 0.5)',
            textAlign: 'center',
            flexDirection: 'column'
          }}
        >
          <h1
            style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              textShadow: '2px 2px 10px rgba(0,0,0,1)'
            }}
          >
            SUN DIPO INVENTORY CATALOG
          </h1>

          {username && (
  <h3 style={{ marginTop: '10px', color: '#fff', textShadow: '1px 1px 3px rgba(0,0,0,1)' }}>
    Welcome {username}
  </h3>
)}


{username ? (
  <a
    href="#section1"
    className="btn mt-4"
    onMouseEnter={() => setIsHoveringDepartments(true)}
    onMouseLeave={() => setIsHoveringDepartments(false)}
    style={{
      backgroundColor: isHoveringDepartments ? '#006600' : '#004d00',
      color: '#fff',
      fontWeight: 'bold',
      padding: '5px 15px',
      fontSize: '1.1rem',
      borderRadius: '8px',
      border: '1px solid #fff',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.7)',
      transition: 'all 0.4s ease'
    }}
  >
    TO ALL DEPARTMENTS ⬇
  </a>
) : (
  <button
    onClick={() => onNavigate('login')}
    className="btn btn-warning mt-4"
    onMouseEnter={() => setIsHoveringLogin(true)}
    onMouseLeave={() => setIsHoveringLogin(false)}
    style={{
      fontWeight: 'bold',
      padding: '5px 15px',
      fontSize: '1.1rem',
      borderRadius: '8px',
      border: '1px solid #000',
      backgroundColor: isHoveringLogin ? '#ffc107' : '',
      boxShadow: isHoveringLogin
        ? '0 0 6px rgba(0,0,0,0.5)'
        : '0 0 4px rgba(0,0,0,0.4)',
      transition: 'all 0.3s ease'
    }}
  >
    Please Login
  </button>
)}



        </div>
      </div>

      {/* REST OF SECTIONS – only if logged in */}
      {username && (
        <>
          <div id="section1" className="container-fluid bg-primary text-white" style={{ padding: '100px 20px' }}>
            <h1>HOME</h1>
            <p style={{ fontSize: '18px' }}>Furniture. Paint. Accessories. DIY.</p>
            {renderTable('HOME')}
          </div>

          <div id="section2" className="container-fluid bg-success text-white" style={{ padding: '100px 20px' }}>
            <h1>GARDEN</h1>
            <p style={{ fontSize: '18px' }}>Plants. Tools. Materials. Furniture.</p>
            {renderTable('GARDEN')}
          </div>

          <div id="section3" className="container-fluid bg-secondary text-white" style={{ padding: '100px 20px' }}>
            <h1>KITCHEN</h1>
            <p style={{ fontSize: '18px' }}>Kitchenware. Accessories. Spices. Decorations.</p>
            {renderTable('KITCHEN')}
          </div>

          <div id="section4" className="container-fluid bg-warning text-dark" style={{ padding: '100px 20px' }}>
            <h1>VEHICLE</h1>
            <p style={{ fontSize: '18px' }}>Parts. Maintenance. Safety. Accessories.</p>
            {renderTable('VEHICLE')}
          </div>

          <div id="section5" className="container-fluid bg-dark text-white" style={{ padding: '100px 20px' }}>
            <h1>WEARABLE</h1>
            <p style={{ fontSize: '18px' }}>Women. Men. Children.</p>
            {renderTable('WEARABLE')}
          </div>

          <div id="section6" className="container-fluid text-white" style={{ padding: '100px 20px', backgroundColor: '#4a148c' }}>
            <h1>Overall Stock</h1>
            <p style={{ fontSize: '18px' }}>
              Last update -{" "}
              {lastUpdate ? lastUpdate.toLocaleString() : "loading..."} - by {username || "admin"}
            </p>
            {renderTable('ALL')}
          </div>
        </>
      )}
    </div>
  );
}

export default ScrollSections;
