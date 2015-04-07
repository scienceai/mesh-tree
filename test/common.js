"use strict";

global.chai = require("chai");
global.expect = require("chai").expect;
global.assert = require('chai').assert;
global.co = require('co');

require("babel/polyfill");
global.meshTreeFuncs = require('../index.js');