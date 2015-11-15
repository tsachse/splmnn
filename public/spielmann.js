// declare a new module called 'myApp', and make it require the `ng-admin` module as a dependency
var myApp = angular.module('myApp', ['ng-admin']);
// declare a function to run when the module bootstraps (during the 'config' phase)
myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    var spielmann = nga.application('Spielmann').baseApiUrl('/api/'); // main API endpoint

    var media = nga.entity('media');
    media.listView().fields([
      nga.field('code'),
      nga.field('name'),
      //nga.field('path'),
     ])
     .listActions(['show','edit']); 

    media.showView().fields([
      nga.field('code'),
      nga.field('name'),
      nga.field('path'),
      nga.field('sections', 'referenced_list')
        .targetEntity(nga.entity('sections'))
	.targetReferenceField('medium_id')
	.targetFields([
	  nga.field('name'),
	  nga.field('start'),
	  nga.field('stop')
	])
 	//.listActions(['show','edit'])
    ]);


    media.creationView().fields([
      nga.field('code'),
      nga.field('name'),
      nga.field('path')
    ]);

    // use the same fields for the editionView as for the creationView
    media.editionView().fields(media.creationView().fields());

    spielmann.addEntity(media);

    nga.configure(spielmann);
}]);
