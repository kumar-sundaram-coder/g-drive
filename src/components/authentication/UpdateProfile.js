import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar_2";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords Do not Match");
    }
    const promises = [];
    setError("");
    setLoading(true);

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/user");
      })
      .catch(() => {
        setError("Failed to update profile");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Navbar />
      <CenteredContainer>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-2">Update Profile</h2>
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
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  defaultValue={currentUser.email}
                />
              </Form.Group>
              <Form.Group id="password" className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  placeholder="Leave Blank to keep the same"
                />
              </Form.Group>
              <Form.Group id="password-confirm" className="mb-4">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  placeholder="Leave Blank to keep the same"
                />
              </Form.Group>
              <Button disabled={loading} type="submit" className="w-100">
                <FontAwesomeIcon
                  style={{ marginRight: "10px" }}
                  icon={faUserEdit}
                />
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <div className="w-100 text-center mt-2">
          <Link to="/user" className="btn btn-outline-danger">
            <FontAwesomeIcon
              style={{ marginRight: "10px" }}
              icon={faWindowClose}
            />
            Cancel
          </Link>
        </div>
      </CenteredContainer>
    </>
  );
}
