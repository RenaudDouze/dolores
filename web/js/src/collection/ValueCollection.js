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
    	Sort the collection
    **/
    tableSort: function() {
        _.each(cValue.models , function(element, index, list) {
        	element.set('order', 0);
        });

        var i = 0;
    	_.each(this.sorting.get(), function(sortingElement, sortIndex, sortList) {
    		var field = sortingElement.field;
			var model = sortingElement.model;

			var filter = {};
			filter[field] = model;

			var sortedValues = _.sortBy(cValue.where(filter), 'datas');

            if (cValue.sorting.SORT_DESC === sortingElement.order) {
                sortedValues = sortedValues.reverse();
            }

            var sortOrder = 0;
            _.each(sortedValues, function(element, index, list) {
            	var order = null;

            	if (0 < index) {
            		var prev = list[index - 1];
            		if (element.get('data') === prev.get('data')) {
            			order = prev.get('order');
            		} 

            	}

            	if (_.isNull(order)) {
            		order = sortOrder++;
            	}

            	element.set('order', order);
            });

            // Set order
	        _.each(sortedValues, function(element, index, list) {
        		if ('criterion' === field) {
        			var order = element.get('order');

		        	element.get('thing').set('order', order);
        		}

        		if ('thing' === field) {
        			var order = element.get('order');

		        	element.get('criterion').set('order', order);
        		}
	        });

	        i++;
		});


		/**/

        this.sort();

        // Only one have to trigger sort event to avoid double trigger 
        criterions.sort({silent: true});
        things.sort();
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
	load: function(datas) {
		var newValues = new Array();
		var errors = new Array();

		things.reset(null, {silent: true});
		criterions.reset(null, {silent: true});

		_.each(datas, function(element, index, list) {
			if (! _.isObject(element)) {
				errors.push("L'élément #" + index + " n'est pas reconnu");
			} else if (! _.isObject(element.thing)) {
				errors.push("L'élément #" + index + " n'a pas d'objet 'thing'");
			} else if (! _.isObject(element.criterion)) {
				errors.push("L'élément #" + index + " n'a pas d'objet 'criterion'");
			} else {
				var thingData = element.thing;
				var criterionData = element.criterion;;

				var thing = things.findWhere(thingData);
				if (_.isUndefined(thing)) {
					var thing = new ThingModel(thingData);
					things.add(thing, {silent: true});	
				}

				var criterion = criterions.findWhere(criterionData);
				if (_.isUndefined(criterion)) {
					var criterion = new CriterionModel(criterionData);
					criterions.add(criterion, {silent: true});	
				}

				var valueData = element;
				valueData.thing = thing; 
				valueData.criterion = criterion; 

				var value = new ValueModel(valueData);
				newValues.push(value);
			}
		});

		cValue.reset(newValues);
		cValue.sort();

		if (! _.isEmpty(errors)) {
			throw new DoloresJsonNotCompatibleException(errors);
		}
	},
});