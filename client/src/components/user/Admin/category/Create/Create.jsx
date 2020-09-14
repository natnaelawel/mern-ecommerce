import React, { useState } from "react";
import "./Create.css";
import Base from "../../../../base/Base";
import { createCategory } from "../../../../../API/admin/category";
import { isAuthenticated } from "../../../../../API/auth";
import { Link } from "react-router-dom";

function Create() {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    user: { _id },
    token,
  } = isAuthenticated();

  const handleChange = (event) => {
    setErrors("");
    setName(event.target.value);
  };

  const showSuccess = () => (
    <ul className="alert alert-info">
      <li>
        Category Create successfully{" "}
        <Link to="/category/list">Show Category List</Link>{" "}
      </li>
    </ul>
  );

    const showError = () => (
      <ul className="alert alert-danger">
        {errors?.length > 0 &&
          errors.map((error, index) => (
            <li className="" key={index}>
              {error.msg}
            </li>
          ))}
      </ul>
    );

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors("");
    setSuccess(false);
    // make api request
    const createNewCategory = async () => {
      const data = await createCategory(_id, token, name);
      console.log("data is ", data);
      if (data.errors) {
        setErrors(data.errors)
      }else{
        setSuccess(true);
        setErrors(false)
        setName('')
      }
    };
    createNewCategory();
  };
  const createCategoryForm = () => (
    <form onSubmit={handleSubmit} method="post">
      <div className="form-group">
        <label htmlFor="name" className="text-muted">
          Name
        </label>
        <input
          type="text"
          onChange={handleChange}
          value={name}
          autoFocus
          className="form-control"
          id="name"
        />
      </div>
      <button
        className="btn btn-outline-success btn-outline my-2"
        type="submit"
      >
        Create
      </button>
    </form>
  );
  return (
    <Base title="Create Category" description="Create category">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {success && showSuccess()}
          {errors.length > 0 && showError()}
          {createCategoryForm()}
        </div>
      </div>
    </Base>
  );
}

export default Create;
