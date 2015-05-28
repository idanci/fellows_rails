FellowsApp.Views.FellowAdd = FellowsApp.Views.FellowForm.extend(
  template: '#userAdd'
  className: 'container container-fluid'
  behaviors:
    SubmitForm: {}
    GoBack: {}
    AddFirstInputFocusForFirefox: {})
