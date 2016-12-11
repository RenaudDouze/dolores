console.debugValues = function(collection) {
    _.each(collection, function(element, index, list) {
        console.log(element.getData());
    });
}
