import "./Menu.css";
import React from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { signOut, isAuthenticated } from "../../API/auth";
import { getItemTotal } from "../../helpers/cart";

const isActive = (history, path) => {
  console.log(history);
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const cartIcon = () => {
  const cartItemNumber = getItemTotal();

  return (
    <div className="d-flex">
    <div className="cartIcon mx-1">
      <span className="cartIcon__number">{cartItemNumber}</span>
      <svg
        width="1.5em"
        height="1.5em"
        viewBox="0 0 16 16"
        className="bi bi-cart4"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
        />
      </svg>
    </div>
    <span>
      Cart
    </span>
    
    </div>
  );
};
function Menu() {
  const history = useHistory();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <ul className=" d-flex align-items-center list-unstyled m-0">
        <li className="nav-item">
          <Link className="navbar-brand" to="/">
            <img
              // src="http://localhost:8000/api/product/photo/5f5a76f770bde130406a2620"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/The_Book_Depository.svg/1024px-The_Book_Depository.svg.png"
              className="mx-2"
              width="100"
              height="30"
              alt=""
              loading="lazy"
            />
            Navbar
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/cart">
            {cartIcon()}
          </Link>
        </li>
      </ul>

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
