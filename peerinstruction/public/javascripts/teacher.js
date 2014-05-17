window.onload = function() {

    var room, localStream;

    $.get("/roomid", {roomName: "classroom"}, function(res) {
        room = res;
    })

    var subscribeToStreams = function(streams) {
        for (var index in streams) {
            var stream = streams[index];
            if (localStream.getID() !== stream.getID()) {
                room.subscribe(stream)
            }
        }
    }

    //
    localStream = Erizo.Stream({audio: true, video: true, data: true})

    $("#startStream").click(function() {
        username = $("#username").val() || "Teacher"
        $("#username").attr("disabled", "disabled")

        $.getJSON("/enroll", {username: username, room: room}, function(data) {
            console.log(data)

            room = Erizo.Room({token: data.token})

            localStream.addEventListener("access-accepted", function() {
                console.log("Access accepted!")

                // if there's anything left in the div for video stream
                $("#videoStream").empty()

                room.addEventListener("room-connected", function(roomEvent) {
                    console.log("Room connected!")

                    room.publish(localStream)
                    subscribeToStreams(roomEvent.streams)
                })

                room.addEventListener("stream-subscribed", function(event) {
                    console.log("Stream subscribed!")

                    var stream = event.stream
                    var div = document.createElement("div")
                    div.setAttribute("style", "height: 160px; width: 120px")
                    div.setAttribute("id", "smallerStream" + stream.getID())
                    document.getElementById("smallerStreams").appendChild(div)
                    stream.show("smallerStream" + stream.getID())
                })

                room.addEventListener("stream-added", function(event) {
                    console.log("Stream added!")
                    var streams = []
                    streams.push(event.stream)
                    subscribeToStreams(streams)
                    ///
                    if (localStream.getID() === event.stream.getID()) {
                        console.log("Your stream has been published!");
                    }
                })

                room.addEventListener("stream-removed", function(event) {
                    var stream = event.stream
                    if (stream.elementID !== undefined)
                    {
                        var element = document.getElementById(stream.elementID)
                        document.body.removeChild(element)
                    }
                    console.log("Removed stream ", stream.getID())
                })

                room.connect()
                localStream.show("videoStream")
            })

            localStream.init()
        })
    })
}
