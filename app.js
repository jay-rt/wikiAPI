//Requiring necessary modules
const express = require("express");
const mongoose = require("mongoose");
const Article = require("./article");

//Creating new instance of express
const app = express();

//Setting up view engine
app.set("viewengine", "ejs");

//Serving up static files
app.use(express.static("public"));

//Parsing data obtained through form
app.use(express.urlencoded({ extended: true }));

//Connecting to mongoDB
await mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

//Request targetting all articles
app
  .route("/articles")
  .get(async (req, res) => {
    try {
      const articles = await Article.find();
      res.send(articles);
    } catch (err) {
      res.send(err);
    }
  })
  .post(async (req, res) => {
    try {
      const newArticle = Article({
        title: req.body.title,
        content: req.body.content,
      });
      await newArticle.save();
      res.send("Successfully added the article");
    } catch (err) {
      res.send(err);
    }
  })
  .delete(async (req, res) => {
    try {
      await Article.deleteMany();
      res.send("Successfully deleted all articles");
    } catch (err) {
      res.send(err);
    }
  });

//Listening to port 3000
app.listen(3000, () => {
  console.log("Server started at port 3000");
});
