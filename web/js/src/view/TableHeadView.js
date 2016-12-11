var TableHeadView = ParentView.extend({

    /**
        Tab name
    **/
    tagName: 'thead',

    /**
        Template selector
    **/
    templateSelector: '#table_head_template',

    /**
        Template
    **/
    template: function() {
        return _.template($(this.templateSelector).html());
    },

    /**
        Initialize
    **/
    initialize: function() {
        this.listenTo(things, 'add', this.update);
        this.listenTo(things, 'remove', this.update);
    },

    /**
        Render
    **/
    render: function() {
        var tpl = this.template();
        this.$el.html(tpl());

        return this;
    },

    /**
        Update
    **/
    update: function() {
        this.$('th:last').attr('rowspan', criterions.length + 1);
    },

    /**
        Add a thing
    **/
    addThing: function(thing) {
        var view = new ThingView({
            model: thing,
        });

        this.$('th:last').before(view.render().el);

        view.focus();
    }
});
