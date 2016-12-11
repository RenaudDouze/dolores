var ValueCollection = Backbone.Collection.extend({
    model: ValueModel,

    /**
    	Sorting model and order
    **/
    sorting: null,
    /**
        Initialize
    **/
    initialize: function() {
        Backbone.Collection.prototype.initialize.call(this);

        this.sorting = ValueSorting;
    },

    /**
     * Sort the table
     *
     * @return void
     */
    tableSort: function() {
        var sort = this.sorting.last();

        if (!_.isUndefined(sort) && !_.isNull(sort)) {
            this.sortValuesDependingCollection(sort.model, sort.field, sort.order);
        } else {
            this.resetTableSort();
        }

        this.sort();

        // Only one have to trigger sort event to avoid double trigger
        criterions.sort({
            silent: true
        });
        things.sort();
    },

    /**
    	Sort the collections which depends on value

    	@param CellModel model Model use to filter
    	@param string    field Target field
    	@param string    order ASC|DESC
    **/
    sortValuesDependingCollection: function(model, field, order) {
        var oppositeCollection = [];
        if (model instanceof ThingModel) {
            oppositeCollection = criterions;
        } else if (model instanceof CriterionModel) {
            oppositeCollection = things;
        }
        _.each(oppositeCollection.models, function(element, index, list) {
            element.set('order', 0);
        });

        var filter = {};
        filter[field] = model;

        var values = _.sortBy(this.where(filter), function(element) {
            var data = ''+element.getData();

            // On vire les espaces
            var cleanedData = data.replace(/\s/g, '');

            // Si c'est un nombre
            if (! isNaN(cleanedData)) {
                data = Number(cleanedData);
            }

            return data;
        });

        if (cValue.sorting.SORT_DESC == order) {
            values = values.reverse();
        }
        _.each(values, function(element, index, list) {
            var modelName = null;

            if (model instanceof ThingModel) {
                modelName = 'criterion';
            } else if (model instanceof CriterionModel) {
                modelName = 'thing';
            }

            if (modelName) {
                element.get(modelName).set('order', index + 1);
            }
        });
    },

    /**
    	Reset table sort
    **/
    resetTableSort: function() {
        _.each(things.models, function(element, index, list) {
            element.set('order', element.defaultOrder);
        });
        _.each(criterions.models, function(element, index, list) {
            element.set('order', element.defaultOrder);
        });
    },

    /**
    	To maintain order
    **/
    comparator: function(model) {
        return model.get('thing').get('order') + '.' + model.get('criterion').get('order');
    },

    /**
    	Load datas
    **/
    loadJson: function(datas) {
        var newValues = new Array();
        var errors = new Array();

        things.reset(null, {
            silent: true
        });
        criterions.reset(null, {
            silent: true
        });

        _.each(datas, function(element, index, list) {
            if (!_.isObject(element)) {
                errors.push("L'élément #" + index + " n'est pas reconnu");
            } else if (!_.isObject(element.thing)) {
                errors.push("L'élément #" + index + " n'a pas d'objet 'thing'");
            } else if (!_.isObject(element.criterion)) {
                errors.push("L'élément #" + index + " n'a pas d'objet 'criterion'");
            } else {
                var thingData = element.thing;
                var criterionData = element.criterion;;

                var thing = things.findWhere(thingData);
                if (_.isUndefined(thing)) {
                    var thing = new ThingModel(thingData);
                    things.add(thing, {
                        silent: true
                    });
                }

                var criterion = criterions.findWhere(criterionData);
                if (_.isUndefined(criterion)) {
                    var criterion = new CriterionModel(criterionData);
                    criterions.add(criterion, {
                        silent: true
                    });
                }

                var valueData = element;
                valueData.thing = thing;
                valueData.criterion = criterion;

                var value = new ValueModel(valueData);
                newValues.push(value);
            }
        });

        if (!_.isEmpty(errors)) {
            throw new DoloresJsonNotCompatibleException(errors);
        }

        cValue.reset(newValues);
        cValue.sort();
    },

    /**
     * Load csv
     *
     * @param {string} text
     */
    loadCsv: function(text) {
        var errors = new Array();

        if (-1 === text.indexOf(';')) {
            errors.push('Il faut des point-virgule pour faire un bon csv');
        }
        if (-1 === text.indexOf('\n')) {
            errors.push('Il faut au moins deux lignes (titre;colonnes et ligne;valeurs)');
        }

        if (_.isEmpty(errors)) {
            var rowsStr = text.split('\n');

            if (2 > rowsStr.length) {
                errors.push('Il faut au moins deux lignes (titre;colonnes et ligne;valeurs)');
            }

            var self = this;

            var rows = [];
            _.each(rowsStr, function(rowStr, index) {
                var row = rowStr.split(';');

                if (index && row.length !== _.first(rows).length) {
                    errors.push("Il faut le même nombre d'éléments dans chaque ligne");
                }

                _.each(row, function(value, index) {
                    row[index] = self.properCsvValue(value);
                });

                rows.push(row);
            });

            _.each(rows[0], function(value, index) {
                rows[0][index] = self.properCsvValue(value);
            });

            // Don't need title here
            rows[0].shift();

            things.reset(null, {
                silent: true
            });
            criterions.reset(null, {
                silent: true
            });

            _.each(rows[0], function(thingLabel, index) {
                things.add(new ThingModel({
                    'label': thingLabel,
                }), {
                    silent: true
                });
            });
            // No need header anymore
            rows.shift();

            _.each(rows, function(row, index) {
                criterions.add(new CriterionModel({
                    'label': row[0],
                }), {
                    silent: true
                });

                // No need first value anymore
                row.shift();
            });

            var values = [];
            // For each rows, which only contains values now
            _.each(rows, function(row, iRow) {
                _.each(row, function(value, iColumn) {
                    var thing = things.at(iColumn);
                    var criterion = criterions.at(iRow);

                    if ('undefined' === typeof thing) {
                        errors.push("Le \"truc\" n'a pas été trouvé");
                    }
                    if ('undefined' === typeof criterion) {
                        errors.push("Le \"critère\" n'a pas été trouvé");
                    }

                    if ('undefined' !== typeof thing && 'undefined' !== typeof criterion) {
                        values.push(new ValueModel({
                            'data': value,
                            'thing': thing,
                            'criterion': criterion
                        }));
                    }
                });
            });

            if (!_.isEmpty(errors)) {
                throw new DoloresCsvNotCompatibleException(errors);
            }

            cValue.reset(values);
            cValue.sort();
        } else {
            throw new DoloresCsvNotCompatibleException(errors);
        }
    },

    /**
     * Retourne une valeur nettoyée issue d'un csv
     * Enleve les quotes d'encapsulation
     *
     * @param  string value
     * @return string
     */
    properCsvValue: function(value) {
        return value.replace(/^"(.*)"$/, '$1');
    }
});
