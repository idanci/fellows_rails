TodosApp.Collections.Todos = Backbone.Collection.extend(
  localStorage: new (Backbone.LocalStorage)('todos')
  model: TodosApp.Models.Todo
  comparator: (todo) ->
    todo.get 'name'
)
