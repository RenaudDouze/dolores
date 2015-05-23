var SaveModel = Backbone.RelationalModel.extend({

	// string JSON formatted data
	data: '',

	/**
		Clean the save
	**/
	clean: function() {
		this.data = '';
	}


});