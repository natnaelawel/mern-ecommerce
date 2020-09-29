import React, { useState } from "react";
import Base from "../base/Base";
import { signIn, authenticate, isAuthenticated } from "../../API/auth";
import { Redirect } from "react-router-dom";

function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errors: [],
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const handleChange = (name) => (event) => {
    setFormData({ ...formData, errors: [], [name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    console.log("email is ", formData.email);
    event.preventDefault();
    setFormData({ ...formData, errors: [], error: "", loading: true });
    const { email, password } = formData;
    const data = await signIn(email, password);
    console.log('data is ', data)
    if (data.errors?.length > 0) {
      console.log(data.errors);
      setFormData({
        ...formData,
        errors: data.errors,
        error: "",
        loading: false,
      });
    } else {
      console.log("data is ", data);
      if (data.message) {
        setFormData({
          ...formData,
          errors: [],
          error: data.message,
          loading: false,
        });
      } else {
        authenticate(data, () => {
          setFormData({
            ...formData,
            error: "",
            loading: false,
            redirectToReferrer: true,
          });
        });
      }
    }
  };
  const showError = () => (
    <ul className="alert alert-danger">
      {formData.errors?.length > 0 &&
        formData.errors.map((error, index) => (
          <li className="" key={index}>
            {error.param} {error.msg}
          </li>
        ))}
      {formData.error && <li className="">{formData.error}</li>}
    </ul>
  );
  const showLoading = () => <h2>Loading</h2>;
  const redirectUser = () => {
    // ormData.errors?.length < 0 && formData.error &&
    if (formData.redirectToReferrer) {
      const {user:{role}} = isAuthenticated()
     const path = role && role === 1 ? '/admin/dashboard' : '/user/dashboard';
      return <Redirect to={path} />;
    }
    if(isAuthenticated()){
      return <Redirect to='/' />;
    }
    return null;
  };

  const signInForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
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
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="remember" />
        <label className="form-check-label" htmlFor="remember">
          Remember me
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Sign in
      </button>
    </form>
  );

  return (
    <div>
      <Base
        title="Sign in"
        description="sample signin"
        className="container col-md-6 offset-md-3"
      >
        {formData.errors.length > 0 || (formData.error && showError())}
        {formData.loading && showLoading()}
        {signInForm()}
        {redirectUser()}
      </Base>
    </div>
  );
}

export default Signin;
