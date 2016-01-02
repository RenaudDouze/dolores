var CriterionView = CellSortableView.extend({
	/**
		Tab name
	**/
	tagName: 'th',

    /**
        Class name
    **/
    className: 'criterion',

    /**
        Template selector
    **/
    templateSelector: '#criterion_template',

    /**
        Field name in ValueModel
    **/
    fieldName: 'criterion',

	/**
		Events
	**/
    events: function () {
    	var events = CellView.prototype.events;

    	return _.extend(events, {
        	"click .action-remove.btn": "removeCriterion",
            "click .action-sort.btn": "sortByCriterion",
  	  	});
    },

	/**
		Remove a criterion
	**/
	removeCriterion: function(e) {
        tableView.removeCriterion(this.model);
	},

    /**
        Sort by criterion
    **/
    sortByCriterion: function(e) {
        var filter = {criterion: this.model};
        this.sortBy(filter);
    },
});
