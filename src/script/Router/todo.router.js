var app = app || {};
var Backbone = Backbone || {};

app.Router = Backbone.Router.extend({
  initialize: function () {
    var collection = new app.Collection();
    console.log('Router initialize');
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
    app.view.blockRend('all');
  },
  active: function () {
    app.view.blockRend('active');
  },
  completed: function () {
    app.view.blockRend('completed');
  }
});
