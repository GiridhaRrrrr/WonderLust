const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userschema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },  
});

userschema.plugin(passportLocalMongoose);//==>this automatically creats username and password shema acc to passport
const user = mongoose.model('user', userschema);
module.exports=user;