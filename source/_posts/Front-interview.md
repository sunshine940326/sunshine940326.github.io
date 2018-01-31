---
title: 前端面试
date: 2017-03-06 23:15:56
tags: [面试,js,知识点]
categories: 面试题库
description: Anything
---
最近准备找工作受受刺激好好学习= =，趁着现在有些问题还能想起来记录一下
某在线教育网站前端岗位面试和某金融公司面试题，总得来说前者理论性的东西问的更多一点，可以很清楚的了解你的实力，后者问的开放性的问题比较多一点，大部分都是问什么什么你用过吗，而不是去问是咸的原理

<!--more-->
# Q:rem布局的原理

A：使用rem布局实质上都是通过改写html的font-size基准值，来实现不同设备之间的适配。
rem是CSS3的长度单位，相对文档跟元素html，比如设置font-size=100px,那么1rem=100px

[移动端页面开发适配 rem布局原理](http://www.tuicool.com/articles/FjMfuyM)

> 网易的做法：
> 
> 1) 将布局适口设置为视觉适口，不进行缩放，即理想适口。
> 
> 
> ```
> <meta name="viewport"content="initial-scale=1,maximum-scale=1, minimum-scale=1”>
> ```
> 
> 
> 2) 以设计稿分辨率为基准，取100px为font-size的参照，那么body元素的宽度就可以设置为`width:6.4rem（640/100）`，当我们将布局视口设置为320时，于是html的 `font-size=deviceWidth / 6.4`。
> 
> 3) 通过`document.documentElement.clientWidth`获取 `deviceWidth`；
> 
> 4) 当页面的`dom ready`后设置`html font-size`,
> 
> 
> ```
> document.documentElement.style.fontSize =document.documentElement.clientWidth / 6.4 + ‘px’
> ```
> 
> 5) 通过 `mediaQuery` 设置字体大小，字体大小不可以使用rem,原因是误差太大。
> 
> 以640的设计稿为例最终的设置html `font-size`代码如下，布局时拿设计稿标注的尺寸除以100，就是rem的值，相当简单啊
> 
> 
> ```
> var deviceWidth = document.documentElement.clientWidth;
> if(deviceWidth > 640) deviceWidth = 640;
> document.documentElement.style.fontSize = deviceWidth / 6.4 + 'px';
> 这里if(deviceWidth > 640) deviceWidth = 640;
> ```
>  是因为当deviceWidth大于640时物理分辨率已经大于1280（取决于 dpr ），应该去访问pc的网站；

```
var documentElement = document.documentElement;

    if (documentElement.clientWidth >= 750) {
        documentElement.style.fontSize = '54px';
    } else {
        documentElement.style.fontSize = "${documentElement.getBoundingClientRect().width / 10}px";
    }


    (function () {
        document.addEventListener('DOMContentLoaded', function () {
            var deviceWidth = document.documentElement.clientWidth;
            document.documentElement.style.fontSize = deviceWidth / 10 + 'px';
        }, false);
        window.onresize = function () {
            var deviceWidth = document.documentElement.clientWidth;
            document.documentElement.style.fontSize = deviceWidth / 10 + 'px';
        };

        console.log(document.width)
    })();
```

# Q:常见的布局方式

