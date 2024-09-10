import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ContextGeneric from "../contexts/ContextGeneric.jsx";
import { useContext, useState, useEffect } from 'react';
import { TITLE } from '../config/constants.js';
import { useLocation } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

export default function ComponentNavbar() {
  // const { users } = useContext(ContextGeneric);
  const [menu, setMenu] = useState([]);
  const location = useLocation()
  const getMenu = () => {
    return JSON.parse(localStorage.getItem("menu"))
  }

  useEffect(() => {
    setMenu(getMenu());
  }, [location.pathname])
  
  return (
    <Navbar expand="lg" className="mb-4 bg-body-tertiary" sticky="top">
      <Container fluid>
        <Navbar.Brand href="#home" className={"d-flex align-items-center gap-3"}>
          <img
              alt=""
              src="https://icons.iconarchive.com/icons/hopstarter/halloween-avatar/128/Skull-icon.png"
              width="35"
              height="35"
              className="d-inline-block align-top"
            />{' '}
          <span className={"fw-medium"}>{TITLE}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {menu.map((value, index) => (
              <NavDropdown key={index} title={value.group} >
                {value.subMenu.map((val, i) => (
                  <NavDropdown.Item key={i} href={`#${val.pathMenu}` || "404"}>
                    {val.namaMenu}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            ))}
            
          </Nav>
          <Nav className="me-auto d-flex justify-content-end">
          <Nav.Link href="/">Sign Out</Nav.Link>
            </Nav>
          {/* <Nav className="me-auto">
            <Nav.Link href="#categories">Induk</Nav.Link>
            <Nav.Link href="#categories/requirements">Detail</Nav.Link>
            <Nav.Link href="#budgets">Budgeting</Nav.Link>
            <Nav.Link href="#budgets/used">Penggunaan</Nav.Link>
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}