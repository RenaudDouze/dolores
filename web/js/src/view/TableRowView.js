var TableRowView = ParentView.extend({

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

    /**
        Add a criterion
    **/
    addCriterion: function(criterion) {
        var view = new CriterionView({
            model: criterion,
        });

        this.$el.prepend(view.render().el);

        view.focus();
    },

    /**
        Add a value
    **/
    addValue: function(value) {
        var view = new ValueView({
            model: value,
        });

        this.$('td:last').before(view.render().el);
    },
});   