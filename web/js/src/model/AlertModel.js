var AlertModel = Backbone.Model.extend({

	// string Success text
	success: '',

	// string Info text
	info: '',

	// string Warning text
	warning: '',

	// string Danger text
	danger: '',

    /**
    	Default values
    **/
	defaults: function() {
      	return {
        	success: '',
        	info: '',
        	warning: '',
        	danger: '',
      	};
    },

    /**
    	Clean the datas
    **/
    clean: function() {
    	this.set(this.defaults(), {silent: true});
    }
});