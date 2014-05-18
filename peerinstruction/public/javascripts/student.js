window.onload = function() {

    var room, localStream

    $.get("/roomid", {roomName: "classroom"}, function(res) {
        room = res;
    })

    var subscribeToStreams = function(streams) {
        for (var index in streams) {
            var stream = streams[index];
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

        $.getJSON("/enroll", {username: username, room: room}, function(data) {
            room = Erizo.Room({token: data.token})

            console.log("Joining the room!")

            localStream.addEventListener("access-accepted", function() {
                console.log("Access to the stream granted!")

                room.addEventListener("room-connected", function(roomEvent) {
                    console.log("Room connected!")

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
