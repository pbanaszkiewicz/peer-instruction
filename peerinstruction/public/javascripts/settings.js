window.onload = function() {

    var room;

    // list all the rooms
    var refreshRooms = function() {
        $.getJSON("/rooms", function(rooms) {
            console.log("Refreshed rooms")
            $("#listRooms").empty()
            for (var room in rooms)
            {
                textInside = rooms[room].name + " (" + rooms[room]._id + ")"
                $('#listRooms').append($("<li></li>")
                               .text(textInside))
            }
        })
    }

    $("#newRoom").click(function() {
        roomName = $("#roomName").val()
        p2p = $("#p2p").prop("checked") || undefined
        $.post("/room", {roomName: roomName, p2p: p2p}, function() {
            refreshRooms()
            $("#roomName").val("")
        })

        return false;
    })

    $("#removeRoom").click(function() {
        roomId = $("#roomId").val()
        $.ajax({type: "DELETE", url: "/room", data: {roomId: roomId}})
        .done(function(result) {
            refreshRooms()
            $("#roomId").val("")
        })

        return false;
    })

    $("#getUsersList").click(function() {
        roomId = $("#roomIdUsers").val()
        $("#listUsers").empty()
        $.getJSON("/users", {roomId: roomId}, function(users) {
            console.log(users)
            for (var user in users)
            {
                textInside = users[user].name + " (" + users[user].role + ")"
                $("#listUsers").append($("<li></li>")
                               .text(textInside))
            }
        })

        return false;
    })

    refreshRooms();
}
