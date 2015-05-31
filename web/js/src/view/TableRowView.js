var TableRowView = Backbone.View.extend({

    /**
        Tab name
    **/
    tagName: 'tr',

    /**
        Template selector
    **/
    templateSelector: '#table_row_template',

    /**
        Initialize
    **/
    initialize: function() {
        this.listenTo(this.model, 'remove', this.remove);
    },

    /**
        Template
    **/
    template: function() {
        return _.template($(this.templateSelector).html());
    },

    /**
        Render
    **/
    render: function() {
        var tpl = this.template();
        this.$el.html(tpl(this.model.toJSON()));
        
        return this;
    },
});   