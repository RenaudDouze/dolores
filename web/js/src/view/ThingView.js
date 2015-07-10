var ThingView = CellSortableView.extend({
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
        Field name in ValueModel
    **/
    fieldName: 'thing',

	/**
		Events
	**/
    events: function () {
    	var events = CellSortableView.prototype.events;

    	return _.extend(events, {
            "click .action-remove.btn": "removeThing",
        	"click .action-sort.btn": "sortByThing",
  	  	});
    },

    /**
        Remove a thing
    **/
    removeThing: function(e) {
        console.log(this.modelKey);
        // tableView.removeThing(this.model);
    },

    /**
        Sort by thing
    **/
    sortByThing: function(e) {
        var filter = {thing: this.model}; 
        this.sortBy(filter);
    },
});