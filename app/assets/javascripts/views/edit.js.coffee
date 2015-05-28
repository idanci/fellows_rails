FellowsApp.Views.FellowEdit = FellowsApp.Views.FellowForm.extend(
  template: '#userEdit'
  className: 'container container-fluid'
  behaviors:
    DestroyFellow: {}
    GoBack: {}
    SubmitForm: {}
    AddFirstInputFocusForFirefox: {})
