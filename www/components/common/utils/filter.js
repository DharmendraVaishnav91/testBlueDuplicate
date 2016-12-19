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
    })
    .filter("timeAgo", function () {
        return function (date) {
            var momentObj = moment(date);
            var today = moment();
            if (momentObj.date() == today.date()) {
                //return momentObj.fromNow();
                return momentObj.format("h:mm a");
            } else if (momentObj.year() == today.year()) {
                return momentObj.format("MMM DD");
            } else {
                momentObj.format("DD/MM/YYYY")
            }
        }
    })
    .filter("momentTimeAgo",function() {
        return function(date,isTrue) {
            return  isTrue ? moment(date).fromNow(true) : moment(date).fromNow()
        }
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
});