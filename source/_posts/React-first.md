---
title: react（一）：初识react
date: 2017-03-01 22:01:40
tags: react
categories: JavaScript
---
这里只是读书笔记，因为刚开始接触react，概况的说一下什么是react，并且使用react完成hello world

<!--more-->


这里是看慕课网初学react做的一些总结[[课程]React入门](http://www.imooc.com/video/9819)，

什么是react
========


在这一个小时内对react的认识中，我有了对react的初步印象

 1. js库
 2. facebook开发的
 3. 高度的组件化
 4. 使用jsx
 5. 将html和js结合
 6. 单项传输数据
 7. 虚拟dom
 8. 只负责view层

react并不是一个完整的mvc或者mvvm框架，只是负责view层，特点是“轻”，组件化的开发：组件高度的可重用。含义是将有独立功能的UI控件封装起来，将UI上的每一个独立的模块定义成组件，通过组合或者嵌套的方式构成大的组件，完成完整的UI

react应用场景
========

 1. 复杂场景下的高性能
 2. 重用组件库，组件组合
 3. “懒”

使用react
=======
最正确的打开方式还是直接看官方api：[react入门教程](http://reactjs.cn/react/docs/getting-started-zh-CN.html)

或者阮一峰老师的教程：[React 入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)

我们先用React JSFiddle来创建一个最简单的hello world

html：

```
//这里引入的js库只是方便学习和实验的，在正式项目不引入
<script src="https://facebook.github.io/react/js/jsfiddle-integration-babel.js"></script>

<div id="container">
    <!-- This element's contents will be replaced with your component. -->
</div>
```

js:

```

//jsx语法糖，计算机语言中添加的某种语法，这种语法对语言的功能并没有影响，但是更方便程序员使用。通常来说使用语法糖能够增加程序的可读性，从而减少程序代码出错的机会。

//react里面的div只是虚拟的dom，在react看来只是react componments的一个实例，调用ReactDOM.render方法使虚拟的dom呈现到页面上，ReactDOM.render方法第一次参数就是我们要渲染的react componments，第二个参数是我们要插入的位置

//自定义的componments通过React.createClass来进行创建
//{}里面为js表达式的值this是我们所使用的componments，props是我们在ReactDOM.render中所使用的属性的集合
var Hello = React.createClass({
  render: function() {
  
    
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDOM.render(
  //生成自定义标签
  <Hello name="World" />,
  document.getElementById('container')
);
```

为html添加css
=========
添加类
-----
因为class是js中的保留字，所以在给标签加css类的时候不能使用class需要用className

内联样式
-----
需要使用驼峰写法的键值对
```
return <div style={{color:'red'}}>Hello {this.props.name}</div>;
```

