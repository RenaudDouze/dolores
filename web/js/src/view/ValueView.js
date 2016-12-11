var ValueView = CellView.extend({
    /**
    	Template selector
    **/
    templateSelector: '#value_template',

    /**
        Initialize
    **/
    initialize: function() {
        CellView.prototype.initialize.call(this);

        this.listenTo(this.model.get('thing'), 'remove', this.remove);
        this.listenTo(this.model.get('criterion'), 'remove', this.remove);
    },
});
