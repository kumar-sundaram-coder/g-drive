import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReply,
  faUserPlus,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar_2";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Mail Sent! Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <>
      <Navbar />

      <CenteredContainer>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-3">Forgot Password</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <img
              src="./Anonymous.png"
              class="mx-auto d-block mb-4"
              style={{ width: "80px", height: "80px" }}
              alt="User_pic"
            ></img>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Button disabled={loading} type="submit" className="w-100 mt-2 mb-2">
                <FontAwesomeIcon
                  style={{ marginRight: "12px" }}
                  icon={faPaperPlane}
                />
                Reset Password
              </Button>
            </Form>

            <div className=" text-center mt-2 mb-2">
              <Link
                to="/login"
                style={{ fontSize: "14px" }}
                className="btn btn-outline-secondary"
              >
                <FontAwesomeIcon
                  style={{ marginRight: "6px" }}
                  icon={faReply}
                />
                Back to Login
              </Link>
            </div>
          </Card.Body>
        </Card>

        <div className="w-100 text-center mt-3">
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
