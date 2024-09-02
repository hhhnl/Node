const express = require('express')
const router = express.Router()

// 表单验证
const exportsJoi = require('@escook/express-joi')
// const Joi  = require('joi')
const { reg_login_schema } = require('../schema/user')

const userHandler = require('../router_handler/user')


// 注册新用户
router.post('/reguser', exportsJoi(reg_login_schema), userHandler.regUser)

// 登录
router.post('/login',  userHandler.login)

module.exports = router