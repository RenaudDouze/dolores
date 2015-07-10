var ValueModel = CellModel.extend({

	// string Data
	data: '',

    // integer Order
    order: null,

	relations: [
		{
			type: Backbone.HasOne,
			key: 'thing',
			relatedModel: 'ThingModel',
		},
		{
			type: Backbone.HasOne,
			key: 'criterion',
			relatedModel: 'CriterionModel',
		}
	],

	initialize: function(){
    },

    defaults: {
        data: '',
        order: null,
    },

	/**
		Method to set the main data
	**/
	setData: function(data) {
		this.set('data', data);
	},

});