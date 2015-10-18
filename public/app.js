

angular.module('node-dice-app', ['jobsService'])
  .controller('JobsController', function(Jobs) {
    var vm = this;
    Jobs.all()
      .success(function(data) { 
        vm.jobs = data;
      });
  });
