"use strict";

const PROBLEM_REGEX = /^(\d+)\s*([\+\-\*\/%])\s*(\d+)$/;
const OPERATIONS = {
    '+': (left, right) => (left + right),
    '-': (left, right) => (left - right),
    '*': (left, right) => (left * right),
    '/': (left, right) => (left / right),
    '%': (left, right) => (left % right)
};

function mathConsumer(problem) {
    let matches = PROBLEM_REGEX.exec(problem);

    if( matches === null ) {
        return 'NaN';
    }

    let left = matches[1];
    let op = matches[2];
    let right = matches[3];

    if( !OPERATIONS.hasOwnProperty(op) ) {
        return 'NaN';
    }

    let result = OPERATIONS[op](left, right);
    result = String(result);

    // Truncate at two decimal places
    let decimalIndex = result.indexOf('.');
    if( decimalIndex !== -1 ) {
        result = result.slice(0, decimalIndex + 3);
    }

    return result;
}

module.exports = mathConsumer;