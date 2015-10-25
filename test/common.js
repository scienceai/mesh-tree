global.chai = require('chai');
global.expect = require('chai').expect;
global.assert = require('chai').assert;

var MeshTree = require('../src/index.js');

var multilevel = require('multilevel');
var net = require('net');
var level = require('level');

net.createServer(function (con) {
  con.pipe(multilevel.server(level('dbtest'))).pipe(con);
}).listen(7776);

var db = multilevel.client();
var con = net.connect(7776);
con.pipe(db.createRpcStream()).pipe(con);

global.meshTree = new MeshTree({
  level: db
});
