FellowsApp.Settings = do ->

  Settings = ->

  Settings.NUMBER_FORMAT = [
    'number_none'
    'number_underscore'
    'number_space'
    'number_acute'
  ]
  Settings.NUMBER_FORMAT_SYMBOL =
    number_none: ''
    number_underscore: '_'
    number_space: ' '
    number_acute: '`'

  Settings.numberFormatSymbol = ->
    if FellowsApp.profile
      @NUMBER_FORMAT_SYMBOL[FellowsApp.profile.get('number_format')]
    else
      ''

  Settings
