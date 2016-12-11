var TableModel = Backbone.Model.extend({
    // boolean Affichage brut ou non
    rawMode: false,

    defaults: function() {
        return {
            rawMode: false,
        };
    },
});
