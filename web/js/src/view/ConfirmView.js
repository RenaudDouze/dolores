var ConfirmView = ModalView.extend({

    tagName: 'body',

    /**
    	Template selector
    **/
    templateSelector: '#confirm_template',

    /**
        Events
    **/
    events: {
        "click .action-doit": "doIt",
    },

    /**
     * Do the action
     */
    doIt: function() {
        if ('function' === typeof this.model.get('actionCallback')) {
            this.model.get('actionCallback')();

            this.close();
            this.reset();
        }
    },

    /**
     * Reset modal
     */
    reset: function() {
        this.model.clear().set(this.model.defaults);
    }
});
