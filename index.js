if(process.env.NODE_ENV!="production"){
  require('dotenv').config();     //===> used for making backend understand env file 
}

const express = require('express');//express part
const app = express();//express part
const path=require("path");//ejs files
const mongoose = require('mongoose');//mongoose part
const listing=require("./model/listing.js")//requring listings file from model
const review=require("./model/reviews.js")//requring reviews file from model
const methodOverride=require("method-override");
const ejsmate = require('ejs-mate')//for ejs-mate path
const wrapAsync=require("./utils/wrapAsyncfn.js");//for wrapAsync "3rd"  and 1st is writting middelware
const externalerror=require("./utils/externalerror.js");//For exteranl Error class "2nd"
const {listingschema,reviewschema}=require("./utils/joiSchema.js");//in joySchema reuiring lisiting and review schema
const listingsrouter=require("./routes/listings.js");//routes requiring
const reviewsrouter=require("./routes/reviews.js");//routes requiring
const usersrouter=require("./routes/users.js");//users routes requiring
const session=require("express-session")//to require sesions
const MongoStore = require('connect-mongo');//for mongo store
const flash=require("connect-flash")//to require flash messages
const passport=require("passport");//to require passsport for autentication
const LocalStrategy=require("passport-local");//for local passport for username and passweord
const user=require("./model/users.js");//for user model




app.set("view engine","ejs");//for ejs templating
app.set("views",path.join(__dirname,"views"));//for ejs files==>path 
app.use(express.urlencoded({extended:true}));//to understand post data
app.use(methodOverride("_method"));//for method override
app.engine('ejs', ejsmate);// for boilderplate
app.use(express.static(path.join(__dirname,"/public")))//for css and javascript files


// const mongo_url='mongodb://127.0.0.1:27017/wonder_lust;
const dburl=process.env.ATLAS_URL;


//sessions mongo last
const store=MongoStore.create(
  { mongoUrl:dburl,
   crypto: {
     secret: process.env.secret,
   },
   touchAfter:24*3600,
 }
 )

 store.on("error",()=>{
  console.log("error in mongo session store",err);
 })

//session part
const sessionOptions={
  store:store,
  secret:process.env.secret,
  resave:false,
  saveUninitialized: true,
  cookie:{//==>used to store our expire date whisch is by default set to  null 
    expires:Date.now()+ 7 * 24 * 60 * 60 * 1000,//==>(7days,24hours,60mins,60sec,1000 milli secs)
    maxAge:7 * 24 * 60 * 60 * 1000,
    httpOnly:true,
  },
} ;

main()
.then(()=>{
    console.log("connection succesful");  //==>mongoose databse connection from website mongoose
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dburl); //==>mongoose databse connection
}

// app.get('/', function (req, res) {
//   res.send('Workig');
// })

//these 2 middewares must be before the  routes
app.use(session(sessionOptions));//session middle-ware 
app.use(flash()); //after session middleware only we need to add middleware

//passport part
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));//used to authenticate our user model
passport.serializeUser((user.serializeUser()));
passport.deserializeUser((user.deserializeUser()));



//middleware res.local to flash messages available to all the routes
app.use((req,res,next)=>{
  res.locals.success=req.flash("success")//when every ejs file uses "success" flash message appers
  //here locals."success" this==> is want now used in ejs  and in flash we passed key sucess 
  res.locals.error=req.flash("error");
  if(req.user){
    res.locals.curruser=req.user;//we save info of user in curruser
  }else{
    res.locals.curruser="";//we save info of user in curruser
  }
  next();//==> imp dont forget
})

//now directing to routes
app.use("/listings",listingsrouter);

//now directing to routes
app.use("/listings/:id/reviews",reviewsrouter);

//now directing to user route
app.use("/",usersrouter);

// app.use("/listings",(req,res,next)=>{
//   console.log("hi frends");        --> middle-ware practice
//   next();
// })

// app.get("/testlisting",async (req,res)=>{
//     let sample= new listing({
//         title:"my new villa",
//         description:"by the beach",
//         img:"",
//         price:1200,            -->made init.js for it  
//         location:"delhi",
//         country:"india"
//     });
//     await sample.save()
// })



//to match all other routes than above routes
app.all("*",(req,res,next)=>{   //==>"*" means matches with all the routes so need to be placed at bottom 
  throw new externalerror(404,"Entered a Wrong route! Page Not Found")
});

//"error handiling"
// app.get("/error",(req,res)=>{
//   throw new externalerror(404,"hi")
// } ) 

//middle-ware==>for error
app.use((err,req,res,next)=>{
  let {status=500,message="SomeThing Went Wrong!!"}=err;
  // console.log("err")
  // res.status(status).send(message);
  res.render("listings/error.ejs",{message})
})

app.listen("8080",()=>{
    console.log("app is listing to 8080");
})
