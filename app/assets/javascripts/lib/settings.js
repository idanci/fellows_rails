FellowsApp.Settings = (function() {
  function Settings() {}

  Settings.NUMBER_FORMAT = ['number_none', 'number_underscore', 'number_space', 'number_acute'];

  Settings.NUMBER_FORMAT_SYMBOL = {
    number_none: '',
    numbder_underscore: '_',
    number_space: ' ',
    number_acute: '`'
  };

  Settings.numberFormatSymbol = function() {
    if (FellowsApp.profile) {
      return this.NUMBER_FORMAT_SYMBOL[FellowsApp.profile.get('number_format')];
    } else {
      return '';
    }
  };

  return Settings;

})();