var ThingCollection = Backbone.Collection.extend({
	
	model: ThingModel,

	/**
		To maintain order
	**/
	comparator: function(thing) {
	 	return thing.get('order');
	},

	/**
		To determine order for new element
	**/
	nextOrder: function() {
      	return ((! this.length) ? 1 : this.last().get('order') + 1);
    },
});