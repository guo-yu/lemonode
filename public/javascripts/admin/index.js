window.lemonAdmin = angular.module('lemonAdmin', ['lemonStore']);
window.lemonCtrlers = {};

lemonCtrlers['main'] = function($scope, Store) {
    Store.get('/api/setting', function(data) {
        $scope.setting = data;
        // console.log($scope.setting);
    });
    Store.get('/api/system', function(data) {
        $scope.system = data;
    });
    $scope.update = {
        setting: function() {
            Store.post('/api/setting', $scope.setting, function(data) {
                alert('修改成功')
            })
        }
    }
}

lemonCtrlers['post'] = function($scope) {
    // 新建文章
    $scope.postNew = function() {
        Store.post('/api/post/new', $scope.setting, function(data) {
            alert('修改成功')
        })
    }
    // 文章索引
    // 媒体文件上传
    // _upload($('#fileupload'));
}