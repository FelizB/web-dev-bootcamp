//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
//const encrypt  = require ("mongoose-encryption");
//const md5 = require("md5")
//const bcrypt = require("bcrypt")
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")

const saltRounds = 10;

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(session({
    secret:process.env.SECRET2,
    resave: false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

try {
    var db = mongoose.connect('mongodb://127.0.0.1:27017/userDB', {useNewUrlParser: true, dbName: 'userDB' });
    console.log('success connection');
}
catch (error) {
    console.log('Error connection: ' + error);
}

const userSchema= new mongoose.Schema({
    email: String,
    password:String
});
//mongoose.set("userCreateIndex", true);
userSchema.plugin(passportLocalMongoose);

//userSchema.plugin(encrypt,{secret: process.env.SECRET, encryptedFields:["password"]});
const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req,res){
    res.render("home");
})


app.route("/login")
.get(function(req,res){
    res.render("login");
})
.post(function(req,res){
    const user = new User({
        username: req.body.username,
        password:req.body.password
    });
    req.login(user, function(err){
        if (err){
            console.log(err);
        }else{
            passport.authenticate("local")(req, res , function(){
                res.redirect("/secrets")
            })
        }
    })
})
/*.post(function(req,res){
    const userN = req.body.username;
    const pass = req.body.password;
    User.findOne({email: userN})
    .then(response=>{
        if (!response){
            console.log("Make sure you are using the correct username and password")
        }
        else{
            if (response){
                bcrypt.compare(pass,response.password,function(err, result){
                    if(result === true){
                        res.render("secrets")
                    }
                    else{
                        console.log("No such user was found")
                    }
                })
                }
            }
    })
    .catch(err=>{
        console.log("Error", err)
    })
})*/

app.route("/secrets")
.get(function(req, res){
    if(req.isAuthenticated()){
        res.render("secrets")
    }else{
        res.redirect("/login")
    }
});



app.route("/register")
.get(function(req,res){
    res.render("register");
})
.post(function(req,res){
    User.register({username:req.body.username}, req.body.password,function(err,user){
        if (err){
            console.log(err);
            res.redirect("/register");
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secrets")
            })
        }
    })
})
/*.post(function(req, res){

    bcrypt.hash(req.body.password, saltRounds,function(err, hash){
        const newUser = new User ({
            email: req.body.username,
            password: hash
        });
        newUser.save()
        .then(response =>{
                console.log("registration was successful", response)
                res.render("secrets")
        })
        .catch(error =>{
            console.log("Error", error)
        });
    });
    
})*/

app.get("/logout", function(req, res){
    req.logout(function(err, suc){
        if (err){
            console.log(err)
        }else{
            res.redirect("/");
        }
    });
    
});

app.listen(3000, function(){
    console.log("The connecton has been established")
})