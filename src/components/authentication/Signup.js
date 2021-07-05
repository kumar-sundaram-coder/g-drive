import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserTag } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar_2";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords Do not Match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to Create an Account");
    }
    setLoading(false);
  }

  return (
    <>
      <Navbar />
      <CenteredContainer>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-3">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <img
              src="./Anonymous.png"
              class="mx-auto d-block"
              style={{ width: "80px", height: "80px" }}
              alt="User_pic"
            ></img>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password" className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm" className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button disabled={loading} type="submit" className="w-100 mb-1">
                <FontAwesomeIcon
                  style={{ marginRight: "6px" }}
                  icon={faUserTag}
                />
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <div className="w-100 text-center mt-3">
          <p className="d-inline" style={{ fontSize: "18px" }}>
            Already have an account?
          </p>
          <Link
            to="/login"
            style={{ marginLeft: "15px", fontSize: "11px" }}
            className="btn btn-outline-dark"
          >
            <FontAwesomeIcon style={{ marginRight: "8px" }} icon={faUser} />
            Log In
          </Link>
        </div>
      </CenteredContainer>
    </>
  );
}
