import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons";

export default function NavbarComponent() {
  return (
    <Navbar
      style={{
        marginBottom: "0",
        position: "sticky",
        zIndex: "10",
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "#eeeeee",
      }}
    >
      <Navbar.Brand as={Link} to="/" style={{ fontSize: "28px" }}>
        <FontAwesomeIcon icon={faGoogleDrive} />
        &nbsp; G-Drive
      </Navbar.Brand>
    </Navbar>
  );
}
