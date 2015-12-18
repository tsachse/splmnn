define(function(require) {

  var sections_config = require('sections');
  var media_config = require('media');

  // declare a new module called 'myApp', and make it require the `ng-admin` module as a dependency
  var myApp = angular.module('myApp', ['ng-admin']);

  myApp.factory('VideoFunctions', function() {
    var data = {
      start: 0, 
      stop: -1,
      a: 0,
      b: 0,
      video: document.getElementById("qt_repeat"),
    };

    data.video.addEventListener('timeupdate',function() {
      if(data.stop > -1 && data.video.currentTime > data.stop) {
	data.video.currentTime = data.start;
      }
    });

    data.video.addEventListener('pause',function() {
      data.stop = -1;
    });

    return data;
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

  myApp.controller('VideoRepeatCtrl', function ($scope, VideoFunctions) {

    $scope.ab_repeat = function(start, stop) {
      VideoFunctions.start  = start;
      VideoFunctions.stop = stop;
      VideoFunctions.video.load();
      VideoFunctions.video.currentTime = VideoFunctions.start;
      VideoFunctions.video.play();
    };

   });

   myApp.controller('VideoNavigationCtrl', function ($scope, $state, VideoFunctions) {

     $scope.skip = function(t) { 
       VideoFunctions.stop = -1;
       VideoFunctions.video.currentTime = VideoFunctions.video.currentTime + t;
     };

     $scope.jump_to = function(t) { 
       VideoFunctions.stop = -1;
       VideoFunctions.video.currentTime = t;
     };

     $scope.a_pressed = function() { 
       console.log('a');
       VideoFunctions.stop = -1;
       VideoFunctions.a = VideoFunctions.video.currentTime;
       VideoFunctions.b = 0;
     };

     $scope.b_pressed = function(t) { 
       VideoFunctions.stop = -1;
       VideoFunctions.b = VideoFunctions.video.currentTime;
       console.log('b', VideoFunctions.a, VideoFunctions.b);
       console.log($state);
       // $state.reload();
     };

   });

  return myApp;
});
