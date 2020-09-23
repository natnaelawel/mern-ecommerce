import React, { useEffect, useState } from "react";
import Base from "../base/Base";
import {
  getItemTotal,
  getAllCartItems,
  getTotalPrice,
  emptyCart,
} from "../../helpers/cart";
import { API_URL } from "../../config";
import "./Cart.css";
import { Link } from "react-router-dom";
import SingleCart from "./SingleCart/SingleCart";
import { isAuthenticated } from "../../API/auth";
import {
  getBraintreeClientToken,
  processPayment,
} from "../../API/payment/braintree";

// drop in

import DropIn from "braintree-web-drop-in-react";
import { createOrder } from "../../API/payment/order";

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [productDataChanged, setProductDataChanged] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // braintree state

  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  useEffect(() => {
    const fetchBraintreeToken = async () => {
      try {
        const result = await getBraintreeClientToken(userId, token);

        setData({ ...data, clientToken: result });
      } catch (error) {
        console.log("error is ", error);
      }
    };
    fetchBraintreeToken();
  }, []);
  useEffect(() => {
    setCartProducts(getAllCartItems());
    setTotalPrice(getTotalPrice());
  }, [productDataChanged]);

  const handleChangeInData = () => {
    setProductDataChanged((prev) => !prev);
  };

  const handleAddress = (event)=>{
    setData({...data, address: event.target.value})
  }
  const handlePay = () => {
    // send the nonce to
    // nonce = data.instance.requestPaymentMethod()
    const fetchNonce = async () => {
      try {
        let { nonce } = await data.instance.requestPaymentMethod();
        console.log("send nonce and total to process ", nonce, getTotalPrice());
        ///

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotalPrice(),
        };
        const result = await processPayment(userId, token, paymentData);
        console.log(result)
        // create order in a database

        createOrder(userId, token, {
          products: cartProducts,
          transaction_id: result.transaction.id,
          amount: result.transaction.amount,
          address: data.address
        });
        // empty cart
        setData({ ...data, success: result.success });
        emptyCart(() => {
          handleChangeInData();
        });

        console.log(result);
      } catch (error) {
        console.log("error is ", error.message);
        setData({ ...data, error: error.message });
      }
    };
    fetchNonce();
  };

  // const fetchNonce = async () => {
  //   let { nonce } = data.instance.requestPaymentMethod();
  //   const paymentData = {
  //     paymentMethodNonce: nonce,
  //     amount: getTotalPrice(),
  //   };
  //   console.log("send nonce and total to process ", nonce, getTotalPrice());

  //   const data = await processPayment(userId, token, paymentData);
  //   console.log(data);
  // };
  // fetchNonce();

  const showDropIn = () => (
    <div>
      {data.clientToken !== null && cartProducts.length > 0 && (
        <div>
          <div className="form-group">
            <label className="text-muted" htmlFor="address">
              Delivery Address
            </label>
            <textarea
              name="address"
              id="address"
              placeholder="Type your delivery address here..."
              className="form-control"
              id="address"
              onChange={handleAddress}

            ></textarea>
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "checkout",
                currency: "USD",
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={handlePay} className="btn btn-warning btn-block">
            Pay
          </button>
        </div>
      )}
    </div>
  );

  const showError = (error) => (
    <div className="alert alert-danger">{error}</div>
  );

  const showSuccess = (message) => (
    <div className="alert alert-success">Purchase successfully completed</div>
  );

  return (
    <Base title="cart" className="container">
      <div className="row ">
        <div className="col-md-8">
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
        <div className="col-md-4">
          <div className="card p-2 mt-5 bg-light checkout d-flex flex-column justify-content-between ">
            <div className="h4 lead">
              Your cart has <strong> {cartProducts.length} </strong> items
            </div>
            <h4 className="lead text-muted font-weight-bold py-3">
              Total: <strong>${totalPrice}</strong>
            </h4>
            <div className="checkout__btn mb-3">
              {data.error && showError(data.error)}
              {data.success && showSuccess(data.success)}
              {isAuthenticated() ? (
                // <button className="btn btn-warning btn-lg lead">
                //   proceed to checkout{" "}
                // </button>
                showDropIn()
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
