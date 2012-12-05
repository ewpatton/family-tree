(function() {
  window["Endpoint"] = {

    "query": function(query, continuation) {
      $.getJSON(endpoint, {"query":query,"output":"json"}, continuation);
    },

    "getPeople": function(continuation) {
    },

    "getMarriages": function(continuation) {
    },

    "getOccupations": function(continuation) {
    }

  };
})();