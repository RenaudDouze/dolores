var CellView = Backbone.View.extend({

    /**
    	Tab name
    **/
    tagName: 'td',

    /**
    	Template selector
    **/
    templateSelector: '',

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
        this.listenTo(this.model, 'remove', this.remove);
        this.listenTo(this.model, 'destroy', this.remove);
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
    	Events
    **/
    events: {
        "click": "focus",
        "DOMNodeInserted [contenteditable='true']": "contentEdited",
        "DOMNodeRemoved [contenteditable='true']": "contentEdited",
        "DOMCharacterDataModified [contenteditable='true']": "contentEdited",
    },

    /**
    	When a content is edited
    **/
    contentEdited: function(e) {
        this.model.setData(e.currentTarget.innerHTML.trim(), {
            silent: true
        });
    },

    /**
    	Focus on the view = focus on the editable content
    **/
    focus: function() {
        this.$el.find('[contenteditable="true"]').focus();
    },
});
