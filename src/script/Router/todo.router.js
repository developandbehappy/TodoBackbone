var app = app || {};
var Backbone = Backbone || {};

app.Router = Backbone.Router.extend({
  initialize: function () {
    console.log('Router initialize');
    var collection = new app.Collection({
      model: app.Model
    });
    window.ts = collection;
//    app.view = new app.View({
//      collection: collection
//    });
    this.on('route', function (route) {
      console.log('[router]: ', route);
    });
  },
  home: function () {
    app.view.render('all');
  },
  active: function () {
    app.view.render('active');
  },
  completed: function () {
    app.view.render('completed');
  }
});
