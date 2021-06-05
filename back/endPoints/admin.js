const express = require('express')
const router = express.Router()

const mongoAdmin = require('../models/Admin.js').mongoAdmin

const objectLogin = require('../objects/Login.js')
const objectPassword = require('../objects/Password.js')

router.get('/', async (req, res) => {
  const result = await mongoAdmin.find().exec()
  res.status(200).send(JSON.stringify(result))
})


// begin Registration Admin
router.post('/', async (req, res) => {
  try {
    const data = req.body
    const newAdmin = new mongoAdmin({
      Login: new objectLogin(data.Login),
      Password: new objectPassword(data.Password)
    })
    const result = await newAdmin.save()
    res.status(200).send(JSON.stringify(result))
  }
  catch (err) {
    console.log(err);
    res.sendStatus(500)
  }
})
/*
TEST:

POST http://localhost:3000/admin/ HTTP/1.1
content-type: application/json

{
  "Login": "admin",
  "Password": "password"
}

*/
// end Registration Admin


// begin find admin by id
router.get('/id/:id', async (req, res) => {
  try {
    const result = await mongoAdmin.findById(req.params.id).exec()
    res.status(200).json(result)
  }
  catch (err) {
    res.sendStatus(500)
  }
})
/*
TEST:

GET http://localhost:3000/admin/id/602bc56c3497dc1afce7bdb6 HTTP/1.1
content-type: application/json

*/
// end find admin for id


// begin find admin by login
router.get('/login/:login', async (req, res) => {
  try {
    const result = await mongoAdmin.findOne({ 'Login._login': req.params.login }).exec()
    res.status(200).json(result)
  }
  catch (err) {
    res.sendStatus(500)
  }
})
/*
TEST:

GET http://localhost:3000/admin/login/admin HTTP/1.1
content-type: application/json

*/
// end find admin for login


// begin authorization admin
router.post('/authorization', async (req, res) => {
  try {
    const data = req.body
    const admin = await mongoAdmin.findOne({ 'Login._login': data.Login }).exec()
    console.log(admin);

    if (admin !== null) {
      admin.Password = new objectPassword(admin.Password._password)

      const result = admin.Password.passwordVerify(data.Password)
      console.log(result)
      if (!result) {
        res.status(200).json({
          result: false,
          message: 'Password is Bad'
        })
      }
      else {
        res.status(200).json({
          result: true,
          message: admin
        })
      }

    }
    else {
      res.status(200).json({
        result: false,
        message: 'Login is Bad'
      })
    }
  }
  catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})
/*
TEST:

POST http://localhost:3000/admin/authorization HTTP/1.1
content-type: application/json

{
  "Login": "admin",
  "Password": "password"
}

*/
// end authorization admin

module.exports = router