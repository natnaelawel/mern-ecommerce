import React, { useEffect, useState } from "react";
import { fetchOrders, updateOrderStatus } from "../../../../API/admin/order";
import { isAuthenticated } from "../../../../API/auth";
import Base from "../../../base/Base";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOrders(userId, token);
      console.log(data);
      setOrders(data);
      //   setSelectedOrder(data[0])
    };
    fetchData();
  }, []);

  const showOrders = () =>
    orders ? (
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Status</th>
            <th scope="col">Products</th>
            <th scope="col">Address</th>
            <th scope="col">Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <th scope="row">{index + 1}</th>
              <td>{order.user.name}</td>
              <td>{order.status}</td>
              <td>
                {order.products.map((product, innerIndex) => (
                  <p key={product._id}>
                    {" "}
                    {innerIndex + 1},
                    <a
                      href="#"
                      className="popover-test"
                      title={`Name: ${product.name}
                            \nPrice: ${product.price}
                            \nOrdered Date: ${moment(product.createdAt).format(
                              "MM/DD/YYYY"
                            )}`}
                    >
                      {product.name}
                    </a>{" "}
                    count: {product.count}
                  </p>
                ))}
              </td>
              <td>{order.address}</td>
              <td>{moment(order.createdAt).fromNow()}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm mx-2"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => handleChangeStatus(order)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <h2>No Active Orders</h2>
    );

  const handleChangeStatus = (order = orders[0]) => {
    // console.log("clicked", order);
    setSelectedOrder(order);
    setShowModal(true)
    // showChangeStatusModal(order);
  };

  const submitChangeStatus = async (e) => {
    e.preventDefault();
    const data = {
        orderId: selectedOrder._id,
        status: selectedOrderStatus,
        token,
        userId
    }
    const response = await updateOrderStatus(
     data
    );
    setSuccess(true);
    setShowModal(false)
    const newOrders = orders.map(order=>{
        if(order._id === response._id){
            return response
        }
        return order
    })
    setOrders(newOrders)
    console.log(response);
  };

  const showSuccess = () => {
    setTimeout(() => {
      return (
        <div className="bg-success">
          <h4>Status Updated Successfully</h4>
        </div>
      );
    }, 2000);
  };
  const handleClose = () => {
    setSelectedOrderStatus("Not Processed")
    setShowModal(false)

  };
  const showChangeStatusModal = () => {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Change Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <h5 className="lead">Order Detail</h5>
          <ul className="un-styled my-3">
            {selectedOrder.products?.map((product, index) => (
              <li key={product._id} className="unstyled">
                {index + 1},<span> Name: {product.name}</span>
                <span className="mx-3">
                  {" "}
                  <strong>Count:</strong> {product.count}
                </span>
                <span className="mx-3">
                  {" "}
                  <strong> Price:</strong> {product.price}
                </span>
              </li>
            ))}
            <li className="unstyled">
              <strong>Total:</strong>
              <span className="mx-3">{selectedOrder.amount}</span>
            </li>
            <li>
              <strong>Date:</strong>
              <span className="mx-3">
                {moment(selectedOrder.createdAt).format("HH-MM-YYYY")}{" "}
              </span>
            </li>
          </ul>
          <div className="input-group">
            <label className="input-group-prepend" htmlFor="order_status">
              <span className="input-group-text">Change Status</span>
            </label>
            <select
              name=""
              id="order_status"
              className="form-control"
              defaultValue={selectedOrder.status}
              onChange={(e) => {
                setSelectedOrderStatus(e.target.value);
              }}
            >
              <option defaultChecked={true} value="Not Processed">
                Not Processed
              </option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button variant="primary" onClick={submitChangeStatus}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <Base title="orders" className="container">
      {JSON.stringify(selectedOrderStatus)}
      {success && showSuccess()}
      {showOrders()}
      {showChangeStatusModal()}
    </Base>
  );
}

export default Orders;
