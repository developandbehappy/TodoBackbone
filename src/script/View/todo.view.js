var app = app || {};
var Backbone = Backbone || {};
var StorageHelper = StorageHelper || {};
var _ = _ || {};

var collect = new app.collection();

app.View = Backbone.View.extend({
  el: 'body',
  collection: collect,
  events: {
    'click #add': 'addData',
    'click li input': 'checkData',
    'click .fa-times': 'deleteImg',
    'click .fa-history': 'returnLabel'
  },
  initialize: function () {
    this.template = _.template($('#template').html());
    this.collection.sync('read');
    this.render();
  },
  addData: function () {
    var obj = {
      title: this.getVal(),
      id: StorageHelper.get('todo').length || 0
    };
    var validate = collect.isValidModel(obj);
    if (!validate.status) {
      $.notify(validate.error);
      return false;
    }
    collect.add(obj, {parse: true});
    collect.sync();
    this.removeTags();
    this.render();
    this.renderTodo();
    this.clearVal();
  },
  getVal() {
    return $('#text').val();
  },
  clearVal() {
    return $('#text').val('');
  },
  render: function () {
    this.collection.forEach(function (data) {
      $('#ul').append(this.template(data.toJSON()));
    }, this);
    $('#ul.remove label').removeAttr('id', 'clickLabel');
  },
  renderTodo: function () {
    var hash = location.hash;
    console.log('hash', hash);
    this.blockRend(hash.substring(2));
  },
  checkData: function (e) {
    var id = e.toElement.id;
    console.log('this.collection._byId[id]', this.collection._byId[id]);
    var checkCol = this.collection._byId[id].get('check');
    var statusCol = this.collection._byId[id].get('status');
    var titleCol = this.collection._byId[id].get('title');
    console.log('checkCol', checkCol);
    console.log('statusCol', statusCol);
    console.log('titleCol', titleCol);
    if (checkCol === 'checked' && statusCol !== 'remove') {
      this.collection._byId[id].set({
        check: '',
        status: 'active'
      });
      $.notify('[' + titleCol + '] -> was unchecked!');
      console.log('[ ' + titleCol + ' ] was unchecked');
    } else {
      if (!status === 'remove' || statusCol === 'active') {
        this.collection._byId[id].set({
          check: 'checked',
          status: 'done'
        });
        $.notify('[' + titleCol + '] -> was checked!', 'success');
        console.log('[ ' + titleCol + ' ] was checked');
      }
    }
    this.removeTags();
    this.collection.sync();
    this.render();
    this.renderTodo();
  },
  blockRend: function (status) {
    this.removeTags();
    this.collection.forEach(function (data) {
      if (data.get('status') === status) {
        this.$('#ul').append(this.template(data.toJSON()));
      }
    }, this);
  },
  deleteImg: function (e) {
    var elId = e.toElement.parentElement.children[0].id;
    var colEl = this.collection.at(elId);
    colEl.set('status', 'remove');
    colEl.set('ico', 'fa-history');
    colEl.set('check', '');
    this.renderTodo();
    this.collection.sync();
    console.log('Было удаленно задание! -> ' + colEl.get('title'));
    this.removeTags();
    this.render();
    this.renderTodo();
  },
  returnLabel: function (e) {
    var elId = e.toElement.parentElement.children[0].id;
    var colEl = this.collection.at(elId);
    colEl.set('status', 'active');
    colEl.set('ico', 'fa-times');
    this.renderTodo();
    this.collection.sync();
    console.log('Было возвращенно задание -> ' + colEl.get('title'));
    this.removeTags();
    this.render();
    this.renderTodo();
  },
  removeTags: function () {
    return $('#ul').find('li').remove();
  }
});
