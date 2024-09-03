const express = require('express')
const app = express()

// const cors = require('cors')
// app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// 封装 res.cc 函数
app.use((req, res, next) => {
  res.cc = (err, status = 500) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 封装 解析token中间件
// const jwt = require('jsonwebtoken')
const { expressjwt: expressJWT } = require('express-jwt')
const config = require('./config')
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] })
  // .unless({ path: ['/api/login'] })
    .unless({ path: [/^\/api\//] }) // unless 不需要验证的URL
)

// router
const router = require('./router')
app.use('/api', router)

// // 错误级别中间件
// const joi = require('@hapi/joi')
app.use((err, req, res, next) => {
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
  // 表单数据验证失败
  // if (err instanceof joi.ValidationError) return res.cc(err)
  // 未知错误
  res.cc(err)
})



app.listen('80', () => {
  console.log('http://127.0.0.1:80')
})