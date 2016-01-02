var ImportView = ModalView.extend({

	tagName: 'body',

	/**
		Template selector
	**/
	templateSelector: '#import_template',

	/**
		Events
	**/
    events: {
        "click .action-import.btn": "import",
        "click .nav.nav-tabs a": "tabIt",
    },

	/**
		Import the data
	**/
	import: function() {
        this.loaderStart();

        var activeTab = this.$el.find('.nav.nav-tabs li.active');
        var activeSelector = activeTab.children('a').attr('href');
        var activeType = activeSelector.replace('#import-', '');

		var text = this.$el.find(activeSelector + ' textarea').val();

        switch(activeType) {
            case 'json':
                this.importJson(text);
                break;
            case 'csv':
                this.importCsv(text);
                break;
        }
	},

    importJson: function(text) {
        try {
            var json = JSON.parse(text);

            tableTitle.set(json.title);
            cValue.loadJson(json.values);

            this.loaderStop();
            this.alert.set('success', "Et voilà !");
        } catch (e) {
            if (e instanceof SyntaxError) {
                this.alert.set('warning', "Oh, ton JSON, c'est pas du JSON !");
            } else if (e instanceof DoloresJsonNotCompatibleException) {
                var list = new ListView();
                this.alert.set(
                    'warning',
                    "Oh, ton JSON n'est pas compatible avec Dolores" +
                    list.render(e.errors).el.innerHTML
                );
            } else {
                console.exception(e);
            }
        }
    },

    importCsv: function(text) {
        try {
            if (-1 === text.indexOf(';')) {
                throw new DoloresCsvNotCompatibleException(['Il faut des point-virgule pour faire un bon csv']);
            }
            var title = text.slice(0, text.indexOf(';'));

            tableTitle.set(title);
            cValue.loadCsv(text);

            this.loaderStop();
            this.alert.set('success', "Et voilà !");
        } catch (e) {
            if (e instanceof DoloresCsvNotCompatibleException) {
                var list = new ListView();
                this.alert.set(
                    'warning',
                    "Oh, ton CSV n'est pas compatible avec Dolores" +
                    list.render(e.errors).el.innerHTML
                );
            } else {
                console.exception(e);
            }
        }
    },

    /**
        Start the loader
    **/
    loaderStart: function () {
        this.$el.find('.action-import.btn').addClass('m-progress');
    },

    /**
        Stop the loader
    **/
    loaderStop: function () {
        this.$el.find('.action-import.btn').removeClass('m-progress');
    },

    /**
     * Tab it
     *
     * @param {Event} e
     */
    tabIt: function(e) {
        $(e).tab('show');
    },
});
