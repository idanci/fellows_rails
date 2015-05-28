FellowsApp.Models.Fellow = Backbone.Model.extend({
  defaults: function () {
    return {
      id:       this.cid,
      name:     null,
      hours:    null,
      comment:  null,
      presence: false
    }
  }
});

