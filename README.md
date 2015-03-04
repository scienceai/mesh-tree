mesh-tree
========

Utility functions for traversing the Medical Subject Heading (MeSH) tree

## Fetch data

Raw data are available
[here](https://www.nlm.nih.gov/mesh/filelist.html) as ascii and XML formats. Registration is required: see the
[Memorandum of Understanding](https://www.nlm.nih.gov/mesh/2014/download/termscon.html).

Run `./bin/fetch_mesh.sh`. The script will prompt for the email used in registration.

## Initialize DB

Run `npm run init` to load data into levelDB. The MeSH XML file is streamed, processed, and loaded into the levelDB key-value store.