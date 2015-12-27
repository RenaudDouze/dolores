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
    },

	/**
		Import the data
	**/
	import: function() {
        this.loaderStart();

		var text = this.$el.find('textarea').val();
		try {
			var json = JSON.parse(text);
            
            tableTitle.set(json.title);
			cValue.load(json.values);

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
    }
});