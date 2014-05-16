Installation
============

Licode
------

`Licode by Lynckia`_ is a large suite for handling video conferences.  Peer
instruction heavily uses its components called Erizo and Nuve.

I highly advise to not install Licode locally.  Peer instruction comes with
``Vagrantfile`` that bootstraps Licode, builds it and basically makes
everything for you.

To use `Vagrant`_, simply `install it <http://www.vagrantup.com/downloads>`__
and inside Peer Instruction main directory run::

    $ vagrant up

That's it.  It'll take ~10 minutes to compile everything, but it's automatic.

However, if you really want to deal with all the issues of manual compilation,
you should follow
`the official guide <http://lynckia.com/licode/install.html#dependencies>`__.

Please also read about `Licode architecture`_ to familiarize yourself with
the terms used in this documentation.

.. _Licode by Lynckia: http://lynckia.com/licode/
.. _Vagrant: http://docs.vagrantup.com/v2/why-vagrant/index.html
.. _Licode architecture: http://lynckia.com/licode/architecture.html

Peer instruction
----------------

First, set up your computer::

    sudo aptitude install nodejs npm

Second, clone git repository of this project to the ``peer-instruction``
directory::

    git clone git@github.com:pbanaszkiewicz/peer-instruction.git ./peer-instruction

Third, install project dependencies::

    cd peer-instruction/peerinstruction
    npm install

Services
--------

.. warning: Work In Progress!

To run Peer Instruction you have to launch a few services first:

* erizoController
* nuve

You can do that by logging into Vagrant machine and invoking one script::

    $ vagrant ssh
    vagrant@precise32:~$ /vagrant/licode/scripts/initLicode.sh

Then you can finally run Peer Instruction::

    $ ./peerinstruction/bin/www
