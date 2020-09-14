const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({ message: errorHandler(err) });
    }
    req.category = category;
    next();
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        message: "category doesn't exist",
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        message: "category doesn't exist",
      });
    }
    return res.json({
      category,
    });
  });
};
exports.deleteCategory = (req, res) => {
  let category;
  if (req.category) {
    category = req.category;
  } else {
    return res.status(400).json({
      message: "category doesn't exist",
    });
  }
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        message: errorHandler(err),
      });
    }
    res.json({
      category,
      message: "Category deleted successfully",
    });
  });
};

exports.create = (req, res) => {
  console.log('request body', req.body)
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        message: err,
      });
    }
    return res.json({
      category,
    });
  });
};
