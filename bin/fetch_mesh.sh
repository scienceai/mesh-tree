#!/bin/sh

mkdir -p ./data

echo "Fetch MeSH files"
echo "/////////////////////////////////////////"
echo "Enter email used to register: "
read REGISTRATION_EMAIL
if [[ "$REGISTRATION_EMAIL" =~ [A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4} ]]
then

    echo "/////////////////////////////////////////"
    echo "Starting download..."

    # Descriptor Records
    echo "    >>> Descriptor Records <<<"
    curl -u anonymous:$REGISTRATION_EMAIL -o ./data/mesh_desc_2015.xml ftp://nlmpubs.nlm.nih.gov/online/mesh/.xmlmesh/desc2015.xml
    curl -u anonymous:$REGISTRATION_EMAIL -o ./data/mesh_desc_2015.dtd http://www.nlm.nih.gov/mesh/2015/download/desc2015.dtd
    # Qualifier Records
    echo "    >>> Qualifier Records <<<"
    curl -u anonymous:$REGISTRATION_EMAIL -o ./data/mesh_qual_2015.xml ftp://nlmpubs.nlm.nih.gov/online/mesh/.xmlmesh/qual2015.xml
    curl -u anonymous:$REGISTRATION_EMAIL -o ./data/mesh_qual_2015.dtd http://www.nlm.nih.gov/mesh/2015/download/qual2015.dtd
    # Supplementary Concept Records
    echo "    >>> Supplementary Concept Records <<<"
    curl -u anonymous:$REGISTRATION_EMAIL -o ./data/mesh_supp_2015.xml ftp://nlmpubs.nlm.nih.gov/online/mesh/.xmlmesh/supp2015.xml
    curl -u anonymous:$REGISTRATION_EMAIL -o ./data/mesh_supp_2015.dtd http://www.nlm.nih.gov/mesh/2015/download/supp2015.dtd

else
    echo "  Invalid email, exiting."
    exit 1
fi