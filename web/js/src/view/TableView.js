var TableView = Backbone.View.extend({

	tagName: 'div',
	className: '',
	el: '#tableContent',

	/**
		Subviews
	**/
	valuesView: null,
	thingsView: null,
	criterionsView: null,
	exportView: null,
	importView: null,
	valueView: null,

	/**
		Initialize
	**/
	initialize: function() {
	    this.listenTo(this.model, 'load', this.render);
	    this.listenTo(this.model, 'change', this.render)	    

	    var Truc = new ThingModel({'label': 'Truc', 'order': 1});
	    var Machin = new ThingModel({'label': 'Machin', 'order': 2});
	    var Chose = new ThingModel({'label': 'Chose', 'order': 3});

	    var Critere1 = new CriterionModel({'label': 'Crit. A', 'order': 1});
	    var Critere2 = new CriterionModel({'label': 'Crit. B', 'order': 2});
	    var Critere3 = new CriterionModel({'label': 'Crit. C', 'order': 3});

	    var ValueTruc1 = new ValueModel({'data': 'Truc-1', 'thing': Truc, 'criterion': Critere1});
	    var ValueTruc2 = new ValueModel({'data': 'Truc-2', 'thing': Truc, 'criterion': Critere2});
	    var ValueTruc3 = new ValueModel({'data': 'Truc-3', 'thing': Truc, 'criterion': Critere3});

	    var ValueMachin1 = new ValueModel({'data': 'Machin-1', 'thing': Machin, 'criterion': Critere1});
	    var ValueMachin2 = new ValueModel({'data': 'Machin-2', 'thing': Machin, 'criterion': Critere2});
	    var ValueMachin3 = new ValueModel({'data': 'Machin-3', 'thing': Machin, 'criterion': Critere3});

	    var ValueChose1 = new ValueModel({'data': 'Chose-1', 'thing': Chose, 'criterion': Critere1});
	    var ValueChose2 = new ValueModel({'data': 'Chose-2', 'thing': Chose, 'criterion': Critere2});
	    var ValueChose3 = new ValueModel({'data': 'Chose-3', 'thing': Chose, 'criterion': Critere3});

	    things = new ThingCollection([Truc, Machin, Chose]);
	    criterions = new CriterionCollection([Critere1, Critere2, Critere3]);
	    values = new ValueCollection([ValueTruc1, ValueMachin1, ValueChose1, ValueTruc2, ValueMachin2, ValueChose2, ValueTruc3, ValueMachin3, ValueChose3]); 

		save = new SaveModel();
		this.importView = new ImportView({
			model: save,
			el: '#import',
		});
		this.exportView = new ExportView({
			model: save,
			el: '#export',
		});

	    this.listenTo(values, 'sort', this.render);
	    this.listenTo(things, 'sort', this.render);
	    this.listenTo(criterions, 'sort', this.render);

	    this.listenTo(things, 'reset', this.initializeViews);
	    this.listenTo(criterions, 'reset', this.initializeViews);
	    this.listenTo(values, 'reset', this.initializeViews);

	    this.initializeViews();

	    this.render();
	},

	/**
		Initialize subviews (things, criterions and values)
	**/
	initializeViews: function() {
	    this.thingsView = new Array();
        for (var i = 0; i < things.length; i++) {
        	var thing = things.at(i);
        	var view = new ThingView({
        		model: thing,
        	});
        	this.thingsView.push(view);
        }

        this.criterionsView = new Array();
        for (var i = 0; i < criterions.length; i++) {
        	var criterion = criterions.at(i);
        	var view = new CriterionView({
        		model: criterion,
        	});
        	this.criterionsView.push(view);
        }

        this.valuesView = new Array();
        for (var i = 0; i < values.length; i++) {
        	var value = values.at(i);
        	var view = new ValueView({
        		model: value,
        	});
        	this.valuesView.push(view);
        }
	},

	/**
		Render
	**/
	render: function() {
        var template = _.template($("#table_template").html());
        var html = template();
        this.$el.html(html);

        for (var i = 0; i < this.thingsView.length; i++) {
    		this.thingsView[i].setElement('#thing-' + this.thingsView[i].model.cid);
        	this.thingsView[i].render().el;
        }

        for (var i = 0; i < this.criterionsView.length; i++) {
    		this.criterionsView[i].setElement('#criterion-' + this.criterionsView[i].model.cid);
        	this.criterionsView[i].render().el;
        }

        for (var i = 0; i < this.valuesView.length; i++) {
    		this.valuesView[i].setElement('#value-' + this.valuesView[i].model.cid);
        	this.valuesView[i].render().el;
        }

        return this;
	},

	/**
		Events
	**/
    events: {
        "click .action-add-thing": "addThing",
        "click .action-add-criterion": "addCriterion",

        "click .action-export-table": "openExportPage",
        "click .action-import-table": "openImportPage",

        "click th": "focusToEditableContent",
        "click td": "focusToEditableContent",
    },

	/**
		Add a thing
	**/
	addThing: function() {
		var newThing = new ThingModel();
		things.add([newThing]);
		
    	var view = new ThingView({
    		model: newThing,
    	});
    	this.thingsView.push(view);

    	this.updateValues();

		things.sort();

		view.focus();
	},

	/**
		Remove a thing
	**/
	removeThing: function(thing) {
		values.remove(values.where({'thing': thing}));

		things.remove(thing);
		things.sort();
	},

	/**
		Add a criterion
	**/
	addCriterion: function() {
		var newCriterion = new CriterionModel();
		criterions.add([newCriterion]);
		
    	var view = new CriterionView({
    		model: newCriterion,
    	});
    	this.criterionsView.push(view);

    	this.updateValues();

		criterions.sort();

		view.focus();
	},

	/**
		Remove a criterion
	**/
	removeCriterion: function(criterion) {
		values.remove(values.where({'criterion': criterion}));

		criterions.remove(criterion);
		criterions.sort();
	},

	/**
		Update the values by looking each things and criterions
	**/
	updateValues: function() {
		for (var iT = 0; iT < things.length; iT++) {
			for (var iC = 0; iC < criterions.length; iC++) {
				var thing = things.at(iT);
				var criterion = criterions.at(iC);

				var value = values.findWhere({
					thing: thing,
					criterion: criterion,
				});

				if ('undefined' === typeof value) {
					var newValue = new ValueModel({
						'data': '', 
						'thing': thing,
						'criterion': criterion,
					});

		        	var view = new ValueView({
		        		model: newValue,
		        	});
		        	this.valuesView.push(view);

					values.add(newValue, {silent: true});
				}
			}
		}

		values.sort();
	},

	/**
		Open the export page
	**/
	openExportPage: function() {
		save.set('data', JSON.stringify(values));

		this.exportView.open();
	},

	/**
		Open the import page
	**/
	openImportPage: function() {
		save.set('data', JSON.stringify(values));
		
		this.importView.open();
	},
});