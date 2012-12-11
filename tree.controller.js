(function() {
  var people = {};
  var locations = {};
  var deathCauses = {};

  var sparqlResultsToPerson = function(b) {
    var person = null;
    var uri = b.uri.value;
    if(people[uri] != undefined) {
      person = people[uri];
    }
    else {
      person = new Person();
      people[uri] = person;
      person.uri = uri;
    }
    person.firstName = b.first.value;
    person.lastName = b.last.value;
    if(b.middle != undefined) {
      person.middleName = b.middle.value;
    }
    if(b.maiden != undefined) {
      person.maidenName = b.maiden.value;
    }
    if(b.suffix != undefined) {
      person.suffix = b.suffix.value;
    }
    if(b.birth != undefined) {
      var date = b.birth.value;
      var loc = null;
      if(b.birthLoc != undefined) {
	loc = b.birthLoc.value;
	if(locations[loc] == undefined) {
	  var tmp = new Place();
	  tmp.uri = loc;
	  location[loc] = tmp;
	}
	loc = location[loc];
      }
      person.birthInfo = new Birth(date, loc);
    }
    if(b.death != undefined) {
      var date = b.death.value;
      var loc = null;
      var cause = null;
      var comment = null;
      if(b.deathLoc != undefined) {
	loc = b.deathLoc.value;
	if(locations[loc] == undefined) {
	  var tmp = new Place();
	  tmp.uri = loc;
	  location[loc] = tmp;
	}
	loc = location[loc];
      }
      if(b.deathCause != undefined) {
	cause = b.deathCause.value;
	if(deathCauses[cause] == undefined) {
	  var tmp = new DeathCause();
	  tmp.uri = cause;
	  deathCauses[cause] = tmp;
	}
	cause = deathCauses[cause];
      }
      if(b.deathComment != undefined) {
	comment = b.deathComment.value;
      }
      person.deathInfo = new Death(date, loc);
      person.deathInfo.cause = cause;
      person.deathInfo.comment = comment;
    }
    if(b.mother != undefined) {
      var mother = b.mother.value;
      if(people[mother] != undefined) {
	person.mother = people[mother];
      }
      else {
	people[mother] = new Person();
	people[mother].uri = mother;
	person.mother = people[mother];
      }
      person.mother.children.push(person);
    }
    if(b.father != undefined) {
      var father = b.father.value;
      if(people[father] != undefined) {
	person.father = people[father];
      }
      else {
	people[father] = new Person();
	people[father].uri = father;
	person.father = people[father];
      }
      person.father.children.push(person);
    }
    if(person.mother != null) {
      person.parents.push(person.mother);
    }
    if(person.father != null) {
      person.parents.push(person.father);
    }
  };

  var processPeople = function() {
    
  };

  window["Controller"] = {
    "populatePeople": function(continuation) {
      Endpoint.getPeople(function(data) {
	var bindings = data.results.bindings;
	for(var i=0;i<bindings.length;i++) {
	  sparqlResultsToPerson(bindings[i]);
	}
	processPeople();
      });
    },

    "getPeople": function(continuation) {
      return people;
    }
  };
})();
