const express = require('express')
const router = express.Router()

const userinfo_handler = require('../router_handler/userinfo')

const exportsJoi = require('@escook/express-joi')
const { updata_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

// 获取用户信息
router.get('/userinfo', userinfo_handler.getUserInfo)

// 修改用户信息
router.post('/userinfo', exportsJoi(updata_userinfo_schema), userinfo_handler.updateUserInfo)

// 重设密码
router.post('/updatepwd', exportsJoi(update_password_schema), userinfo_handler.updatePassword)

// 更换用户头像
// router.post('/update/avatar', exportsJoi(update_avatar_schema), userinfo_handler.updateAvatar)
router.post('/update/avatar', userinfo_handler.updateAvatar)

module.exports = router