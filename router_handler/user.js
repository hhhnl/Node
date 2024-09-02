/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
// const { result } = require('@hapi/joi/lib/base')
const db = require('../db')
const bcrypt = require('bcryptjs')
// token
const jwt = require('jsonwebtoken')
const config = require('../config')


// 注册
exports.regUser = (req, res) => {
  const userinfo = req.body
  // if (!userinfo.username || !userinfo.password) {
  //   // return res.send({ status: 400, message: '用户名或密码不能为空！' })
  //   return res.cc('用户名或密码不能为空！')
  // }


  const sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr, [userinfo.username], (err, results) => {
    if (err) {
      // return res.send({ status: 400, message: '执行mysql失败' })
      return res.cc(err)
    }
    if (results.length > 0) {
      // return res.send({ status: 500, message: '用户名被占用' })
      return res.cc('用户名被占用')
    }

    // -------------------------------------------------------------------
    // 密码加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)

    // 写入账号密码
    const sqlStr2 = 'insert ev_users set ?'
    db.query(sqlStr2, { username: userinfo.username, password: userinfo.password }, (err, results) => {
      if (err) {
        // return res.send({ status: 400, message: err.message })
        return res.cc(err)
      }
      if (results.affectedRows !== 1) {
        // return res.send({ status: 400, message: '注册用户失败' })
        return res.cc('注册用户失败')
      }
      // res.send({ status: 200, message: '注册成功' })
      res.cc('注册成功', 200)
    })
  })
}

exports.login = (req, res) => {
  const userinfo = req.body
  // 判断账号是否正确
  const sql = `select * from ev_users where username=?`
  db.query(sql, userinfo.username, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('账号错误')


    // 判断密码是否正确
    // 因为密码是加密过的，需要先读取sql中的密码再和用户提交的密码调用 bcrypt.compareSync() 方法比较密码是否一致
    // bcrypt.compareSync(用户提交的密码,数据库中的密码)
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    // console.log(userinfo.password)
    if (!compareResult) return res.cc('密码错误')


    // token
    const user = { ...results[0], password: '', user_pic: '' }
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })

    // console.log(req.auth)
    res.send({
      status: 200,
      message: '登录成功',
      token: 'Bearer ' + tokenStr
    })

  })


}


// exports.user = {
//   regUser: (req, res) => {
//     res.send('regUser ok')
//   },
//   login: (req, res) => {
//     res.send('login ok')
//   }
// }

