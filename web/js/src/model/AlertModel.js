var AlertModel = Backbone.Model.extend({

	// string Warning text
	warning: '',

	// string Success text
	success: '',

    /**
    	Default values
    **/
	defaults: function() {
      	return {
        	warning: '',
        	success: '',
      	};
    },

    /**
    	Clean the datas
    **/
    clean: function() {
    	this.set(this.defaults(), {silent: true});
    }
});