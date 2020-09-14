const express = require('express')

const router = express.Router()

const { userById, getUser, updateUser } = require("../controllers/user");
const { requireSignIn, isAdmin, isAuth } = require('../controllers/auth');

router.get('/secret/:userId', requireSignIn, isAdmin, (req, res)=>{
    res.json({user: req.profile})
})

router.get("/:userId", requireSignIn, isAuth, getUser);
router.put("/:userId", requireSignIn, isAuth, updateUser);

router.param('userId', userById)



module.exports = router