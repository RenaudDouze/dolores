var ValueModel = CellModel.extend({

	// string Data
	data: '',

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
    },

	/**
		Method to set the main data. Need to be extented
	**/
	setData: function(data) {
		this.set('data', data);
	},

});