const express = require('express');
const { requireSignIn, isAuth } = require('../controllers/auth');
const router = express.Router();

const {
  generateToken,
  processPayment,
} = require("../controllers/braintree_payment");
const { userById } = require('../controllers/user')


router.get("/getToken/:userId", requireSignIn, isAuth, generateToken);
router.post("/payment/:userId", requireSignIn, isAuth, processPayment);

router.param('userId', userById)

module.exports =  router