DestroyTodo = Marionette.Behavior.extend(
  ui: delete_button: '#delete'
  defaults: message: 'Are you sure want to delete it?'
  events: 'click @ui.delete_button': 'destroy'
  destroy: (event) ->
    event.preventDefault()
    if confirm(@options.message)
      @view.model.destroy()
      @view.close()
      window.location.href = "http://localhost:3000"
)
AddFirstInputFocusForFirefox = Marionette.Behavior.extend(
  setFocus: ->
    $input = undefined
    inputVal = undefined
    $input = @$('form').find('input[type=text],textarea,select').filter(':visible:first').focus()
    inputVal = $input.val()
    $input.focus().val(String.fromCharCode(35)).val inputVal
  onShow: ->
    @setFocus()
)
ColorBackground = Marionette.Behavior.extend(
  events:
    'mouseover td': 'color'
    'mouseout td': 'uncolor'
  color: (event) ->
    Backbone.$(event.target).addClass 'color_it'
  uncolor: (event) ->
    Backbone.$(event.target).removeClass 'color_it'
)
GoBack = Marionette.Behavior.extend(
  events: 'click #back': 'back'
  back: ->
    window.location.href = "http://localhost:3000"
)
SubmitForm = Marionette.Behavior.extend(
  events: 'submit #form': 'save'
  save: (event) ->
    event.preventDefault()
    TodosApp.todos.add @view.model
    @view.model.save()
    window.location.href = "http://localhost:3000"
)
CloseWarnOnAdd = Marionette.Behavior.extend(
  defaults: 'message': 'you are closing!'
  events: 'click #back': 'warnBeforeClose'
  warnBeforeClose: ->
    alert @options.message
    @view.close()
)
CloseWarnOnEdit = Marionette.Behavior.extend(
  defaults: 'message': 'you are closing edit page!'
  events: 'click #back': 'warnBeforeClose'
  warnBeforeClose: ->
    alert @options.message
    @view.close()
)

Marionette.Behaviors.behaviorsLookup = ->
  TodosApp.Behaviors

TodosApp.Behaviors.CloseWarnOnAdd = CloseWarnOnAdd
TodosApp.Behaviors.CloseWarnOnEdit = CloseWarnOnEdit
TodosApp.Behaviors.DestroyTodo = DestroyTodo
TodosApp.Behaviors.GoBack = GoBack
TodosApp.Behaviors.SubmitForm = SubmitForm
TodosApp.Behaviors.ColorBackground = ColorBackground
TodosApp.Behaviors.AddFirstInputFocusForFirefox = AddFirstInputFocusForFirefox
