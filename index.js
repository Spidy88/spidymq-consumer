"use strict";

const http = require('http');
const config = require('config');
const socketIO = require('socket.io');
const SpidyMQ = require('spidymq');
const createApp = require('./server');
const Worker = require('./worker');

const spidyMQUrl = config.get('spidyMQ.url');
const spidyMQPort = config.get('spidyMQ.port');
const serverUrl = config.get('server.url');
const serverPort = config.get('server.port');

const mq = SpidyMQ(`${spidyMQUrl}:${spidyMQPort}`, { serverUrl: `${serverUrl}:${serverPort}` });
mq.connect();

// TODO: Clean this up with promises, rxjs, or async
mq.createChannel('problems', { type: 'round-robin' }, function(err) {
    if( err ) {
        console.error('Failed to create problems queue');
        return;
    }

    mq.createChannel('solutions', { type: 'broadcast' }, function(err) {
        if( err ) {
            console.error('Failed to create solutions queue');
            return;
        }

        const worker = new Worker(function(solvedTask) {
            io.emit('solution', solvedTask.content);
            mq.publishMessage('solutions', solvedTask.content);
        });

        mq.subscribeChannel('problems', function(task) {
            io.emit('problem', task.content);
            worker.handleTask(task);
        });
    });
});

//TODO: Support clustering
const app = createApp(mq);
const server = http.createServer(app);
const io = socketIO(server);

console.log('Server ready');
server.listen(serverPort);