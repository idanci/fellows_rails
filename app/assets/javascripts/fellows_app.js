window.FellowsApp = new Backbone.Marionette.Application({
  Behaviors: {},
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Helpers: {},
  Jquery: {},
  Lib: {},

  init: function(options) {
    this.fellows = new FellowsApp.Collections.Fellows()

    this.fellows.fetch();

    this.start();

    $("body").on("focus", "[data-fellowsapp='calc']", function(event) {
      return FellowsApp.Helpers.View.calcInput($(this));
    });

  }

});

FellowsApp.addInitializer(function(options) {
  FellowsApp.layout = new FellowsApp.Views.AppLayout({el: ".root"});
  FellowsApp.layout.render();
});

FellowsApp.addInitializer(function(options) {
  new FellowsApp.Routers.Fellows();
  Backbone.history.start({pushState: false});
});
