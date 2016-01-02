var ModalView = ParentView.extend({

	tagName: 'body',

	alert: null,
	alertView: null,

	/**
		Template
	**/
    template: function() {
    	return _.template($(this.templateSelector).html());
    },

	/**
		Initialize
	**/
	initialize: function() {
		this.modalInit();

		this.alert = new AlertModel();
		this.alertView = new AlertView({
			model: this.alert,
		});
	},

	/**
		Render
	**/
	render: function() {
		var tpl = this.template();
		this.$el.html(tpl(this.model.toJSON()));

		this.alertView.setElement('.alerts');

      	return this;
	},

	/**
		Modal initalization

		@param object|string options|action
	**/
	modal: function(options) {
		this.$el.find('.modal').modal(options);
	},

	/**
		Modal initalization
	**/
	modalInit: function() {
		this.modal({
			show: false,
		});
	},

	/**
		Open the modal
	**/
	open: function() {
		this.render().modal('show');
	},

	/**
		Close the modal
	**/
	close: function() {
    	this.modal('hide');
	},
});
