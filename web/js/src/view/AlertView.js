var AlertView = Backbone.View.extend({

	tagName: 'div',

	/**
		Template
	**/
    template: function() {
    	return _.template($('#alert_template').html());
    },

	/**
		Initialize
	**/
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},

	/**
		Render
	**/
	render: function() {
		var tpl = this.template();
		console.log(this.model.toJSON());
		this.$el.html(tpl(this.model.toJSON()));

		this.model.clean();
		console.log(this.model.toJSON());

      	return this;
	},
});