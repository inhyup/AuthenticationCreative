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

}]);


$(document).ready(function(){
  $("#postComment").click(function(){
      var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj);

      var url = "comment";
      $.ajax({
           url:url,
           type: "POST",
           data: jobj,
           contentType: "application/json; charset=utf-8",
           success: function(data,textStatus) {
                 $("#done").html(textStatus);
           }
      })
  });


  $("#getComments").click(function() {
    $.getJSON('comment', function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var comment in data) {
        com = data[comment];
        everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
      }
      everything += "</ul>";
      $("#comments").html(everything);
    })
  });

  
  $('#deleteComments').click(function() {
    var url = "deleteComments";
    $.ajax({
      url: url,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      success: function(data, textStatus) {
        $("#done").html("Cleared.");
      }
    })
  });

});

