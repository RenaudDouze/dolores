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
		var text = this.$el.find('textarea').val();
		try {
			var json = JSON.parse(text);
		} catch (e) {
			this.alert.set('warning', "Oh, ton JSON, c'est pas du JSON !");
		}

		try {
			values.load(json);
		}catch (e) {
			console.log(e);
			this.alert.set('warning', "Oh, ton JSON n'est pas compatible avec Dolores");
		}

	},
});