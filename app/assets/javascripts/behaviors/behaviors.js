var DestroyFellow = Marionette.Behavior.extend({

  ui: {
    delete_button: "#delete"
  },

  defaults: {
    message: "Are you sure want to delete model?"
  },

  events: {
    "click @ui.delete_button": "destroy"
  },

  destroy: function(event) {
    event.preventDefault();

    if(confirm(this.options.message)) {
      this.view.model.destroy();
      this.view.close();
      window.history.back();
    }
  }
});

var AddFirstInputFocusForFirefox = Marionette.Behavior.extend({

  setFocus: function() {
    var $input, inputVal;
    $input = this.$("form").find("input[type=text],textarea,select").filter(":visible:first").focus();
    inputVal = $input.val();
    return $input.focus().val(String.fromCharCode(35)).val(inputVal);
  },

  onShow: function() {

    this.setFocus();

  }
});

var ColorBackground = Marionette.Behavior.extend({
  events: {
    "mouseover td": "color",
    "mouseout td": "uncolor"
  },

  color: function(event) {
    Backbone.$(event.target).addClass("color_it");
  },

  uncolor: function(event) {
    Backbone.$(event.target).removeClass("color_it");
  }

});

var GoBack = Marionette.Behavior.extend({
  events: {
    "click #back": "back"
  },

  back: function() {
    window.history.back()
  }
});

var SubmitForm = Marionette.Behavior.extend({

  events: {
    "submit #form": "save"
  },

  save: function(event) {
    event.preventDefault();
    FellowsApp.fellows.add(this.view.model);
    this.view.model.save();
    window.history.back();
    return false;
  }

});

var CloseWarnOnAdd = Marionette.Behavior.extend({

  defaults: {
    "message": "you are closing!"
  },

  events: {
    "click #back": "warnBeforeClose"
  },

  warnBeforeClose: function() {
    alert(this.options.message);
    this.view.close();
  }
});

var CloseWarnOnEdit = Marionette.Behavior.extend({

  defaults: {
    "message": "you are closing edit page!"
  },

  events: {
    "click #back": "warnBeforeClose"
  },

  warnBeforeClose: function() {
    alert(this.options.message);
    this.view.close();
  }
});

var ToolTip = Marionette.Behavior.extend({
  ui: {
    tooltip: ".tooltip_item"
  },

  onShow: function() {

    this.ui.tooltip.tooltip({
      trigger: "hover focus",
      title: this.options.text
    });

  }

});

Marionette.Behaviors.behaviorsLookup = function() {
  return FellowsApp.Behaviors;
};

FellowsApp.Behaviors.ToolTip = ToolTip;
FellowsApp.Behaviors.CloseWarnOnAdd = CloseWarnOnAdd;
FellowsApp.Behaviors.CloseWarnOnEdit = CloseWarnOnEdit;
FellowsApp.Behaviors.DestroyFellow = DestroyFellow;
FellowsApp.Behaviors.GoBack = GoBack;
FellowsApp.Behaviors.SubmitForm = SubmitForm;
FellowsApp.Behaviors.ColorBackground = ColorBackground;
FellowsApp.Behaviors.AddFirstInputFocusForFirefox = AddFirstInputFocusForFirefox;
