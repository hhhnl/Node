const mysql = require('mysql')


const db = mysql.createPool({
  host:'120.77.250.102',
  user:'nishuihan',
  password:'GHnjpByJNnRJHeYS',
  database:'nishuihan',
})

module.exports = db