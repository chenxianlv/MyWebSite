;const mongoose = require('mongoose')
module.exports = new mongoose.Schema({
  user:String,
  msg:String,
  title:String,
  date:Number,
  deleted:Boolean,
  reply:Array
},{versionKey:false});
