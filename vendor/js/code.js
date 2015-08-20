var app = Backbone.View.extend({
  defaults: {
    array: []
  },
  render: function() {
    console.log('Добавлена новая задача!');
    this.defaults.array.push(this.$el.val());
    return this;
  }
});

ap = new app({el: '#text'});
$('#add').on('click', function() {
  ap.render();
});
