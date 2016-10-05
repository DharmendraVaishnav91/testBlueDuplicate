/**
 * Created by Saurabh on 27-10-2015.
 */

module.exports = function(context) {
    console.log(" Copying and renaming APK to output folder");

    var path = require('path');
    var shell = require('shelljs');
    var fs = require('fs');
    var root = path.normalize(context.opts.projectRoot);
    var outputDir = path.join(root,'outputs','android');

    var apkRoot = path.join(root,'platforms','android','build','outputs','apk');

    shell.rm('-rf',outputDir);
    shell.mkdir('-p',outputDir);
    if(context.cmdLine.indexOf('--release') > -1) {
        console.log("Copying release apks");
        shell.cp('-rf' , apkRoot + '/*-release.apk', outputDir);
    } else {
        console.log("Copying debug apks");
        shell.cp('-rf', apkRoot + '/*-debug.apk', outputDir);
    }

    var files = shell.ls(outputDir);
    console.log(files);

    files.forEach(function(file) {
        var filePath = path.join(outputDir,file);
        var finalAPKPath = path.join(outputDir,'BNF-development.apk');
        console.log("Running zipalign for : " + filePath);
        if(file.indexOf('release.apk') > -1) {
            finalAPKPath = path.join(outputDir,'BNF-production.apk');
        } else if(file.indexOf('debug.apk') > -1 &&
            (context.cmdLine.indexOf('--staging') > -1 || context.cmdLine.indexOf('--stage') > -1)) {
            finalAPKPath = path.join(outputDir,'BNF-staging.apk');
        } else if(file.indexOf('debug.apk') > -1 && context.cmdLine.indexOf('--local') > -1) {
            finalAPKPath = path.join(outputDir,'BNF-local.apk');
        }else if(file.indexOf('debug.apk') > -1 && context.cmdLine.indexOf('--test') > -1) {
            finalAPKPath = path.join(outputDir,'BNF-test.apk');
        }else if(file.indexOf('debug.apk') > -1) {
            finalAPKPath = path.join(outputDir,'BNF-development.apk');
        }

        shell.exec('zipalign -f 4 ' + '"' + filePath + '" ' + '"' + finalAPKPath + '"', function (code,output) {
            console.log("zipalign executed with code:" + code);
            if(code > 0) {
                console.log("There was error while running zipalign");
                fs.renameSync(filePath,finalAPKPath);
            } else {
                shell.rm('-rf',filePath);
                console.log(output);
                console.log("Find the final APK at:");
                console.log("    " + outputDir);
            }
        });
    });
};