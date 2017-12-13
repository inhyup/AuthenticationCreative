angular.module('myApp', []).
controller('myController', ['$scope', '$http',
                            function($scope, $http) {
  $http.get('/user/profile')
      .success(function(data, status, headers, config) {
    $scope.user = data;
    $scope.error = "";
  }).
  error(function(data, status, headers, config) {
    $scope.user = {};
    $scope.error = data;
  });

  $scope.Todos = [
    
  ];

  $scope.AddTodo = function() {
    $scope.Todos.push({text:$scope.TodoText, done:false});
    $scope.TodoText='';
  };



}]);

