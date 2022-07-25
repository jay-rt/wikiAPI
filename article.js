const mongoose = require("mongoose");

//Defining a schema
const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

//Exporting the model
module.exports = mongoose.model("Article", articleSchema);
