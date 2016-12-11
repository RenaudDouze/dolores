var ExportView = ModalView.extend({

    tagName: 'body',

    /**
    	Template selector
    **/
    templateSelector: '#export_template',

    /**
        Events
    **/
    events: {
        "click .nav.nav-tabs a": "tabIt",
    },

    /**
     * Tab it
     *
     * @param {Event} e
     */
    tabIt: function(e) {
        $(e).tab('show');
    },
});
