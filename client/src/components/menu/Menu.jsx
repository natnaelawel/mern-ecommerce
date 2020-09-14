import "./Menu.css";
import React from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { signOut, isAuthenticated } from "../../API/auth";

const isActive = (history, path) => {
  console.log(history);
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};
function Menu() {
  const history = useHistory();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">
        <img
          src="http://localhost:8000/api/product/photo/5f5a76f770bde130406a2620"
          className="mx-2"
          width="60"
          height="30"
          alt=""
          loading="lazy"
        />
        Navbar
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mx-2 ">
            <Link className="nav-link" to="/shop">
              Shop
            </Link>
          </li>
          {isAuthenticated() ? (
            <>
              <li className="nav-item mx-2 ">
                <Link
                  //   style={isActive(history, "/signin")}
                  className="nav-link"
                  to={
                    isAuthenticated().user.role == 1
                      ? "/admin/dashboard"
                      : "/user/dashboard"
                  }
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item mx-2 ">
                <span
                  className="nav-link logout"
                  onClick={() =>
                    signOut(() => {
                      history.push("/");
                    })
                  }
                >
                  Signout
                </span>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item mx-2 ">
                <Link
                  //   style={isActive(history, "/signin")}
                  className="nav-link"
                  to="/signin"
                >
                  Signin
                </Link>
              </li>
              <li className="nav-item mx-2 ">
                <Link
                  //   style={isActive(history, "/signup")}
                  className="nav-link"
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
