var express = require('express')
var router = express.Router()

// var config = require('../configuration')
// var N = require('../nuveServerAPI')
// N.API.init(config.nuve.superserviceID, config.nuve.superserviceKey,
//            config.nuve.address)

/* GET teacher screen */
router.get('/', function(req, res) {
    res.render('teacher', { title: 'Peer instruction' })
})

router.get('/classroom', function(req, res) {
    N.API.getRooms(function(rooms) {
        res.render('teacher_classroom',
                   {title: 'Peer instruction - classroom', rooms: rooms})
    }, function(error) {
        console.error('Error: ', e)
    })
    // console.log(N.API.getRooms)
    // res.render('teacher_classroom', {title: 'Peer instruction', users: N.API.getUsers()})
})

module.exports = router
