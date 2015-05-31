var CriterionView = CellView.extend({
	/**
		Tab name
	**/
	tagName: 'th',

	/**
		Template selector
	**/
	templateSelector: '#criterion_template',

	/**
		Events
	**/
    events: function () {
    	var events = CellView.prototype.events;

    	return _.extend(events, {
        	"click .action-remove-criterion.btn": "removeCriterion",
  	  	});
    },

	/**
		Remove a criterion
	**/
	removeCriterion: function(e) {
		tableView.removeCriterion(this.model);
	},
});