const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

let mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/my_website')

mongoose.connection.once('open',function () {
  console.log('数据库连接成功')
})

app.get('/test',(req,res) => {
  res.setHeader('Access-Control-Allow-Origin','*')
  res.send({name:'chen',age:18})
})
app.post('/commit',(req,res) => {
  res.setHeader('Access-Control-Allow-Origin','*')
  console.log(req.body)
  res.send(200)
})
app.listen(8000,() => {
  console.log('8000端口监听中')
})
