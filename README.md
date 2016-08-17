# Bluenumber

Bluenumber Mobile application is a Hybrid Mobile Application developed using Ionic Framework.

### Getting Started


 1. Install NodeJS, installation guide available [here](https://github.com/nodejs/node-v0.x-archive/wiki/Installing-Node.js-via-package-manager?utm_source=%5Bdeliciuos%5D&utm_medium=twitter#debian-and-ubuntu-based-linux-distributions).
 
 2. Install *cordova and ionic* using `sudo npm install -g cordova ionic`.
 3. Clone project repository by using `git clone https://github.com/S3plus2/BlueMobile.git`.
 4. Fetch all git branches by using `git fetch --all`.
 5. Clone the repository and run `npm install` or `sudo npm install` to install all node dependencies.
 6. Run `npm install bower -g` to install bower.
 7. Run `npm install bower-installer -g` to install bower-installer.
 8. Run `bower install` to install the *ionic library* and its dependencies and other project libraries.
 9. *bower* settings are derived from `bower.json`  and all libraries files are installed in `bower_components`  folder. Any third party library should be used via *bower* by adding in the dependency list.
 10. Run `bower-installer -p` in current directory. Read more about it [here](https://github.com/blittle/bower-installer).  
 11. Now run the project on web browser using `ionic serve` or `ionic serve -l` commands.  

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



