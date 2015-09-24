var app = app || {};
var Backbone = Backbone || {};

app.Model = Backbone.Model.extend({
  defaults: {
    title: '',
    status: 'act',
    check: '',
    ico: 'fa-times'
  }
});
