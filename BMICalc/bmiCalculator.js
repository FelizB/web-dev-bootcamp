const express = require ("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/bmi.html");
});

app.post("/", function(req, res){
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);
    var BMI = weight/(height*height);
    res.send("The BMI value is "+BMI);
});

app.listen(3000, function(){
    console.log("server started and listening to port 3000");
});