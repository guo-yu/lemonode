var store = angular.module('lemonStore', []).factory('Store', function($rootScope,$http) {
	var s = {
		get: function(api,cb) {
			$http.get(api,{
				cache: false
			}).success(function(data, status, headers, config){
				cb(data, status, headers, config);
			});
		},
		post: function(api,params,cb) {
			var p = params;
			delete p['__v'];
			delete p['_id'];
			$http.post(api,p).success(function(data, status, headers, config){
				console.log('ok');
				cb(data, status, headers, config);
			});
		}
	}
	return s;
});