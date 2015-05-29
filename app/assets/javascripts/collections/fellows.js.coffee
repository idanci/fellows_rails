TodosApp.Collections.Todos = Backbone.Collection.extend(
  model: TodosApp.Models.Todo
  url: "/todos"
  comparator: (todo) ->
    todo.get 'name'
)
