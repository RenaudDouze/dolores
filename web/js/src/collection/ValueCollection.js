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
    	Sort the table

		@return void
    **/
    tableSort: function() {
    	var sort = this.sorting.last();

		if (! _.isUndefined(sort) && ! _.isNull(sort)) {
			this.sortValuesDependingCollection(sort.model, sort.field, sort.order);
		} else {
			this.resetTableSort();
		}

        this.sort();

        // Only one have to trigger sort event to avoid double trigger
        criterions.sort({silent: true});
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

		var values = this.where(filter);
		values = _.sortBy(this.where(filter), function(element) {
			return element.getData();
		});

		if (cValue.sorting.SORT_DESC == order) {
			values = values.reverse();
		}
		_.each(values, function(element, index, list) {
			var modelName = null;

			if (model instanceof ThingModel) {
				modelName = 'criterion';
			} else if (sort.model instanceof CriterionModel) {
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
