var CriterionView = CellView.extend({
	/**
		Template selector
	**/
	templateSelector: '#criterion_template',

	/**
		Events
	**/
    events: {
        "click .action-remove-criterion.btn": "removeCriterion",
    },

	/**
		Remove a criterion
	**/
	removeCriterion: function(e) {
		table.removeCriterion(this.model);
	},
});