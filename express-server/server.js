const express = require ("express");
const app = express();
app.get("/", function(req,res){
    res.send("Hello")
});

app.get("/contact", function(req,res){
    res.send("Cotact me on felix.buzz@gmail.com")
});

app.get("/about", function(req,res){
    res.send("My name is Felix and I love coding")
});

app.listen(3000, function(){
    console.log("server has started on port 3000");
});
