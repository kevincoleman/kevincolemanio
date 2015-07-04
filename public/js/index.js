angular.module('campaignReports', [

])
.controller('MainCtrl', function($scope, $http) {
  $http.get('http://localhost:5000/tweets')
    .then(function(res){
      console.log(res.data); // remove later
      $scope.report = res.data;
    });
});
