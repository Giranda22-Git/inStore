const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const {uid} = require('uid')

const serverData = {
  mongoUrl: 'mongodb://localhost:27017/MAG',
  serverUrl: 'http://localhost:3000/',
  PORT: 3000
}

const objectLogin = require('./objects/Login.js')
const objectPassword = require('./objects/Password.js')

const app = express()
const mongoAdmin = require('./models/Admin.js')
const mongoStorage = require('./models/Storage.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.contentType('application/json')
  next()
})
app.use(cors())

init(serverData)

async function init(serverData) {
  await mongoose.connect(serverData.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })

  mongoose.connection.once('open', () => {
    app.listen(serverData.PORT, '0.0.0.0', (err) => {
      if (err) return new Error(`error in starting server, error: ${err}`)
      else console.log(`server started on \nPORT: ${serverData.PORT}\nURL: ${serverData.serverUrl}`)
    })

    app.use('/admin', require('./endPoints/admin.js'))
    app.use('/storage', require('./endPoints/storage.js'))


  })
  mongoose.connection.emit('open')
}