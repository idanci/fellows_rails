TodosApp.Routers.Todos = Backbone.Router.extend(
  routes:
    '': 'index'
    'todos': 'index'
    'todos/add': 'add'
    'todos/:id/edit': 'edit'
  index: ->
    collection = new (TodosApp.Collections.Todos)
    collection.fetch success: (collection) ->
      view = new (TodosApp.Views.TodosIndex)(collection: collection)
      TodosApp.layout.content.show view
  add: ->
    model = new (TodosApp.Models.Todo)
    view = new (TodosApp.Views.TodoAdd)(model: model)
    TodosApp.layout.content.show view
  edit: (id) ->
    collection = new (TodosApp.Collections.Todos)
    collection.fetch success: ->
      model = TodosApp.todos.get(id)
      view = new (TodosApp.Views.TodoEdit)(model: model)
      TodosApp.layout.content.show view
)
