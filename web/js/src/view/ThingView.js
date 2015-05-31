var ThingView = CellView.extend({
    /**
        Tab name
    **/
    tagName: 'th',

    /**
        Class name
    **/
    className: 'thing',
	
	/**
		Template selector
	**/
	templateSelector: '#thing_template',

	/**
		Events
	**/
    events: function () {
    	var events = CellView.prototype.events;

    	return _.extend(events, {
        	"click .action-remove-thing.btn": "removeThing",
  	  	});
    },

	/**
		Remove a thing
	**/
	removeThing: function(e) {
		tableView.removeThing(this.model);
	},
});