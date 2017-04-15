---
title: Javascript模块化编程（三）：require.js的用法
date: 2017-03-08 23:11:42
tags: [js模块化,js]
categories: js
---
在简单了介绍了javascript的模块化编程思想之后，我们来写一个简单的requireJS的案例，来了解一下具体是怎么在你的项目中使用requireJS的
本文的源码在个人的github上：https://github.com/sunshine940326/js-module-demo
<!--more-->
首先祭上[requireJS的官方api](http://www.requirejs.cn/docs/start.html)
# 下载requireJS
我们可以再requireJS的官网上下载最新的reqrequireJS：下载链接：http://www.requirejs.cn/docs/download.html

你可以下载最新版本的`require.js`, `r.js`(node中使用)，以及requireJS的插件：
1. text
2. domReady
3. cs(coffeeScript)
4. i18n（国际化）

# 在html中引入require.js
使用requireJS的方法很简单，只需要在html中引入`<script src="js/require.js"  data-main="js/main"  async="true"></script>`就可以，和引入普通的js一样。

async属性是html5中的新特性，意为异步加载该js，就是可以不用把这个script标签放在底部，不会使网页失去响应

`data-main="js/main`main.js就是我们自己编写的js文件，因为requireJS默认的文件后缀就是js，所以`.js`文件后缀可以省略
这个`main.js`就是我们程序的js主入口，会第一个被require加载。和c的`main()`一样


我们原来的html的`<head>`中是不是加载了很多的js，因为能同时发出的http请求是有限的，所以在加载的时候网页需要响应的时间变长，浏览器会停止网页的渲染。

并且这样加载还有一个弊端就是js文件之间存在依赖关系，一定要有一个先后顺序，所以加载顺序很重要
```
　　<script src="1.js"></script>
　　<script src="2.js"></script>
　　<script src="3.js"></script>
　　<script src="4.js"></script>
　　<script src="5.js"></script>
　　<script src="6.js"></script>
```
所以requireJS解决了这两个问题：
1. 实现js文件的异步加载，避免网页失去响应；
2. 管理模块之间的依赖性，便于代码的编写和维护。

# main.js的编写
我们试着在`main.js`中加入如下代码：

```
alert("Hello world!")
```

打开`index,html`看到弹出“Hello world！”就说明我们的require引用成功

这只是初步解决了第一个问题，还没有解决模块的依赖关系，这时候就需要使用AMD规范来定义require()函数，不了解AMD规范的请查看前一篇博文

# math.js模块编写
现在我们来编写一个求和的模块，然后在`main.js`中依赖该模块

```
//math.js
define(function(){
   var add = function(x,y){
       return x+y'
       
   }
   return{
       add:add
   }
})
```
# 加载方式
```
//main.js
require(['math'],function(){
    console.log(math.add(1,2))   //3
})
```

如果是加载多个模块，那么require的第一个参数就是一个数组，默认情况下，require.js假定这三个模块与main.js在同一个目录。第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。加载的模块会已参数的形式传入该参数，从而在回调函数内部就可以使用这些模块。

require()异步加载各个依赖模块，浏览器不会失去响应，并且指定的回调函数只有在前面的模块都加载成功后才会运行，解决了依赖的问题。

```
　　require(['jquery', 'underscore', 'backbone'], function ($, _, Backbone){
　　　　// some code here
　　});
```
默认情况是依赖模块和主模块在一个目录下，但是我们也可以自定义配置，在`main.js`的头部写一个`require.config()`方法就可以了
```
　　require.config({
　　　　paths: {
　　　　　　"jquery": "jquery.min",
　　　　　　"underscore": "underscore.min",
　　　　　　"backbone": "backbone.min"
　　　　}
　　});
```
上面的代码给出了三个模块的文件名，路径默认与main.js在同一个目录（js子目录）。如果这些模块在其他目录，比如js/lib目录，则有两种写法。一种是逐一指定路径。
```
　　require.config({
　　　　paths: {
　　　　　　"jquery": "lib/jquery.min",
　　　　　　"underscore": "lib/underscore.min",
　　　　　　"backbone": "lib/backbone.min"
　　　　}
　　});
```
另一种则是直接改变基目录（baseUrl）。
```
require.config({
　　　　baseUrl: "js/lib",
　　　　paths: {
　　　　　　"jquery": "jquery.min",
　　　　　　"underscore": "underscore.min",
　　　　　　"backbone": "backbone.min"
　　　　}
　　});

```
如果某个模块在另一台主机上，也可以直接指定它的网址，比如：
```
　　require.config({
　　　　paths: {
　　　　　　"jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min"
　　　　}
　　});

```

> require.js要求，每个模块是一个单独的js文件。这样的话，如果加载多个模块，就会发出多次HTTP请求，会影响网页的加载速度。因此，require.js提供了一个优化工具，当模块部署完毕以后，可以用这个工具将多个模块合并在一个文件中，减少HTTP请求数。
