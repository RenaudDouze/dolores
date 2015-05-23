var ThingModel = CellModel.extend({

	// string Label
	label: '',

	// int Order
	order: 0,

	defaults: function() {
		var order = things.nextOrder();
      	return {
        	label: 'Bidule ' + order,
        	order: order,
      	};
    },

	/**
		Method to set the main data. Need to be extented
	**/
	setData: function(data) {
		this.set('label', data);
	},

});