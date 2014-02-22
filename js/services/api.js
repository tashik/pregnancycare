angular.module('iPregnant.services.api', [], function($provide) {

$provide.factory('api', ['$resource', function($resource) {
  return {
    auth: $resource(CONFIG.apiURL + '/auth/:action', {}, {
      login: {
        method: 'POST', params: { action: 'login' },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true,
        transformRequest: jQuery.param
      }
    }),

    activity: $resource(CONFIG.apiURL + '/data/PlannedActivity', {}, {
      save: {
        withCredentials: true,
        method: 'POST'
      },
      query: {
        method: 'GET',
        isArray: true,
        withCredentials: true,
        transformResponse: function(responseText) {
          return angular.fromJson(responseText).records;
        }
      }
    })
  };
}]);

});