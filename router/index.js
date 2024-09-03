const express = require('express')
const router = express.Router()
const multer = require('../multer/index')


router.post('/', multer.array('file', 10), (req, res) => {
  console.log(req.files)
  res.send('ok')
})


module.exports = router