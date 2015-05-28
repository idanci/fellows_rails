FellowsApp.Models.Fellow = Backbone.Model.extend(defaults: ->
  {
    id: @cid
    name: null
    hours: null
    comment: null
    presence: false
  }
)
