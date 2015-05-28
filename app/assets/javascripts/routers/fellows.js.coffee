FellowsApp.Routers.Fellows = Backbone.Router.extend(
  routes:
    '': 'index'
    'fellows': 'index'
    'fellows/add': 'add'
    'fellows/:id/edit': 'edit'
  index: ->
    collection = new (FellowsApp.Collections.Fellows)
    collection.fetch success: (collection) ->
      view = new (FellowsApp.Views.FellowsIndex)(collection: collection)
      FellowsApp.layout.content.show view
      return
    return
  add: ->
    model = new (FellowsApp.Models.Fellow)
    view = new (FellowsApp.Views.FellowAdd)(model: model)
    FellowsApp.layout.content.show view
    return
  edit: (id) ->
    collection = new (FellowsApp.Collections.Fellows)
    collection.fetch success: ->
      model = FellowsApp.fellows.get(id)
      view = new (FellowsApp.Views.FellowEdit)(model: model)
      FellowsApp.layout.content.show view
      return
    return
)
