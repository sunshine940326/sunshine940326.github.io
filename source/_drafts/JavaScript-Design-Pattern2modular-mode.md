---
title: javascript设计模式（二）：模块化模式
date: 2017-03-24 23:09:08
tags: [js,js设计模式] 
categories: JavaScript
---

在javascript中，是没有类的概念的，也没有私有变量和全局变量的区别，这样的话，我们很有可能会遇到命名冲突的问题，然后就是我们希望能跟其他面向对象编程语言一样，能够将一个方法封装成一个类，这样的话别人在引用这个方法的时候只需要调用接口就可以了，不需要知道内部是怎么实现的，我们也往往不想让外部访问到类中的成员变量
<!--more-->
# 模块化模式
所以模块化模式最先开始就是为了解决这个问题的，是用来模拟类的概念的，模拟私有变量的实现（模拟！！在js中是没有类和私有变量的说法的），对传统软件工程中的类提供私有和公共封装的方法

通过这样的方式，我们可以在一个单一的对象中包含公有/私有的方法和变量

模块模式使用“闭包”的方式来将不想让外部访问到的变量封装为“私有变量（private）”。提供一种将公有（pubilc）和私有（private）方法，变量封装混合在一起的方式，声明的变量或者方法只在模块内部有效，其他人可以调用return中的方法和变量。这种方式防止内部信息泄露到全局中，从而避免了和其他开发者接口发生冲突的可能。

这种方式和立即调用函数表达式有相似的地方，不同的是这种模式返回的是一个对象，而立即调用表达式返回的是一个函数

## 闭包实现模块模式基础版
下面就是一个最简单的用闭包实现模块模式的栗子~
```
var testModule = (function(){
    var counter = 0;
    
    return{
        incrementCounter:function(){
            return counter++;
        }
        resetCounter:function(){
            console.log("counter value prior to reset:"+counter);
            counter = 0;
        }
    }
})();

//use

testModule.incrementCounter();

testModule.resetCounter();
```
这个栗子中，在函数体内定义的变量`counter`就是一个“私有变量”，在函数外部是不能直接访问到的。在`return`中给我们提供了这个函数的两个`public`方法：`incrementCounter()`和`resetCounter()`。我们想要使用这个函数的功能就直接调用`testModule.incrementCounter();`就可以了

## 包含命名空间、公有变量和私有变量
下面是一个包含了命名空间、公有变量和私有变量的一个栗子~
```
var myNamespace = (function(){
    var myPrivateVar,myPrivateMethod

    myPrivateVar = 0;
    
    myPrivateMethod = function(foo){
        console.log(foo)
    }
    
    return{
        myPublicVar:"foo",
        myPublicFunction:function(bar){
            myPrivateVar++;
            
            myPrivateMethod(bar)
        }
    }
})()
```

## 升级版使用模块模式实现购物车
```
var basketModule = (function () {

  // privates

  var basket = [];

  function doSomethingPrivate() {
    //...
  }

  function doSomethingElsePrivate() {
    //...
  }

  // Return an object exposed to the public
  return {

    // Add items to our basket
    addItem: function( values ) {
      basket.push(values);
    },

    // Get the count of items in the basket
    getItemCount: function () {
      return basket.length;
    },

    // Public alias to a  private function
    doSomething: doSomethingPrivate,

    // Get the total value of items in the basket
    getTotal: function () {

      var q = this.getItemCount(),
          p = 0;

      while (q--) {
        p += basket[q].price;
      }

      return p;
    }
  };
}());
```
在这个栗子中，这个模块完全自包含在`basketModule`这个模块中，其中的`basket`数组是私有的，在外部访问不到，我们需要访问`basketModule`中return的方法使用对应的功能，使用方法如下
```
// basketModule returns an object with a public API we can use

basketModule.addItem({
  item: "bread",
  price: 0.5
});

basketModule.addItem({
  item: "butter",
  price: 0.3
});

// Outputs: 2
console.log( basketModule.getItemCount() );

// Outputs: 0.8
console.log( basketModule.getTotal() );

// However, the following will not work:

// Outputs: undefined
// This is because the basket itself is not exposed as a part of our
// the public API
console.log( basketModule.basket );

// This also won't work as it only exists within the scope of our
// basketModule closure, but not the returned public object
console.log( basket );
```

