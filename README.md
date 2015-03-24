mesh-tree
========

Utility functions for traversing the Medical Subject Heading (MeSH) ontology tree

## Setup

#### 1. Fetch data

Raw data are available
[here](https://www.nlm.nih.gov/mesh/filelist.html) as ascii and XML formats. Registration is required: see the
[Memorandum of Understanding](https://www.nlm.nih.gov/mesh/2014/download/termscon.html).

Run `./bin/fetch_mesh.sh`. The script will prompt for the email used in registration. All relevant MeSH files are downloaded into `$HOME/data/mesh/`.

#### 2. Transform to RDF

See [HHS/meshrdf](https://github.com/HHS/meshrdf) for instructions on transforming MeSH from XML to RDF N-triples using Saxon (java). Saxon 9.6 home edition was used, which works well. Additional details are available at the meshrdf [website](http://hhs.github.io/meshrdf/). Note: as of March 2015, there is an error in the `qual2015.dtd` file where the line `<!ENTITY  % DescriptorRecordSet SYSTEM "desc2014.dtd">` needs to be changed to `desc2015.dtd` given that all the most up-to-date files are used. Export the path of Saxon `$SAXON_JAR` and run `./bin/mesh_xml2rdf.sh`. The RDF N-triples file will be produced at `$HOME/data/mesh/RDF`.

#### 3. Install dependencies

Run `npm install`.

#### 4. Initialize DB

We utilize LevelGraph (which is built on top of LevelDB) with the LevelGraph-N3 extension for storing and accessing the MeSH ontology as RDF N-triples. Run `npm run initdb` to stream the RDF data into the datastore.