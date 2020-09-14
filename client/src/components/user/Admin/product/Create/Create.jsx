import React, { useState, useEffect } from "react";
import Base from "../../../../base/Base";
import { createProduct } from "../../../../../API/admin/product";
import { isAuthenticated } from "../../../../../API/auth";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../../../../API/admin/category";

function Create() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    shipping: "",
    quantity: 0,
  });

  const [errors, setErrors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [redirectToProfile, setRedirectToProfile] = useState(false);
  const [success, setSuccess] = useState();
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
      const category = categories[0]._id;
      setFormData({ ...formData, category: category });
    };
    fetchData();
  }, []);

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const showSuccess = () => (
    <ul className="alert alert-info">
      <li>
        Product Created successfully{" "}
        <Link to="admin/product/list">Show Product List</Link>{" "}
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
    const {
      user: { _id },
      token,
    } = isAuthenticated();
    setErrors("");
    setSuccess(false);

    const datas = new FormData();
    datas.append("name", formData.name);
    datas.append("category", formData.category);
    datas.append("description", formData.description);
    datas.append("price", formData.price);
    datas.append("quantity", formData.quantity);
    datas.append("shipping", formData.shipping);
    datas.append("photo", file);

    const createNewProduct = async () => {
      setLoading(true);
      const result = await createProduct(_id, token, datas);
      setLoading(false);
      console.log("result is ", result);
      if (result.errors) {
        setErrors(result.message);
      } else {
        setSuccess(true);
        setErrors(false);
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          shipping: "",
          quantity: 0,
        });
      }
    };
    createNewProduct();
  };

  const createProductForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="text-muted">
          Name
        </label>
        <input
          type="text"
          onChange={handleChange("name")}
          className="form-control"
          id="name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description" className="text-muted">
          Description
        </label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          name="description"
          id="description"
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="price" className="text-muted">
          Price
        </label>
        <input
          type="number"
          onChange={handleChange("price")}
          className="form-control"
          id="price"
          name="price"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category" className="text-muted">
          Category
        </label>
        <select
          name="category"
          className="form-control"
          id="category"
          onChange={handleChange("category")}
        >
          {categories?.map(({ _id, name }) => (
            <option key={_id} value={_id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="quantity" className="text-muted">
          Quantity
        </label>
        <input
          type="number"
          onChange={handleChange("quantity")}
          className="form-control"
          id="quantity"
        />
      </div>

      <div className="form-group">
        <label htmlFor="shipping" className="text-muted">
          Shipping
        </label>
        <select
          name="shipping"
          className="form-control"
          id="shipping"
          onChange={handleChange("shipping")}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="photo" className="text-muted"></label>
        <input
          //   onChange={(e) => setFile(e.target.files[0])}
          type="file"
          name="photo"
          accept="image/*"
          className="form-control btn btn-secondary"
          id="photo"
        />
      </div>

      <button
        className="btn btn-outline-success btn-outline my-2"
        type="submit"
        disabled={loading}
      >
        {loading == false}
        {loading ? "Uploading..." : "Create"}
      </button>
    </form>
  );
  return (
    <Base title="Create Product" description="Create product">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {success && showSuccess()}
          {errors.length > 0 && showError()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
}

export default Create;

// make api request
// const createNewProduct = async () => {
//   const data = await createProduct(_id, token, formDatas);
//   console.log("data is ", data);
//   if (data.errors) {
//     setErrors(data.errors);
//   } else {
//     setSuccess(true);
//     setErrors(false);
//     setFormData("");
//   }
// };
// createNewProduct();
