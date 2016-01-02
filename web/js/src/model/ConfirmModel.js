var ConfirmModel = Backbone.Model.extend({
    // string Title
    title: '',

    // string Text
    text: '',

    // string Action label
    actionLabel: '',

    // string Cancel
    cancelLabel: '',

    // string Alert class (success, info, warning, danger)
    alertClass: '',

    // function Action callback
    actionCallback: null,

    /**
        Default values
    **/
    defaults: function() {
        return {
            title: '',
            text: '',
            actionLabel: '',
            cancelLabel: '',
            alertClass: '',
            actionCallback: null,
        };
    },
});
