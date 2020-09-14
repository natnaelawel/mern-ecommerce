const express = require('express')
const {
  sayHello,
  signUp,
  signIn,
  signOut,
  requireSignIn,
} = require("../controllers/auth");
const { userSignUpValidator, validateUserSignUp, validateUserSignIn } = require('../validator');

const router = express.Router()


router.get("/", sayHello);


router.post("/signin", validateUserSignIn, signIn);

router.post("/signup", validateUserSignUp, signUp);
router.get("/signout", signOut);

router.get('/home', requireSignIn, (req, res)=>{
    res.json({message: 'home page 🏠🏠🏠'})
})

module.exports = router