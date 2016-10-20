/**
 * Created by dharmendra on 1/9/16.
 */
angular.module("app.filters", [])
    .filter('unique', function() {
        return function(collection, keyname) {
            var output = [],
                keys = [];

            angular.forEach(collection, function(item) {
                var key = item[keyname];
                if(keys.indexOf(key) === -1) {
                    keys.push(key);
                    output.push(item);
                }
            });
            return output;
        };
    }).
    filter('getByNameInMap', function() {
        return function(inputArray, name) {
            var i=0, len=inputArray.length;
            for (; i<len; i++) {
                if (inputArray[i].name.toLowerCase() == name.toLowerCase()) {
                    return {index:i, value:inputArray[i]};
                }
            }
            return null;
        }
    }).filter('getById', function() {
    return function(input, idName,id) {
        var i=0, len=input.length;
        for (; i<len; i++) {
            if (input[i][idName] == id) {
                return input[i];
            }
        }
        return null;
    }
});;