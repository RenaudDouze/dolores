var ValueCollection = Backbone.Collection.extend({
	model: ValueModel,

	/**
		To maintain order
	**/
	comparator: function(value) {
		return value.get('criterion').get('order') + '.' + value.get('thing').get('order');
	}
});