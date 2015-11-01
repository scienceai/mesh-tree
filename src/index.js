import levelgraph from 'levelgraph';
import levelgraphN3 from 'levelgraph-n3';
import level from 'level';
import _ from 'lodash';
import Bluebird from 'bluebird';
import co from 'co';
import * as wikipedia from './helper/wikipedia';
import permutations from './helper/permutations';

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

  formatID(id, format) {
    if (format === 'rdf') {
      if (id.startsWith(MESH)) {
        return id;
      } else {
        return MESH + id;
      }
    } else if (format === 'mesh') {
      if (id.startsWith(MESH)) {
        return id.replace(MESH, '');
      } else {
        return id;
      }
    } else {
      return id;
    }
  }
}

/*
* Returns array of all descriptor records
*/
MeshTree.prototype.getAllDescUIs = co.wrap(function* (opts) {
  opts = opts || {};
  let format = opts.format || 'rdf';

  let result = yield this.dbSearch({
    subject: this.db.v('desc'),
    predicate: RDF + 'type',
    object: MESHV + 'TopicalDescriptor'
  }, {});

  return _.map(result, item => this.formatID(item['desc'], format));

});

/*
* Returns array of all chemical supplementary records
*/
MeshTree.prototype.getAllSCRChemicalUIs = co.wrap(function* (opts) {
  opts = opts || {};
  let format = opts.format || 'rdf';

  let result = yield this.dbSearch({
    subject: this.db.v('chemicalSCR'),
    predicate: RDF + 'type',
    object: MESHV + 'SCR_Chemical'
  }, {});

  return _.map(result, item => this.formatID(item['chemicalSCR'], format));

});

/*
* Returns array of all disease (rare) supplementary records
*/
MeshTree.prototype.getAllSCRDiseaseUIs = co.wrap(function* (opts) {
  opts = opts || {};
  let format = opts.format || 'rdf';

  let result = yield this.dbSearch({
    subject: this.db.v('diseaseSCR'),
    predicate: RDF + 'type',
    object: MESHV + 'SCR_Disease'
  }, {});

  return _.map(result, item => this.formatID(item['diseaseSCR'], format));

});

/*
* Returns array of all protocol (e.g., cancer-related) supplementary records
*/
MeshTree.prototype.getAllSCRProtocolUIs = co.wrap(function* (opts) {
  opts = opts || {};
  let format = opts.format || 'rdf';

  let result = yield this.dbSearch({
    subject: this.db.v('protocolSCR'),
    predicate: RDF + 'type',
    object: MESHV + 'SCR_Protocol'
  }, {});

  return _.map(result, item => this.formatID(item['protocolSCR'], format));

});

