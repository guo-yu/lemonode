var post = require('../ctrlers/post');

// 测试libs是否正常工作
exports.libs = {
    // 在测试前
    setUp: function (callback) {
        console.log('现在开始执行lib相关的测试')
        this.foo = 'bar';
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    test1: function (test) {
        test.equals(this.foo, 'bar','好像哪里不对！！');
        test.done();
    }
}

// 测试ctrlers是否正常工作
exports.posts = {
    // 在测试前进行各项计算的赋值或者实例化。
	setUp: function (callback) {
        console.log('现在开始执行post api相关的测试');

        // 可以用async管理多个异步操作
        post.fetch('page',function(pages){
            this.pages = pages;
            callback();
        });
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    fetch: function (test) {
        test.equals(typeof(this.pages),'array','fetch返回应当是数组');
        test.equals(this.pages.length,10,'fetch每种类型的文章应当第一页返回10篇文章');
        test.done();
    },
    read: function(test) {
        test.equals(this.post.title,'这篇文章的title','read应当返回正确的title');
        test.done();
    }
}

// 测试routers是否正常工作
exports.routers = {
    // 在测试前
    setUp: function (callback) {
        console.log('现在开始执行routers相关的测试')
        this.foo = 'bar';
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    test1: function (test) {
        test.equals(this.foo, 'bar','好像哪里不对！！');
        test.done();
    }
}