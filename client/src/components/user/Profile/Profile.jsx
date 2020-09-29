import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { isAuthenticated } from "../../../API/auth";
import {
  readProfile,
  update,
  updateUserProfile,
} from "../../../API/profile/user-profile";
import Base from "../../base/Base";

function Profile() {
  const [profile, setProfile] = useState("");
  const [error, setError] = useState("");
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const data = await readProfile(userId, token);
      setProfile(data);
      setFormData({ ...formData, name: data.name, email: data.email });
    };
    fetchData();
  }, []);

  const showError = () => (
    <Alert variant="danger" onClose={() => setError(false)} dismissible>
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>{error}</p>
    </Alert>
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitting");
    const form = document.querySelector("form");

    if (formData.password !== formData.confirm) {
      //   event.preventDefault();
      //   event.stopPropagation();
      setError("Password don't match");
      return;
    }
    let result;
    const updateProfile = async () => {
      try {
        result = await updateUserProfile(userId, token, formData);
      } catch (error) {
        if(error){
          setError(error)
          return
        }
      }
      update(result, ()=>{
        setSuccess(true)
      })
      console.log(result.data);
    };
    updateProfile();
  };

  const showProfileForm = () => (
    <form
      // validated={value && setValidated(value)}
      as={Row}
      onSubmit={handleSubmit}
    >
      <Col md={{ span: 6, offset: 3 }}>
        <Form.Group as={Row} controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            defaultValue={formData.name}
            placeholder="Enter your username"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group as={Row} controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            defaultValue={formData.email}
            placeholder="Enter email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group as={Row} controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group as={Row} controlId="confirm">
          <Form.Label>Confirm</Form.Label>
          <Form.Control
            onChange={(e) =>
              setFormData({ ...formData, confirm: e.target.value })
            }
            type="password"
            placeholder="Confirm"
          />
        </Form.Group>

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </Col>
    </form>
  );

  const showSuccess = () => (
    <Alert
      variant="success"
      dismissible
      onClose={() => setSuccess(false)}
      dismissible
    >
      <Alert.Heading>Profile updated successfully</Alert.Heading>
    </Alert>
  );
  return (
    <Base title="profile" className="container">
      {/* {JSON.stringify(formData)} */}
      {/* {JSON.stringify(profile)} */}
      {success && showSuccess()}
      {error && showError()}
      {showProfileForm()}
    </Base>
  );
}

export default Profile;
