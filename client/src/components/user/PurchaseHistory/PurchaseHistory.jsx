import React, { useState, useEffect } from "react";
import { fetchPurchaseHistory } from "../../../API/user/order";
import moment from "moment";
import { isAuthenticated } from "../../../API/auth";

function PurchaseHistory() {
  const [orders, setOrders] = useState([]);
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPurchaseHistory(userId, token);
      console.log(data);
      setOrders(data);
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
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
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
              <td>${order.amount}</td>
              <td>{moment(order.createdAt).fromNow()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <h2>No Active Orders</h2>
    );

  return <div>{showOrders()}</div>;
}

export default PurchaseHistory;
