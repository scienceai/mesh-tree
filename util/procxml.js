// initialize modules
var fs = require('fs')
  , path = require('path')
  , cheerio = require('cheerio')
  , XmlStream = require('xml-stream')
  , levelup = require('levelup')
  , _ = require('lodash');

// path variables
var MESH_DESC_PATH = path.join(__dirname, '../data/mesh_desc_2015.xml')
  , LEVELDB_DATA_PATH = path.join(__dirname, '../db');

// initialize levelDB
var db = levelup(LEVELDB_DATA_PATH);

// stream XML file
var xml = new XmlStream(fs.createReadStream(MESH_DESC_PATH));

console.log('Processing MeSH file into levelDB...\n....................................');
var i = 0;
xml.collect('TreeNumber');
xml.collect('Concept');
xml.collect('SemanticType');
xml.collect('Term');
xml.on('endElement: DescriptorRecord', function(record) {
  i++;
  (i % 100 === 0) ? console.log('progress: ' + i) : null;

  var uid = record['DescriptorUI'];

  var treeNums = record['TreeNumberList']['TreeNumber'];

  var conceptNode = record['ConceptList']['Concept'].filter(function(concept) {
    return (concept['$']['PreferredConceptYN'] === 'Y');
  })[0];
  
  var concept = conceptNode['ConceptName']['String'];
  var conceptDesc = conceptNode['ScopeNote'];

  var semanticTypes = [];
  conceptNode['SemanticTypeList']['SemanticType'].forEach(function(type) {
    semanticTypes.push(type['SemanticTypeName']);
  });

  var terms = [];
  record['ConceptList']['Concept'].forEach(function(concept) {
    concept['TermList']['Term'].forEach(function(term) {
      if (term['$']['RecordPreferredTermYN'] === 'N') {
        terms.push(term['String']);
      }
    });
  });

  console.log(uid);
  console.log(treeNums);
  console.log(concept);
  console.log(conceptDesc);
  console.log(terms);
  console.log(semanticTypes);
});