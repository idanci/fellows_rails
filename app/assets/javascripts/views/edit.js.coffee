TodosApp.Views.TodoEdit = TodosApp.Views.TodoForm.extend(
  template: '#userEdit'
  className: 'container container-fluid'
  behaviors:
    DestroyTodo: {}
    GoBack: {}
    SubmitForm: {}
    AddFirstInputFocusForFirefox: {})
