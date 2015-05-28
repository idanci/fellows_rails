FellowsApp.Views.FellowForm = Backbone.Marionette.ItemView.extend(
  bindings:
    name: '[name=name]'
    hours: '[name=hours]'
    presence: '[name=presence]'
    comment: '[name=comment]'

  behaviors: {}

  events: 'submit #form': 'save'

  initialize: (options) ->
    @modelBinder = new (Backbone.ModelBinder)
    @model = options.model

  onRender: ->
    template = $('#formUser').html()
    $form = _.template(template)(@serializeData())
    @$el.find('fieldset').prepend $form
    bindings = @bindings
    if typeof bindings == 'function'
      bindings = bindings.apply(this)
    @modelBinder.bind @model, @$el, bindings

  onClose: ->
    @modelBinder.unbind()

  back: ->
    window.history.back()

  save: (event) ->
    event.preventDefault()
    FellowsApp.fellows.add @model
    @model.save()
    @back()
    false

  destroy: ->
    if confirm('Are you sure?')
      @model.destroy()
)
