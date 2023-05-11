const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

try {
    var db = mongoose.connect('mongodb://127.0.0.1:27017/wikiDB', {useNewUrlParser: true, dbName: 'wikiDB' });
    console.log('success connection');
}
catch (error) {
    console.log('Error connection: ' + error);
}
// mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser:true});
const articleSchema={
    title: String,
    content: String
};
const Article= mongoose.model("wikiDB",articleSchema, "Article");

// app.get("/articles", function(req,res){
//     Article.find(function(err, foundArticles){
//         console.log(foundArticles)
//     });
// });

app.get("/articles", async (req, res) => { 
    try { const articles = await Article.find({}); 
    res.send(articles); 
    console.log(articles);
} catch (err) { 
    console.log(err);
 } });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});