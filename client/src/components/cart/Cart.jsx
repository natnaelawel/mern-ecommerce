import React, { useEffect, useState } from "react";
import Base from "../base/Base";
import {
  getItemTotal,
  getAllCartItems,
  getTotalPrice,
} from "../../helpers/cart";
import { API_URL } from "../../config";
import "./Cart.css";
import { Link } from "react-router-dom";
import SingleCart from "./SingleCart/SingleCart";
import { isAuthenticated } from "../../API/auth";
function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [productDataChanged, setProductDataChanged] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartProducts(getAllCartItems());
    setTotalPrice(getTotalPrice());
  }, [productDataChanged]);

  const handleChangeInData = (id) => {
    setProductDataChanged((prev) => !prev);
  };
  return (
    <Base title="cart" className="container">
      <div className="row ">
        <div className="col-md-9">
          <div className="header px-3">
            <div className="display-4">Shopping Cart</div>
          </div>
          {cartProducts.length > 0 ? (
            cartProducts.map((cart) => (
              <SingleCart
                handleChangeInData={handleChangeInData}
                key={cart._id}
                cart={cart}
              />
            ))
          ) : (
            <div>
              <h2 className="display-4">
                Your cart is empty <Link to="/shop">Continue Shopping</Link>
              </h2>
            </div>
          )}
        </div>
        <div className="col-md-3">
          <div className="card p-2 mt-5 bg-light checkout d-flex flex-column justify-content-between ">
            <div className="h4 lead">
              Your cart has <strong> {cartProducts.length} </strong> items
            </div>
            <h4 className="lead text-muted font-weight-bold py-3">
              Total: <strong>${totalPrice}</strong> 
            </h4>
            <div className="checkout__btn mb-3">
              {isAuthenticated() ? (
                <button className="btn btn-warning btn-lg lead">
                  proceed to checkout{" "}
                </button>
              ) : (
                <Link to="/signin" className="btn btn-primary btn-lg lead">
                  signin to checkout{" "}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default Cart;
