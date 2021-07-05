import React, { useState } from "react";
import { Alert, Card } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faShare, faEdit } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar_2";

export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <>
      <Navbar />
      <CenteredContainer>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-2 mt-3">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <img
              src="./Anonymous.png"
              class="mx-auto d-block mb-3"
              style={{ width: "80px", height: "80px" }}
              alt="User_pic"
            ></img>
            <p>
              <b>Email: </b>
              {currentUser.email}
            </p>
            <Link
              to="/update-profile"
              className="btn btn-primary w-100 mt-1 mb-3"
            >
              <FontAwesomeIcon style={{ marginRight: "10px" }} icon={faEdit} />
              Update Profile
            </Link>
          </Card.Body>
        </Card>

        <div className="d-flex justify-content-between">
          <div className=" text-center mt-3">
            <Link to="/" className="btn btn-outline-success">
              <FontAwesomeIcon style={{ marginRight: "6px" }} icon={faReply} />
              Back to G-Drive
            </Link>
          </div>

          <div className=" text-center mt-3">
            <Link onClick={handleLogout} className="btn btn-outline-danger">
              Log Out
              <FontAwesomeIcon style={{ marginLeft: "6px" }} icon={faShare} />
            </Link>
          </div>
        </div>
      </CenteredContainer>
    </>
  );
}
