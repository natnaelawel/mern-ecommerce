// const User  = require('../models/user');
const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.sayHello = (req, res) => {
  User.findOne({ name: "nathaniel" }, (err, user) => {
    if (err) return err;
    const isTrue = user.authenticate("passwordd");
    res.json({ message: isTrue });
  });
};

exports.signIn = (req, res) => {
  // find a user based on email

  const { email, password } = req.body;
  console.log(password);
  console.log(email);
  let isMatch = "";
  User.findOne({ email: email }, (err, user) => {
    console.log('user is ', user)
    if (err || !user) {
      return res
        .status(400)
        .json({ message: "There is no user with this email. please signup" });
    }
    // if user found

    isMatch = user.authenticate(password);
    if(!isMatch){
        return res.status(401).json({
            message: 'Email and password don\'t match'
        })
    }
    // generate a signed token with user id and secret
    const token = jwt.sign({_id: user._id, }, process.env.JWT_SECRET)
    // persist the token as t in cookie with expired
    res.cookie('t', token, { expire: new Date() + 7200})
    const {_id, name, email, role} = user
    return res.json({token, user: {_id, name, email, role}})
  });
//   res.json({ message: isMatch ? "authorized" : "not authorized" });
};

exports.signUp = (req, res) => {
  console.log('signing upp')
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ message: err});
    }
    console.log(err);
    user.password = undefined;
    user.salt = undefined;

   return res.json({ user });
  });
};


exports.signOut = (req, res)=>{
    res.clearCookie('t')
    res.json({message: "signout success"})
}

exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth',
    algorithms: ["HS256"]
})

exports.isAuth = (req, res, next)=>{
  console.log('profile', req.process)
  console.log("auth", req.auth);
  console.log("profile_id", req.profile._id);

  console.log("auth_id", req.auth._id);
  // let user = req.auth && req.profile._id === req.auth._id
  let user = req.profile && req.auth && req.profile._id == req.auth._id;

  if(!user){
    return res.status(403).json({message: 'access denied'})
  }
  next()
}

exports.isAdmin = (req, res, next) => {
  if(req.profile.role === 0){
    return  res.status(403).json({message: 'access denied only admin can access'})
  }
  next()
  // return res.status(200).json({message: 'access granted for admin'})
};