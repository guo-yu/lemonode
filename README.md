Lemonode
========

a fresh cms based on Node/Express/Angular

Why Lemonode ? 
========

自从懒得在wordpress上写文章之后，我就一直在考虑写一个博客引擎，实际上，这一年来，一直断断续续在写，写了好几个版本的lemonode，最先的博客系统非常乱，后来使用nico打算对客户端全静态化，但功能拓展型不强（基于nico的lemonode已经写成了mac app），对于企业项目，尤其是外包项目来说，急需一个非常有用，拓展性强，最好能一并提供API的博客系统。

Angular的web app化思路让我联想到最初最初我对博客系统的畅想，一个不仅数据停靠在云上，甚至模板，模板标签，样式表与脚本都可以完全基于云开发的博客系统。在我遇到Angular的时候，我想这是一个简单的，低成本的博客web app化方案。

基于Angular的Web App 容器，我们可以将博客系统所有的数据都打包成restful api，通过$resource存取，甚至在后台也可以通过$resource读写，没有服务器端的模板引擎，意味着任何人可以通过任何可能的方式组建他认为方便的展现给用户的主题界面——无论是获取信息的方式，还是模板的写法，都完全可以自定义。

至于访问速度，更是提升了不止一个数量级。这就是lemonode要达到的目标之一。

功能简介
========
现在支持

`文章管理` 新建，编辑和删除文章以及页面
`分类管理` 管理文章分类和子分类
`媒体文件管理与同步` 上传，删除和同步静态资源到cdn
`页面管理` 管理页面
`链接管理` 管理有钱链接
`广告位管理` 定制自己的广告位

目录结构
========
````
- ctrlers 与数据相关的控制器
- lib helpers
- views 展现层代码
- routes API路由和页面路由
````

Test 
========

`$ cd ./test`

`$ nodeunit single-test.js`

lemonode使用exports写法描述单元测试
可以使用nodeunit或者mocha执行单元测试

Roadmap 0.0.1 -> 0.1.0
========

- 设计后台页面
	- (done)
- 设计restful APIs
- 设计restful APIs