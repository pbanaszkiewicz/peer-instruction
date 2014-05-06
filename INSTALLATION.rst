Installation
============

Erizo
-----

.. warning::
    This application doesn't work with Erizo **yet**.  Don't bother with
    installing Erizo.

Erizo is an `MCU`_ used for peer-instruction.  Start with cloning it's git
repository::

    git clone git@github.com:ging/licode.git ./licode

Follow
`the official guide <http://lynckia.com/licode/install.html#dependencies>`__
to build Erizo (steps #3 and #4 in official guide).

.. _MCU: http://en.wikipedia.org/wiki/Multipoint_control_unit

Peer instruction
----------------

First, set up your computer (you don't need to install ``nodejs`` or ``npm``
if you installed Erizo first)::

    sudo aptitude install nodejs npm

Second, clone git repository of this project to the ``peer-instruction``
directory::

    git clone git@github.com:pbanaszkiewicz/peer-instruction.git ./peer-instruction

Third, install project dependencies::

    cd peer-instruction/peerinstruction
    npm install

.. _configuration:

Configuration
-------------

In ``peerinstruction/app.js`` configure the path to ``erizoAPI`` compilation
directory.  In my case it's ``licode/erizoAPI/build/Release/addon``.

It's advised to use absolute paths.

Now gets trickier.  The server and required NodeJS modules depend on various
shared object libraries (``.so`` files).  For the server to find them, *you*
must to show where these files are located.

There are two ways to achieve this:

1) "Permanent" settings.
   To your ``~/.bashrc`` append these lines::

        export ERIZO_HOME=<PATH>/licode/erizo
        export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:<PATH>/licode/erizo/build/erizo/

2) "Temporary" settings.
   To run the server, use following expression (remember, it's one line!)::

        ERIZO_HOME=<PATH>/licode/erizo LD_LIBRARY_PATH=$LD_LIBRARY_PATH:<PATH>/licode/erizo/build/erizo/ ./bin/www

Please remember to change ``<PATH>`` to your Licode installation directory.
It's advised to use absolute paths.

Dev server
----------

To run the server::

    cd peer-instruction/peerinstruction
    ./bin/www

Don't forget to ``ERIZO_HOME`` and ``LD_LIBRARY_PATH``, see `Configuration`_.