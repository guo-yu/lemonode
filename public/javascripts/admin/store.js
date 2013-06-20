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
			// 这里的post应该是什么呢？
			$http.post(api,params).success(function(data, status, headers, config){
				cb(data, status, headers, config);
			});
		}
	}
	return s;
});