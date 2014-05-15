Installation
============

Licode
------

`Licode by Lynckia`_ is a large suite for handling video conferences.  Peer
instruction heavily uses its components called Erizo and Nuve.  First start
with cloning Licode's git repository::

    git clone git@github.com:ging/licode.git ./licode

Follow
`the official guide <http://lynckia.com/licode/install.html#dependencies>`__
to build and install Licode (steps #3 and #4 in official guide).

Please also read about `Licode architecture`_ to familiarize yourself with
the terms used in this documentation.

.. _Licode by Lynckia: http://lynckia.com/licode/
.. _Licode architecture: http://lynckia.com/licode/architecture.html

Peer instruction
----------------

First, set up your computer (you don't need to install ``nodejs`` or ``npm``
if you installed Licode first)::

    sudo aptitude install nodejs npm

Second, clone git repository of this project to the ``peer-instruction``
directory::

    git clone git@github.com:pbanaszkiewicz/peer-instruction.git ./peer-instruction

Third, install project dependencies::

    cd peer-instruction/nuveServer
    npm install
    cd ../peerinstruction
    npm install

Services
--------

.. warning: Work In Progress!

To run Peer Instruction you have to launch a few services first:

* erizoController (to be found in Licode repository)
* nuveServer (included in the repository)

Then you can finally run Peer Instruction
(``peer-instruction/peerinstruction/bin/www``).