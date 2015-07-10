var TableView = ParentView.extend({

	tagName: 'div',
	className: '',
    el: '#tableContent',

	/**
		Subviews
	**/
	exportView: null,
    importView: null,

    tHeadView: null,
    tFootView: null,
    tBodyView: null,

	/**
		Initialize
	**/
	initialize: function() {
	    var Truc = new ThingModel({'label': 'Truc', order: 1, defaultOrder: 1});
	    var Machin = new ThingModel({'label': 'Machin', order: 2, defaultOrder: 2});
	    var Chose = new ThingModel({'label': 'Chose', order: 3, defaultOrder: 3});

	    var Critere1 = new CriterionModel({'label': 'Crit. A', order: 1, defaultOrder: 1});
	    var Critere2 = new CriterionModel({'label': 'Crit. B', order: 2, defaultOrder: 2});
	    var Critere3 = new CriterionModel({'label': 'Crit. C', order: 3, defaultOrder: 3});

	    var ValueTruc1 = new ValueModel({'data': 'Truc-1', 'thing': Truc, 'criterion': Critere1});
	    var ValueTruc2 = new ValueModel({'data': 'Truc-2', 'thing': Truc, 'criterion': Critere2});
	    var ValueTruc3 = new ValueModel({'data': 'Truc-3', 'thing': Truc, 'criterion': Critere3});

	    var ValueMachin1 = new ValueModel({'data': 'Machin-1', 'thing': Machin, 'criterion': Critere1});
	    var ValueMachin2 = new ValueModel({'data': 'Machin-2', 'thing': Machin, 'criterion': Critere2});
	    var ValueMachin3 = new ValueModel({'data': 'Machin-3', 'thing': Machin, 'criterion': Critere3});

	    var ValueChose1 = new ValueModel({'data': 'Chose-1', 'thing': Chose, 'criterion': Critere1});
	    var ValueChose2 = new ValueModel({'data': 'Chose-2', 'thing': Chose, 'criterion': Critere2});
	    var ValueChose3 = new ValueModel({'data': 'Chose-3', 'thing': Chose, 'criterion': Critere3});

	    things = new ThingCollection;
        things.add([Truc, Machin, Chose]);
        criterions.add([Critere1, Critere2, Critere3]);

	    cValue = new ValueCollection;
        cValue.add([ValueTruc1, ValueMachin1, ValueChose1, ValueTruc2, ValueMachin2, ValueChose2, ValueTruc3, ValueMachin3, ValueChose3]); 

		save = new SaveModel();
		this.importView = new ImportView({
			model: save,
			el: '#import',
		});
		this.exportView = new ExportView({
			model: save,
			el: '#export',
		});

        this.tHeadView = new TableHeadView();
        this.tFootView = new TableFootView();
        this.tBodyView = new TableBodyView();

        tableTitle = new TitleModel();
        this.titleView = new TitleView({model: tableTitle});

        this.listenTo(cValue, 'reset', this.render);
        this.listenTo(things, 'sort', this.render);
	    this.listenTo(criterions, 'sort', this.render);

	    this.render();

        this.loaderStop();
	},

    /**
        Render
    **/
    render: function() {
        template = _.template($("#table_template").html());
        var html = template(this.model.toJSON());
        this.$el.html(html);

        this.assign(this.tFootView, 'tfoot');
        this.assign(this.tHeadView, 'thead');
        this.assign(this.tBodyView, 'tbody');

        this.tHeadView.$('th:first').append(this.titleView.render().el);

        things.each(this.addThing, this);
        criterions.each(this.addCriterion, this);
        cValue.each(this.addValue, this);
        
        this.loaderStop();
    },

	/**
		Events
	**/
    events: {
        "click .action-add-thing": "createThing",
        "click .action-add-criterion": "createCriterion",

        "click .action-export-table": "openExportPage",
        "click .action-import-table": "openImportPage",

        "click th": "focusToEditableContent",
        "click td": "focusToEditableContent",

        "click .reload": "reload",
    },

    reload: function () {
        things.sort();
    },

    /**
        Create a new thing
    **/
    createThing: function() {
        var newThing = new ThingModel();
        things.add([newThing]);

        this.addThing(newThing);
    },

	/**
		Add a thing
	**/
	addThing: function(newThing) {
        this.tHeadView.addThing(newThing);

        for (var i = 0; i < criterions.length; i++) {
            this.createValue({
                thing: newThing,
                criterion: criterions.at(i),
            });
        }	
    },

	/**
		Remove a thing
	**/
	removeThing: function(thing) {
        // Remove the thing
		things.remove(thing);
	},

    /**
        Create a new critetion
    **/
    createCriterion: function() {
        var newCriterion = new CriterionModel();
        criterions.add([newCriterion]);

        this.addCriterion(newCriterion);
    },

	/**
		Add a criterion
	**/
	addCriterion: function(newCriterion) {
    	this.tBodyView.addCriterion(newCriterion);

        for (var i = 0; i < things.length; i++) {
            var thing = things.at(i);
            var criterion = newCriterion;

            this.createValue({
                thing: thing,
                criterion: criterion,
            });
        }
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
        if (! cValue.where(attributes).length) {
            this.addValue(new ValueModel(attributes));
        }
	},

    /**
        Add a value
    **/
    addValue: function(newValue) {
        this.tBodyView.addValue(newValue);
    },

	/**
		Open the export page
	**/
	openExportPage: function() {
        var data = _.extend(
            {title: tableTitle},
            {cValue: cValue}
        );

		save.set('data', JSON.stringify(data));

		this.exportView.open();
	},

	/**
		Open the import page
	**/
	openImportPage: function() {
		save.set('data', JSON.stringify(cValue));
		
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