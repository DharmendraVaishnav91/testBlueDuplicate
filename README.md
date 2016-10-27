# Bluenumber

Bluenumber Mobile application is a Hybrid Mobile Application developed using Ionic Framework.

### Getting Started


 1. Install NodeJS, installation guide available [here](https://github.com/nodejs/node-v0.x-archive/wiki/Installing-Node.js-via-package-manager?utm_source=%5Bdeliciuos%5D&utm_medium=twitter#debian-and-ubuntu-based-linux-distributions).
 
 2. Install *cordova and ionic* using `sudo npm install -g cordova ionic` , it will install ionic and cordova platform globally in the system, these are the basic tools which we need before creation of any ionic project.
 3. Clone project repository by using `git clone https://github.com/S3plus2/BlueMobile.git`.
 4. Fetch all git branches by using `git fetch --all`.
 5. Run `git checkout dev`, it will switch your github branch to dev which is used for development and it is updated to latest code. 
 6. Run `npm install` or `sudo npm install` to install all node dependencies like node-sass.
 7. Run `sudo npm install gulp -g` to install gulp. Gulp is a javascript task runner that lets you automate tasks such as-
    * Bundling and minifying libraries and stylesheets.
    * Refreshing your browser when you save a file.
    * Quickly running unit tests
    * Running code analysis
    * Less/Sass to CSS compilation
    * Copying modified files to an output directory
 8. Run `sudo npm install bower -g` to install bower. It helps you manage your front-end packages. It helps you download them, update them and resolve their dependencies.
 9. Run `sudo npm install bower-installer -g` to install bower-installer. Tool for installing bower dependencies that won't include entire repos. Although Bower works great as a light-weight tool to quickly install browser dependencies, it currently does not provide much functionality for installing specific "built" components for the client. Read more about it [here](https://github.com/blittle/bower-installer).
 10. Run `bower install` to install the *ionic library* and its dependencies and other project libraries. *bower* settings are derived from `bower.json`  and all libraries files are installed in `bower_components`  folder. Any third party library should be used via *bower* by adding in the dependency list.
 11. Run `bower-installer -p` in current directory.  
 12. Now run the project on web browser using `ionic serve -l` command.  

###Android Build

 1. Setup Android Development Environment for [Cordova](https://cordova.apache.org/docs/en/4.0.0/guide_platforms_android_index.md.html)
 2. Run `ionic platform add android` to add the Android Platform.

### iOS Build

 1. Run `ionic platform add ios` to add the iOS Platform.
 2. Open project in *Xcode* from *platforms/ios* folder.

###Installing and updating Plugins

To install project plugins run `ionic state restore`.
To installing any new plugin `ionic plugin add < path to plugin>` and run `ionic state save` to update **package.json**.

### Adding new libraries
  Use `bower` to install any new libraries. Run following commands to install library , update `bower.json` and pluck relevant files : 
  
  *bower install `lib-name` --save*
  
  *bower-installer -p*


**Note:** *Always run `bower-installer -p` after adding or updating any library via `bower` to update relevant changes in `www/lib` folder.* 



