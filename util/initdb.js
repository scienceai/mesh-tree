/*
* Initializes levelgraph-n3 database from MeSH RDF N-triples
*/

var levelgraph = require('levelgraph')
  , levelgraphN3 = require('levelgraph-n3')
  , db = levelgraphN3(levelgraph('./db'))
  , fs = require('fs')
  , expandHomeDir = require('expand-home-dir')
  , progressStream = require('progress-stream');

const meshN3path = expandHomeDir('~/data/mesh/RDF/mesh2015.nt');
console.log('Importing MeSH RDF N-triple file at: ' + meshN3path);

var fileStats = fs.statSync(meshN3path);
var progstr = progressStream({
  length: fileStats.size,
  time: 1000
});
progstr.on('progress', function(progress) {
  console.log(progress);
});

var stream = fs.createReadStream(meshN3path)
  .pipe(progstr)
  .pipe(db.n3.putStream());

stream.on('finish', function() {
  console.log('Import completed');
});