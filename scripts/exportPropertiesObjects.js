#!/usr/bin/env node

var fs = require('fs');
var _ = require('lodash');
var Promise = require('bluebird');
var MeshTree = require('../dist');
var meshTree = new MeshTree();

const MESH = 'http://id.nlm.nih.gov/mesh/';

meshTree.getAllDescUIs({ format: 'rdf' }).then(ids => {
  Promise.all(
    ids.map(id => meshTree.createPropertiesObject({
      '@id': id,
      properties: ['name','description','synonyms','schemaOrgType','codeValue','codingSystem']
    }))
  ).then(result => {
    fs.writeFile('mesh_properties_objects.json', JSON.stringify(_.zipObject(ids.map(id => id.replace(MESH, '')), result)), 'utf8');
  }).catch(err => console.error(err));
});
