let fs = require('fs');
let _ = require('lodash');
let Promise = require('bluebird');
let MeshTree = require('../dist');
let meshTree = new MeshTree();

const MESH = 'http://id.nlm.nih.gov/mesh/';

(Promise.coroutine(function* () {
  let objs = {};
  let ids = yield meshTree.getAllDescUIs({ format: 'rdf' });
  for (let id of ids) {
    console.log(id);
    let obj = yield meshTree.createPropertiesObject({
      '@id': id,
      properties: ['name','description','synonyms','schemaOrgType','codeValue','codingSystem']
    });
    objs[id.replace(MESH, '')] = obj;
  }
  fs.writeFileSync('mesh_properties_objects.json', JSON.stringify(objs), 'utf8');
}))();
