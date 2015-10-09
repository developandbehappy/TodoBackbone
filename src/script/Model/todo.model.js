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
  checkOrUncheck: function () {
    return this.get('check') === 'checked' && this.get('status') !== 'remove' ? this.checkIn() : this.checkOut();
  },
  checkIn: function () {
    return this.set({check: '', status: 'active'});
    $.notify('[' + this.get('title') + '] -> was unchecked!');
    console.log('[ ' + this.get('title') + ' ] was unchecked');
  },
  checkOut: function () {
    return this.set({check: 'checked', status: 'done'});
    $.notify('[' + this.get('title') + '] -> was checked!', 'success');
    console.log('[ ' + this.get('title') + ' ] was checked');
  },
  toRemove: function () {
    return this.set({'status': 'remove', 'ico': 'fa-history', 'check': ''});
  }
});
