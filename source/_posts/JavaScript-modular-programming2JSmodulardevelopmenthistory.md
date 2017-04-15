---
title: javascript模块化编程（二）：js模块化发展史
date: 2017-03-07 23:04:40
tags: [js模块化,js]
categories: js
---
在看了一下午的文章之后，我大概对js模块化有了一定的了解。现在来回顾和记录一下javascrip的模块化发展史，主要是commonJS、AMD和应用AMD的requireJS、CMD和应用CMD的seaJS（不过现在seaJS貌似用的人挺少的，就不详细说明了）
<!--more-->
# js在发展过程
有几个阶段：
过程式的JavaScript→面向对象的javascript→面相模块的javascript
1. 原始写法：
模块就是实现特定功能的一组写法：

```
function m1(){
    //do something
}

function m2(){
    //do something
}
```
上面的m1和m2构成了一个模块，使用的时候直接调用就可以了。

这种做法的缺点是：“污染”了全局变量，无法保证不与其他的模块中的变量发生冲突，并且模块之间看不出直接的关系
2. 对象写法
这时已经发展到了第二个阶段了，面向对象的javascript，这时就就是我们所熟悉的面向对象的编程思想了，继承、原型、闭包等都是面向对象的内容

```
var module1 = new Object({
        _count:0,

        m1 : function () {
            console.log(module1._count)
        },

        m2 : function () {
            for(var i=0;i<5;i++){
                module1._count += i;
                console.log(module1._count)
            }
        }
    });

    module1.m1();
    module1.m2();
    module1._count=5;
    console.log(module1._count)
```
上面的函数m1和m2都封装在module1对象中，使用的时候，直接调用这个对象的属性就可以了`module1.m1()`,
但是这样写会暴露所有的模块成员，内部状态可以被外部改变。比如

```
module1._count = 5;   //外部代码可以直接改变内部计数器的值
```
3. 立即执行函数写法
这种写法可以达到不暴露私有成员的目的

```
   var module1 = (function () {
        var _count = 0;
        var m1 = function () {
            console.log(_count)
        };

        var m2 = function () {
            for(var i=0;i<5;i++){
                _count += i;
                console.log(_count)
            }
        };

        return{
            r1 : m1,
            r2 : m2,
        }
    })();

    module1.r1();   //0
    module1.r2();
    console.log(module1._count)  //undefined
```
这里只能通过return的函数名来调用函数，达到了包装函数的作用
这里还运用了闭包的思想，在函数`module1`的外部调用了函数内的变量`_count`

## 闭包
闭包就是能够读取其他函数内部变量的函数，在这个例子中，m1就是一个闭包的例子，在m1中引用了module的局部变量`_count`,然后在`module1`的`return`中又将m1作为返回值，这样就可以在`module1`的外部访问`module1`中的局部变量`_count`

4. 放大模式
如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这时就有必要采用“放大模式”(将原有的模块扩充，达到放大的目的。实则就是给模块添加新的方法)

```
    var module1 = function () {
        console.log("原module1模块")
    }
    var module1 = (function (mod){
        mod.m3 = function () {
            console.log("m3")
        };
        return mod;
    })(module1);


    module1.m3()

```
在大型项目中我们是不能将所有的js都放在一个文件夹下的，这样就可以使用**方法模式**来实现。首先，我们导入一个模块，并为它添加属性，最后再导出他，这样就将原来的函数`module1`“放大”

在执行完这段代码之后，我们的模块就可以拥有一个新的 `module1.m3`的公有方法，这个放大文件也会维护它自己的私有内置状态和导入的对象

5. 宽放大模式
宽放大就是为了解决放大模式的缺点的，放大模式有一个致命的缺点就是不确定加载顺序，可能加载一个不存在空对象

```
var module1 = (function (mod){
        mod.m3 = function () {
            console.log("m3")
        };
        return mod;
    })(window.module1 || {});


    module1.m3()

```
在放大模式中，如果没有上面定义`module1`模块时，是会报错的，经过改进，就算在执行这段代码的时候，`module1`  即使没有定义也不会报错，也会创建`module1.m3()`这个公有方法


在经历了这些阶段，我们现在的主流js编程方式是面相模块的javascript

# 为什么使用模块化的js
使用模块化的javascript主要是为了解决两个问题（个人理解，以下均是，欢迎指正(＾－＾)V）
1. 命名冲突，是不是有点同感了！！！
闭包作用域和命名空间其实已经解决了这个问题了，但是js模块化更加优雅的解决了这个问题
**通过export暴露接口，不需要命名空间，不需要全局变量**
2. 文件依赖
文件的加载顺序很重要啊有没有，一不小心就犯错了，还是很不好找原因啊！
**js模块化的解决方式是使用require引入依赖，使依赖内置**，开发者只需关心当前模块的依赖，其他事情 SeaJS都会自动处理好。对模块开发者来说，这是一种很好的 关注度分离 ，能让程序员更多地享受编码的乐趣。

