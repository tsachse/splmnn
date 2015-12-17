define(function(require) {

//  require('ng-admin');
var sections_config = require('sections');
var media_config = require('media');

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
    
    media = media_config(nga,sections);
    sections = sections_config(nga);

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
});
return myApp;
});
