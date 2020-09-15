const express = require("express");
const { param } = require("express-validator");
const { ObjectId } = require("mongoose").Types.ObjectId


const router = express.Router();

const {
  create,
  productById,
  getProduct,
  deleteProduct,
  updateProduct,
  getAllProduct,
  getRelatedProducts,
  getAllCategory,
  getAllBySearch,
  getPhoto,
  getSearchResults,
} = require("../controllers/product");
const { requireSignIn, isAdmin, isAuth } = require("../controllers/auth");
const { validateCreateProduct } = require("../validator");
const { userById } = require("../controllers/user");

router.post(
  "/:userId",
  param("userId").customSanitizer((value) => {
    return ObjectId(value);
  }),
  validateCreateProduct,
  requireSignIn,
  isAuth,
  isAdmin,
  create
);

router.get('/', getAllProduct)
router.get("/categories", getAllCategory)
router.get("/photo/:productId", getPhoto)
router.get('/related/:productId', getRelatedProducts)
router.get("/:productId/:userId", getProduct);
router.delete("/:productId", requireSignIn, isAuth, isAdmin, deleteProduct);
router.put("/:productId/:userId", requireSignIn, isAuth, isAdmin, updateProduct);

router.post("/by/search", getAllBySearch);
router.get("/search", getSearchResults);


router.param("userId", userById);
router.param("productId", productById);


module.exports = router;
