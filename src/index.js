import levelgraph from 'levelgraph';
import levelgraphN3 from 'levelgraph-n3';
import level from 'level';
import _ from 'lodash';
import Bluebird from 'bluebird';
import co from 'co';
import * as wikipedia from './lib/wikipedia';
import permutations from './lib/permutations';

const MESH = 'http://id.nlm.nih.gov/mesh/';
const MESHV = 'http://id.nlm.nih.gov/mesh/vocab#';
const RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
const RDFS = 'http://www.w3.org/2000/01/rdf-schema#';

class MeshTree {
  constructor(config) {
    config = config || {};

    let DB;
    if (config.level) {
      DB = config.level;
    } else {
      let dbPath = config.dbPath || process.env['PATH_TO_MESH_DB'] || 'dbtest';
      DB = level(dbPath);
    }

    this.db = levelgraphN3(levelgraph(DB));
    this.dbSearch = Bluebird.promisify(this.db.search, {multiArgs: false});

  }
}

/*
* Returns array of all descriptor record UIs
*/
MeshTree.prototype.getAllDescUIs = co.wrap(function* () {

  let result = yield this.dbSearch({
    subject: this.db.v('desc'),
    predicate: RDF + 'type',
    object: MESHV + 'TopicalDescriptor'
  }, {});

  let allDescUIs = _.map(result, (item) => item['desc'].replace(MESH, ''));

  return allDescUIs;

});

/*
* Returns array of all chemical supplementary record UIs
*/
MeshTree.prototype.getAllSCRChemicalUIs = co.wrap(function* () {

  let result = yield this.dbSearch({
    subject: this.db.v('chemicalSCR'),
    predicate: RDF + 'type',
    object: MESHV + 'SCR_Chemical'
  }, {});
console.log(allSCRChemicalUIs);
  let allSCRChemicalUIs = _.map(result, (item) => item['chemicalSCR'].replace(MESH, ''));
  return allSCRChemicalUIs;

});

/*
* Returns array of all disease (rare) supplementary record UIs
*/
MeshTree.prototype.getAllSCRDiseaseUIs = co.wrap(function* () {

  let result = yield this.dbSearch({
    subject: this.db.v('diseaseSCR'),
    predicate: RDF + 'type',
    object: MESHV + 'SCR_Disease'
  }, {});

  let allSCRDiseaseUIs = _.map(result, (item) => item['diseaseSCR'].replace(MESH, ''));
  return allSCRDiseaseUIs;

});

/*
* Returns array of all protocol (e.g., cancer-related) supplementary record UIs
*/
MeshTree.prototype.getAllSCRProtocolUIs = co.wrap(function* () {

  let result = yield this.dbSearch({
    subject: this.db.v('protocolSCR'),
    predicate: RDF + 'type',
    object: MESHV + 'SCR_Protocol'
  }, {});

  let allSCRProtocolUIs = _.map(result, (item) => item['protocolSCR'].replace(MESH, ''));
  return allSCRProtocolUIs;

});

/*
* Returns the cleaned text output of the wikipedia page corresponding to the descriptor record UI
*
* `level`:
*   `0` - abstract only
*   `1` - all text
*/
MeshTree.prototype.getWikipediaEntryByDescUI = co.wrap(function* (opts) {

  if (_.isArray(opts)) opts = opts[0];

  const descUI = opts.descUI;
  const level = opts.level;

  let concept = yield this.getPreferredTermByDescUI(descUI);
  let wiki = yield wikipedia.getMainSections(concept.replace(/ /g, '+'));

  if (level === 0) {

    let text = '';
    _.each(wiki, (section) => {
      if (section.sectionLevel === 0) {
        text += section.sectionText;
      }
    });

    // if no abstract, just return everything as if level = 1
    if (text.length === 0) {
      _.each(wiki, (section) => {
        text += section.sectionText;
      });
    }

    return text;

  } else {

    let text = '';
    _.each(wiki, (section) => {
      text += section.sectionText;
    });

    return text;

  }

});

