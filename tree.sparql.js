(function() {
  window["Endpoint"] = {

    "query": function(query, continuation) {
      $.getJSON(endpoint, {"query":query,"output":"json"}, continuation);
    },

    "getPeople": function(continuation) {
      var query = "";
      query += "PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n";
      query += "PREFIX gene: <http://www.evanpatton.com/family/schema.ttl>\n";
      query += "PREFIX bio: <http://purl.org/vocab/bio/0.1/>\n";
      query += "PREFIX dc: <http://purl.org/dc/terms/>\n";
      query += "SELECT ?uri ?first ?middle ?maiden ?last ?birth ?birthLoc ?death ?deathLoc ?mother ?father ";
      if(graph != null) {
	query += "FROM <"+graph+"> ";
      }
      query += "WHERE {\n";
      query += "?uri a foaf:Person ; foaf:givenName ?first ; foaf:familyName ?last .\n";
      query += "OPTIONAL { ?uri gene:middleName ?middle }\n";
      query += "OPTIONAL { ?uri gene:maidenName ?maiden }\n";
      query += "OPTIONAL { ?uri bio:birth ?birthBN .\n";
      query += "OPTIONAL { ?birthBN dc:date ?birth }\n";
      query += "OPTIONAL { ?birthBN bio:place ?birthLoc }\n";
      query += "}\n";
      query += "OPTIONAL { ?uri bio:death ?deathBN .\n";
      query += "OPTIONAL { ?deathBN dc:date ?death }\n";
      query += "OPTIONAL { ?deathBN bio:place ?deathLoc }\n";
      query += "}\n";
      query += "OPTIONAL { ?uri bio:mother ?mother }\n";
      query += "OPTIONAL { ?uri bio:father ?father }\n";
      query += "}";
      Endpoint.query(query, continuation);
    },

    "getMarriages": function(continuation) {
      var query = "";
      query += "PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n";
      query += "PREFIX bio: <http://purl.org/vocab/bio/0.1/>\n";
      query += "PREFIX dc: <http://purl.org/dc/terms/>\n";
      query += "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n";
      query += "SELECT ?spouse1 ?spouse2 ?marryDate ?divorceDate ?loc ";
      if(graph != null) {
	query += "FROM <"+graph+"> ";
      }
      query += "WHERE {\n";
      query += "?bn a bio:Marriage ; bio:partner ?spouse1 , ?spouse2 .\n";
      query += "FILTER(?spouse1 != ?spouse2 && xsd:string(?spouse1) < xsd:string(?spouse2))\n";
      query += "OPTIONAL { ?bn dc:date ?marriageDate }\n";
      query += "OPTIONAL { ?bn bio:place ?loc }\n";
      query += "OPTIONAL { [ a bio:Divorce ; bio:partner ?spouse1 , ?spouse2 ; dc:date ?divorceDate ] }\n";
      query += "}";
      Endpoint.query(query, continuation);
    },

    "getOccupations": function(continuation) {
      var query = "";
      query += "PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n";
      query += "PREFIX dbpedia: <http://dbpedia.org/ontology/>\n";
      query += "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n";
      query += "SELECT ?uri ?occupationUri ?label ?comment ?loc ";
      if(graph != null) {
	query += "FROM <"+graph+"> ";
      }
      query += "WHERE {\n";
      query += "?uri a foaf:Person ; dbpedia:occupation ?bn .\n";
      query += "?bn a ?occupationUri .\n";
      query += "OPTIONAL { ?occupationUri rdfs:label ?label }\n";
      query += "OPTIONAL { ?bn rdfs:comment ?comment }\n";
      query += "OPTIONAL { ?bn bio:place ?loc }\n";
      query += "}";
      Endpoint.query(query, continuation);
    },

    "getImages": function(continuation) {
      var query = "";
      query += "PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n";
      query += "PREFIX dc: <http://purl.org/dc/terms/>\n";
      query += "SELECT ?uri ?img ?date ";
      if(graph != null) {
	query += "FROM <"+graph+"> ";
      }
      query += "WHERE {\n";
      query += "?uri a foaf:Person ; foaf:depiction ?img .\n";
      query += "OPTIONAL { ?img dc:date ?date }\n";
      query += "} ORDER BY ?date";
      Endpoint.query(query, continuation);
    }

  };
})();
