Installation
============

Erizo
-----

.. warning::
    This application doesn't work with Erizo **yet**.  Don't bother with
    installing Erizo.

Erizo is MCU used for peer-instruction.  Start with cloning it's git
repository::

    git clone git@github.com:ging/licode.git

Now run ``./licode/erizo/generateProject.sh``.  It will look for all
dependencies required by Erizo.

For me, these packages were necessary:

- ``build-essentials``
- ``libboost-all-dev``
- ``libavutil-dev``
- ``libavcodec-dev``
- ``libavformat-dev``
- ``liblog4cxx10-dev``

`The original Erizo readme <https://github.com/ging/licode/tree/master/erizo>`_
doesn't mention most of these packages, even though they're required through
CMake.

Peer instruction
----------------

First, set up your computer::

    sudo aptitude install nodejs npm

Second, clone git repository of this project to the ``peer-instruction``
directory::

    git clone git@github.com:pbanaszkiewicz/peer-instruction.git ./peer-instruction

Third, install project dependencies (remember to run this command from
``peer-instruction`` directory!):

    cd peer-instruction/peerinstruction
    npm install

Now run the server::

    ./bin/www.js