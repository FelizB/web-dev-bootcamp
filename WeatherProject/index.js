const express = require("express")
const https =require("https")
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req, res){
    res.sendFile(__dirname +"/index.html")
 
});

app.post("/", function(req, res){
    const query= req.body.cityName
    const key = "8b8059e1f19e38b5843f3660a47265b5"
    const unit= "metric"
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+key+"&unit="+unit
    https.get(url, function(response){
        response.on("data",function(data){
            const date = JSON.parse(data)
            const temp = date.main.temp
            const des = date.weather[0].description
            const icon = date.weather[0].icon
            const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The weather is currently " + des +"</p>")
            res.write("<h1>The temperature in "+query+" is " + temp +" degrees Celcius.</h1>")
            res.write("<img src="+imgURL+">")
            res.send()
        })
    });
    
});

app.listen(3000, function(){
    console.log("server is running on port 3000")
});



