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
  msgModel.findByIdAndUpdate(req.query.id, {$set:{deleted:true}},null,(err) => {
    if (!err) {
      res.send(200)
    }else {
      res.status(500).send(err)
    }
  })
})

app.post('/addMessage',(req,res) => {
  res.setHeader('Access-Control-Allow-Origin','*')
  msgModel.create(JSON.parse(JSON.stringify(req.body)),(err,doc) => {
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
  msgModel.findByIdAndUpdate(body.id, {$set:body.doc},null,(err) => {
    if (!err) {
      res.send(200)
    }else {
      res.status(500).send(err)
    }
  }).then()
})

app.post('/commit',(req,res) => {
  res.setHeader('Access-Control-Allow-Origin','*')
  // msgModel.find((err,docs) => {
  //   console.log(typeof docs[0]._id)
  // })
  // msgModel.findById("6149e827fe0eb658165d887f",(err,docs) => {
  //   console.log(docs)
  // })
  res.send(200)
})

app.listen(8000,() => {
  console.log('8000端口监听中')
})
