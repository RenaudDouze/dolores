var ValueCollection = Backbone.Collection.extend({
	model: ValueModel,

	/**
		To maintain order
	**/
	comparator: function(value) {
		return value.get('criterion').get('order') + '.' + value.get('thing').get('order');
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

		values.reset(newValues);
		values.sort();

		if (! _.isEmpty(errors)) {
			throw new DoloresJsonNotCompatibleException(errors);
		}
	},
});