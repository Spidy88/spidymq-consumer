"use strict";

const config = require('config');
const mathConsumer = require('./math-consumer');
const serverName = config.get('server.name');

// TODO: Extend EventEmitter
class Worker {
    constructor(callback) {
        this._callback = callback;
    }

    handleTask(task) {
        task.content.consumer = serverName;
        task.content.solution = mathConsumer(task.content.problem);
        this._callback(task);
    }
}

module.exports = Worker;