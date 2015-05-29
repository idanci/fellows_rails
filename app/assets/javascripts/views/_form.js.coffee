TodosApp.Views.TodoForm = Backbone.Marionette.ItemView.extend(
  bindings:
    name: '[name=name]'
    hours: '[name=hours]'
    urgent: '[name=urgent]'
    comment: '[name=comment]'

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
    Backbone.history.navigate("/", {replace: true, trigger: true})

  save: (event) ->
    event.preventDefault()
    TodosApp.todos.add @model
    @model.save()
    @back()

  destroy: ->
    if confirm('Are you sure?')
      @model.destroy()
)
