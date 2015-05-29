TodosApp.Views.TodosIndex = Backbone.Marionette.CompositeView.extend(
  template: '#tableTodos'
  itemView: TodosApp.Views.Todo
  itemViewContainer: 'tbody'
  behaviors: ToolTip: text: 'It\'s how may hours the todo takes')
