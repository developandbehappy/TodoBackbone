var app = app || {};
var Backbone = Backbone || {};

app.Model = Backbone.Model.extend({
  defaults: {
    title: '',
    status: 'active',
    check: ''
  },
  parse: function (response) {
    console.log('response', response);
    console.log('[model] parse', response);
    response.title = response.title.trim().replace(/<[^>]+>/g, '');
    return response;
  },
  sync: function () {
    console.log("sy!!");
    return null;
  },
  save: function () {
    console.log("save!!!");
    return null;
  },
  fetch: function () {
    console.log("fetch!!!");
    return null;
  },
  validate: function (val) {
    var titleLength = val.title.length;
    console.log('[model] validate', val);
    if (!titleLength) {
      return 'Вы не можете добавить пустое задание';
    }
    if (titleLength >= 25) {
      return 'Вы не можете добавить задание больше 25 символов!';
    }
  },
  checkOrUncheck: function () {
    return this.get('check') === 'checked' && this.get('status') !== 'remove' ? this.checkIn() : this.checkOut();
  },
  checkIn: function () {
    $.notify('[' + this.get('title') + '] -> was unchecked!');
    console.log('[ ' + this.get('title') + ' ] was unchecked');
    return this.set({check: '', status: 'active'});
  },
  checkOut: function () {
    $.notify('[' + this.get('title') + '] -> was checked!', 'success');
    console.log('[ ' + this.get('title') + ' ] was checked');
    return this.set({check: 'checked', status: 'completed'});
  }
});
