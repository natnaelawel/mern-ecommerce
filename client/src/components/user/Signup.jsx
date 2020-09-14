import React, { useState } from "react";
import Base from "../base/Base";
import { signUp, isAuthenticated } from "../../API/auth";
import { Link, Redirect } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    success: false,
  });

  const handleChange = (name) => (event) => {
    setFormData({ ...formData, errors: [], [name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData({ ...formData, errors: [] });
    const { name, email, password, passwordConfirmation } = formData;
    const data = await signUp(name, email, password, passwordConfirmation);
    if (data.errors?.length > 0) {
      console.log(data.errors);
      setFormData({ ...formData, errors: data.errors, success: false });
    } else {
      setFormData({
        ...formData,
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        errors: [],
        success: true,
      });
    }
  };
  const showError = () => (
    <ul className="alert alert-danger">
      {formData.errors.map((error, index) => (
        <li className="" key={index}>
          {error.param} {error.msg}
        </li>
      ))}
    </ul>
  );
  const showSuccess = () => (
    <ul className="alert alert-info">
      <li>
        Account Created sign in <Link to="/signin">Sign in</Link>{" "}
      </li>
    </ul>
  );
  const signUpForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          onChange={handleChange("name")}
          className="form-control"
          id="name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          onChange={handleChange("email")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          onChange={handleChange("password")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Confirm</label>
        <input
          type="password"
          className="form-control"
          id="confirm"
          onChange={handleChange("passwordConfirmation")}
        />
      </div>
      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="remember"
          onChange={handleChange("remember")}
        />
        <label className="form-check-label" htmlFor="remember">
          Remember me
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Sign in
      </button>
    </form>
  );

  const redirectIfAuth = () => {
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };
  return (
    <div>
      <Base
        title="Sign up"
        description="sample signup"
        className="container col-md-6 offset-md-3"
      >
        {redirectIfAuth()}
        {formData.errors.length > 0 && showError()}
        {formData.success && showSuccess()}
        {signUpForm()}
      </Base>
    </div>
  );
}

export default Signup;
