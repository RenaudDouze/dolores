var TitleModel = CellModel.extend({

	// string Title
	title: '',

    defaults: {
        title: '"Tableau"',
    },

	/**
		Method to set the main data
	**/
	setData: function(data) {
		this.set('title', data);
	},

});