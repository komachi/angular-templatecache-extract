var myApp = angular.module('myApp', []);
myApp.run(function($templateCache) {
  $templateCache.put('template1.html', '<div>Test1</div>');
  $templateCache.put('template2.html', '<div>Test2' + '</div>');
  var test = 'test'
  $templateCache.put('template3.html', test);
});
