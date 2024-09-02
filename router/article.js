const express = require('express')
const router = express.Router()

const artCate_handler = require('../router_handler/article')

// 校验
const exportsJoi = require('@escook/express-joi')
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/article')

// 查询文章
router.get('/cates', artCate_handler.getArticleCates)

// 新增文章分类路由
router.post('/addcates', exportsJoi(add_cate_schema), artCate_handler.addArticleCates)

// 根据id删除
router.get('/deletecate/:id', exportsJoi(delete_cate_schema), artCate_handler.deleteArticleCates)

// 根据id获取文章分类数据
router.get('/cates/:id', exportsJoi(get_cate_schema), artCate_handler.getArtCateById)

// 根据id更新文章分类数据
router.post('/updatecate', exportsJoi(update_cate_schema), artCate_handler.updateCateById)


module.exports = router