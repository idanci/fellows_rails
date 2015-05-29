TodosApp.Models.Todo = Backbone.Model.extend(defaults: ->
  {
    id: @cid
    name: null
    hours: null
    comment: null
    urgent: false
  }
)
