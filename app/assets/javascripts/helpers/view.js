FellowsApp.Helpers.View = {
  calcInput: function($el, options) {
    var number_format, settings;
    if (options == null) {
      options = {};
    }
    number_format = FellowsApp.Settings.numberFormatSymbol();
    settings = _.extend({
      triad: number_format.length > 0,
      triadSeparator: number_format
    }, options);
    return $el.calcInput(settings);
  }
};