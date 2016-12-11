var TitleView = CellView.extend({

    /**
    	Tab name
    **/
    tagName: 'span',

    /**
    	Template selector
    **/
    templateSelector: '#title_template',

    /**
     * Object of attributes
     *
     * @type {Object}
     */
    attributes: {
        'contenteditable': 'true'
    },
});
