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

const articleSchema={
    title: String,
    content: String
};

const Article= mongoose.model("wikiDB",articleSchema, "Article");

//.....................targeting the whole collection...............
app.route("/articles")

.get(async (req, res) => { 
    try { const articles = await Article.find({}); 
    res.send(articles); 
    // console.log(articles);
    } catch (err) { 
    console.log(err);
    } })

.post(function(req,res){
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save().then(err =>{
        if (!err){
            res.send("FAILED TO PUT");
        }else{
            res.send("Successfully Added a new Article")
        }
    });
    })

.delete(function(req, res){
    Article.deleteMany().then(deleted=>{
        if (!deleted){
            res.send("FAILED TO delete");
        }else{
            res.send("Successfully deleted all Articles")
        }
    })
    });

//.....................targeting the a specific record in a collection...............
app.route("/articles/:articleTitle")
.get(function(req, res){
    
    Article.findOne({title:req.params.articleTitle}).then(foundArticle=>{
        if(foundArticle){
            res.send(foundArticle);
        }else{
            res.send("No such title was found")
        }
    });
})
.put(function(req,res){
    Article.findOneAndUpdate(
        {title:req.params.articleTitle},
        {title: req.body.title,
        content: req.body.content},
        {overwrite:true})
        .then(updateArticle=>{
            if(updateArticle){
                res.send("Successfully updated the Article")
            }else{
                res.send("No such title was found")
            }
        })
})
.patch(function(req,res){
    Article.updateOne(
        {title:req.params.articleTitle})
        .then(deletedone=>{
            if(deletedone){
                res.send("Successfully deleted the specific Article")
            }else{
                res.send("No such title was found")
            }
        });
})
.delete(function(req,res){
    Article.deleteOne(
        {title:req.params.articleTitle},
        {$set: req.body})
        .then(updateArticle=>{
            if(updateArticle){
                res.send("Successfully updated the Article")
            }else{
                res.send("No such title was found")
            }
        });
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});






