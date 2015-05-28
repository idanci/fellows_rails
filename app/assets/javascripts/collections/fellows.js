FellowsApp.Collections.Fellows = Backbone.Collection.extend({

  localStorage: new Backbone.LocalStorage("fellows"),

  model: FellowsApp.Models.Fellow,

  comparator: function(fellow) {

    return fellow.get("name");

  }

});
