FellowsApp.Routers.Fellows = Backbone.Router.extend({

  routes: {
    "":                 "index",
    "fellows":          "index",
    "fellows/add":      "add",
    "fellows/:id/edit": "edit"
  },

  index: function() {
    var collection = new FellowsApp.Collections.Fellows();
    collection.fetch({
      success: function(collection) {
        var view = new FellowsApp.Views.FellowsIndex({collection: collection});
        FellowsApp.layout.content.show(view);
      }
    });
  },

  add: function() {
    var model = new FellowsApp.Models.Fellow();
    var view = new FellowsApp.Views.FellowAdd({model: model});
    FellowsApp.layout.content.show(view);
  },

  edit: function(id) {
    var collection = new FellowsApp.Collections.Fellows();
    collection.fetch({
      success: function () {
        var model = FellowsApp.fellows.get(id);
        var view = new FellowsApp.Views.FellowEdit({model: model});
        FellowsApp.layout.content.show(view);
      }
    })
  }

});
