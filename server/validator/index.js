const { validationResult, body, check } = require("express-validator");
const mongoose = require("mongoose");
const User = require("../models/user");
const Category = require("../models/category");
const Product = require("../models/product")

exports.userSignUpValidator = (req, res, next) => {
  // req.check('name', 'Name is required').notEmpty()
  // req.check('email', "Email must be between 3 and 13 character")
  //     .matches(/.+\@.+\..+/)
  //     .withMessage('Email must contain @')
  //     .isLength({
  //         min: 4,
  //         max: 32
  //     });
  // req.check('password', 'Password is required').notEmpty()
  // req.check('password')
  //     .isLength({
  //         min: 6
  //     })
  //     .withMessage('password must contain at least 6 character')
  //     .matches(/\d/)
  //     .withMessage("password must contain a number")

  //     const errors = req.validationErrors()
  //     if(errors){
  //         const firstError = errors.map(error => error.message)[0]
  //         return res.status(400).json({message: firstError})
  //     }

  // next()

  // username must be an email
  req.body("email").isEmail(),
    // password must be at least 5 chars long
    // body("password").isLength({ min: 5 });
    req.check("email").custom((value) => {
      return User.findByEmail(value).then((user) => {
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      });
    }),
    req.check("password").custom((value, { req }) => {
      if (value !== req.body.passwordConfirmation) {
        throw new Error("Password confirmation is incorrect");
      }
    });
  req
    .check("password")
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long")
    .matches(/\d/)
    .withMessage("must contain a number");
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const generateSignUpValidator = () => [
  check("name").custom((value) => {
    return User.findOne({ name: value }).then((error, user) => {
      if (user) {
        return Promise.reject("name already in use");
      }
    });
  }),
  check("email").isEmail(),
  check("email").custom((value) => {
    return User.findOne({ email: value }).then((error, user) => {
      if (user) {
        return Promise.reject("E-mail already in use");
      }
    });
  }),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 chars long")
    .matches(/\d/)
    .withMessage("Password must contain a number"),
//   check("password").custom((value, { req }) => {
//     if (value !== req.body.passwordConfirmation) {
//       throw new Error("Password confirmation is incorrect");
//     }
//   }),
];

const signupReporter = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const generateSignInValidator = () => [
  // check("email").isEmail(),

];

const signInReporter = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


const generateCategoryValidator = () => [
  check("name")
    .isLength({ min: 5, max: 40 })
    .withMessage("Name must be at least 5 and at max 40 chars long"),
  check("name").custom((value) => {
    return Category.findOne({ name: value }).then((category) => {
      if (category) {
        return Promise.reject("category name already in use");
      }
    });
  }),
];

const categoryReporter = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


const generateProductValidator = () => [
  // check("name")
  //   .isLength({ min: 5, max: 40 })
  //   .withMessage("Product name must be at least 5 and at max 40 chars long"),
  // check("name").custom((value) => {
  //   return Product.findOne({ name: value }).then((product) => {
  //     if (product) {
  //       return Promise.reject("product name already in use");
  //     }
  //   });
  // }),
];

const productReporter = (req, res, next) => {
  console.log(req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.validateUserSignUp = [generateSignUpValidator(), signupReporter];
exports.validateUserSignIn = [generateSignInValidator(), signInReporter];
exports.validateCreateCategory = [
  generateCategoryValidator(),
  categoryReporter,
];
exports.validateCreateProduct = [
  generateProductValidator(),
  productReporter,
];
