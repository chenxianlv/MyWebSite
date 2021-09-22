;const mongoose = require('mongoose')
const {Schema} = require("mongoose")
module.exports = new mongoose.Schema({
  _id:String,
  user:String,
  msg:String,
  title:String,
  date:Number,
  deleted:Boolean,
  reply:Array
});
