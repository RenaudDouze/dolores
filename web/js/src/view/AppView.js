var AppView = Backbone.View.extend({

	el: $("#app"),

	initialize: function () {
		table = new TableModel();
		tableView = new TableView({model: table});
	},
});