const joi = require('joi')





const name = joi.string().required()
const alias = joi.string().alphanum().required()

/**
 * 校验规则对象 - 添加分类
 */
exports.add_cate_schema = {
  body: {
    name,
    alias
  }
}


const id = joi.number().integer().min(1).required()

// id校验规则
exports.delete_cate_schema = {
  params: {
    id
  }
}
exports.get_cate_schema = {
  params: {
    id
  }
}

// 校验规则对象 - 更新分类
exports.update_cate_schema = {
  body:{
    id,
    name,
    alias
  }
}