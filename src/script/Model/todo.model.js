var app = app || {};
var Backbone = Backbone || {};

app.Model = Backbone.Model.extend({
  defaults: {
    title: '',
    status: 'active',
    check: '',
    ico: 'fa-times'
  },
  parse: function (response) {
    console.log('[model] parse', response);
    response.title = response.title.trim().replace(/<[^>]+>/g, '');
    return response;
  },
  validate: function (val) {
    console.log('[model] validate', val);
    var titleLength = val.title.length;
    if (!titleLength) {
      return 'Вы не можете добавить пустое задание';
    }
    if (titleLength >= 40) {
      return 'Вы не можете добавить задание больше 40 символов!';
    }
  },
  check: function (element) {
    return element.set({check: '', status: 'active'});
  },
  unCheck: function (element) {
    return element.set({check: 'checked', status: 'done'});
  },
  toRemove: function (element) {
    return element.set({'status': 'remove', 'ico': 'fa-history', 'check': ''});
  },
});
