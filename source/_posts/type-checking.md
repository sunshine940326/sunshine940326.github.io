---
title: 【JS】类型检测
date: 2017-09-10 14:54:11
tags: [JavaScript] 
categories: [JavaScript]
top: 8
---
![](https://user-gold-cdn.xitu.io/2017/9/10/1873903988fcac89c3115a61c5c60f9b?imageView2/1/w/1200/h/700/q/85/interlace/1&quot)
> 本文首发于我的个人博客 ： http://cherryblog.site/

# 前言
js 中的类型检测也是很重要的一部分，所以说这篇文章我们就来讲一下怎么对 JavaScript 中的基本数据类型进行检测。其实这也是在读 Zepto 源码中学习到的，所以阅读源码对我们的提升还是很有帮助的。本文基于参考了前辈们的文章之后个人理解此文写的有不当的地方，请各位大佬指正。

<!--more-->
其实常规方法主要有四种
1. `typeof`
2. `instanceof`
3. `Object.prototype.toString`
4. `construcor`

其实这四种方式归根结底就是两种思路：
1. 根据数据类型判断（1，2）
2. 根据构造函数判断（3，4）

# 前置基础
再看 Zepto 之前看了 [慕课网一个老师的视频](http://www.imooc.com/course/comment/id/745?page=4)，一共一个小时左右，开了快进估计也就 45 分钟左右。只是讲了 Zepto 的架构和设计，没有详细的将每一个方法，初看之前可以看一下，对 Zepto 有一个大概的印象。


## 原型与原型链
其实这部分真的是老生常谈的问题，但是每一次听其他人都有新的收获。**真的是不想写这部分，但是自我感觉整体思路比较清晰**，所以推荐大家阅读一下。

Zepto 整个的设计思想其实是基于 js 的原型链。关于原型链，这个老师讲的比较清晰，需要记住三句话：
1. 每一个函数，都有一个 prototype 属性。
2. 所有通过函数 new 出来的对象，这个对象都有一个 `__proto__` 指向这个函数的 prototype。
3. 当你想要使用一个对象（或者一个数组）的某个功能时：如果该对象本身具有这个功能，则直接使用；如果该对象本身没有这个功能，则去 `__proto__` 中找。 

## 什么是 prototype（显示原型）

> 每一个函数在创建之后都会拥有一个名为 prototype 的属性，这个属性指向函数的原型对象。**通过Function.prototype.bind方法构造出来的函数是个例外，它没有prototype属性。**

```js
var fn = function() {}
console.log( fn.prototype );
```

通过下面这幅图我们可以看出创建一个函数时，都会有一个 `prototype` 属性指向它的原型。而 `fn.prototype` 中有一个 `constructor` 属性指向 fn 函数。
![原型图](https://user-gold-cdn.xitu.io/2017/9/10/957236bdfc7a0ac9843faadf6904a3f5)

## 什么是 `__proto__`（隐式原型）
JavaScript 中任意对象都有一个内置属性 `__proto__`，隐式原型指向**创建**这个对象的函数（constructor）的 prototype。

**`Object.prototype` 这个对象是个例外，它的 `__proto__` 值为 null**

```js
console.log( typeof Array );   // 'function'
console.log( Array.prototype );
```
数组构造函数 `Array` 也是一个函数，并且在 Array 的原型中除了指向 Array 的 constructor 之外还有其他的内置对象。

## `__proto__` 的指向
上面应该都不难理解，主要是 `__proto__` 的指向，这个问题是比较难理解的，我们来看刚刚的定义，`__proto__` 指向创建这个对象的函数的显式原型。创建函数一共有三种方式：
1. 字面量方式

```js
    var person1 = {
       name: 'cyl',
       sex: 'male'
    };
```
字面量的方式是一种为了开发人员更方便创建对象的一个语法糖，本质就是 
```js
   var o = new Object(); 
   o.xx = xx;
   o.yy=yy;
```

所以说使用字面量方式创建的函对象的 `__proto__` 属性是指向 `Object.prototype` 的。
2. 构造函数
所谓的构造函数，就是通过 `new` 关键字调用的函数，只要是通过 `new` 关键字调用的函数都是构造函数。由构造函数构造的对象，其 `__prototype__` 指向其构造函数的 prototype 属性指向的对象。

```js
    var  arr = new Array()
```
比如 `arr` 是一个实例化的数组，那么 arr 的 `__proto__` 属性就指向 Array 的 prototype 属性。

![原型图](https://user-gold-cdn.xitu.io/2017/9/10/c6734e9a93efc2fa548f7aacf672d208)
3. 函数通过 `Object.create` 构造的

```js
var person1 = {
    name: 'cyl',
    sex: 'male'
};

var person2 = Object.create(person1);
```

`Object.create` 的内部其实是这样的：
```js
function object(o){
    function F(){}
    F.prototype = o;
    return new F()
}
```
也可以看成是通过 `new` 创建的。所以说我们就可以一目了然，person2 的 `__proto__` 是指向 person1 的。（**注意，是直接指向 person1，而不是 `person1.prototype`**）。

## `prototype` 和 `__proto__` 的作用
在了解了什么是显示原型 `prototype` 和隐式原型 `__proto__` 之后，我们也知道了怎么去找隐式原型，那么它们有什么作用呢？
- 显式原型的作用：用来实现基于原型的继承与属性的共享。
- 隐式原型的作用：构成原型链，同样用于实现基于原型的继承。举个例子，当我们访问 obj 这个对象中的 x 属性时，如果在 obj 中找不到，那么就会沿着 `__proto__` 依次查找。

这里我们要注意了，**当我们访问 obj 这个对象中的 x 属性时，如果在 obj 中找不到，那么就会沿着 `__proto__` 依次查找。** 

划重点，是在 **`__proto__`** 中依次查找

## 重写 `__proto__`
既然我们知道了继承实际上是继承对象 `__proto__` 上的属性，那我们就可以改写我们的 `__proto__` 属性。

```js
var arr = [1,2,3];
arr.__proto__.addClass = function () {
    console.log(123);
}
arr.push(4);
arr.addClass();   // 123
```
修改了之后，`arr` 不仅有内置的 `concat`、`push` 等功能，还多了一个 `addClass` 功能。

也可以完全改写 `__proto__` 属性，那么其原先的所有的功能都没有了，如下图所示。
![原型图](https://user-gold-cdn.xitu.io/2017/9/10/666560bfc62d7bcd8cd550fb5d0ced1c)

是时候祭上这张图了：
![深入理解JS原型链](https://user-gold-cdn.xitu.io/2017/9/10/4b0543f8d5db54138af49326ad522557)

# `typeof`
> `typeof` 是解释器内部实现，根据 ECMA-262 规定的几种类型的值来返回类型名称。

但是 `typeof` 的应用场景非常有限，基本上只能判断出来使用字面量方式赋值的基本数据类型，例如：
```js
    var  a = 123;
    console.log(typeof(a));   // number

    var  b = "string";
    console.log(typeof(b));   // string

    var  c = true;
    console.log(typeof(c));   // boolean

    var  d;
    console.log(typeof(d));   // undefined

    var  e = null;
    console.log(typeof(e));   // object

    var  f = [1,2,3];
    console.log(typeof(f));   // object

    var  g = {};
    console.log(typeof(g));   // object

    var  fun = function () {};
    console.log(typeof(fun)); // function

    var  A = new Number(123);
    console.log(typeof(A));   // object
    console.log(A instanceof Number);  // true

    var  B = new String("123");
    console.log(typeof(B));    // object
    console.log(B instanceof String);  // true
    
```
由以上例子可以看出，`typeof` 测试的结果并不是特别的准确，并且只能检测使用字面量命名的基本数据类型（除了 `null`）。所以我们一般不使用 typeof 进行数据检测。

# `instanceof`
在上面的例子中，我们已经使用了 `typeof` 进行数据检测。
`instance` 是“例子，实例”的意思，所以 `instanceof` 意思是用于判断变量是否是某一个对象的实例。

## `instanceof` 原理
以下部分是根据 [JavaScript instanceof 运算符深入剖析](https://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/) 理解。

`instanceof` 的原理可以认为是如下：
```js
function instance_of(L, R) {    //L 表示左表达式，R 表示右表达式
 var O = R.prototype;           // 取 R 的显示原型
 L = L.__proto__;               // 取 L 的隐式原型
 while (true) { 
   if (L === null) 
     return false; 
   if (O === L)                 // 这里重点：当 O 严格等于 L 时，返回 true 
     return true; 
   L = L.__proto__; 
 } 
}
```
再结合我们在最开始介绍的前置知识的这张图来看几个例子帮助我们更好的理解 `instanceof` 的原理:
![JS原型链](https://user-gold-cdn.xitu.io/2017/9/10/681a4809feeb4a919cb014c384fd4ed7)
例1：
```js
Object instanceof Object;
// 为了方便表述，首先区分左侧表达式和右侧表达式
ObjectL = Object, ObjectR = Object; 
// 下面根据规范逐步推演
O = ObjectR.prototype = Object.prototype 
L = ObjectL.__proto__ = Function.prototype 
// 第一次判断
O != L 
// 循环查找 L 是否还有 __proto__ 
L = Function.prototype.__proto__ = Object.prototype 
// 第二次判断
O == L 
// 返回 true
```

例2：
```js
Function instanceof Function
// 为了方便表述，首先区分左侧表达式和右侧表达式
FunctionL = Function, FunctionR = Function; 
// 下面根据规范逐步推演
O = FunctionR.prototype = Function.prototype 
L = FunctionL.__proto__ = Function.prototype 
// 第一次判断
O == L 
// 返回 true
```

例3：
```js
Foo instanceof Foo
// 为了方便表述，首先区分左侧表达式和右侧表达式
FooL = Foo, FooR = Foo; 
// 下面根据规范逐步推演
O = FooR.prototype = Foo.prototype 
L = FooL.__proto__ = Function.prototype 
// 第一次判断
O != L 
// 循环再次查找 L 是否还有 __proto__ 
L = Function.prototype.__proto__ = Object.prototype 
// 第二次判断
O != L 
// 再次循环查找 L 是否还有 __proto__ 
L = Object.prototype.__proto__ = null 
// 第三次判断
L == null 
// 返回 false
```

**其实，instanceof 的重点也就是左边对象的隐式原型等于右边构造函数的显示原型，是不是听着很熟悉呢，这就是在 new 操作中的关键一步（new 操作是赋值），这样就可以判断指定的对象是否是某个构造函数的实例，使 L = L.__proto__（继续沿原型链向上寻找），一直循环判断左边对象的隐式原型等于右边构造函数的显示原型，直到`L.__proto__` 为 null（L 已经循环到 object.prototype） 或者 true**

## `instanceof` 局限性
`instanceof` 的局限性应该也就是不能检测基本数据类型了吧，其他的貌似没什么。通过对 `instanceof` 的原理进行分析，我们可以得知，只要左边的对象的对象能够通过原型链 `__proto__` 是指向右边的构造函数就可以~

`instanceof` 右边必须是对象或构造函数，否则会抛出 TypeError 的错误。

# `Object.prototype.toString`

所有的数据类型都可以用 `Object.prototype.toString` 来检测,而且非常的精准。

以下内容参考 [谈谈Object.prototype.toString](https://segmentfault.com/a/1190000009407558)

我们先来看一下 `Object.prototype.toString` 是怎么进行类型检测的
```js
    var a = 123;
    console.log(Object.prototype.toString.call(a));    // [object Number]

    var b = "string";
    console.log(Object.prototype.toString.call(b));    // [object String]

    var c = [];
    console.log(Object.prototype.toString.call(c));    // [object Array]

    var d = {};
    console.log(Object.prototype.toString.call(d));    // [object Object]

    var e = true;
    console.log(Object.prototype.toString.call(e));    // [object Boolean]

    var f =  null;
    console.log(Object.prototype.toString.call(f));    // [object Null]

    var g;
    console.log(Object.prototype.toString.call(g));    // [object Undefined]

    var h = function () {};
    console.log(Object.prototype.toString.call(h));    // [object Function]

    var A = new Number();
    console.log(Object.prototype.toString.call(A));    // [object Number]
```
所以说，`Object.prototype.toString` 还是能够比较准确的检测出对应的类型的。

## `Object.prototype.toString` 的实现过程
在 ECMAScript 5中，`Object.prototype.toString()` 被调用时，会进行如下步骤：
1. 如果 `this` 是 `undefined` ，返回 `[object Undefined]` ；
2. 如果 `this` 是 `null`， 返回 `[object Null]`；
3. 令 `Object` 为以 `this` 作为参数调用 `ToObject` 的结果；
4. 令 `class` 为 `Object` 的内部属性 `[[Class]]` 的值；
5. 返回三个字符串 `[object", class, 以及"]` 拼接而成的字符串。

## `[[Class]]`
> 本规范的每种内置对象都定义了 [[Class]] 内部属性的值。宿主对象的 [[Class]] 内部属性的值可以是除了 "Arguments", "Array", "Boolean", "Date", "Error", "Function", "JSON", "Math", "Number", "Object", "RegExp", "String" 的任何字符串。[[Class]] 内部属性的值用于内部区分对象的种类。注，本规范中除了通过 Object.prototype.toString ( 见 15.2.4.2) 没有提供任何手段使程序访问此值。

在 JavaScript 代码里，唯一可以访问该属性的方法就是通过 `Object.prototype.toString`，通常方法如下：
```js
Object.prototype.toString.call/apply(value)
```

在 ES6 请参见 [谈谈 Object.prototype.toString](https://segmentfault.com/a/1190000009407558)

# `construtor`
`construtor` 其实也是用了原型链的知识。

> constructor 属性返回对创建此对象的数组函数的引用。

```js
    var a = 123;
    console.log( a.constructor == Number);    // true

    var b = "string";
    console.log( b.constructor == String);    // true

    var c = [];
    console.log( c.constructor == Array);    // true

    var d = {};
    console.log( d.constructor == Object);    // true

    var e = true;
    console.log( e.constructor == Boolean);    // true

    var f =  null;
    console.log( f.constructor == Null);    //  TypeError: Cannot read property 'constructor' of null

    var g;
    console.log( g.constructor == Undefined);    // Uncaught TypeError: Cannot read property 'constructor' of
    undefined

    var h = function () {};
    console.log( h.constructor == Function);    // true

    var A = new Number();
    console.log( A.constructor == Number);    // true

    var A = new Number();
    console.log( A.constructor == Object);    // false
```
通过上述的实例，我们可以看到，无论是通过字面量或者构造函数创建的基本类型，都可以检测出。并且也可以检测出 `Array`、`Object`、`Function`引用类型，但是不能检测出 `Null` 和 `Undefined`

# Zepto 中检测数据类型
在 Zepto 中主要是用 `Object.prototype.toString` 来做数据类型的判断的
现在让我们来看一下 Zepto 中是怎么检测这些数据类型的：
```js
    var class2type = {},
        toString = class2type.toString

    // 在代码中部，执行了
    // $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    //   class2type[ "[object " + name + "]" ] = name.toLowerCase()
    // })
    // 用来给 class2type 对象赋值
    //
    // a ? b : c || d
    //type 用来判断类型
    function type(obj) {
        return obj == null ? String(obj) :
        class2type[toString.call(obj)] || "object"
    }
```

这里你可能会有疑问，为什么使用 `toString` 而不是 `Object.prototype.toString`
那是因为如果将基本数据类型，比如 string、number、boolean等类型的值使用 toString 的方法时，是直接将基本数据类型转换为 string 类型，但是如果对 object 类型使用 toString 方法，则是会调用其原型上的 toString 方法，也就是 `Object.prototype.toString`。所以 Zepto 在开头的地方就定义了 class2type 为一个 object 类型。

如果 obj 的类型为 null 或者 undefined 直接返回，如果该对象的 `Object.prototype.toString` 将返回的结果作为 class2type 的 key 取值。Object.prototype.toString 对不同的数据类型会返回形如 [object Boolean] 的结果。

如果都不是以上情况，默认返回 object 类型。

# Zepto 中的其他检测方法
## isFunction 
```js
    // 判断是否是函数
    function isFunction(value) { return type(value) == "function" }
```

## isWindow
```js
// 判断是否是 window对象（注意，w为小写）指当前的浏览器窗口，window对象的window属性指向自身。
    // 即 window.window === window
    function isWindow(obj)     { return obj != null && obj == obj.window }
```

## isDocument
```js
// 判断是否是 document 对象
    // window.document.nodeType == 9 数字表示为9，常量表示为 DOCUMENT_NODE
    function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
```

## isObject
```js
// 判断是否是 object
    function isObject(obj)     { return type(obj) == "object" }
```

## isPlainObject
```js
function isPlainObject(obj) {
        return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
    }
```

## isArray
```js
    // 判断是否是arr
    isArray = Array.isArray || function(object){ return object instanceof Array };
```

## likeArray
```js
    // 判断是否是数组或者对象数组
    // !!的作用是把一个其他类型的变量转成的bool类型。
    // !!obj 直接过滤掉了false，null，undefined，''等值
    function likeArray(obj) {
        var length = !!obj && 'length' in obj && obj.length,

            // 获取obj的数据类型
            type = $.type(obj);

        // 不能是function类型，不能是window
        // 如果是array则直接返回true
        // 或者当length的数据类型是number，并且其取值范围是0到(length - 1)这里是通过判断length - 1 是否为obj的属性

        return 'function' != type && !isWindow(obj) && (
                'array' == type || length === 0 ||
                (typeof length == 'number' && length > 0 && (length - 1) in obj)
            )
    }
```

## isEmptyObject
```js
    // 空对象
    $.isEmptyObject = function(obj) {
        var name
        for (name in obj) return false
        return true
    }

    
```

## isNumeric
```js
    //数字
    $.isNumeric = function(val) {
        var num = Number(val), type = typeof val;
        return val != null && type != 'boolean' &&
            (type != 'string' || val.length) &&
            !isNaN(num) && isFinite(num) || false
    }
```

