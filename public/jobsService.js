

angular.module('jobsService', [])
  .factory('Jobs', function($http) {
    var jobsFactory = {};

    jobsFactory.get = function(id) {
      return $http.get('/api/jobs/' + id);
    };

    jobsFactory.all = function() { 
      return $http.get('/api/jobs/');
    };

    return jobsFactory;
  });
