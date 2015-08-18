LI = Backbone.View.extend({
	tagName: "li",
	initialize: function () {
		$("#ul").append(this.el);
	}
});

$(document).ready(function(){
	var li = new LI();
});