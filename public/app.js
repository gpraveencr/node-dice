

var diceApp = angular.module('diceApp', ['jobsService', 'ngRoute']);

    diceApp.config(function($routeProvider) {
      $routeProvider
          .when('/job/:job_id', {
            templateUrl : 'views/job_details.html',
            controller : 'JobDetailsController'
          });
    });

    diceApp.controller('JobsController', function(Jobs) {
      var vm = this;
      Jobs.all()
        .success(function(data) {
          vm.jobs = data;
        });
    });

    diceApp.controller('JobDetailsController', function(Jobs, $scope, $routeParams) {
      //var vm = this;
      Jobs.get($routeParams.job_id)
          .success(function(data) {
        $scope.jobDetails = data;
      });
    });
