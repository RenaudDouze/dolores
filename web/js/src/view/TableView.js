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
	titleView: null,

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

        tableTitle = new TitleModel();
        this.titleView = new TitleView({model: tableTitle});

	    // this.listenTo(values, 'sort', this.renderViews);
	    // this.listenTo(things, 'sort', this.renderViews);
	    // this.listenTo(criterions, 'sort', this.renderViews);

	    // this.listenTo(things, 'reset', this.initializeViews);
	    // this.listenTo(criterions, 'reset', this.initializeViews);
	    // this.listenTo(values, 'reset', this.initializeViews);

	    // this.initializeViews();

	    this.render();

        this.addItems();
        
        this.loaderStop();
	},

	/**
		Initialize subviews (things, criterions and values)
	**/
	initializeViews: function() {
        console.log('initializeViews');

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
        Add collections's items
    **/
    addItems: function() {
        things.each(this.addThing, this);
        criterions.each(this.addCriterion, this);
        values.each(this.addValue, this);
    },

	/**
		Render
	**/
	render: function() {
        console.log('render');

        template = _.template($("#table_template").html());
        var html = template(this.model.toJSON());
        this.$el.html(html);

        // this.renderViews();
    },

    /**
        Render views
    **/
    renderViews: function () {
        this.loaderStart();

        this.titleView.setElement('#table-title');
        this.titleView.render();

        for (var i = 0; i < this.thingsView.length; i++) {
            var selector = '#thing-' + this.thingsView[i].model.cid;
            this.thingsView[i].setElement(selector);
            this.thingsView[i].render();
        }

        for (var i = 0; i < this.criterionsView.length; i++) {
            var selector = '#criterion-' + this.criterionsView[i].model.cid;
            this.criterionsView[i].setElement(selector);
            this.criterionsView[i].render();
        }

        for (var i = 0; i < this.valuesView.length; i++) {
            var selector = '#value-' + this.valuesView[i].model.cid;
            this.valuesView[i].setElement(selector);
            this.valuesView[i].render();
        }

        this.loaderStop();

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

        "click .reload": "render",
    },

	/**
		Add a thing
	**/
	addThing: function(newThing) {
        if (_.isUndefined(newThing) || ! (newThing instanceof ThingModel)) {
		  var newThing = new ThingModel();
        }
		things.add([newThing]);
		
    	var view = new ThingView({
    		model: newThing,
    	});
    	// this.thingsView.push(view);

        var target = this.$el.find('thead th:last');
        target.before(view.render().el);

        for (var i = 0; i < criterions.length; i++) {
            this.createValue({
                thing: newThing,
                criterion: criterions.at(i),
            });
        }

		view.focus();
	},

	/**
		Remove a thing
	**/
	removeThing: function(thing) {
        // Remove the thing
		things.remove(thing);
	},

	/**
		Add a criterion
	**/
	addCriterion: function(newCriterion) {
        if (_.isUndefined(newCriterion) || ! (newCriterion instanceof CriterionModel)) {
	       var newCriterion = new CriterionModel();
        }
		criterions.add([newCriterion]);
		
    	var view = new CriterionView({
    		model: newCriterion,
    	});

        var rowView = new TableRowView({
            model: newCriterion,
        });

        this.$el.find('tbody').append(rowView.render().el);

        var target = rowView.$el;
        target.prepend(view.render().el);

        for (var i = 0; i < things.length; i++) {
            var thing = things.at(i);
            var criterion = newCriterion;

            this.createValue({
                thing: thing,
                criterion: criterion,
            });
        }

		view.focus();
	},

	/**
		Remove a criterion
	**/
	removeCriterion: function(criterion) {
        // Remove the thing
        criterions.remove(criterion);
	},

	/**
		Create a new value from attributes 
	**/
	createValue: function(attributes) {
        if (! values.where(attributes).length) {
            this.addValue(new ValueModel(attributes));
        }
	},

    /**
        Add a value
    **/
    addValue: function(newValue) {
        var view = new ValueView({
            model: newValue,
        });
        // this.valuesView.push(view);

        values.add(newValue, {silent: true});

        var criterionIndex = newValue.get('criterion').get('order') - 1;
        var target = this.$el.find('tbody tr:eq(' + criterionIndex + ') td:last');
        console.log(target);
        target.before(view.render().el);

        view.focus();
    },

	/**
		Open the export page
	**/
	openExportPage: function() {
        var data = _.extend(
            {title: tableTitle},
            {values: values}
        );

		save.set('data', JSON.stringify(data));

		this.exportView.open();
	},

	/**
		Open the import page
	**/
	openImportPage: function() {
		save.set('data', JSON.stringify(values));
		
		this.importView.open();
	},

    /**
        Start the loader
    **/
    loaderStart: function () {
        this.$el.find('.loader').show();
    },

    /**
        Stop the loader
    **/
    loaderStop: function () {
        this.$el.find('.loader').hide();
    }
});