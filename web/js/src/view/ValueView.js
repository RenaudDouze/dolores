var ValueView = CellView.extend({
	/**
		Template selector
	**/
	templateSelector: '#value_template',

    /**
        Initialize
    **/
    initialize: function() {
        CellView.prototype.events;

        this.listenTo(this.model.get('thing'), 'remove', this.remove);
        this.listenTo(this.model.get('criterion'), 'remove', this.remove);
    },
});