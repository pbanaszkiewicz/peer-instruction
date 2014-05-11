var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// if (process.env.ERIZO_PATH === undefined)
//     // CHANGE THIS TO YOUR COMPILED ERIZOAPI NODE MODULE
//     // <your_path>/licode/erizoAPI/build/Release/addon
//     process.env.ERIZO_PATH = '/home/piotr/workspace' +
//                              '/licode/erizoAPI/build/Release/addon'
// var erizoAPI = require(process.env.ERIZO_PATH)

var config = require('./configuration')
var N = require('./nuveServerAPI')

var routes = require('./routes/index');
var teacher = require('./routes/teacher');
var students = require('./routes/students');

var app = express();


app.configure = function() {
    N.API.init(config.nuve.superserviceID, config.nuve.superserviceKey,
               config.nuve.address)
               // JavaScript lacks string substitution

    // remove room if it's not our classroom.
    N.API.getRooms(function(rooms) {
        rooms = JSON.parse(rooms)

        rooms.forEach(function(room) {
            if (room.name !== 'classroom')
            {
                N.API.deleteRoom(room._id, function(e) {
                    console.log("Removed room ", e)
                }, function(e) {
                    console.log("Error while removing room ", room, ": ", e)
                })
            } else
            {
                app.classroom = room;
                console.log("Classroom exists: %s", room._id)
            }
        })

        // Add new classroom if none exists.
        if (app.classroom === undefined)
        {
            N.API.createRoom('classroom', function(room) {
                app.classroom = room
                console.log('Created room "%s" with id "%s"', room.name, room._id)
            }, function() {
                console.error('Could not create new classroom')
            }, {p2p: false})
        }
    }, function(e) {
        console.error("Could not parse existing rooms! ", e)
    })
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// engage router
app.use('/', routes);
app.use('/teacher', teacher);
app.use('/students', students);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
