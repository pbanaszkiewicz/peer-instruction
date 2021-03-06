window.onload = function() {

    var roomId, localStream, room, teacherStream

    $.get("/roomid", {roomName: "classroom"}, function(res) {
        roomId = res;
    })

    var subscribeToStreams = function(streams) {
        for (var index in streams) {
            var stream = streams[index]
            if ((localStream.getID() !== stream.getID()) && stream.hasVideo()) {
                room.subscribe(stream)
            }
        }
    }

    //
    localStream = Erizo.Stream({audio: false, video: false, data: true})

    localStream.addEventListener("access-accepted", function() {
        console.log("Access to the webcam granted!")

        room.addEventListener("room-connected", function(roomEvent) {
            console.log("Room connected!")

            room.publish(localStream)
            subscribeToStreams(roomEvent.streams)
        })

        room.addEventListener("stream-subscribed", function(event) {
            console.log("Stream subscribed!")

            // singleton stream
            teacherStream = event.stream
            var div = document.createElement("div")
            div.setAttribute("style", "width: 600px; height: 400px;")
            div.setAttribute("id", "stream" + teacherStream.getID())
            document.getElementById("videoStream").appendChild(div)
            // stream.show("smallerStream" + stream.getID())

            teacherStream.show("stream" + teacherStream.getID())

            teacherStream.addEventListener("stream-data", function(evt) {
                console.log("Received data")
                window.alert(evt.msg.text)
                // console.log('Received data ', evt.msg, 'from stream ',
                //             evt.stream.getAttributes().name)
            })
        })

        room.addEventListener("stream-added", function(event) {
            console.log("New stream available!")
            subscribeToStreams([event.stream])
            if (event.stream.getID() === localStream.getID())
            {
                console.log("It's your stream that has been added!")
            }
        })

        room.addEventListener("stream-removed", function(event) {
            var stream = event.stream
            if (stream.elementID !== undefined)
            {
                var element = document.getElementById(stream.elementID)
                element.remove()
            }
            console.log("Removed stream ", stream.getID())
        })

        room.connect()
    })

    $("#enroll").click(function() {
        username = $("#username").val() || "Student"
        $("#username").attr("disabled", "disabled")

        $.getJSON("/enroll",
                  {username: username, room: roomId, role: "student"},
                  function(data) {
            room = Erizo.Room({token: data.token})

            console.log("Joining the room!")

            localStream.init()
        })
    })
}
