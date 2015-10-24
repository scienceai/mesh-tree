global.chai = require('chai');
global.expect = require('chai').expect;
global.assert = require('chai').assert;

require('babel/polyfill');

var MeshTree = require('../src/index.js');
global.meshTree = new MeshTree({
  dbPath: 'dbtest',
  multi: true
});
