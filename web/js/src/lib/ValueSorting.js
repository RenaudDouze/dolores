var ValueSorting = {
    /**
        Sorting data
    **/
    data: {},

    /**
        Field list
    **/
    fields: [],

    /**
        Model list
    **/
    models: [],

    /**
        Last added/updated model
    **/
    lastModel: null,

    /**
        Key list
    **/
    keys: [],

    /**
        Constants
    **/
    SORT_ASC: 'asc',
    SORT_DESC: 'desc',

    /**
        Return sorting data
        Return sorting data for a model, if given
    **/
    get: function(model) {
        if (!_.isUndefined(model)) {
            return this.data[model.cid];
        }
        return this.data;
    },
    /**
        Set data
    **/
    set: function(data) {
        this.data = data;

        return this;
    },
    /**
        Return true or false if data are empty or not
    **/
    empty: function() {
        return _.isEmpty(this.data);
    },

    /**
        Add a sorting criterion
            field to know which value's field sort
            model to filter values
            order, ascending ou descending order
    **/
    add: function(field, model, order) {
        var key = model.cid;

        // Only support one sort at the time
        this.clean();

        if (!this.has(model)) {
            this.fields.push(field);
            this.models.push(model);
        }

        this.data[key] = {
            model: model,
            field: field,
            order: order,
        };

        this.lastModel = model;

        return key;
    },

    /**
        Remove a sorting criterion
    **/
    delete: function(model) {
        var key = model.cid;

        delete this.fields[_.findIndex(this.fields, this.data[key].field)];
        delete this.models[_.findIndex(this.models, this.data[key].model)];

        delete this.data[key];
    },

    /**
        Return all fields
    **/
    getFields: function() {
        return this.fields;
    },

    /**
        Return all models
    **/
    getModels: function() {
        return this.models;
    },

    /**
        The sorting has model or not
    **/
    has: function(model) {
        return (!_.isUndefined(this.data[model.cid]));
    },

    /**
        Return last added/updated element
    **/
    last: function() {
        return this.get(this.lastModel);
    },

    /**
        Clean all elements
    **/
    clean: function() {
        this.fields = [];
        this.models = [];
        this.data = {};
    }
};
