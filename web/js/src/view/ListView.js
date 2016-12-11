var ListView = Backbone.View.extend({

    tagName: 'div',

    /**
    	Template
    **/
    template: function() {
        return _.template($('#list_template').html());
    },

    /**
    	Initialize
    **/
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },

    /**
    	Render
    **/
    render: function(datas) {
        var tpl = this.template();
        this.$el.html(tpl({
            datas: datas
        }));

        return this;
    },
});
