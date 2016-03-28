SpidyMQ Consumer
================

A service that consumes math problems from a SpidyMQ message queue. It is complemented with a web application for
visualizing the problems that get assigned to it, as well as the solutions that generates back.

## How to use this web application

As the summary states, this app is meant to consume problems and provide visualizations. When you load the 
application in your browser, you will see the consumer's name, a simple description, and probably a big blank area. 
This area will fill up as producers generates math problems. The problems will be automatically updated with 
their solutions thanks to [Socket.IO](http://socket.io/) but only if a producer is available to generate them. So if
you aren't seeing anything, make sure you have a [producer](http://github.com/Spidy88/spidymq-producer) running.

## Setting up the web application

This web application is built using [GruntJS](http://gruntjs.com/) and gets its web dependencies from 
[Bower](http://bower.io). [Node Foreman](http://strongloop.github.io/node-foreman/) is also used to run 
the application, which is really handy for dealing with environment variables and scaling service. First 
things first, let's get your global npm modules installed.
 
 ```
 npm install -g grunt-cli bower foreman
 ```
 
 We will also need to get our local project dependencies installed.
 
 ```
 npm install
 bower install
 ```
 
 With all our files in place, we can build the files. If you are doing development, grunt is setup to use
 nodemon and watchers to rebuild and restart the server while you are working on it. Just use the default
 grunt task for this. Unfortunately there currently any live reload support to you still have to click
 refresh in your browser
 
 ```
 grunt production
 grunt
 ```
 
## Setting up your environment

Almost ready, I promise, let's get your environment setup. There are a couple ways to manage your environment. You can 
use Node Foreman .env files which get autoloaded when the application is run, or you can create your own 
`config/default.js` configuration file. Config looks at `NODE_ENV` and then loads the corresponding config file. When
`NODE_ENV` is not present, `default` is used. Checkout [config/default.example.js] for an example of what configuration 
values are needed.

## Running the application

Starting the web application is quick and simple. You can use Node Foreman, npm start (which uses Node Foreman), or 
just start `index.js` yourself. You will need to include the --harmony flag since this web application is using plenty 
of neat and shiny ES6 features.

```
nf start
npm start
node --harmony index.js
```

One thing to be aware of, this application needs to be started after the 
[SpidyMQ Service](http://github.com/Spidy88/spidymq-service) is up and running. It does not currently have support
for reconnecting to the service.