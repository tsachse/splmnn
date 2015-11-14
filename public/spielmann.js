// declare a new module called 'myApp', and make it require the `ng-admin` module as a dependency
var myApp = angular.module('myApp', ['ng-admin']);
// declare a function to run when the module bootstraps (during the 'config' phase)
myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    var spielmann = nga.application('Spielmann').baseApiUrl('http:api/'); // main API endpoint

    var media = nga.entity('media');
    media.listView().fields([
      nga.field('code'),
      nga.field('name'),
      //nga.field('path'),
     ]);

    spielmann.addEntity(media);

    nga.configure(spielmann);
}]);
