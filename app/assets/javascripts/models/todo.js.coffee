TodosApp.Models.Todo = Backbone.Model.extend(defaults: ->
  urlRoot: "/todos"
  {
    name: null
    hours: null
    comment: null
    urgent: false
  }
)
