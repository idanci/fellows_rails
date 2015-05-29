window.TodosApp = new (Backbone.Marionette.Application)(
  Behaviors: {}
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  Helpers: {}
  Jquery: {}
  Lib: {}

  init: (options) ->
    @todos = new (TodosApp.Collections.Todos)
    @todos.fetch()
    @start()
    $('body').on 'focus', '[data-todosapp=\'calc\']', (event) ->
      TodosApp.Helpers.View.calcInput $(this)
)

TodosApp.addInitializer (options) ->
  TodosApp.layout = new (TodosApp.Views.AppLayout)(el: '.root')
  TodosApp.layout.render()

TodosApp.addInitializer (options) ->
  new (TodosApp.Routers.Todos)
  Backbone.history.start pushState: false