/*
* Returns array of tree numbers by descriptor record unique identifier
*
* Example: 'D000001' returns ['D03.438.221.173']
*/
MeshTree.prototype.getTreeNumbersByDescUI = co.wrap(function* (descUI) {

  let result = yield this.dbSearch({
    subject: MESH + descUI,
    predicate: MESHV + 'treeNumber',
    object: this.db.v('treeNumber')
  }, {});

  let treeNumbers = _.map(result, (item) => item['treeNumber'].replace(MESH, ''));
  return treeNumbers;

});

/*
* Returns descriptor record unique identifier by tree number
*
* Example: 'D03.438.221.173' returns 'D000001'
*/
MeshTree.prototype.getDescUIByTreeNumber = co.wrap(function* (treeNum) {

  let result = yield this.dbSearch({
    subject: this.db.v('descUI'),
    predicate: MESHV + 'treeNumber',
    object: MESH + treeNum
  }, {});

  if (_.isEmpty(result)) {
    return null;
  } else {
    return result[0]['descUI'].replace(MESH, '');
  }

});

/*
* Returns the record preferred term by descriptor record unique identifier
* (i.e., the preferred term of the preferred concept)
*
* Example: 'D000001' returns 'Calcimycin'
*/
MeshTree.prototype.getPreferredTermByDescUI = co.wrap(function* (descUI) {

  let result1 = yield this.dbSearch({
    subject: MESH + descUI,
    predicate: MESHV + 'preferredTerm',
    object: this.db.v('preferredTermUI')
  }, {});

  let result2 = yield this.dbSearch({
    subject: result1[0]['preferredTermUI'],
    predicate: MESHV + 'prefLabel',
    object: this.db.v('term')
  }, {});

  if (_.isEmpty(result2)) throw('empty result.');

  let result2_en = result2.filter(r => r['term'].endsWith('@en'));

  return result2_en[0]['term'].replace(/\"/g, '').replace(/@en/, '');

});

/*
* Returns preferred concept UI for descriptor record UI
*
* Example: 'D000001' returns 'M0000001'
*/
MeshTree.prototype.getPreferredConceptByDescUI = co.wrap(function* (descUI) {

  let result = yield this.dbSearch({
    subject: MESH + descUI,
    predicate: MESHV + 'preferredConcept',
    object: this.db.v('conceptUI')
  }, {});

  if (_.isEmpty(result)) throw('empty result.');

  return result[0]['conceptUI'].replace(MESH, '');

});

/*
* Returns all concept UIs contained by descriptor record UI
* (both preferred and not)
*
* Example: 'D000001' returns [ 'M0353609', 'M0000001' ]
*/
MeshTree.prototype.getConceptUIsByDescUI = co.wrap(function* (descUI) {

  let allConceptUIs = [];

  for (let pred of ['concept', 'preferredConcept']) {

    let result = yield this.dbSearch({
      subject: MESH + descUI,
      predicate: MESHV + pred,
      object: this.db.v('conceptUI')
    }, {});

    result.forEach((item) => allConceptUIs.push(item['conceptUI'].replace(MESH, '')));

  }

  return allConceptUIs;

});

/*
* Returns all term UIs contained by concept UI
* (both preferred and not)
*
* Example: 'M0353609' returns [ 'T000003', 'T000004', 'T000001' ]
*/
MeshTree.prototype.getTermUIsByConceptUI = co.wrap(function* (conceptUI) {

  let allTermUIs = [];

  for (let pred of ['term', 'preferredTerm']) {

    let result = yield this.dbSearch({
      subject: MESH + conceptUI,
      predicate: MESHV + pred,
      object: this.db.v('termUI')
    }, {});

    result.forEach((item) => allTermUIs.push(item['termUI'].replace(MESH, '')));

  }

  return allTermUIs;

});

/*
* Returns all terms contained by term UI
* (both preferred and not)
*
* Example: 'T000003' returns [ 'A23187, Antibiotic', 'Antibiotic A23187' ]
*/
MeshTree.prototype.getTermsByTermUI = co.wrap(function* (termUI) {

  let allLabels = [];

  for (let pred of ['label', 'altLabel', 'prefLabel']) {

    let result = yield this.dbSearch({
      subject: MESH + termUI,
      predicate: MESHV + pred,
      object: this.db.v('label')
    }, {});

    let result_en = result.filter(r => r['label'].endsWith('@en'));

    result_en.forEach(item => allLabels.push(item['label'].replace(/\"/g, '').replace(/@en/, '')));

  }

  return allLabels;

});

/*
* Returns all terms by descriptor record unique identifier
* (i.e., all terms for all concepts, both preferred and not)
*
* Example: 'D000001' returns [ 'A23187, Antibiotic', 'Antibiotic A23187', 'A23187', 'A 23187', 'A-23187', 'Calcimycin' ]
*/
MeshTree.prototype.getAllTermsByDescUI = co.wrap(function* (descUI) {

  let allTerms = [];

  let conceptUIs = yield this.getConceptUIsByDescUI(descUI);
  for (let conceptUI of conceptUIs) {
    let termUIs = yield this.getTermUIsByConceptUI(conceptUI);
    for (let termUI of termUIs) {
      let labels = yield this.getTermsByTermUI(termUI);
      labels.forEach((label) => allTerms.push(label.replace(/\"/g, '')));
    }
  }

  return allTerms;

});

/*
* Returns scope note for descriptor record unique identifier
* (scope notes are contained in the preferred concept record)
*
* Example: 'D000001', via concept 'M0000001', returns 'An ionophorous, polyether antibiotic from Streptomyces chartreusensis. It binds and transports CALCIUM and other divalent cations across membranes and uncouples oxidative phosphorylation while inhibiting ATPase of rat liver mitochondria. The substance is used mostly as a biochemical tool to study the role of divalent cations in various biological systems.'
*/
MeshTree.prototype.getScopeNoteByDescUI = co.wrap(function* (descUI) {

  let conceptUI = yield this.getPreferredConceptByDescUI(descUI);

  let result = yield this.dbSearch({
    subject: MESH + conceptUI,
    predicate: MESHV + 'scopeNote',
    object: this.db.v('scopeNote')
  }, {});

  if (_.isEmpty(result)) {
    return '';
  } else {
    let result_en = result.filter(r => r['scopeNote'].endsWith('@en'));
    return result_en[0]['scopeNote'].replace(/\"/g, '').replace(/@en/, '');
  }

});

/*
* Returns parent descriptor records UIs
* (returns an array as records can exist in multiple tree branches)
*
* Example: 'D000001' returns ['D001583']
*          'D005138' returns ['D006197', 'D005123']
*/
MeshTree.prototype.getParentDescUIsForDescUI = co.wrap(function* (descUI) {

  let result = yield this.dbSearch({
    subject: MESH + descUI,
    predicate: MESHV + 'broaderDescriptor',
    object: this.db.v('descUI')
  }, {});

  return _.unique(result.map(res => res['descUI'].replace(MESH, '')));

});

/*
* Returns parent descriptor record UIs mapped from supplementary concept record UI
*
* Example: 'C025735' returns ['D001286', 'D002164', 'D012602']
*/
MeshTree.prototype.getParentDescUIsForSCR = co.wrap(function* (scrUI) {

  let result = yield this.dbSearch({
    subject: MESH + scrUI,
    predicate: MESHV + 'preferredMappedTo',
    object: this.db.v('descUI')
  }, {});

  // get rid of descriptor qualifiers as well
  return _.unique(result.map(res => res['descUI'].replace(MESH, '').replace(/Q\d+/g, '')));

});

/*
* Returns ancestor descriptor records UIs
* (returns an array)
*
* Example: 'D000001' returns ['D001583', 'D006574', 'D006571']
*          'D005138' returns ['D005123', 'D006197', 'D005145', 'D012679', 'D034582', 'D006257', 'D001829']
*/
MeshTree.prototype.getAncestorDescUIsForDescUI = co.wrap(function* (descUI) {

  let parents = [];

  let nodes = [descUI];
  let hasParents = true;

  while (hasParents) {
    let nodesTemp = [];

    for (let node of nodes) {
      let parentsTemp = yield this.getParentDescUIsForDescUI(node);
      _.each(parentsTemp, (p) => nodesTemp.push(p));
      _.each(parentsTemp, (p) => parents.push(p));
    }

    nodes = nodesTemp;
    hasParents = nodesTemp.length > 0;
  }

  return _.unique(parents);

});

/*
* Returns children descriptor records UIs
* (immediate, not descendants)
*
* Example: 'D012343' returns ['D012345', 'D000926', 'D012346']
*/
MeshTree.prototype.getChildrenDescUIsForDescUI = co.wrap(function* (descUI) {

  let childrenDescUIs = [];

  let treeNums = yield this.getTreeNumbersByDescUI(descUI);

  for (let treeNum of treeNums) {

    let result = yield this.dbSearch({
      subject: this.db.v('treeNum'),
      predicate: MESHV + 'parentTreeNumber',
      object: MESH + treeNum
    }, {});

    if (!_.isEmpty(result)) {
      for (let res of result) {
        let ui = yield this.getDescUIByTreeNumber(res['treeNum'].replace(MESH, ''));
        childrenDescUIs.push(ui);
      }
    }

  }

  return childrenDescUIs;

});

/*
* Returns sibling descriptor records UIs
* (across all branches a descriptor record may exist under)
*
* Example: 'D015834' returns ['D012345', 'D000926', 'D012346']
*/
MeshTree.prototype.getSiblingDescUIsForDescUI = co.wrap(function* (descUI) {

  let siblingDescUIs = [];

  let parentDescUIs = yield this.getParentDescUIsForDescUI(descUI);

  for (let parent of parentDescUIs) {

    let childrenDescUIs = yield this.getChildrenDescUIsForDescUI(parent);
    _.forEach(childrenDescUIs, (ui) => siblingDescUIs.push(ui));

  }

  _.remove(siblingDescUIs, (ui) => (ui === descUI));

  return siblingDescUIs;

});

/*
* Returns descriptor records UI of closest common ancestors of two or more descriptor record UIs
* (if a descriptor exists in more than one place on the tree, there will be more than one common ancestor)
*
* Example: ['D000926', 'D012345'] returns ['D012343']
*/
MeshTree.prototype.getCommonAncestorsForDescUIs = co.wrap(function* (descUIArray) {

  if (!_.isArray(descUIArray)) throw new Error('input not an array.');

  let commonAncestorsDescUIs = [];
  let commonAncestorsTreeNums = [];

  let treeNumsArray = [];
  for (let descUI of descUIArray) {
    let treeNums = yield this.getTreeNumbersByDescUI(descUI);
    treeNumsArray.push(treeNums);
  }

  let treeNumPermutations = permutations.apply(null, treeNumsArray);

  for (let permut of treeNumPermutations) {

    let depth = 0;
    let branches = [];
    for (let branch of permut[0].split('.')) {

      let isCommonBranch = _.all(
        _.map(permut.slice(1, permut.length), (x) => (branch === x.split('.')[depth]))
      );

      if (isCommonBranch) {
        branches.push(branch);
        ++depth;
      } else {
        break;
      }
    }
    let commonAncestorTreeNum = branches.join('.');

    // should not be ancestor of common ancestor already in common ancestors array
    let isBroader = _.any(
      _.map(commonAncestorsTreeNums, (t) => _.startsWith(t, commonAncestorTreeNum))
    );

    if (commonAncestorTreeNum && !isBroader) {

      // remove those in common ancestors array that are broader than current
      let indices = [];
      for (let idx = 0; idx < commonAncestorsTreeNums.length; idx++) {
        if (_.startsWith(commonAncestorTreeNum, commonAncestorsTreeNums[idx])) {
          indices.push(idx);
        }
      }
      for (let idx of indices) {
        commonAncestorsDescUIs.splice(idx, 1);
        commonAncestorsTreeNums.splice(idx, 1);
      }

      // add common ancestor to array
      let commonAncestorDescUI = yield this.getDescUIByTreeNumber(commonAncestorTreeNum);
      commonAncestorsDescUIs.push(commonAncestorDescUI);
      commonAncestorsTreeNums.push(commonAncestorTreeNum);

    }

  }

  return commonAncestorsDescUIs;

});


/*
* Tests whether or not descUI2 is a descendant of descUI1 (child of >=1 depth)
*/
MeshTree.prototype.isDescendantOf = co.wrap(function* (descUI1, descUI2) {

  if (descUI1 === descUI2) return false;

  let parentsAll = [];

  let nodes = [descUI2];
  let hasParents = true;

  while (hasParents) {
    let nodesTemp = [];

    for (let node of nodes) {
      let parentsTemp = yield this.getParentDescUIsForDescUI(node);

      _.each(parentsTemp, (p) => {
        parentsAll.push(p);
        nodesTemp.push(p);
      });
    }

    nodes = nodesTemp;
    hasParents = nodes.length > 0;
  }

  return _.includes(parentsAll, descUI1);

});


/*
* Creates a subtree from a flat list of descriptor record UIs (as `@id`s) based on parent-child relationships within the MeSH ontology tree.
*/
MeshTree.prototype.clusterDescUIs = co.wrap(function* (idArray) {

  // input must be array
  if (!_.isArray(idArray)) throw new Error('input not an array.');

  let descUIArray = idArray.map(id => id.replace(MESH, ''));

  // booleans whether a concept can have potential children (i.e., not the most specific concept)
  let mostSpecificConcept = {};
  for (let descUI of descUIArray) {
    let children = yield this.getChildrenDescUIsForDescUI(descUI);
    mostSpecificConcept[descUI] = !children || !children.length;
  }

  // create array of parent-child relationship objects
  let relationships = [];

  for (let descUI of descUIArray) {

    let parents = [];

    let nodes = [descUI];
    let hasParents = true;
    let parentsFound = false;

    while (hasParents && !parentsFound) {
      let nodesTemp = [];

      for (let node of nodes) {
        let parentsTemp = yield this.getParentDescUIsForDescUI(node);
        let parentsInArray = _.intersection(parentsTemp, descUIArray);

        if (parentsInArray.length > 0) {
          _.each(parentsInArray, (p) => parents.push(p));
          parentsFound = true;
        } else {
          _.each(parentsTemp, (p) => nodesTemp.push(p));
        }
      }

      nodes = nodesTemp;
      hasParents = nodesTemp.length > 0;
    }

    if (parents.length === 0) {

      relationships.push({
        '@id': MESH + descUI,
        'parent': null,
        'mostSpecificConcept': mostSpecificConcept[descUI]
      });

    } else {

      _.each(parents, (parent) => {
        relationships.push({
          '@id': MESH + descUI,
          'parent': MESH + parent,
          'mostSpecificConcept': mostSpecificConcept[descUI]
        });
      });

    }

  }

  // recursive function for clustering
  function treeCluster(relationsList, parent, tree) {

    if (typeof tree === 'undefined') {
      tree = [];
    }
    if (typeof parent === 'undefined') {
      parent = { '@id': null, 'parent': null };
    }

    let children = _.filter(relationsList, (child) => {
      return child.parent === parent['@id'];
    });

    if (!_.isEmpty(children)) {
      if (_.isNull(parent['@id'])) {
        tree = children;
      } else {
        parent['children'] = children;
      }

      _.each(children, (child) => {
        treeCluster(relationsList, child);
      });
    }

    return tree;
  }

  return treeCluster(relationships);

});

/*
* Tests whether a descriptor has pharmacological actions (in other words, if the descriptor is a drug).
* If true, returns array of descUI mappings of the pharmacological action, otherwise returns null.
*/
MeshTree.prototype.getPharmacologicalAction = co.wrap(function* (ui) {

  let result = yield this.dbSearch({
    subject: MESH + ui,
    predicate: MESHV + 'pharmacologicalAction',
    object: this.db.v('descUI')
  }, {});

  if (_.isEmpty(result)) {
    return null;
  } else {
    return _.unique(result.map(res => res['descUI'].replace(MESH, '')));
  }

});

/*
 * Performs mapping of MeSH concepts onto Schema.org classes
 */
MeshTree.prototype.getSchemaOrgType = co.wrap(function* (ui) {
  let schemaOrgType = 'MedicalEntity';

  let pharmActions = yield this.getPharmacologicalAction(ui);
  if (pharmActions) {
    schemaOrgType = 'Drug';
  }

  let treeNums = yield this.getTreeNumbersByDescUI(ui);
  if (treeNums.some(tn => /^C\d+/.test(tn))) {
    schemaOrgType = 'MedicalCondition';
    if (treeNums.some(tn => /^(C01|C02|C03)\./.test(tn))) {
      schemaOrgType = 'InfectiousDisease';
    } else if (treeNums.some(tn => /^C23\./.test(tn))) {
      schemaOrgType = 'MedicalSignOrSymptom';
    }
  } else if (treeNums.some(tn => /^E07\.(101|132|190|222|230|278|315|325|430|505|515|605|652|695|814|858|862|877|913|926|935|950)\./.test(tn))) {
    schemaOrgType = 'MedicalDevice';
  } else if (treeNums.some(tn => /^E01\.370\./.test(tn))) {
    schemaOrgType = 'MedicalTest';
    if (treeNums.some(tn => /^E01\.370\.(100|370.050|372.250|372.255|372.310|376.300|376.525|376.700|378.150|378.155|378.330|386.105|386.460|386.700|388.100|388.250|390.800|405|530)/.test(tn))) {
      schemaOrgType = 'DiagnosticProcedure';
    } else if (treeNums.some(tn => /^E01\.370\.(049|350)/.test(tn))) {
      schemaOrgType = 'ImagingTest';
    }
    // skipping BloodTest and PathologyTest mapping for now as these are somewhat ambiguous
  } else if (treeNums.some(tn => /^E02\./.test(tn))) {
    schemaOrgType = 'MedicalTherapy';
    if (treeNums.some(tn => /^E02\.815\./.test(tn))) {
      schemaOrgType = 'RadiationTherapy';
    } else if (treeNums.some(tn => /^E02\.779\./.test(tn))) {
      schemaOrgType = 'PhysicalTherapy';
    } else if (treeNums.some(tn => /^E02\.(037|065|120|148|154|218|258|278|309|342|365|393|467|514|520|533|565|583|585|594|596|600|621|631|706|718|730|774|794|800|831|870|875|880|891|912|926|950|960)/.test(tn))) {
      schemaOrgType = 'TherapeuticProcedure';
    }
  } else if (treeNums.some(tn => /^(E03|E04)/.test(tn))) {
    schemaOrgType = 'MedicalProcedure';
  } else if (treeNums.some(tn => /^F04\.754\./.test(tn))) {
    schemaOrgType = 'PsychologicalTreatment';
  }

  return schemaOrgType;
});

/*
* Creates properties object from descriptor id
*/
MeshTree.prototype.createPropertiesObject = co.wrap(function* (propRequestObj) {
  let id = propRequestObj['@id'];
  let properties = propRequestObj.properties;
  let ui = id.replace(MESH, '');

  let propertiesObj = {
    '@id': id
  };

  for (let property of properties) {
    let preferredTerm;
    switch (property) {
      case 'name':
        preferredTerm = yield this.getPreferredTermByDescUI(ui);
        propertiesObj[property] = preferredTerm;
        break;
      case 'description':
        let scopeNotes = yield this.getScopeNoteByDescUI(ui);
        propertiesObj[property] = scopeNotes;
        break;
      case 'synonyms':
        preferredTerm = yield this.getPreferredTermByDescUI(ui);
        let synonyms = yield this.getAllTermsByDescUI(ui);
        let preferredTermIndex = synonyms.indexOf(preferredTerm);
        if (~preferredTermIndex) synonyms.splice(preferredTermIndex, 1);
        propertiesObj[property] = synonyms;
        break;
      case 'schemaOrgType':
        let schemaOrgType = yield this.getSchemaOrgType(ui);
        propertiesObj[property] = schemaOrgType;
        break;
      case 'codeValue':
        propertiesObj[property] = ui;
        break;
      case 'codingSystem':
        propertiesObj[property] = 'MeSH';
        break;
      default:
        propertiesObj[property] = null;
    }
  }

  return propertiesObj;

});


export default MeshTree;
