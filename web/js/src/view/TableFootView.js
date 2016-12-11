var TableFootView = ParentView.extend({

    /**
        Tab name
    **/
    tagName: 'tfoot',

    /**
        Template selector
    **/
    templateSelector: '#table_foot_template',

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
        return this.render();
    },
});
