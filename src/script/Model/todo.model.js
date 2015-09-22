var app = app || {};
var Backbone = Backbone || {};

$(function () {
  app.Model = Backbone.Model.extend({
    defaults: {
      title: '',
      status: 'act',
      check: '',
      ico: 'fa-times'
    }
  });
});
