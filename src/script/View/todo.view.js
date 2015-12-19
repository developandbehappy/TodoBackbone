var app = app || {};
var Backbone = Backbone || {};
var StorageHelper = StorageHelper || {};
var _ = _ || {};

app.View = Backbone.View.extend({
  el: 'body',
  events: {
    'click #todoFormAdd': 'todoAddItem',
//    'click .todoCheckboxItem': 'checkData',
    'click .todoRemoveItem': 'todoDeleteItem',
    'submit form': 'todoAddItem'
  },
  initialize: function () {
    this.status = 'all';
    this.template = _.template($('#template').html());
    this.collection.sync('read');
  },
  render: function (status) {
    console.log('Todo render status', status);
    this.status = status;
    this.clearTodoListBody();
    this.btnDisableActiveStatus();
    this.btnEnableActiveStatus(status);
    var self = this;
    var todoList = this.collection.getListByStatus(status);
    todoList.forEach(function (item) {
      $('#todoList').append(self.template(item.toJSON()));
    });
  },
  todoAddItem: function (e) {
    e.preventDefault();
    var collectionSize = this.collection.getSize();
    var item = {
      title: this.todoGetInputValue(),
      id: collectionSize
    };
//    var validate = this.collection.isValidModel(item);
//    if (!validate.status) {
//      $.notify(validate.error);
//      return false;
//    }
    this.collection.create(item);
    console.log(this.collection.toJSON());

//    this.collection.sync();
//    this.todoClearInputValue();
//    if (this.status === 'completed') {
//      return false;
//    }
//    this.render(this.status);
  },
  todoGetInputValue: function () {
    return $('#todoFormText').val();
  },
  todoClearInputValue: function () {
    return $('#todoFormText').val('');
  },
  checkData: function (e) {
    var id = e.toElement.id;
    var colEl = this.collection._byId[id];
    colEl.checkOrUncheck();
    this.collection.sync();
    this.render();
  },
  todoDeleteItem: function (e) {
    var $this = $(e.currentTarget);
    var itemId = $this.data('id');
    this.collection.removeModel(itemId);
    this.collection.sync();
    this.render(this.status);
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
