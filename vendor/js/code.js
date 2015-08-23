var Model = Backbone.Model.extend({
  defaults: {
    title: '',
    status: 'active',
    check: false
  }
});
// Модел данных которые будем отправлять в сторедж!

var Collect = Backbone.Collection.extend({
  model: Model
});
  
var textAdd = Backbone.View.extend({
  el: '#block',
  events: {
    'click #add': 'consoleLog'
  },
  consoleLog: function() {
    var text = $('#text');
    if(text.val().length > 0) {
      console.log('Добавлена новая цель! [ '+ text.val() +' ]');
      colMod.add([{
        title: text.val()
      }]);
      text.val('');
    }
  }
});

colMod = new Collect();

var todo = new textAdd();
