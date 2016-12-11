var SaveModel = Backbone.Model.extend({

    // string JSON formatted data
    data: '',

    // string CSV formatted data
    dataCsv: '',

    // string Text for alert message
    alertMessage: '',

    defaults: function() {
        return {
            data: '',
            dataCsv: '',
            alertMessage: '',
        };
    },

    /**
     * Init json from data
     *
     * @param {object} data
     */
    initJson: function(data) {
        var data = _.extend({
            title: tableTitle
        }, {
            values: cValue
        });

        this.set('data', JSON.stringify(data));
    },

    /**
     * Init csv from data
     *
     * @param {object} data
     */
    initCsv: function(data) {
        var rows = [];

        // Set title
        rows.push([tableTitle.get('title')]);
        // Set first row
        _.each(things.models, function(thing) {
            _.last(rows).push(thing.get('label'));
        });

        // Set rows
        _.each(criterions.models, function(criterion) {
            var row = [criterion.get('label')];

            _.each(cValue.where({
                criterion: criterion
            }), function(value) {
                row.push(value.get('data'));
            });

            rows.push(row);
        });

        var csv = '';
        _.each(rows, function(row) {
            csv += row.join(';') + '\r\n';
        });

        this.set('dataCsv', csv.trim());
    },
});
