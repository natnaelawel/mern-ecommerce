import React, { useState, useEffect } from "react";
import moment from "moment";
import { fetchProducts } from "../../../../../API/home";
import { isAuthenticated } from "../../../../../API/auth";
import Base from "../../../../base/Base";
import { Link } from "react-router-dom";
import { API_URL } from "../../../../../config";
import { deleteProduct } from "../../../../../API/admin/product";
function Index() {
  const [products, setProducts] = useState([]);
  const [success, setSuccess] = useState("")
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts();
      console.log(data);
      setProducts(data);
    };
    fetchData();
  }, []);

  const removeProduct = async(productId)=>{
    console.log(productId)
    const {data} = await deleteProduct(productId, userId, token)
    setProducts(products.filter(product=> product._id !== productId))
    setSuccess("Product Deleted Successfully")
    console.log(data, 'product deleted Successfully')
  }

  const showProducts = () =>
    products ? (
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Photo</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Quantity</th>
            <th scope="col">Sold</th>
            <th scope="col">Shipping</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <th scope="row">{index + 1}</th>
              <th>
                {" "}
                <img
                  style={{ width: "100px", height: "100px" }}
                  src={`${API_URL}/product/photo/${product._id}`}
                />
              </th>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.category.name}</td>
              <td>{product.quantity}</td>
              <td>{product.sold}</td>
              <td>{product.shipping ? "Yes" : "No"}</td>
              <td className="d-flex">
                <Link
                  to={`/admin/product/${product._id}/edit`}
                  className="btn btn-primary btn-sm mx-1"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm mx-1"
                  onClick={() => removeProduct(product._id)}
                >
                  Delete
                </button>
              </td>
              {/* <td>{moment(order.createdAt).fromNow()}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <h2>No Active Orders</h2>
    );
  return (
    <Base className="container" title="products list">
      {success && (
        <div className="alert alert-success">
          <div className="alert-text">
            {success}
          </div>
        </div>
      )}
      <div>{showProducts()}</div>
    </Base>
  );
}

export default Index;
