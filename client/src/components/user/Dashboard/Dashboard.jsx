import React from "react";
import "./Dashboard.css";
import Base from "../../base/Base";
import { isAuthenticated } from "../../../API/auth";
import { Link } from "react-router-dom";
import PurchaseHistory from "../PurchaseHistory/PurchaseHistory";
function Dashboard() {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();
  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/card" className="nav-link">
              My cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link to={`/user/profile/${_id}`} className="nav-link">
              Update Profile
            </Link>
          </li>
         
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Dashboard"
      description="User Dashboard"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-3">{userLinks()}</div>
        <div className="col-md-9">
          <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
              <li className="list-group-item">{name}</li>
              <li className="list-group-item">{email}</li>
              <li className="list-group-item">
                {role == 1 ? "Admin" : "Registered User"}
              </li>
            </ul>
          </div>
          <div className="card mb-2">
            <h3 className="card-header">Purchase history</h3>
            {PurchaseHistory()}
          </div>
        </div>
      </div>
    </Base>
  );
}

export default Dashboard;
