'use strict';

let levelgraph = require('levelgraph')
  , levelgraphN3 = require('levelgraph-n3')
  , _ = require('lodash')
  , Bluebird = require('bluebird')
  , co = require('co');

let db;
if (process.env['NODE_ENV'] === 'test') {
  db = levelgraphN3(levelgraph(process.env['PATH_TO_MESH_TESTDB']));
} else {
  db = levelgraphN3(levelgraph(process.env['PATH_TO_MESH_DB']));
}
let dbSearch = Bluebird.promisify(db.search);

let wikipedia = require('./lib/wikipedia')
  , permutations = require('./lib/permutations');

const MESH = 'http://id.nlm.nih.gov/mesh/';
const MESHV = 'http://id.nlm.nih.gov/mesh/vocab#';
const RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
const RDFS = 'http://www.w3.org/2000/01/rdf-schema#';

let meshTree = {

  /*
  * Returns array of all descriptor record UIs
  */
  getAllDescUIs: co.wrap(function* () {

    let result = yield dbSearch({
      subject: db.v('desc'),
      predicate: RDF + 'type',
      object: MESHV + 'TopicalDescriptor'
    }, {});

    let allDescUIs = _.map(result, (item) => item['desc'].replace(MESH, ''));

    return allDescUIs;

  }),

  /*
  * Returns array of all chemical supplementary record UIs
  */
  getAllChemUIs: co.wrap(function* () {

    let result = yield dbSearch({
      subject: db.v('chem'),
      predicate: RDF + 'type',
      object: MESHV + 'SCR_Chemical'
    }, {});

    let allChemUIs = _.map(result, (item) => item['chem'].replace(MESH, ''));
    return allChemUIs;

  }),

  /*
  * Returns the cleaned text output of the wikipedia page corresponding to the descriptor record UI
  *
  * `level`:
  *   `0` - abstract only
  *   `1` - all text
  */
  getWikipediaEntryByDescUI: co.wrap(function* (descUI, level) {

    let concept = yield this.getRecordPreferredTermByDescUI(descUI);
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

  }),

  /*
  * Returns array of tree numbers by descriptor record unique identifier
  *
  * Example: 'D000001' returns ['D03.438.221.173']
  */
  getTreeNumbersByDescUI: co.wrap(function* (descUI) {

    let result = yield dbSearch({
      subject: MESH + descUI,
      predicate: MESHV + 'treeNumber',
      object: db.v('treeNumber')
    }, {});

    let treeNumbers = _.map(result, (item) => item['treeNumber'].replace(MESH, ''));
    return treeNumbers;

  }),

  /*
  * Returns descriptor record unique identifier by tree number
  *
  * Example: 'D03.438.221.173' returns 'D000001'
  */
  getDescUIByTreeNumber: co.wrap(function* (treeNum) {

    let result = yield dbSearch({
      subject: db.v('descUI'),
      predicate: MESHV + 'treeNumber',
      object: MESH + treeNum
    }, {});

    if (_.isEmpty(result)) {
      return null;
    } else {
      return result[0]['descUI'].replace(MESH, '');
    }

  }),

  /*
  * Returns the record preferred term by descriptor record unique identifier
  * (i.e., the preferred term of the preferred concept)
  *
  * Example: 'D000001' returns 'Calcimycin'
  */
  getRecordPreferredTermByDescUI: co.wrap(function* (descUI) {

    let result1 = yield dbSearch({
      subject: MESH + descUI,
      predicate: MESHV + 'recordPreferredTerm',
      object: db.v('recordPreferredTermUI')
    }, {});

    if (_.isEmpty(result1)) throw('empty result.');

    let result2 = yield dbSearch({
      subject: result1[0]['recordPreferredTermUI'],
      predicate: MESHV + 'prefLabel',
      object: db.v('term')
    }, {});

    if (_.isEmpty(result2)) throw('empty result.');

    return result2[0]['term'].replace(/\"/g, '');

  }),

  /*
  * Returns preferred concept UI for descriptor record UI
  *
  * Example: 'D000001' returns 'M0000001'
  */
  getPreferredConceptByDescUI: co.wrap(function* (descUI) {

    let result = yield dbSearch({
      subject: MESH + descUI,
      predicate: MESHV + 'preferredConcept',
      object: db.v('conceptUI')
    }, {});

    if (_.isEmpty(result)) throw('empty result.');

    return result[0]['conceptUI'].replace(MESH, '');

  }),

  /*
  * Returns all concept UIs contained by descriptor record UI
  * (both preferred and not)
  *
  * Example: 'D000001' returns [ 'M0353609', 'M0000001' ]
  */
  getConceptUIsByDescUI: co.wrap(function* (descUI) {

    let allConceptUIs = [];

    for (let pred of ['concept', 'preferredConcept']) {

      let result = yield dbSearch({
        subject: MESH + descUI,
        predicate: MESHV + pred,
        object: db.v('conceptUI')
      }, {});

      result.forEach((item) => allConceptUIs.push(item['conceptUI'].replace(MESH, '')));

    }

    return allConceptUIs;

  }),

  /*
  * Returns all term UIs contained by concept UI
  * (both preferred and not)
  *
  * Example: 'M0353609' returns [ 'T000003', 'T000004', 'T000001' ]
  */
  getTermUIsByConceptUI: co.wrap(function* (conceptUI) {

    let allTermUIs = [];

    for (let pred of ['term', 'preferredTerm']) {

      let result = yield dbSearch({
        subject: MESH + conceptUI,
        predicate: MESHV + pred,
        object: db.v('termUI')
      }, {});

      result.forEach((item) => allTermUIs.push(item['termUI'].replace(MESH, '')));

    }

    return allTermUIs;

  }),

  /*
  * Returns all terms contained by term UI
  * (both preferred and not)
  *
  * Example: 'T000003' returns [ 'A23187, Antibiotic', 'Antibiotic A23187' ]
  */
  getTermsByTermUI: co.wrap(function* (termUI) {

    let allLabels = [];

    for (let pred of ['label', 'altLabel', 'prefLabel']) {

      let result = yield dbSearch({
        subject: MESH + termUI,
        predicate: MESHV + pred,
        object: db.v('label')
      }, {});

      result.forEach((item) => allLabels.push(item['label'].replace(/\"/g, '')));

    }

    return allLabels;

  }),

  /*
  * Returns all terms by descriptor record unique identifier
  * (i.e., all terms for all concepts, both preferred and not)
  *
  * Example: 'D000001' returns [ 'A23187, Antibiotic', 'Antibiotic A23187', 'A23187', 'A 23187', 'A-23187', 'Calcimycin' ]
  */
  getAllTermsByDescUI: co.wrap(function* (descUI) {

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

  }),

  /*
  * Returns scope note for descriptor record unique identifier
  * (scope notes are contained in the preferred concept record)
  *
  * Example: 'D000001', via concept 'M0000001', returns 'An ionophorous, polyether antibiotic from Streptomyces chartreusensis. It binds and transports CALCIUM and other divalent cations across membranes and uncouples oxidative phosphorylation while inhibiting ATPase of rat liver mitochondria. The substance is used mostly as a biochemical tool to study the role of divalent cations in various biological systems.'
  */
  getScopeNoteByDescUI: co.wrap(function* (descUI) {

    let conceptUI = yield this.getPreferredConceptByDescUI(descUI);

    let result = yield dbSearch({
      subject: MESH + conceptUI,
      predicate: MESHV + 'scopeNote',
      object: db.v('scopeNote')
    }, {});

    if (_.isEmpty(result)) {
      return '';
    } else {
      return result[0]['scopeNote'].replace(/\"/g, '');
    }

  }),

  /*
  * Returns parent descriptor records UIs
  * (returns an array as records can exist in multiple tree branches)
  *
  * Example: 'D000001' returns ['D001583']
  *          'D005138' returns ['D006197', 'D005123']
  */
  getParentDescUIsForDescUI: co.wrap(function* (descUI) {

    let parentDescUIs = [];

    let treeNums = yield this.getTreeNumbersByDescUI(descUI);

    for (let treeNum of treeNums) {

      let result = yield dbSearch({
        subject: MESH + treeNum,
        predicate: MESHV + 'broaderTransitive',
        object: db.v('treeNum')
      }, {});

      if (!_.isEmpty(result)) {
        let ui = yield this.getDescUIByTreeNumber(result[0]['treeNum'].replace(MESH, ''));
        parentDescUIs.push(ui);
      }

    }

    return parentDescUIs;

  }),

  /*
  * Returns children descriptor records UIs
  * (immediate, not descendants)
  *
  * Example: 'D012343' returns ['D012345', 'D000926', 'D012346']
  */
  getChildrenDescUIsForDescUI: co.wrap(function* (descUI) {

    let childrenDescUIs = [];

    let treeNums = yield this.getTreeNumbersByDescUI(descUI);

    for (let treeNum of treeNums) {

      let result = yield dbSearch({
        subject: db.v('treeNum'),
        predicate: MESHV + 'broaderTransitive',
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

  }),

  /*
  * Returns sibling descriptor records UIs
  * (across all branches a descriptor record may exist under)
  *
  * Example: 'D015834' returns ['D012345', 'D000926', 'D012346']
  */
  getSiblingDescUIsForDescUI: co.wrap(function* (descUI) {

    let siblingDescUIs = [];

    let parentDescUIs = yield this.getParentDescUIsForDescUI(descUI);

    for (let parent of parentDescUIs) {

      let childrenDescUIs = yield this.getChildrenDescUIsForDescUI(parent);
      _.forEach(childrenDescUIs, (ui) => siblingDescUIs.push(ui));

    }

    _.remove(siblingDescUIs, (ui) => (ui === descUI));

    return siblingDescUIs;

  }),

  /*
  * Returns descriptor records UI of closest common ancestors of two or more descriptor record UIs
  * (if a descriptor exists in more than one place on the tree, there will be more than one common ancestor)
  *
  * Example: ['D000926', 'D012345'] returns ['D012343']
  */
  getCommonAncestorsForDescUIs: co.wrap(function* (descUIArray) {

    if (!_.isArray(descUIArray)) raise('input not an array.');

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

  }),


  /*
  * Tests whether or not descUI2 is a descendant of descUI1 (child of >=1 depth)
  */
  isDescendantOf: co.wrap(function* (descUI1, descUI2) {

    let treeNumbers1 = yield this.getTreeNumbersByDescUI(descUI1);
    let treeNumbers2 = yield this.getTreeNumbersByDescUI(descUI2);

    let permuteTable = _.flatten(
      _.map(treeNumbers1, (x) => {
        return _.map(treeNumbers2, (y) => _.startsWith(y, x));
      })
    );

    return _.any(permuteTable);

  }),


  /*
  * Creates a subtree from a flat list of descriptor record UIs based on parent-child relationships within the MeSH ontology tree.
  */
  clusterDescUIs: co.wrap(function* (descUIArray) {

    // input must be array
    if (!_.isArray(descUIArray)) raise('input not an array.');

    // create array of parent-child relationship objects
    let relationships = [];

    for (let descUI of descUIArray) {

      let parentsAll = [];

      let nodes = [descUI];
      let hasParents = true;

      while (hasParents) {
        let nodesTemp = [];

        for (let node of nodes) {;
          let parentsTemp = yield this.getParentDescUIsForDescUI(node);

          _.each(parentsTemp, (p) => {
            parentsAll.push(p);
            nodesTemp.push(p);
          });
        }

        nodes = nodesTemp;
        hasParents = nodes.length > 0
      }

      let parents = _.intersection(parentsAll, descUIArray);

      if (parents.length === 0) {

        relationships.push({
          'descUI': descUI,
          'parent': null
        });

      } else {

        _.each(parents, (parent) => {
          relationships.push({
            'descUI': descUI,
            'parent': parent
          });
        });

      }

    }

    // recursive function for clustering
    function treeCluster(relationsList, parent, tree) {

      if (typeof tree === 'undefined') {
        var tree = [];
      }
      if (typeof parent === 'undefined') {
        var parent = { 'descUI': null, 'parent': null };
      }

      let children = _.filter(relationsList, (child) => {
        return child.parent === parent.descUI;
      });

      if (!_.isEmpty(children)) {
        if (_.isNull(parent.descUI)) {
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

  })



};

module.exports = meshTree;
