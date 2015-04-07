# mesh-tree

[![Dependency Status](https://david-dm.org/standard-analytics/mesh-tree.svg)](https://david-dm.org/standard-analytics/mesh-tree)
[![devDependency Status](https://david-dm.org/standard-analytics/mesh-tree/dev-status.svg)](https://david-dm.org/standard-analytics/mesh-tree#info=devDependencies)

Utility functions for traversing the Medical Subject Heading (MeSH) ontology tree
___

## Setup

#### 1. Fetch data

Raw data are available
[here](https://www.nlm.nih.gov/mesh/filelist.html) as ascii and XML formats. Registration is required: see the
[Memorandum of Understanding](https://www.nlm.nih.gov/mesh/2014/download/termscon.html).

Run `./bin/fetch_mesh.sh`. The script will prompt for the email used in registration. All relevant MeSH files are downloaded into `$HOME/data/mesh/`.

#### 2. Transform to RDF

See [HHS/meshrdf](https://github.com/HHS/meshrdf) for instructions on transforming MeSH from XML to RDF N-triples using Saxon (java). Saxon 9.6 home edition was used, which works well. Additional details are available at the meshrdf [website](http://hhs.github.io/meshrdf/). Note: as of March 2015, there is an error in the `qual2015.dtd` file where the line `<!ENTITY  % DescriptorRecordSet SYSTEM "desc2014.dtd">` needs to be changed to `desc2015.dtd` given that all the most up-to-date files are used. Export the path of Saxon `$SAXON_JAR` and run `./bin/mesh_xml2rdf.sh`. The RDF N-triples file will be produced at `$HOME/data/mesh/RDF`.

#### 3. Install dependencies

`npm install`

#### 4. Initialize DB

We utilize LevelGraph (which is built on top of LevelDB) with the LevelGraph-N3 extension for storing and accessing the MeSH ontology as RDF N-triples. Run `npm run initdb` to stream the RDF data into the datastore.

## Tests

`npm test` runs Mocha tests.

## Usage

This package can be run as a service or be imported as a module.

#### Running as service

Can be run as service with command `npm run server`, which listens for requests at `localhost` on port `7770` by default. The API is simply is a serialized JSON object with the following fields:

`job_id`: job unique identifier

`taskname`: function name as a string (see API below)

`payload`: argument(s), for example `desc_ui`

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

#### API

##### getAllDescUIs

Returns array of all descriptor record UIs

##### getAllChemUIs

Returns array of all chemical supplementary record UIs

##### getWikipediaEntryByDescUI (desc_ui)

Returns the cleaned text output of the wikipedia page corresponding to the descriptor record UI
 
`level`:
- `0` - abstract only
- `1` - all text

One can extract either the abstract or entire body of text from wikipedia (cleaned, without link info, references, citations, etc.) for a particular concept, based on the preferred concept term. The function automatically follows any automatic redirects. For example, in MeSH the concept `Calcimycin` corresponds to the wikipedia page on `A23187`, which is an accepted term under the MeSH concept but not the preferred term.

This is useful for providing additional relatively high quality and easily accessible context, for example in machine learning training.

##### getTreeNumbersByDescUI (desc_ui)

Returns array of tree numbers by descriptor record unique identifier.

Example: `'D000001'` returns `['D03.438.221.173']`

##### getDescUIByTreeNumber (tree_num)

Returns descriptor record unique identifier by tree number.

Example: `'D03.438.221.173'` returns `'D000001'`

##### getRecordPreferredTermByDescUI (desc_ui)

Returns the record preferred term by descriptor record unique identifier (i.e., the preferred term of the preferred concept).

Example: `'D000001'` returns `'Calcimycin'`
  
##### getPreferredConceptByDescUI (desc_ui)

Returns preferred concept UI for descriptor record UI.

Example: `'D000001'` returns `'M0000001'`

##### getConceptUIsByDescUI (desc_ui)

Returns all concept UIs contained by descriptor record UI (both preferred and not).

Example: `'D000001'` returns `['M0353609', 'M0000001']`
  
##### getTermUIsByConceptUI (concept_ui)

Returns all term UIs contained by concept UI (both preferred and not).

Example: `'M0353609'` returns `['T000003', 'T000004', 'T000001']`

##### getTermsByTermUI (term_ui)

Returns all terms contained by term UI (both preferred and not).

Example: `'T000003'` returns `['A23187, Antibiotic', 'Antibiotic A23187']`

##### getAllTermsByDescUI (desc_ui)

Returns all terms by descriptor record unique identifier (i.e., all terms for all concepts, both preferred and not).

Example: `'D000001'` returns `['A23187, Antibiotic', 'Antibiotic A23187', 'A23187', 'A 23187', 'A-23187', 'Calcimycin']`

Can also use chemical supplementary concept records UIs here as well:

Example: `'D000001'` returns `['CH-A1-MG', 'alpha 1 microglobulin, chorionic', 'chorionic alpha 1-microglobulin', 'chorionic alpha(1)-microglobulin']`

##### getScopeNoteByDescUI (desc_ui)

Returns scope note for descriptor record unique identifier (scope notes are contained in the preferred concept record).

Example: `'D000001'`, via concept `'M0000001'`, returns `'An ionophorous, polyether antibiotic from Streptomyces chartreusensis. It binds and transports CALCIUM and other divalent cations across membranes and uncouples oxidative phosphorylation while inhibiting ATPase of rat liver mitochondria. The substance is used mostly as a biochemical tool to study the role of divalent cations in various biological systems.'`

##### getParentDescUIsForDescUI (desc_ui)

Returns parent descriptor records UIs (returns an array as records can exist in multiple tree branches).

Example: `'D000001'` returns `['D001583']`
Example: `'C025734'` returns `['D006197', 'D005123']`

##### getChildrenDescUIsForDescUI (desc_ui)

Returns children descriptor records UIs (immediate, not descendants)

Example: `'D012343'` returns `['D012345', 'D000926', 'D012346']`

##### getSiblingDescUIsForDescUI (desc_ui)

Returns sibling descriptor records UIs (across all branches a descriptor record may exist under).

Example: `D015834 (Cochlear Diseases)` returns `D018159 (Endolymphatic Hydrops), D015837 (Vestibular Diseases), D007762 (Labyrinthitis)`

##### getCommonAncestorsForDescUIs (desc_ui_arr)

Returns descriptor records UI of closest common ancestors of two or more descriptor record UIs (if a descriptor exists in more than one place on the tree, there will be more than one common ancestor).

Example: `D012345 (RNA, Transfer, Amino Acid-Specific), D000926 (Anticodon)` returns `D012343 (RNA, Transfer)`

Example: `D000233 (Adenoidectomy), D014068 (Tonsillectomy), D007828 (Laryngoscopy)` returns `D013517 (Otorhinolaryngologic Surgical Procedures)`

Example: `D011434 (Proprioception), D014785 (Vision, Ocular), D004856 (Postural Balance)` returns `D012677 (Sensation)`

