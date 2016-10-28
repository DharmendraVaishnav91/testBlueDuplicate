/**
 * Created by Saurabh on 29-10-2015.
 */

module.exports = function(context) {

    var path = require('path');
    var shell = require('shelljs');
    var root = path.normalize(context.opts.projectRoot);
    var notificationImages = path.join(root,'resources','android','notification');
    var androidPath = path.join(root,'platforms','android');

    shell.cp('-rf',notificationImages + '/*',androidPath);
};