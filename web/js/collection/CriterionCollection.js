var CriterionCollection = Backbone.Collection.extend({

	model: CriterionModel,

	/**
		To maintain order
	**/
	comparator: function(critetion) {
	 	return critetion.get('order');
	},

	/**
		To determine order for new element
	**/
	nextOrder: function() {
      	return ((! this.length) ? 1 : this.last().get('order') + 1);
    },
});