A：
1. 静态布局（Static Layout）
2. 弹性布局（Flex）
3. 自适应布局（Adapive Layout）
4. 流式布局（Liquid Layout）
5. 响应式布局（Responsive Layout）
[web前端开发之几种布局方式之响应式布局](http://blog.csdn.net/gertYY/article/details/52764527)

# Q:怎么使用媒体查询

```
@media screen and (max-width:720px) and (min-width:320px){

      body{

       background-color:red;

       }

@media screen and (max-width:320px){

      body{

         background-color:blue;

       }

}
```

# Q:移动端优化方法
# Q：js模块化
# Q:怎么实现延迟加载
# Q:你对闭包的理解
# Q:localStorage、sessionStorage、cookie之间的区别，各自的储存容量、怎么选择相应的存储机制

上交所初试之笔试题：
# 什么是“use strait”有什么好处有什么坏处
> ECMAscript 5添加了第二种运行模式："严格模式"（strict mode）。顾名思义，这种模式使得Javascript在更严格的条件下运行。
> 
> 设立"严格模式"的目的，主要有以下几个：
> 
> 1. 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
> 
> 2. 消除代码运行的一些不安全之处，保证代码运行的安全；
> 
> 3. 提高编译器效率，增加运行速度；
> 
> 4. 为未来新版本的Javascript做好铺垫。
> 
> 注：经过测试 IE6,7,8,9 均不支持严格模式。
> 
> 缺点：
> 
> 现在网站的 JS 都会进行压缩，一些文件用了严格模式，而另一些没有。这时这些本来是严格模式的文件，被 merge 后，这个串就到了文件的中间，不仅没有指示严格模式，反而在压缩后浪费了字节。

# 解释下javascript中this是怎么工作的
> JavaScript 只有函数能提供作用域，this 表达了这个作用域的上下文。这个上下文是一个对象，默认是 global 对象：
> 
> function foo() {
> 
>   // 在终端输出 this 对象
>   console.log(this)
> }
> 
> foo() // 输出： global 对象 在浏览器中即 window 对象
> 
> 但是也可以在函数被运行的时候动态指定（call,apply, bind）：
> 
> var bar = { name: 'bar' }
> 
> foo.call(bar) // 输出： { name: 'bar' }
> 
> 存在一个特殊的情形，就是使用 new 关键字调用一个构造函数的时候。这会为这个函数自动创建一个设置在原型末端的上下文对象。
> 
> new foo() // 输出： {} 在构造函数内部创建一个对象
> 
> 作者：管斌瑞
> 链接：https://www.zhihu.com/question/19624483/answer/25745246
> 来源：知乎
> 著作权归作者所有，转载请联系作者获得授权。


# 有一个未知长度的数组a，如果它的长度为0就把数字1添加到数组里，否则按照先进先出的队列规则让第一个元素出对

```
a.length === 0 ? a.push(1) : a.shift();
```



# 描述下`reset`css文件的作用和使用它的好处
重置浏览器的css默认属性；浏览器的品种不一样，那么对默认样式的解释不一样，通过reset可以达到显示一致的效果

# 说说前端怎么如何解决异步回调地狱

# 请解释Function.prototype.bind的作用
> bind() 方法的主要作用就是将函数绑定至某个对象，bind() 方法会创建一个函数，函数体内this对象的值会被绑定到传入bind() 函数的值。

> 例如，在 f() 函数上调用 bind() 方法并传入参数 obj ，即 f.bind(obj) ，这将返回一个新函数, 新函数会把原始的函数 f() 当做 obj 的方法来调用,就像 obj.f() 似的，当然这时 f() 函数中的 this 对象指向的是 obj 。

# 描述以下变量的区别：null，undefined，该如何检测他们
## null表示"没有对象"，即该处不应该有值。典型用法是：
（1） 作为函数的参数，表示该函数的参数不是对象。
（2） 作为对象原型链的终点。

## undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。典型用法是：
（1）变量被声明了，但没有赋值时，就等于undefined。
（2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。
（3）对象没有赋值的属性，该属性的值为undefined。
（4）函数没有返回值时，默认返回undefined。

## 判断undefined: 
复制代码 代码如下:

```
<span style="font-size: small;">var tmp = undefined; 
if (typeof(tmp) == "undefined"){ 
alert("undefined"); 
}</span>
```

## 判断null: 
复制代码 代码如下:


```
<span style="font-size: small;">var tmp = null; 
if (!tmp && typeof(tmp)!="undefined" && tmp!=0){ 
alert("null"); 
}　</span>
```

## 判断NaN: 
复制代码 代码如下:


```
<span style="font-size: small;">var tmp = 0/0; 
if(isNaN(tmp)){ 
alert("NaN"); 
}</span>
```



# 说说类的创建、继承和闭包

# 有一个长度为100的数组，请以优雅的方式求出该数组的前10个元素之和

```
var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
 sum = 0;
 sum = a.slice(0, 10).reduce(function(pre, current) {
 　　return pre + current;
 });
  
 console.log(sum); //55
```


# 下面的代码会输出什么：

```
var test = (function(a) {
    this.a = a;
    return function(b) {
        return this.a + b;
    }
} (function(a, b) {
    return a;
}(1, 2))); 

console.log(test(4)); //输出什么？？？？
```

最后发现这大部分都是阿里的面试题= =
[阿里前端笔试题目](http://www.cnblogs.com/beidan/p/5285742.html)