//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt  = require ("mongoose-encryption");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

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

userSchema.plugin(encrypt,{secret: process.env.SECRET, encryptedFields:["password"]});
const User = new mongoose.model("User", userSchema);


app.get("/", function(req,res){
    res.render("home");
})


app.route("/login")
.get(function(req,res){
    res.render("login");
})
.post(function(req,res){
    const userN = req.body.username;
    const pass = req.body.password;
    User.findOne({email: userN})
    .then(response=>{
        if (!response){
            console.log("Make sure you are using the correct username and password")
        }
        else{
            if (response){
                if(response.password === pass){
                    res.render("secrets")
                }
                else{
                    console.log("No such user was found")
                }
            }
        }
    })
    .catch(err=>{
        console.log("Error", err)
    })
})


app.route("/register")
.get(function(req,res){
    res.render("register");
})
.post(function(req, res){
    const newUser = new User ({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save()
    .then(response =>{
            console.log("registration was successful", response)
            res.render("secrets")
    })
    .catch(error =>{
        console.log("Error", error)
    });
})



app.listen(3000, function(){
    console.log("The connecton has been established")
})