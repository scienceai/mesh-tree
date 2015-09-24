# mesh-tree

[![Build Status](https://travis-ci.org/scienceai/mesh-tree.svg)](https://travis-ci.org/scienceai/mesh-tree)
[![Coverage Status](https://coveralls.io/repos/scienceai/mesh-tree/badge.svg?branch=master)](https://coveralls.io/r/scienceai/mesh-tree?branch=master)
[![Dependency Status](https://david-dm.org/scienceai/mesh-tree.svg)](https://david-dm.org/scienceai/mesh-tree)
[![devDependency Status](https://david-dm.org/scienceai/mesh-tree/dev-status.svg)](https://david-dm.org/scienceai/mesh-tree#info=devDependencies)

Utility functions for traversing the Medical Subject Heading (MeSH) ontology tree
___

## MeSH

Medical Subject Headings is an ontology for biomedical sciences.

<img src="./extras/count_over_time.png">

## Setup

To use with the full MeSH data:

#### 1. Fetch data

Raw data are available
[here](https://www.nlm.nih.gov/mesh/filelist.html) as ascii and XML formats. Registration is required: see the
[Memorandum of Understanding](https://www.nlm.nih.gov/mesh/2014/download/termscon.html).

Run `./bin/fetch_mesh.sh`. The script will prompt for the email used in registration. All relevant MeSH files are downloaded into `$HOME/data/mesh/`.

#### 2. Transform to RDF

See [HHS/meshrdf](https://github.com/HHS/meshrdf) for instructions on transforming MeSH from XML to RDF N-triples using Saxon (java). There are no issues with Saxon 9.6 home edition. Additional details are available at the meshrdf [website](http://hhs.github.io/meshrdf/). Note: still as of July 2015, there is an error in the `qual2015.dtd` file where the line `<!ENTITY  % DescriptorRecordSet SYSTEM "desc2014.dtd">` needs to be changed to `desc2015.dtd` given that all the most up-to-date files are used. Export the path of Saxon `$SAXON_JAR` and run `./bin/mesh_xml2rdf.sh`. The RDF N-triples file will be produced at `$HOME/data/mesh/RDF`.

#### 3. Install dependencies

`npm install`

#### 4. Initialize DB

We utilize LevelGraph (which is built on top of LevelDB) with the LevelGraph-N3 extension for storing and accessing the MeSH ontology as RDF N-triples. Run `npm run initdb` to stream the RDF data into the datastore (`npm run initdb-quiet` for quiet mode). The following environment variables must be set:

- `PATH_TO_MESH_RDF`: location of the N-triples file.
- `PATH_TO_MESH_DB`: specifies the target path to the LevelGraph database.

## Tests

Run `npm run initdb-test` to load fixture data and `npm test` to run mocha tests.

## Usage

This package can be run as a service or be imported as a module.

#### Running as service

Can be run as service with command `npm run server`, which listens for requests at `localhost` on port `7770` by default. For proper functioning, ZeroMQ must be installed on the system (`brew install zeromq` on Mac OS X), with `npm install zmq`. The API is simply is a serialized JSON object with the following fields:

`job_id`: job unique identifier

`taskname`: function name as a string (see API below)

`payload`: argument(s), for example `descUI`

An simple example of a client function in python:

```
def mesh_tree_rpc(taskname, *args):
    HOST = '127.0.0.1'
    PORT = 7770
    req_socket = zmq.Context().socket(zmq.REQ)
    req_socket.connect('tcp://{}:{}'.format(HOST, PORT))
    req_obj = {
        'job_id': str(uuid.uuid4()),
        'taskname': taskname,
        'payload': args
    }
    req_socket.send(json.dumps(req_obj).encode('utf8'))
    result = json.loads(req_socket.recv().decode('utf8'))
    return result
```

## API

All functions return a `Promise`, and can be used as follows:

```
let meshTree = require('mesh-tree');

meshTree.getAllDescUIs().then(result => {
    ...
});
```

#### getAllDescUIs()

Returns array of all descriptor record UIs

#### getAllSCRChemicalUIs()

Returns array of all chemical supplementary record UIs

#### getAllSCRDiseaseUIs()

Returns array of all disease (rare) supplementary record UIs

#### getAllSCRProtocolUIs()

Returns array of all protocol (e.g., cancer-related) supplementary record UIs

#### getWikipediaEntryByDescUI (opts)

where `opts = { descUI, level }`.

Returns the cleaned text output of the wikipedia page corresponding to the descriptor record UI

`level`:
- `0` - abstract only
- `1` - all text

One can extract either the abstract or entire body of text from wikipedia (cleaned, without link info, references, citations, etc.) for a particular concept, based on the preferred concept term. The function automatically follows any automatic redirects. For example, in MeSH the concept `Calcimycin` corresponds to the wikipedia page on `A23187`, which is an accepted term under the MeSH concept but not the preferred term.

This is useful for providing additional relatively high quality and easily accessible context, for example in machine learning training.

#### getTreeNumbersByDescUI (descUI)

Returns array of tree numbers by descriptor record unique identifier.

Example: `'D000001'` returns `['D03.438.221.173']`

#### getDescUIByTreeNumber (treeNum)

Returns descriptor record unique identifier by tree number.

Example: `'D03.438.221.173'` returns `'D000001'`

#### getPreferredTermByDescUI (descUI)

Returns the preferred term by descriptor record unique identifier (i.e., the preferred term of the preferred concept).

Example: `'D000001'` returns `'Calcimycin'`

#### getPreferredConceptByDescUI (descUI)

Returns preferred concept UI for descriptor record UI.

Example: `'D000001'` returns `'M0000001'`

#### getConceptUIsByDescUI (descUI)

Returns all concept UIs contained by descriptor record UI (both preferred and not).

Example: `'D000001'` returns `['M0353609', 'M0000001']`

#### getTermUIsByConceptUI (conceptUI)

Returns all term UIs contained by concept UI (both preferred and not).

Example: `'M0353609'` returns `['T000003', 'T000004', 'T000001']`

#### getTermsByTermUI (termUI)

Returns all terms contained by term UI (both preferred and not).

Example: `'T000003'` returns `['A23187, Antibiotic', 'Antibiotic A23187']`

#### getAllTermsByDescUI (descUI)

Returns all terms by descriptor record unique identifier (i.e., all terms for all concepts, both preferred and not).

Example: `'D000001'` returns `['A23187, Antibiotic', 'Antibiotic A23187', 'A23187', 'A 23187', 'A-23187', 'Calcimycin']`

Can also use chemical supplementary concept records UIs here as well:

Example: `'D000001'` returns `['CH-A1-MG', 'alpha 1 microglobulin, chorionic', 'chorionic alpha 1-microglobulin', 'chorionic alpha(1)-microglobulin']`

#### getScopeNoteByDescUI (descUI)

Returns scope note for descriptor record unique identifier (scope notes are contained in the preferred concept record).

Example: `'D000001'`, via concept `'M0000001'`, returns `'An ionophorous, polyether antibiotic from Streptomyces chartreusensis. It binds and transports CALCIUM and other divalent cations across membranes and uncouples oxidative phosphorylation while inhibiting ATPase of rat liver mitochondria. The substance is used mostly as a biochemical tool to study the role of divalent cations in various biological systems.'`

#### getParentDescUIsForDescUI (descUI)

Returns parent descriptor records UIs (returns an array as records can exist in multiple tree branches).

Example: `'D000001'` returns `['D001583']`
Example: `'D005138'` returns `['D006197', 'D005123']`

#### getParentDescUIsForSCR (scrUI)

Returns parent descriptor record UIs mapped from supplementary concept record UI

Example: `'C041293'` returns `['D011140']`
Example: `'C025735'` returns `['D001286', 'D002164', 'D012602']`

#### getAncestorDescUIsForDescUI (descUI)

Returns all ancestor descriptor records UIs, following all parent branches. Returns an array.

Example: `'D000001'` returns `['D001583', 'D006574', 'D006571']`
Example: `'D005138'` returns `['D005123', 'D006197', 'D005145', 'D012679', 'D034582', 'D006257', 'D001829']`

#### getChildrenDescUIsForDescUI (descUI)

Returns children descriptor records UIs (immediate, not descendants)

Example: `'D012343'` returns `['D012345', 'D000926', 'D012346']`

#### getSiblingDescUIsForDescUI (descUI)

Returns sibling descriptor records UIs (across all branches a descriptor record may exist under).

Example: `D015834 (Cochlear Diseases)` returns `D018159 (Endolymphatic Hydrops), D015837 (Vestibular Diseases), D007762 (Labyrinthitis)`

#### getCommonAncestorsForDescUIs (descUIArray)

Takes as argument an array of descriptor record UIs and returns descriptor records UI of closest common ancestors of two or more descriptor record UIs (if a descriptor exists in more than one branch on the tree, there may be more than one common ancestor).

Example: `D012345 (RNA, Transfer, Amino Acid-Specific), D000926 (Anticodon)` returns `D012343 (RNA, Transfer)`

Example: `D000233 (Adenoidectomy), D014068 (Tonsillectomy), D007828 (Laryngoscopy)` returns `D013517 (Otorhinolaryngologic Surgical Procedures)`

Example: `D011434 (Proprioception), D014785 (Vision, Ocular), D004856 (Postural Balance)` returns `D012677 (Sensation)`

#### isDescendantOf (descUI1, descUI2)

Tests whether or not descUI2 is a descendant of descUI1 (child of >=1 depth)

#### clusterDescUIs (descUIArray)

Takes a flat array of descriptor record UIs and returns a nested tree structure based on parent-descendant relationships amongst all the array elements. In other words, it recreates a subtree based on the overarching MeSH ontology tree on a given list of element nodes.

For example, given `D000233 (Adenoidectomy), D014068 (Tonsillectomy), D007828 (Laryngoscopy), D013517 (Otorhinolaryngologic Surgical Procedures)`, the following is returned:

```
[
  {
    "descUI": "D013517",
    "parent": null,
    "children": [
      {
        "descUI": "D000233",
        "parent": "D013517"
      },
      {
        "descUI": "D014068",
        "parent": "D013517"
      },
      {
        "descUI": "D007828",
        "parent": "D013517"
      }
    ]
  }
]
```

An example for a list containing more than one "relative top-level" element, such as `D011434 (Proprioception), D014785 (Vision, Ocular), D004856 (Postural Balance)`, gives:

```
[
  {
    "descUI": "D011434",
    "parent": null,
    "children": [
      {
        "descUI": "D004856",
        "parent": "D011434"
      }
    ]
  },
  {
    "descUI": "D014785",
    "parent": null
  }
]
```