/*
* Returns the cleaned text output of the wikipedia page corresponding to the descriptor record UI
*
* `level`:
*   `0` - abstract only
*   `1` - all text
*/
MeshTree.prototype.getWikiEntry = co.wrap(function* (opts) {
  opts = opts || {};
  let descUI = this.formatID(opts.id, 'mesh');
  let level = opts.level || 0;

  let concept = yield this.getPrefTerm({ id: descUI });
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
* Returns array of tree numbers for descriptor record unique identifier
*
* Example: 'D000001' returns ['D03.438.221.173']
*/
MeshTree.prototype.getTreeNumbers = co.wrap(function* (opts) {
  opts = opts || {};
  let descUI = this.formatID(opts.id, 'mesh');
  let format = opts.format || 'rdf';

  let result = yield this.dbSearch({
    subject: MESH + descUI,
    predicate: MESHV + 'treeNumber',
    object: this.db.v('treeNumber')
  }, {});

  let treeNumbers = _.map(result, item => this.formatID(item['treeNumber'], format));
  return treeNumbers;

});

/*
* Returns descriptor record unique identifier by tree number
*
* Example: 'D03.438.221.173' returns 'D000001'
*/
MeshTree.prototype.treeNumberToUI = co.wrap(function* (opts) {
  opts = opts || {};
  let treeNum = this.formatID(opts.treeNum, 'mesh');
  let format = opts.format || 'rdf';

  let result = yield this.dbSearch({
    subject: this.db.v('descUI'),
    predicate: MESHV + 'treeNumber',
    object: MESH + treeNum
  }, {});

  if (_.isEmpty(result)) {
    return null;
  } else {
    return this.formatID(result[0]['descUI'], format);
  }

});

/*
* Returns preferred concept UI for descriptor record UI
*
* Example: 'D000001' returns 'M0000001'
*/
MeshTree.prototype.getPrefConceptUI = co.wrap(function* (opts) {
  opts = opts || {};
  let descUI = this.formatID(opts.id, 'mesh');
  let format = opts.format || 'rdf';

  let result = yield this.dbSearch({
    subject: MESH + descUI,
    predicate: MESHV + 'preferredConcept',
    object: this.db.v('conceptUI')
  }, {});

  if (_.isEmpty(result)) return null;

  return this.formatID(result[0]['conceptUI'], format);

});

/*
* Returns the record preferred term by descriptor record unique identifier
* (i.e., the preferred term of the preferred concept)
*
* Example: 'D000001' returns 'Calcimycin'
*/
MeshTree.prototype.getPrefTerm = co.wrap(function* (opts) {
  opts = opts || {};
  let descUI = this.formatID(opts.id, 'mesh');

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

  if (_.isEmpty(result2)) return null;

  let result2_en = result2.filter(r => r['term'].endsWith('@en'));

  return result2_en[0]['term'].replace(/\"/g, '').replace(/@en/, '');

});

/*
* Returns all terms by descriptor record unique identifier
* (i.e., all terms for all concepts, both preferred and not)
*
* Example: 'D000001' returns [ 'A23187, Antibiotic', 'Antibiotic A23187', 'A23187', 'A 23187', 'A-23187', 'Calcimycin' ]
*/
MeshTree.prototype.getAllTerms = co.wrap(function* (opts) {
  opts = opts || {};
  let descUI = this.formatID(opts.id, 'mesh');

  let allTermLabels = [];

  for (let pred1 of ['concept', 'preferredConcept']) {
    let conceptUIs = yield this.dbSearch({
      subject: MESH + descUI,
      predicate: MESHV + pred1,
      object: this.db.v('conceptUI')
    }, {});

    for (let item of conceptUIs) {
      let conceptUI = item['conceptUI'];

      for (let pred2 of ['term', 'preferredTerm']) {
        let termUIs = yield this.dbSearch({
          subject: conceptUI,
          predicate: MESHV + pred2,
          object: this.db.v('termUI')
        }, {});

        for (let item of termUIs) {
          let termUI = item['termUI'];

          for (let pred3 of ['label', 'altLabel', 'prefLabel']) {
            let terms = yield this.dbSearch({
              subject: termUI,
              predicate: MESHV + pred3,
              object: this.db.v('label')
            }, {});

            let terms_en = terms.filter(r => r['label'].endsWith('@en'));
            terms_en.forEach(term => allTermLabels.push(term['label'].replace(/\"/g, '').replace(/@en/, '')));

          }
        }
      }
    }
  }

  return allTermLabels;

});

/*
* Returns scope note for descriptor record unique identifier
* (scope notes are contained in the preferred concept record)
*
* Example: 'D000001', via concept 'M0000001', returns 'An ionophorous, polyether antibiotic from Streptomyces chartreusensis. It binds and transports CALCIUM and other divalent cations across membranes and uncouples oxidative phosphorylation while inhibiting ATPase of rat liver mitochondria. The substance is used mostly as a biochemical tool to study the role of divalent cations in various biological systems.'
*/
MeshTree.prototype.getScopeNote = co.wrap(function* (opts) {
  opts = opts || {};
  let descUI = this.formatID(opts.id, 'mesh');

  let conceptUI = yield this.getPrefConceptUI({ id: descUI, format: 'mesh' });

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
*
* If id provided is SCR,
* returns parent descriptor record UIs mapped from supplementary concept record UI
*
* Example: 'C025735' returns ['D001286', 'D002164', 'D012602']
*/
MeshTree.prototype.getParents = co.wrap(function* (opts) {
  opts = opts || {};
  let ui = this.formatID(opts.id, 'mesh');
  let format = opts.format || 'rdf';

  if (/^D\d+$/.test(ui)) {
    // descriptor record UI

    let result = yield this.dbSearch({
      subject: MESH + ui,
      predicate: MESHV + 'broaderDescriptor',
      object: this.db.v('descUI')
    }, {});

    return _.unique(result.map(res => this.formatID(res['descUI'], format)));

  } else if (/^C\d+$/.test(ui)) {
    // supplemetal record UI

    let result = yield this.dbSearch({
      subject: MESH + ui,
      predicate: MESHV + 'preferredMappedTo',
      object: this.db.v('descUI')
    }, {});

    // get rid of descriptor qualifiers as well
    return _.unique(result.map(res => this.formatID(res['descUI'], format).replace(/Q\d+/g, '')));

  } else {
    return [];
  }
});

/*
* Returns ancestor descriptor records UIs
* (returns an array)
*
* Example: 'D000001' returns ['D001583', 'D006574', 'D006571']
*          'D005138' returns ['D005123', 'D006197', 'D005145', 'D012679', 'D034582', 'D006257', 'D001829']
*/
MeshTree.prototype.getAncestors = co.wrap(function* (opts) {
  opts = opts || {};
  let descUI = this.formatID(opts.id, 'mesh');
  let format = opts.format || 'rdf';

  let parents = [];

  let nodes = [descUI];
  let hasParents = true;

  while (hasParents) {
    let nodesTemp = [];

    for (let node of nodes) {
      let parentsTemp = yield this.getParents({ id: node, format: 'mesh' });
      _.each(parentsTemp, (p) => nodesTemp.push(p));
      _.each(parentsTemp, (p) => parents.push(p));
    }

    nodes = nodesTemp;
    hasParents = nodesTemp.length > 0;
  }

  return _.unique(parents).map(p => this.formatID(p, format));

});

/*
* Returns children descriptor records UIs
* (immediate, not descendants)
*
* Example: 'D012343' returns ['D012345', 'D000926', 'D012346']
*/
MeshTree.prototype.getChildren = co.wrap(function* (opts) {
  opts = opts || {};
  let descUI = this.formatID(opts.id, 'mesh');
  let format = opts.format || 'rdf';

  let childrenDescUIs = [];

  let treeNums = yield this.getTreeNumbers({ id: descUI, format: 'mesh' });

  for (let treeNum of treeNums) {

    let result = yield this.dbSearch({
      subject: this.db.v('treeNum'),
      predicate: MESHV + 'parentTreeNumber',
      object: MESH + treeNum
    }, {});

    if (!_.isEmpty(result)) {
      for (let res of result) {
        let treeNum = this.formatID(res['treeNum'], 'mesh');
        let ui = yield this.treeNumberToUI({ treeNum: treeNum, format: 'mesh' });
        childrenDescUIs.push(ui);
      }
    }

  }

  return childrenDescUIs.map(ui => this.formatID(ui, format));

});

/*
* Returns sibling descriptor records UIs
* (across all branches a descriptor record may exist under)
*
* Example: 'D015834' returns ['D012345', 'D000926', 'D012346']
*/
MeshTree.prototype.getSiblings = co.wrap(function* (opts) {
  opts = opts || {};
  let descUI = this.formatID(opts.id, 'mesh');
  let format = opts.format || 'rdf';

  let siblingDescUIs = [];

  let parentDescUIs = yield this.getParents({ id: descUI, format: 'mesh' });

  for (let parent of parentDescUIs) {

    let childrenDescUIs = yield this.getChildren({ id: parent, format: 'mesh' });
    _.forEach(childrenDescUIs, (ui) => siblingDescUIs.push(ui));

  }

  _.remove(siblingDescUIs, (ui) => (ui === descUI));

  return siblingDescUIs.map(ui => this.formatID(ui, format));

});

/*
* Returns descriptor records UI of closest common ancestors of two or more descriptor record UIs
* (if a descriptor exists in more than one place on the tree, there will be more than one common ancestor)
*
* Example: ['D000926', 'D012345'] returns ['D012343']
*/
MeshTree.prototype.getCommonAncestors = co.wrap(function* (opts) {
  opts = opts || {};
  if (!_.isArray(opts.ids)) throw new Error('opts.ids not an array.');
  let descUIArray = opts.ids.map(id => this.formatID(id, 'mesh'));
  let format = opts.format || 'rdf';


  let commonAncestorsDescUIs = [];
  let commonAncestorsTreeNums = [];

  let treeNumsArray = [];
  for (let descUI of descUIArray) {
    let treeNums = yield this.getTreeNumbers({ id: descUI, format: 'mesh' });
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
      let commonAncestorDescUI = yield this.treeNumberToUI({ treeNum: commonAncestorTreeNum, format: 'mesh' });
      commonAncestorsDescUIs.push(commonAncestorDescUI);
      commonAncestorsTreeNums.push(commonAncestorTreeNum);

    }

  }

  return commonAncestorsDescUIs.map(ui => this.formatID(ui, format));

});


/*
* Tests whether or not id2 is a descendant of id1 (child of >=1 depth)
*/
MeshTree.prototype.isDescendantOf = co.wrap(function* (id1, id2) {
  let descUI1 = this.formatID(id1, 'mesh');
  let descUI2 = this.formatID(id2, 'mesh');

  if (descUI1 === descUI2) return false;

  let parentsAll = [];

  let nodes = [descUI2];
  let hasParents = true;

  while (hasParents) {
    let nodesTemp = [];

    for (let node of nodes) {
      let parentsTemp = yield this.getParents({ id: node, format: 'mesh' });

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
    let children = yield this.getChildren({ id: descUI, format: 'mesh' });
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
        let parentsTemp = yield this.getParents({ id: node, format: 'mesh' });
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
MeshTree.prototype.getPharmacologicalAction = co.wrap(function* (opts) {
  opts = opts || {};
  let ui = this.formatID(opts.id, 'mesh');
  let format = opts.format || 'rdf';

  let result = yield this.dbSearch({
    subject: MESH + ui,
    predicate: MESHV + 'pharmacologicalAction',
    object: this.db.v('descUI')
  }, {});

  if (_.isEmpty(result)) {
    return null;
  } else {
    return _.unique(result.map(res => this.formatID(res['descUI'], format)));
  }

});

/*
 * Performs mapping of MeSH concepts onto Schema.org classes
 */
MeshTree.prototype.getSchemaOrgType = co.wrap(function* (opts) {
  opts = opts || {};
  let ui = this.formatID(opts.id, 'mesh');

  let schemaOrgType = 'MedicalEntity';

  let pharmActions = yield this.getPharmacologicalAction({ id: ui, format: 'mesh' });
  if (pharmActions) {
    schemaOrgType = 'Drug';
  }

  let treeNums = yield this.getTreeNumbers({ id: ui, format: 'mesh' });
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
        preferredTerm = yield this.getPrefTerm({ id: ui });
        propertiesObj[property] = preferredTerm;
        break;
      case 'description':
        let scopeNotes = yield this.getScopeNote({ id: ui });
        propertiesObj[property] = scopeNotes;
        break;
      case 'synonyms':
        preferredTerm = yield this.getPrefTerm({ id: ui });
        let synonyms = yield this.getAllTerms({ id: ui });
        let preferredTermIndex = synonyms.indexOf(preferredTerm);
        if (~preferredTermIndex) synonyms.splice(preferredTermIndex, 1);
        propertiesObj[property] = synonyms;
        break;
      case 'schemaOrgType':
        let schemaOrgType = yield this.getSchemaOrgType({ id: ui });
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
