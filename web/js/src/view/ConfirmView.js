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

            this.reset();
            this.close();
        }

    },

    /**
     * Reset modal
     */
    reset: function() {
        this.model = new ConfirmModel;
    }
});
