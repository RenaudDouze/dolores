var AppView = ParentView.extend({

	el: $("#app"),

	initialize: function () {
		table = new TableModel();
		tableView = new TableView({model: table});
	},
});