# commonJS
为了解决上述的两个问题，commonJS就出现了，node应该是将commonJS运用的最出名的
## 什么是commonJS
commonJS就是一套javascript使用模块化的规范，原本是想统一服务器端和浏览器，所以起名叫做commonJS，但是commonJS在浏览器上使用有诸多不便，所以诞生了AMD（稍后详细说明）

## 使用commonJS编写node
以下是node写模块化的一个示例：
1. math.js

```
exports.add = function() {
    var sum = 0, i = 0, args = arguments, l = args.length;
    while (i < l) {
        sum += args[i++];
    }
    return sum;
};

```
2.  increment.js

```
var add = require('math').add;
exports.increment = function(val) {
    return add(val, 1);
};
```
3. main.js，该文件为入口文件

```
var inc = require('increment').increment;
var a = 1;
inc(a); // 2
```

从上述代码可以看到：
-  node要求一个js文件对应一个模块。
- 使用exports导出API
- 使用require加载其它模块


## commonJS的缺点
因为node也可以进行服务器端的编程，那么使用commonJS写模块是不是就可以前后端兼顾呢，事与愿违，commonJS在浏览器的支持还是有很多不足的
1. 服务器端的js模块就在本地，浏览器端则需要通过网络请求
2. 服务器端可以很容易进行同步或异步请求模块，浏览器则问题多多

 
如下

```
var event = require("event");
 
event.bind(el, 'click', function() {
    // todo
});
```

`event.bind(el, 'click', function()`，在第一行require("event")之后运行，因此必须等`event`加载完成。也就是说，如果加载时间很长，整个应用就会停在那里等。
> 这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。
因此，浏览器端的模块，不能采用"同步加载"（synchronous），只能采用"异步加载"（asynchronous）。这就是AMD规范诞生的背景。

# AMD
基于上述两点的commcommonJS的缺点，AMD就孕育而生，


## 什么是AMD
AMD可以理解为异步模块定义，可以认为是浏览器中的模块规范
> AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

为什么说AMD可以解决commonJS在浏览器上的不足呢？

```
　require(['math'], function (math) {
　　　　math.add(2, 3);
　　});
```
math.add()与math模块加载不是同步的，浏览器不会发生假死。所以很显然，AMD比较适合浏览器环境。

AMD只有一个简洁的API，是的，只有一句API！！！并且其中的两个参数都是可选的！！！

```
define(id?, dependencies?, factory);
```
其中：
- id: 模块标识，可以省略。
- dependencies: 所依赖的模块，可以省略。
- factory: 模块的实现，或者一个JavaScript对象。
- id遵循CommonJS Module Identifiers 。dependencies元素的顺序和factory参数一一对应。

## 简单的AMD模式应用
以下是使用AMD模式开发的简单的三层结构（基础库/UI层/应用层）
`base.js`

```
define(function() {
    return {
        mix: function(source, target) {
        }
    };
});
```
`ui.js`

```
define(['base'], function(base) {
    return {
        show: function() {
            // todo with module base
        }
    }
});

```
`page.js``
```
define(['data', 'ui'], function(data, ui) {
    // init here
});
```
`data.js`

```
define({
    users: [],
    members: []
});
```

以上同时演示了define的三种用法
- 定义无依赖的模块（base.js）
- 定义有依赖的模块（ui.js，page.js）
- 定义数据对象模块（data.js）

以上的id参数都为空，这是为什么呢？

```
define('index', ['data','base'], function(data, base) {
    // todo
});
```
这种具名函数是不推荐的，一般由打包工具合并多个模块到一个js文件中时使用。



更多请阅读：
- [浅谈模块化的JavaScript](http://www.tuicool.com/articles/rqEjEv)
- [JavaScript模块化开发库之SeaJS](http://www.cnblogs.com/snandy/archive/2012/03/30/2423612.html)
- [Node.js模块风格在浏览器中的尝试](http://www.cnblogs.com/snandy/archive/2012/03/09/2386092.html)
- [JavaScript中模块写法](http://www.cnblogs.com/snandy/archive/2012/03/08/2378441.html)
- [JavaScript中的AMD和CMD模块化](http://caibaojian.com/toutiao/6090)
- [CMD 模块定义规范](https://github.com/seajs/seajs/issues/242?utm_source=caibaojian.com)
- [JavaScript模块化开发（四）——RequireJS](http://www.feeldesignstudio.com/2013/09/javascript-module-pattern-requirejs/)
- [Javascript模块化编程](http://note.youdao.com/)
