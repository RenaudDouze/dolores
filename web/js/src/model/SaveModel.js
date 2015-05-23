var SaveModel = Backbone.RelationalModel.extend({

	// string JSON formatted data
	data: '',

	// string Text for alert message
	alertMessage: '',

	defaults: function() {
      	return {
        	data: '',
        	alertMessage: '',
      	};
    },
});