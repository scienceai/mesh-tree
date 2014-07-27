var path = require('path')
  , fs = require('fs');

var csv = fs.readFileSync(path.resolve('..', 'data', 'mtrees2014.csv'), {encoding: 'utf8'});

var hash = {};
csv.split('\n').forEach(function(row){
  if(!row) return;
  var kv = row.split(';');
  hash[kv[0].trim()] = kv[1].trim();
});

fs.writeFileSync(path.resolve('..', 'data', 'mtrees2014.json'), JSON.stringify(hash, null, 2));
