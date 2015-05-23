var SaveView = Backbone.View.extend({

	tagName: 'body',

    template: _.template($('#save_template').html()),

	/**
		Initialize
	**/
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);

		this.$el.find('.modal').modal({
			show: false,
		});
	},

	/**
		Render
	**/
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));

    	this.$el.find('.modal').modal('show');
      	
      	return this;
	},

	/**
		Events
	**/
    events: {
        "hidden.bs.modal .modal": "close",
    },

    close: function() {
    	this.model.unset('data', {silent: true});
    }
});