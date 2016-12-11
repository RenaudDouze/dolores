var AppView = ParentView.extend({

    el: $("#app"),

    rawMode: false,

    initialize: function() {
        table = new TableModel();
        tableView = new TableView({
            model: table
        });

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
        "click .action-html-show": "rawVersion",
        "click .action-html-hide": "htmlVersion",
    },

    /**
     * Show a more printable version
     */
    printVersion: function() {
        $('.hidden-print').hide();
        $('.visible-print').show();
        $('.action-unprint').show();
        $('.action-print').hide();

        $('#tableContent').addClass('mode-print');
    },

    /**
     * Show a the normal version
     */
    unprintVersion: function() {
        $('.hidden-print').show();
        $('.visible-print').hide();
        $('.action-unprint').hide();
        $('.action-print').show();

        $('#tableContent').removeClass('mode-print');
    },

    /**
     * Version brut (code html visible)
     */
    rawVersion: function() {
        table.set('rawMode', true);

        $('.action-html-show').hide();
        $('.action-html-hide').show();

        $('#tableContent').addClass('mode-raw');
    },

    /**
     * Version html (code html interprété)
     */
    htmlVersion: function() {
        table.set('rawMode', false);

        $('.action-html-show').show();
        $('.action-html-hide').hide();

        $('#tableContent').removeClass('mode-raw');
    },
});
