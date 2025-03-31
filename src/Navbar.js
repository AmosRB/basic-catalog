import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SunLogo from "./SunLogo.jpg";

function MyNavbar({
  onNavigate,
  username,
  onLogout,
  userRole,
  onManageUsers,
  onAddProduct,
  onRemoveProduct,
  onSearch
}) {
  const [searchText, setSearchText] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchText);
  };
  

  return (
    <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#home" className="d-flex align-items-center" onClick={() => onNavigate(null)}>
          <img
            src={SunLogo}
            alt="SunLogo"
            style={{ width: "30px", height: "auto", marginRight: "10px" }}
          />
          Sun Dipo catalog &copy; {new Date().getFullYear()}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* <Navbar.Text className="me-3">
              {username ? `Welcome ${username}` : ''}
            </Navbar.Text> */}

            <Nav.Link href="#section0" onClick={() => onNavigate(null)}>Home</Nav.Link>


            <NavDropdown title="Products" id="products-dropdown">
              <NavDropdown.Item href="#section1">Section 1</NavDropdown.Item>
              <NavDropdown.Item href="#section2">Section 2</NavDropdown.Item>
              <NavDropdown.Item href="#section3">Section 3</NavDropdown.Item>
              <NavDropdown.Item href="#section4">Section 4</NavDropdown.Item>
              <NavDropdown.Item href="#section5">Section 5</NavDropdown.Item>
              <NavDropdown.Item href="#section6">Section 6</NavDropdown.Item>
              <NavDropdown.Divider />
              {userRole === 'admin' ? (
                <>
                  <NavDropdown.Item onClick={onAddProduct}>Add item</NavDropdown.Item>
                  <NavDropdown.Item onClick={onRemoveProduct}>Remove item</NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item disabled>Admin only</NavDropdown.Item>
              )}
            </NavDropdown>

            <NavDropdown title="Login" id="login-dropdown">
              <NavDropdown.Item onClick={() => onNavigate('login')}>Login</NavDropdown.Item>
              <NavDropdown.Item onClick={() => onNavigate('register')}>Register</NavDropdown.Item>
              {userRole === 'admin' && (
                <>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={onManageUsers}>Manage Users</NavDropdown.Item>
                </>
              )}
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={onLogout}>Log Out</NavDropdown.Item>
            </NavDropdown>

            <Form onSubmit={handleSearchSubmit} className="d-flex ms-3" style={{ maxWidth: '250px' }}>
              <Form.Control
                type="search"
                size="sm"
                placeholder="Search item"
                className="me-2"
                aria-label="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button variant="outline-light" size="sm" type="submit">search</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
