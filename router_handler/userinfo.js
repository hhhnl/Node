const db = require('../db')

const bcrypt = require('bcryptjs')

exports.getUserInfo = (req, res) => {
  const sql = `select id, username, nickname, email, user_pic from ev_users where id=? `
  db.query(sql, req.auth.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取用户信息失败')

    res.send({
      status: 200,
      messag: '获取用户名成功',
      data: results[0]
    })
  })
}

exports.updateUserInfo = (req, res) => {
  const sql = 'update ev_users set ? where id=?'
  const userinfo = req.body

  db.query(sql, [req.body, req.body.id], (err, resules) => {
    if (err) return res.cc(err)
    console.log(resules)
    if (resules.affectedRows !== 1) return res.cc('更新用户信息失败')

    res.cc('更新用户信息成功', 200)
  })
}

/**
 * oldPwd 旧密码
 * newPwd 新密码
 */
exports.updatePassword = (req, res) => {
  // 1.判断旧密码是否正确
  const sql = `select password from ev_users where id=?`

  db.query(sql, req.auth.id, (err, resules) => {
    if (err) return res.cc(err)
    if (resules.length !== 1) return res.cc('修改密码错误 - 返回的结果不只一条')

    // 判断旧密码是否一致
    const compareResult = bcrypt.compareSync(req.body.oldPwd, resules[0].password)
    if (!compareResult) return res.cc('旧密码不一致')

    // sql修改密码值
    const sql = `update ev_users set password=? where id=?`
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10) // 密码加密
    db.query(sql, [newPwd, req.auth.id], (err, resules) => {
      if (err) return res.cc(err)
      if (resules.changedRows !== 1) return res.cc('修改的不只一行啊')

      res.cc('密码修改成功', 200)
    })
  })

  // 2.更新密码

}


// 更新用户头像
exports.updateAvatar = (req, res) => {
  const sql = `update ev_users set user_pic=? where id=?`
  db.query(sql, [req.body.avatar, req.auth.id], (err, results) => {
    if (err) return res.cc(err)

    if (results.affectedRows !== 1) return res.cc('改换头像失败！')

    res.cc('更新头像成功！', 200)
  })
}