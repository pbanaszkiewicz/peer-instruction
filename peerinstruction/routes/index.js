var express = require('express')
var router = express.Router()
var N = require('../nuveServerAPI')
var config = require('../../licode/licode_config')
N.API.init(config.nuve.superserviceID, config.nuve.superserviceKey,
           "http://localhost:3000/")

/* GET home page */
router.get('/', function(req, res) {
    res.render('index')
})

/* list existing rooms */
router.get('/rooms', function(req, res) {
    N.API.getRooms(function(room) {
        // the response from nuve is already in JSON format, no need to convert
        res.send(room)
    }, function(error) {
        console.log(error)
        res.send(error)
    })
})

/* create a room */
router.post('/room', function(req, res) {
    roomName = req.param('roomName') || 'room'
    var p2p
    if (req.param('p2p') !== undefined)
    {
        p2p = true
    }
    else
    {
        p2p = false
    }

    N.API.createRoom(roomName, function(room) {
        console.log('Created room ', room.name, ' with id: ', room._id)
        res.json({room: room})
    }, function(error) {
        console.error('Could not create the room: ', error)
        res.send(error)
    }, {p2p: p2p})
})

/* create token for user to join the room */
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
