window.onload = function() {

    var roomId, localStream;

    $.get("/roomid", {roomName: "classroom"}, function(res) {
        roomId = res;
    })

    var subscribeToStreams = function(streams) {
        for (var index in streams) {
            var stream = streams[index];
            if (localStream.getID() !== stream.getID()) {
                room.subscribe(stream)
            }
        }
    }

    var updateStudentsNumber = function() {
        $.getJSON("/usersnumber", {roomId: roomId}, function(res) {
            $("#usersNumber").text(res.count - 1)  // don't count the teacher
        })
    }

    //
    localStream = Erizo.Stream({audio: true, video: true, data: true})

    $("#startStream").click(function() {
        username = $("#username").val() || "Teacher"
        $("#username").attr("disabled", "disabled")

        $.getJSON("/enroll",
                  {username: username, room: roomId, role: "presenter"},
                  function(data) {
            room = Erizo.Room({token: data.token})

            console.log("Joining the room!")

            localStream.addEventListener("access-accepted", function() {
                console.log("Access to the stream granted!")

                // if there's anything left in the div for video stream
                $("#videoStream").empty()

                room.addEventListener("room-connected", function(roomEvent) {
                    console.log("Room connected!")

                    room.publish(localStream)
                    subscribeToStreams(roomEvent.streams)
                    updateStudentsNumber()
                })

                room.addEventListener("stream-added", function(event) {
                    console.log("New stream available!")

                    // subscribeToStreams([event.stream])
                    if (event.stream.getID() === localStream.getID())
                    {
                        console.log("It's your stream that has been added!")
                    }
                    updateStudentsNumber();
                })

                room.addEventListener("stream-removed", function(event) {
                    var stream = event.stream
                    if (stream.elementID !== undefined)
                    {
                        var element = document.getElementById(stream.elementID)
                        document.body.removeChild(element)
                    }
                    console.log("Removed stream ", stream.getID())
                    updateStudentsNumber();
                })

                room.connect()
                localStream.show("videoStream")
            })

            localStream.init()
        })
    })
}
