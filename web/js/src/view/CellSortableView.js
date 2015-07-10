var CellSortableView = CellView.extend({
    /**
        Initialize
    **/
    initialize: function() {
        CellView.prototype.initialize.call(this);
    },

    /**
        Render
    **/
    render: function() {
        var datas = this.model.toJSON();

        var activeOrder = ((cValue.sorting.has(this.model)) ? cValue.sorting.get(this.model).order : false);

        datas = _.extend(datas, {
            activeOrder: activeOrder
        });

        var tpl = this.template();
        this.$el.html(tpl(datas));
        
        return this;
    },

    /**
        Sort by. Filter is used to find values
    **/
    sortBy: function (filter) {
        var order = this.getNextOrder();

        // var datas = cValue.where(filter);
        
        // cValue.sorting.add(this.fieldName, this.model, order);
        //*
        if (! _.isNull(order)) {
            cValue.sorting.add(this.fieldName, this.model, order);
        } else {
            cValue.sorting.delete(this.model);
        }
        /**/

        cValue.tableSort();
    },

    /**
        Get order to use (next / after the click)
        Return asc for ascending, desc for descending, null for default
    **/
    getNextOrder: function() {
        var $button = this.$('.action-sort');

        var order = 'asc';

        if ($button.hasClass('sort-asc')) {
            order = 'desc';
        } else if ($button.hasClass('sort-desc')) {
            order = null;
        }

        return order
    },
});