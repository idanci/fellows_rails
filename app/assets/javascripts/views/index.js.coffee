FellowsApp.Views.FellowsIndex = Backbone.Marionette.CompositeView.extend(
  template: '#tableFellows'
  itemView: FellowsApp.Views.Fellow
  itemViewContainer: 'tbody'
  behaviors: ToolTip: text: 'It\'s how may hours the fellow works')
