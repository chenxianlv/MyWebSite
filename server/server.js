const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const MessageSchema = require('./MessageSchema')

mongoose.connect('mongodb://127.0.0.1:27017/my_website')
mongoose.connection.once('open',function () {
  console.log('数据库连接成功')
})
let msgModel = mongoose.model('messages',MessageSchema)

const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

function handleOriMsg(docs) {
  let realDocs = []
  docs.forEach((e) => {
    if (e.title === "" || !e.reply) return -1
    let realReply = []
    e.reply.forEach((id) => {
      let target = docs.find(ele => ele._id.toString() === id.toString())
      if (target) {
        realReply.push(target)
      }
    })
    e.reply = realReply
    realDocs.push(e)
  })
  return realDocs
}

app.get('/getMessage',(req,res) => {
  res.setHeader('Access-Control-Allow-Origin','*')
  msgModel.find({deleted:false},"-deleted",{sort:{date:-1}},(err,docs) => {
    if (!err) {
      res.send(handleOriMsg(docs))
    }else {
      res.status(500).send(err)
    }
  })
})

app.get('/deleteMessage',(req,res) => {
  res.setHeader('Access-Control-Allow-Origin','*')
  msgModel.findByIdAndUpdate(req.query._id, {$set:{deleted:true}},null,(err) => {
    if (!err) {
      res.send(200)
    }else {
      res.status(500).send(err)
    }
  })
})

app.post('/addMessage',(req,res) => {
  res.setHeader('Access-Control-Allow-Origin','*')
  let data = JSON.parse(JSON.stringify(req.body))
  data.reply = []
  data.deleted = false
  msgModel.create(data,(err,doc) => {
    if (!err) {
      res.send(doc)
    }else {
      res.status(500).send(err)
    }
  })
})

app.post('/updateMessage',(req,res) => {
  res.setHeader('Access-Control-Allow-Origin','*')
  let body = JSON.parse(JSON.stringify(req.body))
  msgModel.findByIdAndUpdate(body._id, {$set:body.doc},null,(err) => {
    if (!err) {
      res.send(200)
    }else {
      res.status(500).send(err)
    }
  })
})

app.post('/addReply',(req,res) => {
  res.setHeader('Access-Control-Allow-Origin','*')
  let data = JSON.parse(JSON.stringify(req.body))
  data.doc.reply = []
  data.doc.title = ''
  data.doc.deleted = false
  msgModel.create(data.doc,(err,doc) => {
    if (!err) {
      msgModel.findByIdAndUpdate(data._id, {$addToSet:{reply:mongoose.Types.ObjectId(doc._id)}},null,(err) => {
        if (!err) {
          res.send(200)
        }else {
          res.status(500).send(err)
        }
      })
    }else {
      res.status(500).send(err)
    }
  })
})

app.listen(8000,() => {
  console.log('8000端口监听中')
})