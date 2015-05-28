window.FellowsApp = new (Backbone.Marionette.Application)(
  Behaviors: {}
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  Helpers: {}
  Jquery: {}
  Lib: {}

  init: (options) ->
    @fellows = new (FellowsApp.Collections.Fellows)
    @fellows.fetch()
    @start()
    $('body').on 'focus', '[data-fellowsapp=\'calc\']', (event) ->
      FellowsApp.Helpers.View.calcInput $(this)
)

FellowsApp.addInitializer (options) ->
  FellowsApp.layout = new (FellowsApp.Views.AppLayout)(el: '.root')
  FellowsApp.layout.render()

FellowsApp.addInitializer (options) ->
  new (FellowsApp.Routers.Fellows)
  Backbone.history.start pushState: false
