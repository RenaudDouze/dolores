var CriterionModel = CellModel.extend({

	// string Name
	label: '',

	// int Order
	order: 0,

	defaults: function() {
		var order = criterions.nextOrder();
      	return {
        	label: 'Point ' + order,
        	order: order,
      	};
    },

	/**
		Method to set the main data
	**/
	setData: function(data) {
		this.set('label', data);
	},

});