const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const MessageSchema = require('./MessageSchema')
const PictureSchema = require('./PictureSchema')

mongoose.connect('mongodb://127.0.0.1:27017/my_website')
mongoose.connection.once('open',function () {
  console.log('数据库连接成功')
})
let msgModel = mongoose.model('messages',MessageSchema)
let picModel = mongoose.model('pics',PictureSchema)

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

function handleOriPic(docs) {
  let result = []
  let category = []
  let recommend = []
  docs.forEach(e => {
    if (e.recommend !== 0) {
      recommend.push(e)
    }
    if (category.indexOf(e.category) === -1) {
      result.push({category:e.category, imgs:[e]})
      category.push(e.category)
    } else {
      result.find(el => el.category === e.category).imgs.push(e)
    }
  })
  // 单个分类中图片按发布时间降序
  result.forEach(e => e.imgs.sort((a,b) => b.date-a.date))
  // 各分类按图片数量降序
  result.sort((a, b) => b.imgs.length - a.imgs.length)
  // 推荐图片按recommend字段的值升序
  recommend.sort((a, b) => a.recommend - b.recommend)
  return {result,recommend}
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

app.get('/getPicture',(req,res) => {
  res.setHeader('Access-Control-Allow-Origin','*')
  picModel.find({deleted:false},"-deleted",{sort:{category:1}},(err,docs) => {
    if (!err) {
      res.send(handleOriPic(docs))
    }else {
      res.status(500).send(err)
    }
  })
})

// app.get('/deletePicture',(req,res) => {
//   res.setHeader('Access-Control-Allow-Origin','*')
//   msgModel.findByIdAndUpdate(req.query._id, {$set:{deleted:true}},null,(err) => {
//     if (!err) {
//       res.send(200)
//     }else {
//       res.status(500).send(err)
//     }
//   })
// })

// app.post('/addPicture',(req,res) => {
//   res.setHeader('Access-Control-Allow-Origin','*')
//   let data = JSON.parse(JSON.stringify(req.body))
//   data.reply = []
//   data.deleted = false
//   msgModel.create(data,(err,doc) => {
//     if (!err) {
//       res.send(doc)
//     }else {
//       res.status(500).send(err)
//     }
//   })
// })

// app.post('/updatePicture',(req,res) => {
//   res.setHeader('Access-Control-Allow-Origin','*')
//   let body = JSON.parse(JSON.stringify(req.body))
//   msgModel.findByIdAndUpdate(body._id, {$set:body.doc},null,(err) => {
//     if (!err) {
//       res.send(200)
//     }else {
//       res.status(500).send(err)
//     }
//   })
// })

app.listen(8000,() => {
  console.log('8000端口监听中')
})
