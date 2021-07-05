import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons";

export default function NavbarComponent() {
  return (
    <Navbar
      expand=""
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 10,
        backgroundColor: "#eeeeee",
      }}
    >
      <Navbar.Brand as={Link} to="/" style={{ fontSize: "28px" }}>
        <FontAwesomeIcon icon={faGoogleDrive} />
        &nbsp; G-Drive
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/user" style={{ fontSize: "20px" }}>
          My Profile
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
