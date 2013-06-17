// 测试libs是否正常工作
exports.ctrlers = {
    // 在测试前
    setUp: function (callback) {
        this.foo = 'bar';
        callback();
    },
    tearDown: function (callback) {
        console.log('不错可以回家吃饭了！')
        // clean up
        callback();
    },
    test1: function (test) {
        test.equals(this.foo, 'bar','好像哪里不对！！');
        test.done();
    }
}

// 测试ctrlers是否正常工作
exports.ctrlers = {
    // 在测试前
	setUp: function (callback) {
        this.foo = 'bar';
        callback();
    },
    tearDown: function (callback) {
    	console.log('不错可以回家吃饭了！')
        // clean up
        callback();
    },
    test1: function (test) {
        test.equals(this.foo, 'bar','好像哪里不对！！');
        test.done();
    }
}

// 测试routers是否正常工作
exports.ctrlers = {
    // 在测试前
    setUp: function (callback) {
        this.foo = 'bar';
        callback();
    },
    tearDown: function (callback) {
        console.log('不错可以回家吃饭了！')
        // clean up
        callback();
    },
    test1: function (test) {
        test.equals(this.foo, 'bar','好像哪里不对！！');
        test.done();
    }
}