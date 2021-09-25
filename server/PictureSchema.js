;const mongoose = require('mongoose')
module.exports = new mongoose.Schema({
  user:String,
  url:String,
  description:String,
  date:Number,
  category:String,
  recommend:Number,
  deleted:Boolean,
},{versionKey:false});
