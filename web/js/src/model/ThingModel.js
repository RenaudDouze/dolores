var ThingModel = CellModel.extend({

    // string Label
    label: '',

    // integer Order
    order: 0,

    // integer Default order
    defaultOrder: 0,

    defaults: function() {
        var order = things.nextOrder();

        this.defaultOrder = order;

        return {
            label: 'Bidule ' + order,
            order: order,
        };
    },

    /**
        Method to set the main data
    **/
    setData: function(data) {
        this.set('label', data);
    },


});
