import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../App.css";
import { Link } from "react-router-dom";

function Navegation() {
  return (
    <header className="header">
      <Navbar expand="lg" className="navbar-body">
        <Container>
          <Navbar.Brand as={Link} to="/homepage">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7315/7315339.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="X"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as="a"
                href="http://localhost:3001/transactions"
                target="_blank"
                rel="noopener noreferrer"
              >
                Transactions
              </Nav.Link>
              <Nav.Link as={Link} to="/inventory">
                Inventory
              </Nav.Link>
              <NavDropdown title="Data" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/tools">
                  Tools
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/workers">
                  Workers
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/export">
                  Export Data
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Nav.Link as={Link} to="/">
          Logout
        </Nav.Link>
      </Navbar>
    </header>
  );
}

export default Navegation;
