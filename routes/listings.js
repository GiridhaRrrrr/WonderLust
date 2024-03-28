const express = require('express');
const router=express.Router({mergeParams:true});//to aquire router
const listing=require("../model/listing.js")//requring listings file from model
const wrapAsync=require("../utils/wrapAsyncfn.js");//for wrapAsync "3rd"  and 1st is writting middelware
const externalerror=require("../utils/externalerror.js");//For exteranl Error class "2nd"
const {listingschema,reviewschema}=require("../utils/joiSchema.js");//in joySchema reuiring lisiting and review schema
const {isloggedin,isowner,validateError}=require("../utils/middleware_passport.js");
const multer  = require('multer')
const listingcontroller=require("../controllers/listings.js");
//for backend to understand files data from imgae upload
const {storage}=require("../cloudconfig.js")
const upload = multer({storage });


// combing two routes as they have same path
router.route("/")
.get(wrapAsync(listingcontroller.index))
.post(isloggedin,upload.single('listing[img]'),validateError,wrapAsync(listingcontroller.create));

 //new route
 router.get("/new",isloggedin,listingcontroller.new);//===>as new is misunderstood as :id so placed above


router.route("/:id")
.get(wrapAsync(listingcontroller.show))
.put(isloggedin,isowner,upload.single('listing[img]'),validateError,wrapAsync(listingcontroller.update))
.delete(isloggedin,isowner,wrapAsync(listingcontroller.delete));


  //edit route
router.get("/:id/edit",isloggedin,isowner,wrapAsync(listingcontroller.edit));

 //index route
//  router.get("/",wrapAsync(listingcontroller.index));  
  
  //show route
//   router.get("/:id",wrapAsync(listingcontroller.show));
  
  //create route
//   router.post("/",isloggedin,validateError,wrapAsync(listingcontroller.create));
  

  
  //update route
//   router.put("/:id",isloggedin,isowner,validateError,wrapAsync(listingcontroller.update))
  
  //delete route
//   router.delete("/:id",isloggedin,isowner,wrapAsync(listingcontroller.delete));


  module.exports=router;

