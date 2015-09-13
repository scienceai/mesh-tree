'use strict';

global.chai = require('chai');
global.expect = require('chai').expect;
global.assert = require('chai').assert;

require('babel/polyfill');
global.meshTree = require('../src/index.js');
