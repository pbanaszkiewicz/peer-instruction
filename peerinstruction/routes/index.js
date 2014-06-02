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

/* GET teacher's view */
router.get('/teacher', function(req, res) {
    res.render('teacher')
})
/* GET student's view */
router.get('/student', function(req, res) {
    res.render('student')
})
/* GET settings view */
router.get('/settings', function(req, res) {
    res.render('settings')
})
/* GET videoconference view */
router.get('/videoconference', function(req, res) {
    res.render('videoconference')
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

/* GET room information */
router.get('/room', function(req, res) {
    roomId = req.param('roomId')
    N.API.getRoom(roomId, function(room) {
        res.send(room)
    }, function(error) {
        res.send(404, error)
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
        res.send(500, error)
    }, {p2p: p2p})
})

/* DELETE a room */
router.delete('/room', function(req, res) {
    roomId = req.param('roomId')
    N.API.deleteRoom(roomId, function(result) {
        res.send(result)
    }, function(error) {
        res.send(500, error)
    })
})

/* GET users within the room */
router.get('/users', function(req, res) {
    roomId = req.param('roomId')
    N.API.getUsers(roomId, function(users) {
        res.send(users)  // already JSON
    }, function(error) {
        res.send(404, error)
    })
})

/* GET the number of users within particular room */
router.get('/usersnumber', function(req, res) {
    roomId = req.param('roomId')
    N.API.getUsers(roomId, function(users) {
        data = JSON.parse(users)
        res.json({count: data.length})
    }, function(error) {
        res.send(404, error)
    })
})

/* Find room's id by looking for it's name */
router.get('/roomid', function(req, res) {
    roomName = req.param('roomName') || 'classroom'
    N.API.getRooms(function(rooms) {
        // the response from nuve is JSON
        rooms = JSON.parse(rooms)
        var found

        for (var room in rooms)
        {
            if (rooms[room].name === roomName)
            {
                found = rooms[room]._id
                break
            }
        }

        // Because JS is primitive, you can't have res.send within the loop and
        // in case the room wasn't found res.send(404) after the loop.
        if (found !== undefined)
            res.send(found)
        else
            res.send(404, "No such room!")
    }, function(error) {
        res.send(500, error)
    })
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
            res.send(500, error)
        })
})

/* prepare rooms for student groups */
router.get('/createroomsforstudents', function(req, res) {
    // TODO: check if it's request from the teacher
    roomId = req.param('roomId')
    N.API.getUsers(roomId, function(users) {
        users = JSON.parse(users)

        // filter out teacher(s)
        users = users.filter(function(user) {
            return user.role === "student"
        })
        // users_count = users.length
        users_count = req.param("users_count")
        max_rooms = config.erizoController.warning_n_rooms || 15

        var rooms_number = 0
        if (Math.ceil(users_count / 2) < max_rooms) {
            // we can split students into pairs
            rooms_number = Math.ceil(users_count / 2)

        }
        else if (Math.ceil(users_count / 3) < max_rooms) {
            // we can split students into groups of 3
            rooms_number = Math.ceil(users_count / 3)

        }
        else {
            rooms_number = max_rooms - 1
        }

        // now split arrange students into `rooms_number` groups
        console.log(users_count, "-", max_rooms, "-", rooms_number)

        res.json({})
    }, function(error) {
        res.send(404, error)
    })
})

module.exports = router
