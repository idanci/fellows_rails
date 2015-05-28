FellowsApp.Helpers.View = calcInput: ($el, options) ->
  number_format = undefined
  settings = undefined
  if options == null
    options = {}
  number_format = FellowsApp.Settings.numberFormatSymbol()
  settings = _.extend({
    triad: number_format.length > 0
    triadSeparator: number_format
  }, options)
  $el.calcInput settings
