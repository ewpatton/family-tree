var query="PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX bio: <http://purl.org/vocab/bio/0.1/> PREFIX dc: <http://purl.org/dc/terms/> SELECT ?uri ?first ?last ?born ?father ?mother ?married ?date FROM <http://www.evanpatton.com/family/tree.ttl> WHERE { ?uri foaf:givenName ?first ; foaf:familyName ?last ; bio:birth [ dc:date ?born ] . OPTIONAL { ?uri bio:event [ dc:date ?date ; bio:partner ?married ] FILTER(?married != ?uri) } OPTIONAL { ?uri bio:father ?father } OPTIONAL { ?uri bio:mother ?mother } }";

function getData(call) {
    $.getJSON("sparql?output=json",{"query":query},call);
}

function doTransform(record) {
    var obj = {};
    for(var field in record) {
	obj[field] = record[field].value;
    }
    return obj;
}

function transform(data) {
    var records = [];
    var bindings = data.results.bindings;
    for(var binding in bindings) {
	records.push(doTransform(bindings[binding]));
    }
    var tree = {};
    for(var i=0;i<records.length;i++) {
	tree[records[i].uri] = records[i];
    }
    for(var i=0;i<records.length;i++) {
	if(records[i].mother != undefined &&
	   tree[records[i].mother] != undefined) {
	    records[i].mother = tree[records[i].mother];
	}
	if(records[i].father != undefined &&
	   tree[records[i].father] != undefined) {
	    records[i].father = tree[records[i].father];
	}
	if(records[i].married != undefined &&
	   tree[records[i].married] != undefined) {
	    records[i].married = tree[records[i].married];
	}
    }
    draw(treeWithMarriages(tree, tree["http://www.evanpatton.com/family/tree.ttl#EvanPatton"],
			   tree["http://www.evanpatton.com/family/tree.ttl#AllisonPatton"]));
}

$(document).ready(function() {
margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 1280 - margin.right - margin.left,
    height = 800 - margin.top - margin.bottom,
    i = 0,
    duration = 500,
    root = null;

tree = d3.layout.tree()
    .size([height, width]);

diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

vis = d3.select("#chart").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
});

function treeWithMarriages(tree, groom, bride) {
    if(typeof groom == "string") return {"partners":[{"uri":groom},{"uri":bride}]};
    var result = {"partners": []};
    result.partners[0] = groom;
    result.partners[1] = bride;
    result.partners[0].parents = treeWithMarriages(tree, groom.father, groom.mother);
    result.partners[1].parents = treeWithMarriages(tree, bride.father, bride.mother);
    return result;
}

var leaves = [];

function computeLeaves(node) {
    if(node.partners) {
	var count = 0;
	if(typeof node.partners[0] != "string") {
	    computeLeaves(node);
	    count++;
	}
	if(typeof node.partners[1] != "string") {
	    computeLeaves(node);
	    count++;
	}
	if(count == 0) {
	    leaves.push(node);
	}
    }
    else if(node.parents) {
	computeLeaves(node.parents);
    }
}

function draw(json) {
    console.log(json);
    root = json;
    computeLeaves(root);
}

getData(transform);