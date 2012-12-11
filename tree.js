
Controller.populatePeople(function() {
  $("div.label").text("Loading Marriages...");
  $("div.progressBar").css("width","10%");
  Controller.populateMarriages(function() {
    $("div.label").text("Loading Locations...");
    $("div.progressBar").css("width","20%");
    Controller.populateLocations(function() {
      $("div.label").text("Loading Occupations...");
      $("div.progressBar").css("width","30%");
      Controller.populateOccupations(function() {
	$("div.label").text("Loading Images...");
	$("div.progressBar").css("width","40%");
	Controller.populateImages(function() {
	  $("div.label").text("Loading Residences...");
	  $("div.progressBar").css("width","50%");
	  Controller.populateResidences(function() {
	    $("div.label").text("Loading Adoptions...");
	    $("div.progressBar").css("width","60%");
	    Controller.populateAdoptions(function() {
	      $("div.label").text("Loading Death Causes...");
	      $("div.progressBar").css("width","70%");
	      Controller.populateDeathCauses(function() {
		$("div.label").text("Computing Layout...");
		$("div.progressBar").css("width","80%");
		Controller.computeLayout();
		Controller.displayLayout();
		$("div.lightbox, div.box-wrapper").animate({"opacity":"0.0"}, "1200", "swing", function() { $(this).css("display","none"); });
	      });
	    });
	  });
	});
      });
    });
  });
});
