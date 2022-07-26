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
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

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

//Request targeting particular article
app
  .route("/articles/:articleTitle")
  .get(async (req, res) => {
    try {
      const article = await Article.findOne({ title: req.params.articleTitle });
      res.send(article);
    } catch {
      res.send("No article matching the title was found");
    }
  })
  .put(async (req, res) => {
    try {
      await Article.replaceOne(
        { title: req.params.articleTitle },
        { title: req.body.title, content: req.body.content }
      );
      res.send("Successfully replaced the article");
    } catch (err) {
      res.send(err);
    }
  })
  .patch(async (req, res) => {
    try {
      await Article.updateOne(
        { title: req.params.articleTitle },
        { $set: req.body }
      );
      res.send("Successfully updated the article.");
    } catch (err) {
      res.send(err);
    }
  })
  .delete(async (req, res) => {
    try {
      await Article.deleteOne({ title: req.params.articleTitle });
      res.send("Successfully deleted the article.");
    } catch (err) {
      res.send(err);
    }
  });

//Listening to port 3000
app.listen(3000, () => {
  console.log("Server started at port 3000");
});
