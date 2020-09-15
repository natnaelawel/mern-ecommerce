import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import { Link } from "react-router-dom";
import { updateCartItem, deleteCartItem } from "../../../helpers/cart";
function SingleCart({ cart, handleChangeInData }) {
  const [quantity, setQuantity] = useState(cart.count);
  const [totalPrice, setTotalPrice] = useState(cart.price * cart.count);

  useEffect(() => {
    const total = quantity * cart.price;
    setTotalPrice(total);
  }, [quantity]);

  const handleChange = (event) => {
    const value = event.target.value;
    setQuantity(value);
    updateCartItem(cart._id, value, () => console.log("quantity updated"));
    handleChangeInData();
  };
  const handleDelete = () => {
    deleteCartItem(cart._id, () => console.log("item deleted"));
    handleChangeInData();
  };
  return (
    <div key={cart._id} className="card my-3">
      <div className="row ">
        <div className="col-md-4 cart__image">
          <img src={`${API_URL}/product/photo/${cart._id}`} alt="" />
        </div>
        <div className="col-md-6 py-3 d-flex flex-column justify-content-between">
          <h2 className="h2 text-muted">{cart.name}</h2>
          <div className="cart__detail">
            <span className="badge badge-primary">In stock</span>
            <h5 className="d-flex my-1">
              <span className="mr-3">Quantity: </span>
              <input
                type="number"
                className="form-control"
                name="quantity"
                id="quantity"
                defaultValue={cart.count}
                min={1}
                onChange={handleChange}
                max={cart.quantity}
              />
            </h5>
          </div>
          <div className="">
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
        <div className="col-md-2 py-3 d-flex flex-column justify-content-between">
          <h4 className="text-muted">Price: ${cart.price}</h4>
          <div className="">
            <h5 className="lead text-muted">
              Total: <strong className="font-weight-bold">${totalPrice}</strong>{" "}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleCart;
