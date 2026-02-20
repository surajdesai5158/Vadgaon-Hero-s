import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const GuestOneNavbar = () => {
  return (
    <>
      {/* Inline styles for brand */}
      <style>
        {`
          .brand-text {
            font-size: 26px;
            font-weight: bold;
            color: #ff5733 !important;
          }

          .nav-link-custom {
            color: #ffffff !important;
            margin-left: 12px;
            font-size: 16px;
          }

          .nav-link-custom.active {
            color: #00cec9 !important;
            font-weight: 600;
          }
        `}
      </style>

      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          {/* LOGO / TITLE */}
          <Navbar.Brand as={NavLink} to="/" className="brand-text">
            Vadgaon Worriers
          </Navbar.Brand>

          {/* TOGGLE BUTTON (MOBILE) */}
          <Navbar.Toggle aria-controls="guest-navbar" />

          {/* COLLAPSIBLE MENU */}
          <Navbar.Collapse id="guest-navbar">
            <Nav className="ms-auto text-center">
              <Nav.Link
                as={NavLink}
                to="/contact"
                className="nav-link-custom"
              >
                Contact
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/register"
                className="nav-link-custom"
              >
                Register
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/login"
                className="nav-link-custom"
              >
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default GuestOneNavbar;