import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../../../API/auth";
import Base from "../../../base/Base";
function Dashboard() {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();
  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/category/create" className="nav-link">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/product/create" className="nav-link">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link">
              View Orders
            </Link>
          </li>
          <li className="list-group-item">
            <Link to={`/admin/products`} className="nav-link">
              Manage Products
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Dashboard"
      description="Admin Dashboard"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-3">{adminLinks()}</div>
        <div className="col-md-9">
          <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
              <li className="list-group-item">{name}</li>
              <li className="list-group-item">{email}</li>
            </ul>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default Dashboard;
