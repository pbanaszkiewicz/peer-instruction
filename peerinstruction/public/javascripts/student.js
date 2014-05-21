window.onload = function() {

    var roomId, localStream, room

    $.get("/roomid", {roomName: "classroom"}, function(res) {
        roomId = res;
    })

    var subscribeToStreams = function(streams) {
        for (var index in streams) {
            var stream = streams[index]
            console.log(stream.getID())
            console.log(localStream.getID())
            console.log(stream.hasVideo())
            if ((localStream.getID() !== stream.getID()) && stream.hasVideo()) {
                room.subscribe(stream)
            }
        }
    }

    //
    localStream = Erizo.Stream({audio: false, video: false, data: true})

    $("#enroll").click(function() {
        username = $("#username").val() || "Student"
        $("#username").attr("disabled", "disabled")

        $.getJSON("/enroll",
                  {username: username, room: roomId, role: "student"},
                  function(data) {
            room = Erizo.Room({token: data.token})

            console.log("Joining the room!")

            localStream.addEventListener("access-accepted", function() {
                console.log("Access to the stream granted!")

                room.addEventListener("room-connected", function(roomEvent) {
                    console.log("Room connected!")

                    room.publish(localStream)
                    subscribeToStreams(roomEvent.streams)
                })

                room.addEventListener("stream-subscribed", function(event) {
                    console.log("Stream subscribed!")

                    var stream = event.stream
                    var div = document.createElement("div")
                    div.setAttribute("style", "height: 120px; width: 160px")
                    div.setAttribute("id", "smallerStream" + stream.getID())
                    document.getElementById("videoStream").appendChild(div)
                    stream.show("smallerStream" + stream.getID())
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

            localStream.init()
        })
    })
}
