var AppView = ParentView.extend({

	el: $("#app"),

	initialize: function () {
		table = new TableModel();
        tableView = new TableView({model: table});

        confirm = new ConfirmModel();
        confirmView = new ConfirmView({
            model: confirm,
            el: '#confirm',
        });
	},

    /**
        Events
    **/
    events: {
        "click .action-print": "printVersion",
        "click .action-unprint": "unprintVersion",
    },

    /**
     * Show a more printable version
     */
    printVersion: function() {
        $('.hidden-print').hide();
        $('.visible-print').show();
        $('.action-unprint').show();
        $('.action-print').hide();
    },

    /**
     * Show a the normal version
     */
    unprintVersion: function() {
        $('.hidden-print').show();
        $('.visible-print').hide();
        $('.action-unprint').hide();
        $('.action-print').show();
    },
});
