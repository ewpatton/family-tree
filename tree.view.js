function PersonCard(uri, controller) {
  this.controller = controller;
  this.uri = uri;
  this.card = null;
}

PersonCard.prototype.create = function() {
  if(this.card != null) {
    return this.card;
  }

  // background
  this.card = document.createElementNS(ns["svg"], "svg:svg");
  $(this.card).attr("class", "card living male");
  var rect = document.createElementNS(ns["svg"], "svg:rect");
  $(this.card).append(rect);
  rect = $(rect);
  rect.attr("x", "0").attr("y", "0").attr("width","250").attr("height","73");
  rect.attr("rx", "6").attr("ry","6");

  // image
  var imgUri = this.controller.getPersonImage(this.uri);
  if(imgUri != null) {
    var img = document.createElementNS(ns["svg"], "svg:image");
    $(img).attr("x","4").attr("y","6").attr("width","48").attr("height","48");
    img.setAttributeNS(ns["xlink"], "xlink:href", imgUri);
    $(this.card).append(img);
  }

  var y = 18;

  // name
  var nameStr = this.controller.getPersonFullName(this.uri);
  var nameText = document.createElementNS(ns["svg"], "svg:text");
  $(nameText).attr("x","52").attr("y",y.toString());
  $(nameText).append(nameStr);
  $(this.card).append(nameText);

  // born
  y += 15;
  var bornDate = "Born: "+this.controller.getPersonBirthday(this.uri);
  var bornText = document.createElementNS(ns["svg"], "svg:text");
  $(bornText).attr("x","52").attr("y",y.toString());
  $(bornText).append(bornDate);
  $(this.card).append(bornText);

  var bornLoc = this.controller.getPersonBirthLoc(this.uri);
  if(bornLoc != null) {
    y += 15;
    var bornText2 = document.createElementNS(ns["svg"], "svg:text");
    $(bornText2).attr("x","52").attr("y",y.toString());
    $(bornText2).append(bornLoc);
    $(this.card).append(bornText2);
  }

  // died
  var diedDate = this.controller.getPersonDeathday(this.uri);
  if(diedDate != null) {
    y += 15;
    diedDate = "Died: "+diedDate;
    var diedText = document.createElementNS(ns["svg"], "svg:text");
    $(diedText).attr("x","52").attr("y",y.toString());
    $(diedText).append(diedDate);
    $(this.card).append(diedText);

    var diedLoc = this.controller.getPersonDeathLoc(this.uri);
    if(diedLoc != null) {
      y += 15;
      var diedText2 = document.createElementNS(ns["svg"], "svg:text");
      $(diedText2).attr("x","52").attr("y",y.toString());
      $(diedText2).append(diedLoc);
      $(this.card).append(diedText2);
    }
  }

  // career
  var career = this.controller.getPersonCareer(this.uri);
  if(career != null) {
    y += 15;
    var careerText = document.createElementNS(ns["svg"], "svg:text");
    $(careerText).attr("x","52").attr("y",y.toString());
    $(careerText).append(career);
    $(this.card).append(careerText);
  }

  // residence
  var residence = null;
  var resCount = this.controller.getPersonResidenceCount(this.uri);
  if(resCount > 1) {
    residence = resCount.toString()+" residences";
  }
  else if(resCount == 1) {
    residence = this.controller.getPersonResidenceLabel(this.uri, 0);
  }
  if(residence != null) {
    y += 15;
    var residenceText = document.createElementNS(ns["svg"], "svg:text");
    $(residenceText).attr("x","52").attr("y",y.toString());
    $(residenceText).append(residence);
    $(this.card).append(residenceText);
  }

  rect.attr("height",(y+10).toString());

  return this.card;
};

PersonCard.prototype.draw = function() {
  $("#chart").append(this.card);
};
