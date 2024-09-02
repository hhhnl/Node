const { result } = require('@hapi/joi/lib/base')
const db = require('../db')

// 查询
exports.getArticleCates = (req, res) => {
  // 1.查询数据库
  // const sql = `select * from ev_article_cate where is_delete=0 order by id asc`
  const sql = `select * from ev_article_cate where is_delete=0 order by id desc`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 200,
      message: results.length ? '获取文章列表成功' : '文章列表为空',
      data: results
    })
  })

  // 2.返回查到的数据
}

// 新增
exports.addArticleCates = (req, res) => {
  // 1.查重
  const sql = `select * from ev_article_cate where name=? or alias=?`
  db.query(sql, [req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc(err)
    // 去重
    if (results.length === 2) return res.cc('name alias 重复')
    if (results.length === 1 && req.body.name === results[0].name) return res.cc('name 重复了')
    if (results.length === 1 && req.body.alias === results[0].alias) return res.cc('alias 重复了')


    // 2.写入数据 name alias 
    const sql = `insert ev_article_cate set ?`
    db.query(sql, req.body, (err, results) => {
      if (err) return res.cc(err)
      // console.log(results)
      if (results.affectedRows !== 1) return res.cc('添加失败！')

      res.cc('添加成功！', 200)
    })

  })


}


// 删除
exports.deleteArticleCates = (req, res) => {
  const id = req.params.id
  // const sql = `delete from ev_article_cate where id=?`
  const sql = `update ev_article_cate set is_delete=1 where id=?`
  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err)

    if (results.affectedRows !== 1) return res.cc('删除失败！')

    res.cc('删除成功！', 200)
  })
}

// 根据id获取文章分类数据
exports.getArtCateById = (req, res) => {
  const id = req.params.id
  const sql = `select * from ev_article_cate where is_delete=0 and id=?`
  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取失败！')
    res.send({
      status: 200,
      message: '获取成功！',
      data: results[0]
    })
  })
}


// 根据id更新文章分类数据
exports.updateCateById = (req, res) => {
  // 1.查询是否重复
  const sql = `select * from ev_article_cate where id!=? and is_delete=0 and name=? or alias=?`
  db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc(err)
    // console.log(results)
    if (results.length >= 2) return res.cc('name和alias 重复')
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('name和alias 重复')
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('name有重复')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('alias有重复')

    // 2.更新数据
    const sql = `update ev_article_cate set ? where id=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
      if (err) return res.cc(err)
      console.log(results)
      if (results.affectedRows !== 1) return res.cc('更新信息分类失败！')
      res.cc('更新信息分类成功！', 200)
    })
  })



}