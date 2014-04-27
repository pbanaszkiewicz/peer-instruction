var express = require('express')
var router = express.Router()

/* GET student screen */
router.get('/', function(req, res) {
  res.render('student', { title: 'Peer instruction' })
})

module.exports = router
