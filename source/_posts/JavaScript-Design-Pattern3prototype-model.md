---
title: javascript设计模式（三）：原型模式
date: 2017-03-25 23:05:28
tags: [js,js设计模式] 
categories: js
---
原型模式就是通过javascript中的原型链的思想来实现继承的，当调用函数的方法时，首先会寻找本身是否有该方法，如果没有就寻找其原型链上是否有，一共有两种方式来实现原型模式：1、使用`Object.create(prototype)`方法或者是使用字面量的方式创建对象
<!--more-->
# 原型模式

原型模式应该是我们比较熟悉的，其实原型模式不需要去模拟其他语言的概念，而是使用javascript提供的原生能力--原型链，使用原型链来实现继承。

我们能够将原型模式认作是基于原型的继承中，我们创建作为其他对象原型的对象，原型对象自身被当作构造器创建的每一个对象的蓝本高效的使用着，如果构造器函数使用的原型包含例如叫作name的属性，那么每一个通过同一个构造器创建的对象都有name属性

##　使用`Object.create(prototype)`方法
举个栗子~
```
var myCar = {

  name: "Ford Escort",

  drive: function () {
    console.log( "Weeee. I'm driving!" );
  },

  panic: function () {
    console.log( "Wait. How do you stop this thing?" );
  }

};

// Use Object.create to instantiate a new car
var yourCar = Object.create( myCar );

// Now we can see that one is a prototype of the other
console.log( yourCar.name );
```
在这个例子中，我们定义了一个作为原型的对象`myCar`，这个对象中有两个属性`name`和`drive`，然后用`Object.create()`方法来创建了一个拥有`myCar`原型的对象`yourCar`，这样新创建的`yourCar`就继承了`myCar`中的属性和方法，我们可以直接调用

当然，`Object.create()`方法也可以传入第二个参数(第一个参数是要继承的原型)`Object.create(prototype,optionalDescriptorObject))。`第二个参数来初始化对象的属性，我认为这个属性就是可以为其创建新的属性，不知道理解的对不对

## 使用面向字面量方法创建
如果不希望在不直接使用`Object.create`的前提下实现原型链，我们可以模拟原型链实现继承
```
var vehiclePrototype = {

  init: function ( carModel ) {
    this.model = carModel;
  },

  getModel: function () {
    console.log( "The model of this vehicle is.." + this.model);
  }
};

function vehicle( model ) {

  function F() {};
  
  var f = new F();

  f.init( model );
  return f;

}

var car = vehicle( "Ford Escort" );
car.getModel();
```
这个栗子中，对象`vehiclePrototype`中有两个方法`init`和`getModel`,然后`vehicle`继承了`vehiclePrototype`，继承的方法是先创建一个空函数`F`然后`F`的`prototype`属性指向`vehiclePrototype`，然后创建`F`类的一个实例`f`,`f`使用了`vehiclePrototype`的`init`方法，最后返回`f`,所以`vehicle`函数内部就完成了对`vehiclePrototype`的继承，最后将对象`f`返回.

**其实`var f = new F();`就相当于`f = Object.create(F.prototype);`**

```
o = {};
// 以字面量方式创建的空对象就相当于:
o = Object.create(Object.prototype);
```

