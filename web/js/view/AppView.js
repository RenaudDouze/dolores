var AppView = Backbone.View.extend({

	el: $("#app"),

	save: null,

	initialize: function () {
		table = new TableView({model: new TableModel()});

		this.save = new SaveModel();
		new SaveView({
			model: this.save,
			el: '#save',
		});
	},
});