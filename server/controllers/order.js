const { errorHandler } = require("../helpers/dbErrorHandler");
const { Order, CartItem } = require("../models/order");

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name address")
    .sort("+createdAt")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.json(orders);
    });
};

exports.create = (req, res) => {
  req.body.user = req.profile;
  const order = new Order(req.body);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({ error: errorHandler(error) });
    }
    res.json(data);
  });

  console.log("create", req.body);
};
exports.updateStatus = (req, res) => {
  req.body.user = req.profile;
  Order.findByIdAndUpdate(
    req.body.orderId,
    { status: req.body.status },
    
    (error, data) => {
      if (error) {
        return res.status(400).json({ error: errorHandler(error) });
      }
      res.json(data);
    }
  );
};
