const mysql = require('mysql')


const db = mysql.createPool({
  host:'120.77.250.102',
  user:'xh',
  password:'admin',
  database:'express',
})
// console.log(db)

module.exports = db