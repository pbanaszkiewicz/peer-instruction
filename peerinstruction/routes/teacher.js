var express = require('express')
var router = express.Router()

var erizoAPI = require(process.env.ERIZO_PATH)

/* GET teacher screen */
router.get('/', function(req, res) {
  res.render('teacher', { title: 'Peer instruction' })
})

module.exports = router
