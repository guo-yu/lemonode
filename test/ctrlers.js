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
exports.ctrlers = {
    // 在测试前
	setUp: function (callback) {
        console.log('现在开始执行ctrler相关的测试')
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