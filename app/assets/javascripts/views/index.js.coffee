TodosApp.Views.TodosIndex = Backbone.Marionette.CompositeView.extend(
  template: '#tableTodos'
  itemView: TodosApp.Views.Todo
  itemViewContainer: 'tbody'
)
