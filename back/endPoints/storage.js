const express = require('express')
const router = express.Router()

const tmpDir = __dirname + '/tmp/'
const uploadDir = __dirname + '/tmp/'
const multer = require('multer')
const upload = multer({ dest: './endPoints/tmp/' })
const URL = 'http://api.in-store.host/storage'

const fs = require('fs')

const mongoStorage = require('../models/Storage.js').mongoProducts


// true
router.get('/', async (req, res) => {
  const result = await mongoStorage.find().exec()
  res.status(200).send(JSON.stringify(result))
})


// true
router.get('/download/:filename', async (req, res) => {
  const product = await mongoStorage.find({ 'images.fileName': req.params.filename }).exec()
  console.log(product)
  product[0].images.forEach(element => {
    console.log(element.fileName, req.params.filename)
    if (element.fileName === req.params.filename) {
      res.sendFile(`${__dirname}/tmp/${element.fileName}`)
    }
  })
})
/*
TEST:
GET http://localhost:3000/storage/download/Samsung 13 XA0.jpeg HTTP/1.1
content-type: application/json

*/



// true
router.post('/', upload.array('files', 15), async (req, res) => {
  try {
    const data = req.body
    const files = req.files
    const validTypes = ['svg+xml', 'png', 'gif', 'jpeg']
    const images = new Array()
    let index = 0
    if (data.category === "null") {
      files.forEach(file => {
        delBadFile(file.filename)
      })
      res.status(500).json({
        type: 'error',
        message: 'Нет Категории'
      })
    }

    files.forEach(file => {
      console.log(file, 'check filetype')

      const fileType = file.mimetype.split('/')

      if (file.size > 1000000) {
        delBadFile(file.filename)
        res.status(500).json({
          type: 'error',
          message: 'Файл слишком большой'
        })
      }
      if (fileType[0] !== 'image') {
        delBadFile(file.filename)
        res.status(500).json({
          type: 'error',
          message: 'Загружать можно только изображения'
        })
      }
      if (validTypes.includes(fileType[1])) {
        const newFileName = data.name + index++ + `.${fileType[1]}`
        fs.renameSync(tmpDir + file.filename, uploadDir + newFileName)

        images.push(
          {
            systemPath: uploadDir + data.name + String(index - 1) + `.${fileType[1]}`,
            clientPath: `${URL}/download/${newFileName}`,
            fileName: newFileName
          }
        )
      } else {
        delBadFile(file.filename)
        res.status(500).json({
          type: 'error',
          message: 'недопустимый формат изображения'
        })
      }
    })
    console.log(data.info)
    data.info = JSON.parse(data.info)
    const newProduct = new mongoStorage({
      name: data.name,
      description: data.description,
      category: data.category,
      price: data.price,
      images: images,
      count: data.count,
      info: data.info
    })
    const result = await newProduct.save()
    res.status(200).send(JSON.stringify(result))
  }
  catch (err) {
    console.log(err);
    res.sendStatus(500)
  }
})

router.post('/search', async (req, res) => {
  const data = req.body
  let resultArray = new Array()

  if (data.query || data.filter) {
    let allProducts = new Array()
    if (data.filter)
      allProducts = await mongoStorage.find({ category: data.filter }).exec()
    else
      allProducts = await mongoStorage.find().exec()

    if (data.query) {
      const queryArray = data.query.split('')
      allProducts.forEach(product => {
        let coincidence = 0
        queryArray.forEach(symbol => {
          if (product.name.includes(symbol))
            coincidence++
        })

        const result = (coincidence / queryArray.length) * 100
        console.log(product.name, queryArray, result)

        if (result >= 80)
          resultArray.push(product)
      })

    } else {
      resultArray = allProducts
    }
  }

  res.status(200).json(resultArray)
})
/*
TEST:
POST http://localhost:3000/storage/search HTTP/1.1
content-type: application/json

{
    "query": "iPhone"
}
*/



// true
router.get('/categories', async (req, res) => {
  const allProducts = await mongoStorage.find().exec()

  const arrayOfFilters = new Array()

  allProducts.forEach(product => {
    if (!arrayOfFilters.includes(product.category))
      arrayOfFilters.push(product.category)
  })

  res.status(200).json(arrayOfFilters)
})

// true
router.get('/findById/:id', async (req, res) => {
  const result = await mongoStorage.findById(req.params.id).exec()

  res.status(200).json(result)
})
/*
GET http://localhost:3000/storage/findById/60a45b0915ae3b8efcf6f495 HTTP/1.1
content-type: application/json
*/

// true
router.delete('/delete/id', async (req, res) => {
  const data = req.body

  await mongoStorage.deleteOne({ _id: data.id }, (err, result) => {
    if (err) res.status(500).send(JSON.stringify(err))

    res.status(200).send(JSON.stringify(result))
  }).exec()
})
/*
TEST:
DELETE http://localhost:3000/storage/delete/id HTTP/1.1
content-type: application/json

{
    "id": "60a4511ca6fa4c8c8b6dff97"
}
*/

// true
router.delete('/delete/name', async (req, res) => {
  const data = req.body

  await mongoStorage.deleteOne({ name: data.name }, (err, result) => {
    if (err) res.status(500).send(JSON.stringify(err))

    res.status(200).send(JSON.stringify(result))
  })
})
/*
TEST:
DELETE http://localhost:3000/storage/delete/name HTTP/1.1
content-type: application/json

{
  "name": "Android"
}
*/

router.put('/', async (req, res) => {
  const data = req.body

  for (const key in data.update) {
    await mongoStorage.findByIdAndUpdate(data.id, { [key]: data.update[key] })
  }

  const result = await mongoStorage.findById(data.id)

  res.status(200).json(result)
})
/*
TEST:
PUT http://localhost:3000/storage HTTP/1.1
content-type: application/json

{
  "id": "60a45b0915ae3b8efcf6f495",
  "update": {
    "name": "Samsung 13 XA",
    "price": "400000"
  }
}
Samsung 13 XA
*/

function delBadFile(fileName) {
  fs.unlinkSync(tmpDir + '/' + fileName)
}

module.exports = router