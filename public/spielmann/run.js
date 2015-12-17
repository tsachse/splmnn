define(function (require) {
  'use strict';
  require('my_app');

  require(['domReady!'], function (document) {
    angular.bootstrap(document, ['myApp']);
  });
});
