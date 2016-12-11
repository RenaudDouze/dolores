var ValueModel = CellModel.extend({

    // string Data
    data: '',

    // integer Order
    order: null,

    relations: [{
        type: Backbone.HasOne,
        key: 'thing',
        relatedModel: 'ThingModel',
    }, {
        type: Backbone.HasOne,
        key: 'criterion',
        relatedModel: 'CriterionModel',
    }],

    initialize: function() {},

    defaults: {
        data: '',
        order: null,
    },

    /**
    	Method to set the main data
    **/
    setData: function(data) {
        this.set('data', data);
    },

    /**
    	Return data on correct format
    	Convert string-integer to proper integer
    **/
    getData: function() {
        var data = this.get('data');
        var intData = 1 * data;

        if (_.isNumber(intData) && !_.isNaN(intData)) {
            return intData;
        }

        return data;
    }

});
