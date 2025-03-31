import React, { useState, useEffect } from 'react';
import MyNavbar from './Navbar';
import Footer from './Footer';
import ScrollSections from './ScrollSections';
import Login from './components/Login';
import Register from './components/Register';
import UserManager from './components/UserManager';
import AddProduct from './components/AddProduct';
import RemoveProduct from './components/RemoveProduct';
import SearchModal from './components/SearchModal';
import EditProduct from './components/EditProduct';



function App() {
  const [currentPage, setCurrentPage] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [showUserManager, setShowUserManager] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    if (token && name && role) {
      setUsername(name);
      setUserRole(role);
    }
  }, []);

  useEffect(() => {
    if (!username) {
      document.body.style.overflow = 'hidden';   // מניע גלילה
      document.documentElement.style.overflow = 'hidden'; // למקרה של html
    } else {
      document.body.style.overflow = 'auto';     // מחזיר גלילה
      document.documentElement.style.overflow = 'auto';
    }
  }, [username]);
  
  

  const handleLogin = (role, name) => {
    localStorage.setItem('role', role);
    localStorage.setItem('username', name);
    setUserRole(role);
    setUsername(name);
    setCurrentPage(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserRole(null);
    setUsername(null);
    setCurrentPage(null);
    setShowUserManager(false);
    setShowAddProduct(false);
  };

  const [productRefresh, setProductRefresh] = useState(false);

  const [showRemoveProduct, setShowRemoveProduct] = useState(false);

  const [productToEdit, setProductToEdit] = useState(null);


  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowSearchModal(true);
  };
  
  

  return (
    <>
<MyNavbar
  onNavigate={setCurrentPage}
  username={username}
  userRole={userRole}
  onLogout={handleLogout}
  onManageUsers={() => setShowUserManager(true)}
  onAddProduct={() => setShowAddProduct(true)}
  onRemoveProduct={() => setShowRemoveProduct(true)}
  onEdit={(product) => setProductToEdit(product)}
  onSearch={handleSearch}
/>

<ScrollSections refresh={productRefresh} username={username} onNavigate={setCurrentPage}/>

      {currentPage === 'login' && (
        <Login onLogin={handleLogin} onClose={() => setCurrentPage(null)} />
      )}

      {currentPage === 'register' && (
        <Register onClose={() => setCurrentPage(null)} />
      )}

      {showUserManager && (
        <UserManager onClose={() => setShowUserManager(false)} />
      )}

{showAddProduct && (
  <AddProduct
    onClose={() => setShowAddProduct(false)}
    onAdded={() => setProductRefresh(prev => !prev)}
  />
)}

{showRemoveProduct && (
  <RemoveProduct
    onClose={() => setShowRemoveProduct(false)}
    onRemoved={() => setProductRefresh(prev => !prev)}
  />
)}
{showSearchModal && (
  <SearchModal
    query={searchQuery}
    onClose={() => setShowSearchModal(false)}
    userRole={userRole}
    onEdit={(product) => setProductToEdit(product)}
  />
)}


{productToEdit && (
  <EditProduct
    product={productToEdit}
    onClose={() => setProductToEdit(null)}
    onSaved={() => {
      setProductRefresh(prev => !prev); // מרענן טבלאות אם צריך
      setShowSearchModal(false);        // סוגר את תוצאות החיפוש
    }}
  />
)}


      <Footer />
    </>
  );
}




export default App;
