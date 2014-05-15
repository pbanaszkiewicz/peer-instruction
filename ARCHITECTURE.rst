Architecture
============

To create rooms, access rooms and stream within existing rooms, you have to
contact Nuve server.

Nuve server is responsible for storing information about rooms, as well as
managing access to them.

For the time being, the Nuve server is separate from Peer Instruction
application.  I hope to incorporate it into the application in the future.

Nuve contacts erizoController server, which in turn uses ``liberizo.so`` to
create proper MCU.

The front-end to all these services is based on JavaScript library ``eriso.js``
that talks via websockets with erizoAPI and erizoController.