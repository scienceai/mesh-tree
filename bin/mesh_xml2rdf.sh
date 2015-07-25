#!/usr/bin/env bash

mkdir -p $HOME/data/mesh/RDF

git clone https://github.com/HHS/meshrdf.git $HOME/data/mesh/meshrdf

java -Xmx4G -jar $SAXON_JAR -s:$HOME/data/mesh/qual2015.xml \
    -xsl:$HOME/data/mesh/meshrdf/xslt/qual.xsl > $HOME/data/mesh/RDF/mesh2015-dups.nt

java -Xmx4G -jar $SAXON_JAR -s:$HOME/data/mesh/desc2015.xml \
    -xsl:$HOME/data/mesh/meshrdf/xslt/desc.xsl >> $HOME/data/mesh/RDF/mesh2015-dups.nt

java -Xmx4G -jar $SAXON_JAR -s:$HOME/data/mesh/supp2015.xml \
    -xsl:$HOME/data/mesh/meshrdf/xslt/supp.xsl >> $HOME/data/mesh/RDF/mesh2015-dups.nt

sort -u $HOME/data/mesh/RDF/mesh2015-dups.nt > $HOME/data/mesh/RDF/mesh2015.nt

rm -rf $HOME/data/mesh/meshrdf