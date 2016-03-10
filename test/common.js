global.chai = require('chai');
global.expect = require('chai').expect;
global.assert = require('chai').assert;

import MeshTree from '../src';

import multilevel from 'multilevel';
import net from 'net';
import level from 'level';

let db = level('dbtest');
net.createServer(function (con) {
  con.pipe(multilevel.server(db)).pipe(con);
}).listen(7776);

let db_client = multilevel.client();
let con = net.connect(7776);
con.pipe(db_client.createRpcStream()).pipe(con);

global.meshTree = new MeshTree({
  level: db_client
});
