FROM iojs:onbuild

MAINTAINER Leon Chen <lchen3@gmail.com> (@transcranial)

# Packaged dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    git
    --no-install-recommends \
    && apt-get -t experimental install s3cmd

# Install latest version of S3cmd (>=1.5.2)
RUN cd /usr/local/src \
    && git clone https://github.com/s3tools/s3cmd.git ./s3cmd \
    && cd s3cmd \
    && apt-get install -y python-setuptools \
    && python2 setup.py install \
    && mv s3cmd /usr/bin \
    && mv S3 /usr/bin

# Add files
RUN mkdir -p /srv/mesh-tree
ADD . /srv/mesh-tree
RUN npm install

# Get MeSH RDF
RUN mkdir -p /tmp/data \
    && cd /tmp/data \
    && s3cmd --access_key=$AWS_ACCESS_KEY --secret_key=$AWS_SECRET_KEY get s3://ontologies-rdf/mesh.nt
ENV PATH_TO_MESH_RDF=/tmp/data/mesh.nt

# Setup levelgraph-n3
RUN npm run initdb-quiet

# Document that the service listens on port 7770.
EXPOSE 7770

# Start server
WORKDIR /srv/mesh-tree
ENTRYPOINT ["npm run server"]