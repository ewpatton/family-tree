/**
 * HTTP URI to execute SPARQL queries.
 */
var endpoint="http://localhost:8890/sparql";

/**
 * Sets the graph used in the SPARQL FROM NAMED clause.
 * Commenting this line out will cause the queries to
 * be run against the default graph in the triple store.
 */
var graph="http://localhost/source.ttl";