---
title: javascript设计模式（一）
date: 2017-03-11 23:54:11
tags: [js,js设计模式] 
categories: JavaScript
---
 

在之前学习javascript模块发开发的过程中，看到了一篇好文，是极客学院的[学习javascript设计模式](http://wiki.jikexueyuan.com/project/javascript-design-patterns/)，本文的所有demo地址见本人的github：https://github.com/sunshine940326/js-object-demo
<!--more-->

javascript的设计模式，首先，我们需要知道什么是函数（基础知识，大神跳过）

#定义函数
# 构造器模式
js不支持类的概念，但它支持与对象一起使用的特殊Constructor（构造器）函数。通过在构造器前面加new关键字，告诉js想树勇构造器一样实例化一个新的对象，并且对象成员由该函数定义。在构造器内，关键字this引用新创建的对象。

在面向对象编程中，构造器是一个当新建对象的内存被分配后，用来初始化该对象的一个特殊函数。

对象构造器是被用来创建特殊类型的对象的，首先它要准备使用的对象，其次在对象初次被创建时，通过接收参数，构造器用来对成员的属性和方法进行赋值。

## 创建对象
在js中创建对象有三种基本方式：
下面的每一种方式都会创建一个新对象
1. 对象直接量

```
var empty = {};
    console.log(empty);
    var point = {
        x:0,
        y:1
    }
    console.log(point.x,+point.y)
    var point2 = {
        x:point.x,
        y:point.y+1
    }
    console.log("point2.x" + ":"+ point2.x + ","+ "point2.y" +":"+ point2.y)

    var book = {
        "main_title":"javascript",
        "sub_title" : "The Definitive Guide",
        "for":"all",
        "author":{
            "firstName":"cherry",
            "lastName":"Li"
        }
    }
    console.log(book.author.firstName,book.author.lastName)
    console.log(book.main_title)
    console.log(book.sub_title)
    console.log(book.for)
```
2. Object.create
```
var newObject = Object.create(null)
```
`Object.create()` 方法创建一个拥有指定原型和若干个指定属性的对象。
语法
>Object.create(proto, [ propertiesObject ])
参数

- proto
一个对象，作为新创建对象的原型。或者为 null。
- propertiesObject
可选。该参数对象是一组属性与值，该对象的属性名称将是新创建的对象的属性名称，值是属性描述符（这些属性描述符的结构与Object.defineProperties()的第二个参数一样）。注意：该参数对象不能是 undefined，另外只有该对象中自身拥有的可枚举的属性才有效，也就是说该对象的原型链上属性是无效的。
```

    var myCar = {
        name:"Fort",
        drive:function () {
            console.log("I'm driving!")
        },
        panic:function () {
            console.log("wait")
        }
    }

    // Use Object.create to instantiate a new car
    var youCar = Object.create(myCar);
    // Now we can see that one is a prototype of the other
    console.log(youCar.name)

    var vehicle = {
        getModel:function () {
            console.log("The model of this vehicle is.." +this.model)
        }
    }

    var car = Object.create(vehicle,{
        "id":{
            value:'car1',

        },
        "model":{
            value:'Ford',

        }
    })

```
3. 构造函数方式（new）
通过new创建对象，new后跟一个函数调用（构造函数）
```
var newObject = new Object();
```

---
其实这三种方式都可以相互转化

通过字面量方式创建的空对象相当于`Object.create(Object.prototype)`
```
o = {}

o = Object.create(Object.prototype) 
```
下面这两句是等价的，当然,如果在Constructor函数中有一些初始化代码,Object.create不能执行那些代码
```
function Constructor() {};
o = new Constructor();
o = Object.create(Constructor.prototype) 
```

## 给对象设置属性和获取属性值
### 使用.的方式
```
newObject.sayHello = "Hello";
console.log(newObject.sayHello)
```
### 使用[]方式
```
newObject['sayHello'] = 'Hello';
console.log(newObject['sayHello']);
```
这两种设置属性的区别
- 使用保留字作为属性名的时候，必须用方括号
- . 不能修改，因为属性名是标识符
- []为字符串，可以修改和创建

### Object.defineProperty方式
>Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个已经存在的属性， 并返回这个对象。

>Object.defineProperty(obj, prop, descriptor)

>obj
需要定义属性的对象。
prop
需定义或修改的属性的名字。
descriptor
将被定义或修改的属性的描述符。


#### 创建属性
如果对象中不存在指定的属性，Object.defineProperty()就创建这个属性。当描述符中省略某些字段时，这些字段将使用他们的默认值。拥有布尔值的字段的默认值都是false。value，get和set字段的默认值都是undefined。定义属性时如果没有get/set/value/writable，那它被归类为数据描述符。

通过`.` `[]`设置的属性，可以使用`delete`删除,通过`Object.defineProperty()`设置的属性不能被delete删除，使用  `Object.defineProperty()` 增加的属性值是不可改变的。
```
//删除对象的属性
    //通过. []设置的属性，可以使用delete删除
    function fun() {
        this.name = 'name';
        this['age'] = 12;
    }

    var obj = new fun();
    console.log(obj.name);   //name
    console.log(obj.age)
    delete obj.name;
    delete obj.age;
    console.log(obj.name);    //undefined
    console.log(obj.age);

    //Object.defineProperty()设置的属性不能被delete删除，使用  Object.defineProperty() 增加的属性值是不可改变的。
    var o = {} //创建一个空对象
    Object.defineProperty(o,'a',{    //给o设置一个属性a，值为37
        value:37,
        writable:true,
        configurable:true
    });

    var bValue ;
    Object.defineProperty(o,'b',{
        get:function () {
            return bValue
        },
        set:function (newValue) {
            bValue = newValue;
        },
        enumerable:true,
        configurable:true,
    })
    o.b = 38;

    //数据描述符和存取描述符不能混合使用
    Object.defineProperty(o,"conflict",{
        value:11111,
        get:function () {
            return 11111
        }
    })// throws a TypeError: value appears only in data descriptors, get appears only in accessor descriptors

```

#### 修改属性
如果属性已经存在，`Object.defineProperty()`将尝试根据描述符中的值以及对象当前的配置来修改这个属性。如果描述符的 configurable 特性为false（即该特性为non-configurable），那么除了 writable 外，其他特性都不能被修改，并且数据和存取描述符也不能相互切换。

##### Writable 属性

当属性特性（property attribute） writable 设置为false时，表示 non-writable，属性不能被修改。

```
var o = {}; // 创建一个新对象

Object.defineProperty(o, "a", { value : 37,
                                writable : false });

console.log(o.a); // 打印 37
o.a = 25; // 没有错误抛出（在严格模式下会抛出，即使之前已经有相同的值）
console.log(o.a); // 打印 37， 赋值不起作用。
```

##### Enumerable 特性

属性特性 enumerable 定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举。


```
var o = {};
Object.defineProperty(o, "a", { value : 1, enumerable:true });
Object.defineProperty(o, "b", { value : 2, enumerable:false });
Object.defineProperty(o, "c", { value : 3 }); // enumerable defaults to false
o.d = 4; // 如果使用直接赋值的方式创建对象的属性，则这个属性的enumerable为true

for (var i in o) {    
  console.log(i);  
}
// 打印 'a' 和 'd' (in undefined order)

Object.keys(o); // ["a", "d"]

o.propertyIsEnumerable('a'); // true
o.propertyIsEnumerable('b'); // false
o.propertyIsEnumerable('c'); // false
```

##### Configurable 特性

configurable 特性表示对象的属性是否可以被删除，以及除 writable 特性外的其他特性是否可以被修改
```
var o = {};
Object.defineProperty(o, "a", { get : function(){return 1;}, 
                                configurable : false } );

// throws a TypeError
Object.defineProperty(o, "a", {configurable : true}); 
// throws a TypeError
Object.defineProperty(o, "a", {enumerable : true}); 
// throws a TypeError (set was undefined previously) 
Object.defineProperty(o, "a", {set : function(){}}); 
// throws a TypeError (even though the new get does exactly the same thing) 
Object.defineProperty(o, "a", {get : function(){return 1;}});
// throws a TypeError
Object.defineProperty(o, "a", {value : 12});

console.log(o.a); // logs 1
delete o.a; // Nothing happens
console.log(o.a); // logs 1
```
#### 添加多个属性和默认值

考虑特性被赋予的默认特性值非常重要，通常，使用点运算符和Object.defineProperty()为对象的属性赋值时，数据描述符中的属性默认值是不同的
```
var o = {};

o.a = 1;
// 等同于 :
Object.defineProperty(o, "a", {
  value : 1,
  writable : true,
  configurable : true,
  enumerable : true
});


// 另一方面，
Object.defineProperty(o, "a", { value : 1 });
// 等同于 :
Object.defineProperty(o, "a", {
  value : 1,
  writable : false,
  configurable : false,
  enumerable : false
});
```
### Object.defineProperties方式

```
// 设置属性
Object.defineProperties( newObject, {

  "someKey": { 
    value: "Hello World", 
    writable: true 
  },

  "anotherKey": { 
    value: "Foo bar", 
    writable: false 
  } 

});

```
