// seajs.config({
//     alias: {
//       '$': 'gallery/jquery/1.7.2/jquery'
//     }
// });
// seajs.use(['$','arale/switchable/0.9.14/tabs'], function($,Tabs){
//     new Tabs({
//         element: '.ui-tab',
//         triggers: '.ui-tab-item',
//         panels: '.panel',
//         triggerType: 'click',
//         activeTriggerClass: 'ui-tab-item-current'
//     }).render();
// });

window.lemonAdmin = angular.module('lemonAdmin', ['lemonStore']);
window.lemonCtrlers = {};

lemonCtrlers['main'] = function($scope,Store) {
    Store.get('/api/setting',function(data){
        $scope.setting = data;
        console.log($scope.setting);
    });
    Store.get('/api/system',function(data){
        $scope.system = data;
    });
    $scope.update = {
        setting: function() {
            console.log($scope.setting);
            Store.post('/api/setting',$scope.setting,function(data){
                console.log(data)
            })
        }
    }
}

lemonCtrlers['post'] = function($scope) {
    // 新建文章
    // 文章索引
}