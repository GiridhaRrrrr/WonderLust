const users=require("../routes/users.js");
const listing =require("../model/listing.js");
const review =require("../model/reviews.js");
const user=require("../model/users.js");

module.exports.signup_get=(req,res)=>{
    res.render("users/signup.ejs");
}


module.exports.signup_post=async(req,res)=>{   
       try{   
       let{username,email,password}=req.body;
       const newuser=new user({email,username});    
       //important method to register  our  detils is
       const registeruser=await user.register(newuser,password);//===> this is a statsic passport method to register details in db
       console.log(registeruser);
       //passport  method to login into directly after sign in==>req.login(registeredusers,(err)=>{})
       req.login(registeruser,(err)=>{
           if(err){
               return next(err);
           }
           req.flash("success","Welcome to wonderLust");
           res.redirect("/listings");        
       })   
       }
      catch(err){
       req.flash("error","User in the Username is registered");
       res.redirect("/signup");
      }
        
   }

   module.exports.login_get=(req,res)=>{
    res.render("users/login.ejs");
}   

   module.exports.login_post=async (req,res)=>{
    req.flash("success","welcome back to wonderLust!");
    let RedirectUrl=res.locals.redirectUrl || "/listings"//saving res.locals.redirecturl if present else saving listings
    res.redirect(RedirectUrl);        
}

module.exports.delete=(req,res)=>{
    req.logOut((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","You are Logout succesfully");
        res.redirect("/listings")
    })
}
