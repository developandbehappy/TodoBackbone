var app = app || {};
var Backbone = Backbone || {};
var StorageHelper = StorageHelper || {};
var _ = _ || {};

app.View = Backbone.View.extend({
  el: 'body',
  events: {
    'click #add': 'addData',
    'click .someJob': 'checkData',
    'click .close': 'deleteImg',
    'submit form': 'addData'
  },
  initialize: function () {
    this.template = _.template($('#template').html());
    this.collection.sync('read');
  },
  render: function (status) {
    this.clearTodoListBody();
    this.btnDisableActiveStatus();
    this.btnEnableActiveStatus(status);
    this.collection.getListByStatus('test');
//    this.collection.forEach(function (data) {
//      if (data.get('status') === status) {
//        this.$('#ul').append(this.template(data.toJSON()));
//      } else if (!status || status === 'all') {
//        this.$('#ul').append(this.template(data.toJSON()));
//      }
//    }, this);
//    this.changeAttr();
  },
  addData: function (e) {
    var idObject = StorageHelper.get('todo').length || 0;
    var obj = {
      title: this.getVal(),
      id: idObject
    };
    var validate = collect.isValidModel(obj);
    e.preventDefault();
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
  clearTodoListBody: function () {
    return $('#todoList').html('');
  },
  btnDisableActiveStatus: function () {
    var btnList = $('#nav').find('.btn');
    btnList.removeClass('active');
  },
  btnEnableActiveStatus: function (status) {
    var btn = $('#nav').find("#" + status);
    btn.addClass('active');
  }
});
