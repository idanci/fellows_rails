TodosApp.Views.TodoAdd = TodosApp.Views.TodoForm.extend(
  template: '#userAdd'
  className: 'container container-fluid'
  behaviors:
    SubmitForm: {}
    GoBack: {}
    AddFirstInputFocusForFirefox: {})
