var TableBodyView = ParentView.extend({

    /**
        Tab name
    **/
    tagName: 'tbody',

    /**
        Template selector
    **/
    templateSelector: '#table_body_template',
    
    /**
        Subviews
    **/
    rowViews: {},

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
        this.$el.html(tpl());
        
        return this;
    },

    /**
        Add a criterion
    **/
    addCriterion: function(criterion) {
        var view = new TableRowView({
            model: criterion,
        });
        this.$el.append(view.render().el);

        view.addCriterion(criterion);

        this.rowViews[criterion.cid] = view;
    },

    /**
        Add a value
    **/
    addValue: function(value) {
        var criterionCId = value.get('criterion').cid;

        if (! _.isUndefined(this.rowViews[criterionCId]) 
            && !_.isNull(this.rowViews[criterionCId])
        ) {
            this.rowViews[criterionCId].addValue(value);
        }
    },
});   