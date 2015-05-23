var ThingView = CellView.extend({
	/**
		Template selector
	**/
	templateSelector: '#thing_template',

	/**
		Events
	**/
    events: {
        "click .action-remove-thing.btn": "removeThing",
    },
});