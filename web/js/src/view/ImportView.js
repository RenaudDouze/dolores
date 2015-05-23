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

			console.log(this.alert);
			this.alert.set('success', "Ton JSON, c'est du bon mon con");
		} catch (e) {
			console.log(e);
			this.alert.set('warning', "Ton JSON, c'est pas du JSON");
		}

	},
});