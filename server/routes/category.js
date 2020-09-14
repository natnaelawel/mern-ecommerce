const express = require("express");

const router = express.Router();

const {
  create,
  categoryById,
  getCategory,
  updateCategory,
  getAllCategory,
  deleteCategory,
} = require("../controllers/category");
const { requireSignIn, isAdmin, isAuth } = require("../controllers/auth");
const { validateCreateCategory } = require("../validator");
const { userById } = require("../controllers/user");

router.param("userId", userById);
router.param("categoryId", categoryById);

router.get("/", getAllCategory);

router.get("/:categoryId", getCategory);

router.post(
  "/:userId",
  validateCreateCategory,
  requireSignIn,
  isAuth,
  isAdmin,
  create
);

router.put(
  "/:categoryId/:userId",
  validateCreateCategory,
  requireSignIn,
  isAuth,
  isAdmin,
  updateCategory
);

router.delete(
  "/:categoryId/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  deleteCategory
);

module.exports = router;
