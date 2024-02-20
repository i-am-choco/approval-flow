'use strict';

const approvalFlow = require('..');
const assert = require('assert').strict;

assert.strictEqual(approvalFlow(), 'Hello from approvalFlow');
console.info('approvalFlow tests passed');
