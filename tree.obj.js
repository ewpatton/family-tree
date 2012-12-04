function Person() {
  this.uri = "";
  this.firstName = "";
  this.middleName = "";
  this.maidenName = "";
  this.lastName = "";
  this.suffix = "";
  this.gender = "";
  this.marriages = [];
  this.occupations = [];
  this.birthInfo = null;
  this.deathInfo = null;
  this.placesLived = [];
  this.children = [];
  this.mother = null;
  this.father = null;
  this.adopted = null;
  this.image = null;

  this.getSiblings = function() {
    var siblings = {};
    var parents = [];
    if(this.mother != null) {
      parents.append(this.mother);
    }
    if(this.father != null) {
      parents.append(this.father);
    }
    for(var i=0;i<parents.length;i++) {
      var parent = parents[i];
      for(var j=0;j<parent.children.length;i++) {
	siblings[parent.children[i].uri] = parent.children[i];
      }
    }
    return siblings;
  };
}

function Marriage(s1, s2, date) {
  this.spouse1 = s1;
  this.spouse2 = s2;
  this.date = date;
}

Marriage.prototype.getSpouse = function(s) {
  if(this.spouse1 == s) {
    return this.spouse2;
  }
  if(this.spouse2 == s) {
    return this.spouse1;
  }
  return null;
};

function Divorce(marriage, date) {
  this.spouse1 = marriage.spouse1;
  this.spouse2 = marriage.spouse2;
  this.marriageDate = marriage.date;
  this.divorceDate = date;
}

Divorce.prototype.getSpouse = Marriage.prototype.getSpouse;

function Occupation() {
  this.label = "";
  this.typeUri = "";
}
