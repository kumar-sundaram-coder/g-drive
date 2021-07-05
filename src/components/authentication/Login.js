import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar_2";
import {
  faUserPlus,
  faSyncAlt,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <>
      <Navbar />
      <CenteredContainer>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-3">Log In</h2>
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
              <Button disabled={loading} type="submit" className="w-100 mt-3">
                <FontAwesomeIcon
                  style={{ marginRight: "6px" }}
                  icon={faUserShield}
                />
                Log In
              </Button>
            </Form>

            <div className=" text-center mt-3">
              <Link
                to="/forgot-password"
                style={{ fontSize: "14px" }}
                className="btn btn-outline-secondary"
              >
                <FontAwesomeIcon
                  style={{ marginRight: "6px" }}
                  icon={faSyncAlt}
                />
                Forgot Password
              </Link>
            </div>
          </Card.Body>
        </Card>

        <div className="w-100 text-center mt-2">
          <p className="d-inline" style={{ fontSize: "18px" }}>
            Need an account?
          </p>
          <Link
            to="/signup"
            style={{ marginLeft: "15px", fontSize: "11px" }}
            className="btn btn-outline-dark"
          >
            <FontAwesomeIcon style={{ marginRight: "8px" }} icon={faUserPlus} />
            Sign Up
          </Link>
        </div>
      </CenteredContainer>
    </>
  );
}
