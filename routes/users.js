const express = require('express');
const router=express.Router();//to aquire router
const user=require("../model/users.js");
const wrapAsyncfn = require('../utils/wrapAsyncfn');
const passport = require('passport');
const {saveredirectUrl}=require("../utils/middleware_passport.js");
const usercontroller=require("../controllers/users.js");


router.route("/signup")
.get(usercontroller.signup_get)
.post(wrapAsyncfn(usercontroller.signup_post));

router.route("/login")
.get(usercontroller.login_get)
.post(saveredirectUrl,passport.authenticate("local",{ failureRedirect: '/login',failureFlash:true }),usercontroller.login_post);



//to logout we use inbuilt passport method==>req.logout
//req.user has information about user so if loggein than only thhen info else undefined 
router.get("/logout",usercontroller.delete);



// router.get("/signup",usercontroller.signup_get);
// router.post("/signup",wrapAsyncfn(usercontroller.signup_post));
// router.get("/login",usercontroller.login_get);
// router.post("/login",saveredirectUrl,passport.authenticate("local",{ failureRedirect: '/login',failureFlash:true }),usercontroller.login_post);





module.exports=router;