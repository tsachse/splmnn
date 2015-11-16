// declare a new module called 'myApp', and make it require the `ng-admin` module as a dependency
var myApp = angular.module('myApp', ['ng-admin']);
// declare a function to run when the module bootstraps (during the 'config' phase)
myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    var spielmann = nga.application('Spielmann').baseApiUrl('/api/'); // main API endpoint

    var media = nga.entity('media');
    var sections = nga.entity('sections');

    media.listView().fields([
      nga.field('code'),
      nga.field('name'),
      //nga.field('path'),
     ])
     .sortField('id')
     .sortDir('ASC')
     .listActions(['show','edit']) 
     .actions(['create', 'delete'])  ;

    media.showView().fields([
      nga.field('code'),
      nga.field('name'),
      nga.field('path'),
      nga.field('sections', 'referenced_list')
        .targetEntity(sections)
	.targetReferenceField('medium_id')
	.targetFields([
	  nga.field('name'),
	  nga.field('start'),
	  nga.field('stop')
	])
	.sortField('id')
	.sortDir('ASC')
 	.listActions(['show','edit'])
    ])
    .title('Show item "{{entry.values.name}}"');

    media.creationView().fields([
      nga.field('code'),
      nga.field('name'),
      nga.field('path')
    ]);

    media.editionView().fields([
      nga.field('code'),
      nga.field('name'),
      nga.field('path'),
      nga.field('sections', 'referenced_list')
        .targetEntity(sections)
	.targetReferenceField('medium_id')
	.targetFields([
	  nga.field('name'),
	  nga.field('start'),
	  nga.field('stop')
	])
	.sortField('id')
	.sortDir('ASC')
 	.listActions(['show','edit'])
    ])
    .title('Edit item "{{entry.values.name}}"');

    sections.listView().fields([
	nga.field('name'),
	nga.field('start'),
	nga.field('stop'),
    ]);

    sections.showView().fields([
	nga.field('name'),
	nga.field('start'),
	nga.field('stop'),
    ])
    .actions(['edit','delete','back'])
    .title('Show item "{{entry.values.name}}"');

    sections.editionView().fields([
	nga.field('name'),
	nga.field('start'),
	nga.field('stop'),
    ])
    .actions(['delete','back'])
    .title('Edit item "{{entry.values.name}}"');

    spielmann.addEntity(media);
    spielmann.addEntity(sections);

    spielmann.menu(nga.menu()
	.addChild(nga.menu(media).icon('<span class="glyphicon glyphicon-film"></span>'))
    );

    spielmann.dashboard(nga.dashboard()
	.addCollection(nga.collection(media)
	   .fields([
	      nga.field('code'),
	      nga.field('name'),
	     ])
	   .sortField('id')
	   .sortDir('ASC')
	   .listActions(['show','edit']) 
	));

    nga.configure(spielmann);
}]);
