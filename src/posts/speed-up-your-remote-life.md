*`ssh -p 2022 -l rob -i ~/.ssh/identity_work_rsa work-server.com`*

SSH'ing to servers can get a little cumbersome, especially when you're working with a lot of remote systems and multiple identity files.

Luckily, we have a brilliant tool to help us out. Its called `~/.ssh/config`, this great little file can speed up our SSH'ing five fold!

###Lets make a start.

First lets actually create our file, `touch ~/.ssh/config` - be sure to execute this as you *i.e. not root*

As our first example, we'll use the command at the top of the page: `ssh -p 2022 -l rob -i ~/.ssh/identity_work_rsa work-server.com`. We're going to split it up and match it to the correct part of our config file.

We need a name for this connection, lets say *Work*, so lets add that to our config file:

```bash
# My work connection
Host work
```
In the first part of the command we specify the port number, *2022*, not the standard SSH port, so we'll need to make sure we explicitly add this to our config file:

```bash
# My work connection
Host work
    Port 2022
```

I've added a 4 space indentation to show what lines apply to which host.

Next up we're adding which user we want to connect as:

```bash
# My work connection
Host work
    Port 2022
    User rob
```

We're also using a different SSH key (identity file) to connect to this server, so lets add that:

```bash
# My work connection
Host work
    Port 2022
    User rob
    IdentityFile ~/.ssh/identity_work_rsa
```

Last but by no means least, the hostname:

```bash
# My work connection
Host work
    Port 2022
    User rob
    IdentityFile ~/.ssh/identity_work_rsa
    HostName work-server.com
```

Great! We've broken down a command into a configuration section. To get it working we need to save the file and restart the SSH daemon: `sudo service sshd restart`, you should now be able to run:

```bash
my-machine $ ssh work
```

and as if by magic you will get connected to that machine. Good eh?

You can do some more reading [here](http://linux.die.net/man/5/ssh_config) on all the different configuration options you can use.

> I do hope SSH'ing becomes  a real verb one day.
