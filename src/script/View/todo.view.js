var app = app || {};
var Backbone = Backbone || {};
var StorageHelper = StorageHelper || {};
var _ = _ || {};

var collect = new app.Collection();

app.View = Backbone.View.extend({
  el: 'body',
  collection: collect,
  events: {
    'click #add': 'addData',
    'click .someJob': 'checkData',
    'click .fa-times': 'deleteImg'
  },
  initialize: function () {
    this.template = _.template($('#template').html());
    this.collection.sync('read');
    this.render();
  },
  addData: function () {
    var idObject = StorageHelper.get('todo').length || 0;
    var obj = {
      title: this.getVal(),
      id: idObject
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
    this.clearVal();
  },
  getVal: function () {
    return $('#text').val();
  },
  clearVal: function () {
    return $('#text').val('');
  },
  render: function () {
    this.collection.forEach(function (data) {
      $('#ul').append(this.template(data.toJSON()));
    }, this);
    this.renderTodo();
  },
  renderTodo: function () {
    var hash = location.hash;
    this.blockRend(hash.substring(2));
  },
  checkData: function (e) {
    var id = e.toElement.id;
    var colEl = this.collection._byId[id];
    colEl.checkOrUncheck();
    this.removeTags();
    this.collection.sync('set');
    this.render();
  },
  blockRend: function (status) {
    this.removeTags();
    this.collection.forEach(function (data) {
      if (data.get('status') === status) {
        this.$('#ul').append(this.template(data.toJSON()));
      } else if (!status || status === 'all') {
        this.$('#ul').append(this.template(data.toJSON()));
      }
    }, this);
    this.changeAttr();
  },
  changeAttr: function () {
    return $('#ul .remove input').attr('id', 'removeId');
  },
  deleteImg: function (e) {
    var elId = e.toElement.parentElement.children[0].id;
    this.collection.removeModel(elId);
    this.collection.sync('set');
    this.removeTags();
    this.render();
  },
  removeTags: function () {
    return $('#ul').find('li').remove();
  }
});
