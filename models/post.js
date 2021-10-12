const mongoose = require("mongoose")
//set up shortcut variable
const Schema = mongoose.Schema;
//create schema
const postSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String},
  location: { type: String, required: true },
  posted: { type: Date, },
  owner: { type: Schema.Types.ObjectId, ref:'User'},

//   date: {type: Date, default: function() { return new Date()}} // or you can set a timestamp
}, { timestamps: true });
//compile the schema into a model
const Post = mongoose.model("Post", postSchema)
//export the model so we can access it somewhere else
module.exports = Post;