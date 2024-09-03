const multer = require('multer')
const path = require('path')

// 设置存储引擎
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 保存文件的目录
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    // 设置文件名，防止重名
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// 初始化上传配置
/*
处理单个文件上传 upload.single('myFile')
处理多个文件上传 upload.array('myFiles', 5)
  参数1：代表上传时的name
返回值在：req.files
* */
const upload = multer({ storage: storage });


module.exports = upload

/*示例*/
/*
 app.post('/upload-multiple', upload.array('myFiles', 5), (req, res) => {
  try {
    res.send('文件上传成功');
  } catch (err) {
    res.sendStatus(500);
  }
});
* */