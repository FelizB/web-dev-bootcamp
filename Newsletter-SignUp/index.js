const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname +"/index.html");

});

app.post("/failure", function(req,res){
    res.redirect("/")
});
app.post("/",function(req,res){
    const firstName = req.body.Fname
    const SecName = req.body.Lname
    const Email = req.body.email
    var data= {
        members:[
            {
            email_address:Email,
            status:"subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: SecName
            }
            }
        ]
    };
    var jsonData= JSON.stringify(data)
    const url ="https://us21.api.mailchip.com/3.0/lists/a0e1d58629";
    const options ={
        method:"POST",
        auth:"crazychizas@gmail.com:f535a07c2fb7b172f64768dc27f67c32-us21"
    } 
    const request = https.request(url, options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");

        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data",function(data){
            console.log(jsonData) 
        });
        
    });
    request.write(jsonData);
    request.end();

});
app.listen(process.env.PORT, function(){
    console.log("listening to port 3000");
});
//API KEY
//f535a07c2fb7b172f64768dc27f67c32-us21
//list ID
//a0e1d58629