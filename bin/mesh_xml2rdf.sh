#!/usr/bin/env bash

mkdir -p ~/data/mesh/RDF

java -Xmx4G -jar $SAXON_JAR -s:~/data/mesh/qual2015.xml \
    -xsl:xslt/qual.xsl > ~/data/mesh/RDF/mesh2015-dups.nt

java -Xmx4G -jar $SAXON_JAR -s:~/data/mesh/desc2015.xml \
    -xsl:xslt/desc.xsl >> ~/data/mesh/RDF/mesh2015-dups.nt

java -Xmx4G -jar $SAXON_JAR -s:~/data/mesh/supp2015.xml \
    -xsl:xslt/supp.xsl >> ~/data/mesh/RDF/mesh2015-dups.nt

sort -u ~/data/mesh/RDF/mesh2015-dups.nt > ~/data/mesh/RDF/mesh2015.nt