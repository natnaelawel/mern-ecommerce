import React, { useState, useEffect } from "react";
import Base from "../../../../base/Base";
import { isAuthenticated } from "../../../../../API/auth";
import { Link, useParams } from "react-router-dom";
import { getProduct, editProduct } from "../../../../../API/admin/product";

import ImageUploader from "react-images-upload";
import { fetchCategories } from "../../../../../API/admin/category";
import { API_URL } from "../../../../../config";
import Select from "react-select";



function Edit() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    shipping: true,
    quantity: 0,
    photo: "",
  });

  const [errors, setErrors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [redirectToProfile, setRedirectToProfile] = useState(false);
  const [success, setSuccess] = useState();
  const { productId } = useParams("productId");
  const token = isAuthenticated().token;
  useEffect(() => {
    const fetchData = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
      const product = await getProduct(productId, token);
      console.log("product ", product);
      setFormData({
        ...formData,
        name: product.name,
        description: product.description,
        price: product.price,
        shipping: product.shipping,
        quantity: product.quantity,
        category: product.category,
        photo: product.photo
      });
    //   const category = categories[0]._id;
    //   setFormData({ ...formData, category: category });
    };
    fetchData();
  }, []);

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const categoryOptions = ()=>{
    let options = []
    options = categories.map(category=> ({label: category.name, value: category._id}))
    return options
  }

  const showSuccess = () => (
    <ul className="alert alert-info">
      <li>
        Product Editd successfully{" "}
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

  const onDrop = (photo) => {
    console.log(photo);
    setFile(photo[0]);
    // this.setState({
    //     pictures: this.state.pictures.concat(picture),
    // });
  };

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
    datas.append("category", formData.category._id);
    datas.append("description", formData.description);
    datas.append("price", formData.price);
    datas.append("quantity", formData.quantity);
    datas.append("shipping", formData.shipping);
    datas.append("photo", file);

    const EditNewProduct = async () => {
      setLoading(true);
      const result = await editProduct(productId ,_id, token, datas);
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
          shipping: true,
          quantity: 0,
          photo: 0
        });
      }
    };
    EditNewProduct();
  };


  const handleSelect = (selected)=>{
    setFormData({...formData, category:{_id: selected.value, name: selected.label}})
  }

  const EditProductForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="text-muted">
          Name
        </label>
        <input
          type="text"
          defaultValue={formData.name}
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
          defaultValue={formData.description}
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
          defaultValue={formData.price}
          id="price"
          name="price"
        />
      </div>
      <div className="form-group">
        <label htmlFor="category" className="text-muted">
          Category
        </label>
        {/* <select
          name="category"
          className="form-control"
          id="category"
          value={{ label: formData.category.name, value: formData.category._id }}
          onChange={handleChange("category")}
        >
          {categories?.map(({ _id, name }) => (
            <option key={_id} defaultValue={_id} >
              { name}
            </option>
          ))}
        </select> */}
        <Select
          onChange={handleSelect}
          defaultValue={{
            label: formData.category.name,
            value: formData.category._id,
          }}
          value={{
            label: formData.category.name,
            value: formData.category._id,
          }}
          options={categoryOptions()}
        ></Select>
      </div>
      <div className="row">
        <div className="form-group col-md-6">
          <label htmlFor="quantity" className="text-muted">
            Quantity
          </label>
          <input
            type="number"
            value={formData.quantity}
            onChange={handleChange("quantity")}
            className="form-control"
            id="quantity"
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="shipping" className="text-muted">
            Shipping
          </label>
          <select
            name="shipping"
            className="form-control"
            id="shipping"
            value={formData.shipping}
            onChange={handleChange("shipping")}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
      </div>

      <ImageUploader
        withIcon={true}
        buttonText="Choose images"
        onChange={onDrop}
        singleImage={true}
        value={[`${API_URL}/product/photo/${productId}`]}
        defaultValue={`${API_URL}/product/photo/${productId}`}
        defaultImages={[`${API_URL}/product/photo/${productId}`]}
        // value={formData.photo}
        // defaultImage= {formData.photo}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
        withPreview={true}
        fileSizeError="file size is too big"
      />

      <button
        className="btn btn-outline-success btn-outline my-2 btn-block"
        type="submit"
        disabled={loading}
      >
        {loading == false}
        {loading ? "Uploading..." : "Edit"}
      </button>
    </form>
  );
  return (
    <Base title="Edit Product" description="Edit product">
      <div className="row">
        <div className="col-md-6 offset-md-3">
            {JSON.stringify(formData)}
          {success && showSuccess()}
          {errors.length > 0 && showError()}
          {EditProductForm()}
        </div>
      </div>
    </Base>
  );
}

export default Edit;
