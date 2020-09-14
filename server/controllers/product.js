
const Product = require("../models/product");
const fs = require('fs')
const formidable = require('formidable')
const _ = require('lodash')
const { errorHandler } = require("../helpers/dbErrorHandler");


exports.getProduct= (req, res)=>{
    req.product.photo = undefined
    return res.json(req.product)
}

exports.getAllProduct = (req, res)=>{
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6

  Product.find()
    .select("-photo")
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, product)=>{
      if(err){
        return res.status(400).json({
          message: 'Product Not Found'
        })
      }
      return res.json(product)
    })

}

exports.deleteProduct = (req, res)=>{
    let Product = req.Product
    deletedProduct.remove((err, deletedProduct)=>{
        if(err){
            return res.status(400).json({
                message: errorHandler(err)
            })
        }
        res.json({
            Product,
            message: 'product deleted successfully'

        })
    })

}

exports.updateProduct = (req, res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          message: "Image could n't be available",
        });
      }
      const { name, description, price, category, quantity, shipping } = fields;
      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !quantity ||
        !shipping
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      let product = req.product;
      product = _.extend(product, fields)
      if (files.photo) {
        if (files.photo.size > 1024000) {
          return res.status(400).json({
            message: "Image must be lessthan size of 1mb",
          });
        }
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }

      product.save((err, product) => {
        if (err) {
          return res.status(400).json({
            message: errorHandler(err),
          });
        }
        return res.json({
          product,
        });
      });
    });
}

exports.productById = (req, res, next, id)=>{
    Product.findById(id).exec((err, product)=>{
        if(err){
            return res.status(400).json({
                message: "Product not found"
            })
        }
        req.product = product
        next()
    })
}

exports.create = (req, res) => {
  let form = new formidable.IncomingForm()
  console.log('request data', form)
form.keepExtensions = true
form.parse(req, (err, fields, files) =>{
    if(err){
        return res.status(400).json({
            message: 'Image could n\'t be available'
        })
    }
    const {name, description, price, category, quantity, shipping} = fields
    if(!name || !description || !price || !category || !quantity || !shipping){
        return res.status(400).json({message: 'All fields are required'})
    }

    const product = new Product(fields);
    if(files.photo){
        if(files.photo.size > 1024000){
            return res.status(400).json({
                message: "Image must be lessthan size of 1mb"
            })
        }
        product.photo.data = fs.readFileSync(files.photo.path)
        product.photo.contentType = files.photo.type
    }
    
      product.save((err, product) => {
        if (err) {
          return res.status(400).json({
            message: errorHandler(err),
          });
        }
        return res.json({
          product,
        });
      });
})

};


exports.getRelatedProducts = (req, res)=>{
  console.log('exports')
  console.log(req.product)
    let limit = req.query.limit ? parseInt(req.query.limit) : 5;
    Product.find({
      _id: {$ne: req.product}, 
      category: req.product.category
    })
    .limit(limit)
    .populate('category', '_id name')
    .exec((err, product)=>{
      if(err){
        console.log(err)
        return res.status(400).json({
          message: 'Product Nott Found'
        })

      }
      product.photo = undefined
      return  res.json(product)
    })

}

exports.getAllCategory = (req, res)=>{
  Product.distinct("category", {}, (err, categories)=>{
    if(err){
      return res.status(400).json({
        message: "categories not found"
      })
    }
    res.json(categories)
  })
}
exports.getAllBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          message: "Products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

exports.getPhoto = (req, res, next)=>{
  console.log(req.body)
    if(req.product.photo.data) {
      res.set('Content-Type', req.product.photo.contentType)
      return res.send(req.product.photo.data)
    }
    next()
}