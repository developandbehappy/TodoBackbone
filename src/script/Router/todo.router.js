var app = app || {};
var Backbone = Backbone || {};

app.Router = Backbone.Router.extend({
  initialize: function () {
    console.log('Router initialize');
    var collection = new app.Collection();
    app.view = new app.View({
      collection: collection
    });
    this.on('route', function (route) {
      console.log('[router]: ', route);
    });
  },
  routes: {
    '': 'home',
    'active': 'active',
    'completed': 'completed'
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
