FellowsApp.Views.FellowForm = Backbone.Marionette.ItemView.extend({

  bindings: {
    name:      "[name=name]",
    hours:     "[name=hours]",
    presence:  "[name=presence]",
    comment:   "[name=comment]"
  },

  behaviors: {
  },

  // NOTE: remove events to Behaviors

  events: {
      "submit #form":   "save"
  },

  initialize: function(options) {
    this.modelBinder = new Backbone.ModelBinder();
    this.model = options.model
  },

  onRender: function() {
    template = $('#formUser').html()
    $form = _.template(template)(this.serializeData())
    this.$el.find('fieldset').prepend($form)

    var bindings = this.bindings;
    if (typeof bindings === "function") {
      bindings = bindings.apply(this);
    }
    this.modelBinder.bind(this.model, this.$el, bindings)
  },

  onClose: function () {
    this.modelBinder.unbind()
  },

  // NOTE: move methods to Behaviors

  back: function() {
    window.history.back();
  },

  save: function(event) {
    event.preventDefault();
    FellowsApp.fellows.add(this.model)
    this.model.save()
    this.back()
    return false;
  },

  destroy: function() {
    if (confirm("Are you sure?")) {
      this.model.destroy()
    }

  }
});
