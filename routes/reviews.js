const express = require('express');
const router=express.Router({mergeParams:true});//to aquire router
const review=require("../model/reviews.js")//requring reviews file from model
const wrapAsync=require("../utils/wrapAsyncfn.js");//for wrapAsync "3rd"  and 1st is writting middelware
const externalerror=require("../utils/externalerror.js");//For exteranl Error class "2nd"
const {listingschema,reviewschema}=require("../utils/joiSchema.js");//in joySchema reuiring lisiting and review schema
const listing=require("../model/listing.js")//requring listings file from model
const {isloggedin,isowner,validatereview,isreviewauthor}=require("../utils/middleware_passport.js");
const reviewcontroller=require("../controllers/reviews.js");


//reviews route 
//post review route===> as it must be saved in the listings so we write in rest way
router.post("/",isloggedin,validatereview,wrapAsync(reviewcontroller.postreview));
  
  //"Delete review route"  ==>main reason forthis rest to acces listing id and review id and to dellte
  //not only review but also remove from listing review array  if listing is deleted then automatically 
  //reviews will be deleted as in listings we wrote post mongoose middleware 
router.delete("/:reviewId",isloggedin,isreviewauthor,wrapAsync(reviewcontroller.deletereview));

module.exports=router;
  