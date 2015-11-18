// declare a new module called 'myApp', and make it require the `ng-admin` module as a dependency
var myApp = angular.module('myApp', ['ng-admin']);

myApp.factory('VideoFunctions', function() {
  return {  
    startTime: 0, 
    endTime : -1,
    get_end_time: function() { return -2; }
  };
});

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

     var tmpl='<div class="row">' +
	 '   <div class="col-lg-12">' +
	 '	<div class="page-header">' +
	 '	    <ma-view-actions override="::showController.actions" entry="entry" entity="::showController.entity">' +
	 '		<ma-list-button ng-if="::entity.listView().enabled" entity="::entity"></ma-list-button>' +
	 '		<ma-edit-button ng-if="::entity.editionView().enabled" entry="entry" entity="::entity"></ma-edit-button>' +
	 '		<ma-delete-button ng-if="::entity.deletionView().enabled" entry="entry" entity="::entity"></ma-delete-button>' +
	 '	    </ma-view-actions>' +
	 '	    <h1 compile="::showController.title">' +
	 '		{{ ::showController.view.entity.name() | humanize:true | singularize }}  #{{ ::entry.identifierValue }} Detail' +
	 '	    </h1>' +
	 '	    <p class="lead" ng-if="::showController.description" compile="::showController.description">{{ ::showController.description }}</p>' +
	 '	</div>' +
	 '   </div>' +
	 '  </div>' +
	 ' <div><video id="qt_repeat" height=400 controls src="/media/BL-207.m4v" /></div>' +
	 ' <div class="row form-horizontal" id="show-view" > ' +
	  '    <div class="col-lg-12 form-group" ng-repeat="field in ::showController.fields track by $index">' +
	'	  <label class="col-sm-2 control-label">{{ field.label() }}</label>' +
	'	  <div class="show-value" ng-class="::"ng-admin-field-" + field.name() + " " + "ng-admin-type-" + field.type() + " " + (field.getCssClasses(entry) || "col-sm-10 col-md-8 col-lg-7")">' +
	'	      <ma-column field="::field" entry="::entry" entity="::showController.entity" datastore="::showController.dataStore"></ma-column>' +
	'	  </div>' +
	'      </div>' +
	'  </div>';
    media.showView().template(tmpl).fields([
      nga.field('code'),
      nga.field('name'),
      nga.field('path'),
      //nga.field('v', 'template')
      //  .label('')
	//.template('<video id="qt_repeat" height=400 controls src="{{ entry.values.path}}" />'),
      nga.field('sections', 'referenced_list')
        .targetEntity(sections)
	.targetReferenceField('medium_id')
	.targetFields([
	  nga.field('name'),
	  nga.field('start'),
	  nga.field('stop'),
	  nga.field('b', 'template')
	    .label('')
	    .template('<button type="button" ng-click="ab_repeat(entry.values.start, entry.values.stop)" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-repeat"></span>&nbsp;</button>')


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

myApp.controller('VideoCtrl', function ($scope) {
  $scope.vid = document.getElementById("qt_repeat");
  //$scope.start = 0;
  //$scope.stop = -1;

  /*
  $scope.ab_repeat = function(start, stop) {
    $scope.start  = start;
    $scope.stop = stop;
    $scope.vid.currentTime = $scope.start;
    console.log($scope.vid.currentTime);
    $scope.vid.play();
    $scope.vid.addEventListener('timeupdate',function() {
      var v = document.getElementById("qt_repeat");
      if($scope.vid.currentTime > $scope.stop) {
      console.log('......', v.currentTime );
          $scope.vid.currentTime = $scope.start;
      }
    });
  };
  */
});
