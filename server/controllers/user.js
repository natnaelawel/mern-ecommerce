const { trim } = require("lodash");
const User = require("../models/user");
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ message: "User not found" });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "You are not authorized to perform this action" });
      }
      user.password = undefined;
      user.salt = undefined;
      return res.json(user);
    }
  );
};

exports.addOrderHistoryToUser = (req, res, next) => {
  let history = [];
  req.body.products.forEach(product => {
      console.log('roduct is ', product)
    history.push({
      _id: product._id,
      name: trim(product.name),
      description:trim(product.description),
      category: product.category,
      quantity: req.body.count,
      transaction_id: trim(req.body.transaction_id),
      amount: trim(req.body.amount),
    });
  });

  User.findOneAndUpdate(
    {
      _id: req.profile._id,
    },
    { $push: { history: history } },
    { new: true },
    (error, data) => {
      if (error) {
        return res.status(400).json({ error: "Could n't update user history" });
      }
      next();
    }
  );
};
