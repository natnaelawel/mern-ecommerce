const express = require("express");

const router = express.Router();

const { create, getAllOrders, updateStatus } = require("../controllers/order");
const { requireSignIn, isAdmin, isAuth } = require("../controllers/auth");
const { validateCreateCategory } = require("../validator");
const { userById, addOrderHistoryToUser } = require("../controllers/user");
const { updateProductStatus } = require("../controllers/product");



router.get('/:userId', requireSignIn, isAuth, isAdmin, getAllOrders)
router.post('/:userId', requireSignIn, isAuth, addOrderHistoryToUser, updateProductStatus, create)
router.put("/:userId", requireSignIn, isAuth, isAdmin, updateStatus);

router.param('userId', userById)
module.exports = router;
