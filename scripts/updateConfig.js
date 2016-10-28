/**
 * Created by Saurabh on 27-10-2015.
 */

module.exports = function(context) {
    var path = require('path');
    var fs = require('fs');
    console.log(" Updating configurations before building the applications ");
    //console.log(JSON.stringify(context));

    var env = {
        DEVELOPMENT:"debug",
        PRODUCTION:"prod",
        STAGING:'stage'
    };

    var configJSON = require('../build.json');

    //configJSON = JSON.parse(configJSON);
    var root = path.normalize(context.opts.projectRoot);

    //Default Values
    var currentEnv = env.DEVELOPMENT;
    var apiURL = configJSON.server.development;
  //  var gcm_sender_id = configJSON.gcm.development.senderId;

    //Set proper environment. First priority is Release then staging and then local
    if(context.cmdLine.indexOf('--release') > -1) {
        currentEnv = env.PRODUCTION;
    } else if(context.cmdLine.indexOf('--staging') > -1 || context.cmdLine.indexOf('--stage') > -1) {
        currentEnv = env.STAGING;
    } else if(context.cmdLine.indexOf('--debug') > -1) {
        currentEnv = env.DEVELOPMENT;
    }

    switch(currentEnv) {
        case env.DEVELOPMENT: {
            apiURL = configJSON.server.development;
            //gcm_sender_id = configJSON.gcm.development.senderId;
            break;
        }
        case env.PRODUCTION: {
            apiURL = configJSON.server.production;
            //gcm_sender_id = configJSON.gcm.production.senderId;
            break;
        }
        case env.STAGING:{
            apiURL = configJSON.server.staging;
            //gcm_sender_id = configJSON.gcm.staging.senderId;
            break;
        }
    }

    run();

    function run() {

        context.opts.platforms.forEach(function(platform) {
            var wwwPath;

            switch (platform) {
                case 'android':
                    wwwPath = path.join(root,'platforms', platform, 'assets', 'www');
                    break;

                case 'ios':
                case 'browser':
                case 'wp8':
                    wwwPath = path.join(root,'platforms', platform, 'www');
                    break;

                default:
                    console.log('this hook only supports android, ios, wp8, and browser currently');
                    return;
            }

            updateConstants(wwwPath);
        });

    }


    function updateConstants(basePath) {
        var constantFilePath = path.join(basePath,'components','common','utils','constants.js');
        console.log("Constants.js:" + constantFilePath);
        if(fs.existsSync(constantFilePath)) {
            var constantsjs = fs.readFileSync(constantFilePath, 'utf8');
            var newServerAddress = 'var apiUrl = ' + '"' + apiURL + '";';
          //  var newGCMSender = 'senderId:' + '"' + gcm_sender_id + '"';
            constantsjs = constantsjs.replace(/var apiUrl(.*)|apiUrl(.*\s)=(.*)/g,newServerAddress);
           // constantsjs = constantsjs.replace(/senderId(\s*):(.*)/g,newGCMSender);
            fs.writeFileSync(constantFilePath, constantsjs, 'utf8');
        } else {
            console.error("Constants file does not exists");
        }
    }
};