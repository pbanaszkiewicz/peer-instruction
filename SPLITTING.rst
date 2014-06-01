Splitting protocol
==================

1. Teacher presses "Split students into smaller groups" button.

2. Their browser sends request to the server to create additional peer-to-peer
   rooms.

3. The server arranges students within rooms according to this algorithm::

    create as many rooms as there are 2-3 persons groups

    if there's more rooms than the allowed maximum, join every two groups
    together

4. Server responds to the teacher with newly created rooms and students linked
   to them, preferably in a dictionary format::

    {
        "room1": [
            "student1",
            "student2",
        ],

        "room2": [
            "student3",
            "student4",
        ]
    }

5. Teacher's browser sends joint requests via their data stream, preferably in
   "inversed" dictionary format::

    {
        "student1": "room1",
        "student2": "room1",
        "student3": "room2",
        "student4": "room2",
    }

6. Students' browsers listen to the data event and join corresponding rooms for
   a chit-chat.

Issues
------

1. To contact students' browsers we need to use Erizo data stream via
   teacher's stream.

2. There's no "direct routing" in this protocol, ie. all students will know
   where other's joined.

3. We somehow need to "exclude" the teacher from the list of users.  My first
   idea would be to create additional Erizo "role" with the same priviledges as
   "presenter" but different name, like "student".