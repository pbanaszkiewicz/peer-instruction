var express = require('express')
var router = express.Router()
var N = require('../nuveServerAPI')
var config = require('../configuration')
N.API.init(config.nuve.superserviceID, config.nuve.superserviceKey,
           config.nuve.address)

/* GET home page */
router.get('/', function(req, res) {
    res.render('index')
})

router.get('/rooms', function(req, res) {
    N.API.getRooms(function(room) {
        // the response from nuve is already in JSON format, no need to convert
        res.send(room)
    }, function(error) {
        res.send(error)
    })
})

router.get('/enroll', function(req, res) {
    username = req.param('username') || "user"
    role = req.param('role') || "presenter"
    room = req.param('room') || "536ea29f2aadb69d3410a996"
    N.API.createToken(room, username, role,
        function(token) {
            res.json({token: token})
        }, function(error) {
            res.send(error)
        })
})

module.exports = router
