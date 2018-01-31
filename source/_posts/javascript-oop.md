---
title: javascript面向对象编程，带你认识封装、继承和多态
date: 2017-06-8 14:54:11
tags: [js,面向对象编程,软件工程] 
categories: [JavaScript]
---


![title](http://img.blog.csdn.net/20170810183412159?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
> 本文首发于我的个人网站：http://cherryblog.site

周末的时候深入的了解了下javascript的面向对象编程思想，收获颇丰，感觉对面向对象编程有了那么一丢丢的了解了~很开森
<!--more-->
# 什么是面向对象编程
![生动描述面向对象概念](http://img.blog.csdn.net/20170605213635589?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
先上一张图，可以对面向对象有一个大致的了解，然而什么是面向对象呢，用java中的一句经典语句来说就是：万事万物皆对象。面向对象的思想主要是以对象为主，将一个问题抽象出具体的对象，并且将抽象出来的对象和对象的属性和方法封装成一个类。
>面向对象是把构成问题事务分解成各个对象，建立对象的目的不是为了完成一个步骤，而是为了描叙某个事物在整个解决问题的步骤中的行为。

## 面向对象和面向过程的区别
面向对象和面向过程是两种不同的编程思想，我们经常会听到两者的比较，刚开始编程的时候，大部分应该都是使用的面向过程的编程，但是随着我们的成长，还是面向对象的编程思想比较好一点~
其实面向对象和面向过程并不是完全相对的，也并不是完全独立的。
我认为面向对象和面向过程的主要区别是面向过程主要是以动词为主，解决问题的方式是按照顺序一步一步调用不同的函数。
而面向对象主要是以名词为主，将问题抽象出具体的对象，而这个对象有自己的属性和方法，在解决问题的时候是将不同的对象组合在一起使用。
所以说面向对象的好处就是可扩展性更强一些，解决了代码重用性的问题。

 - 面向过程就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候一个一个依次调用就可以了。
 -  面向对象是把构成问题事务分解成各个对象，建立对象的目的不是为了完成一个步骤，而是为了描叙某个事物在整个解决问题的步骤中的行为。

有一个知乎的高票回答很有意思，给大家分享一下~
>面向对象：  狗.吃(屎)
面向过程：  吃.(狗,屎)

具体的实现我们看一下最经典的“把大象放冰箱”这个问题
### 面向过程的解决方法
在面向过程的编程方式中实现“把大象放冰箱”这个问题答案是耳熟能详的，一共分三步：
 
 1. 开门（冰箱）；
 2. 装进（冰箱，大象）；
 3. 关门（冰箱）。

### 面向对象的解决方法
 1. 冰箱.开门（）
 2. 冰箱.装进（大象）
 3. 冰箱.关门（）

可以看出来面向对象和面向过程的侧重点是不同的，面向过程是以动词为主，完成一个事件就是将不同的动作函数按顺序调用。
面向对象是以主谓为主。将主谓看成一个一个的对象，然后对象有自己的属性和方法。比如说，冰箱有自己的id属性，有开门的方法。然后就可以直接调用冰箱的开门方法给其传入一个参数大象就可以了。
简单的例子面向对象和面向过程的好处还不是很明显。
### 五子棋例子
下面是一个我认为比较能够说明两者区别的一个栗子~：
例如五子棋，面向过程的设计思路就是首先分析问题的步骤：

 1. 开始游戏
 2. 黑子先走
 3. 绘制画面
 4. 判断输赢
 5. 轮到白子
 6. 绘制画面
 7. 判断输赢
 8. 返回步骤2

把上面每个步骤用分别的函数来实现，问题就解决了。

而面向对象的设计则是从另外的思路来解决问题。整个五子棋可以分为 

 1. 黑白双方，这两方的行为是一模一样的
 2. 棋盘系统，负责绘制画面

第一类对象（玩家对象）负责接受用户输入，并告知第二类对象（棋盘对象）棋子布局的变化，棋盘对象接收到了棋子的i变化就要负责在屏幕上面显示出这种变化，同时利用第三类对象（规则系统）来对棋局进行判定。

可以明显地看出，面向对象是以功能来划分问题，而不是步骤。同样是绘制棋局，这样的行为在面向过程的设计中分散在了总多步骤中，很可能出现不同的绘制版本，因为通常设计人员会考虑到实际情况进行各种各样的简化。而面向对象的设计中，绘图只可能在棋盘对象中出现，从而保证了绘图的统一。

功能上的统一保证了面向对象设计的可扩展性。比如我要加入悔棋的功能，如果要改动面向过程的设计，那么从输入到判断到显示这一连串的步骤都要改动，甚至步骤之间的循序都要进行大规模调整。如果是面向对象的话，只用改动棋盘对象就行了，棋盘系统保存了黑白双方的棋谱，简单回溯就可以了，而显示和规则判断则不用顾及，同时整个对对象功能的调用顺序都没有变化，改动只是局部的。

再比如我要把这个五子棋游戏改为围棋游戏，如果你是面向过程设计，那么五子棋的规则就分布在了你的程序的每一个角落，要改动还不如重写。但是如果你当初就是面向对象的设计，那么你只用改动规则对象就可以了，五子棋和围棋的区别不就是规则吗？（当然棋盘大小好像也不一样，但是你会觉得这是一个难题吗？直接在棋盘对象中进行一番小改动就可以了。）而下棋的大致步骤从面向对象的角度来看没有任何变化。

当然，要达到改动只是局部的需要设计的人有足够的经验，使用对象不能保证你的程序就是面向对象，初学者或者很蹩脚的程序员很可能以面向对象之虚而行面向过程之实，这样设计出来的所谓面向对象的程序很难有良好的可移植性和可扩展性。

# 封装
面向对象有三大特性，封装、继承和多态。对于ES5来说，没有`class`的概念，并且由于js的函数级作用域（在函数内部的变量在函数外访问不到），所以我们就可以模拟 `class`的概念，在es5中，类其实就是保存了一个函数的变量，这个函数有自己的属性和方法。将属性和方法组成一个类的过程就是封装。
>封装：把客观事物封装成抽象的类，隐藏属性和方法的实现细节，仅对外公开接口。

### 通过构造函数添加
javascript提供了一个构造函数（Constructor）模式，用来在创建对象时初始化对象。
构造函数其实就是普通的函数，只不过有以下的特点

 - 首字母大写（建议构造函数首字母大写，即使用大驼峰命名，非构造函数首字母小写）
 - 内部使用`this`
 - 使用 `new`生成实例
 
通过构造函数添加属性和方法实际上也就是通过this添加的属性和方法。因为this总是指向当前对象的，所以通过this添加的属性和方法只在当前对象上添加，是该对象自身拥有的。所以我们实例化一个新对象的时候，this指向的属性和方法都会得到相应的创建，也就是会在内存中复制一份，这样就造成了内存的浪费。
```
function Cat(name,color){
        this.name = name;
        this.color = color;
        this.eat = function () {
            alert('吃老鼠')
        }
    }
```
生成实例：
```
var cat1 = new Cat('tom','red')
```
**通过this定义的属性和方法，我们实例化对象的时候都会重新复制一份**
### 通过原型prototype
在类上通过 `this`的方式添加属性和对象会导致内存浪费的问题，我们就考虑，有什么方法可以让实例化的类所使用的方法直接使用指针指向同一个方法。于是，就想到了原型的方式
>Javascript规定，每一个构造函数都有一个prototype属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。
也就是说，对于那些不变的属性和方法，我们可以直接将其添加在类的`prototype` 对象上。

```
　function Cat(name,color){
　　　　this.name = name;
　　　　this.color = color;
　　}
　　Cat.prototype.type = "猫科动物";
　　Cat.prototype.eat = function(){alert("吃老鼠")};
```
然后生成实例
```
var cat1 = new Cat("大毛","黄色");
　　var cat2 = new Cat("二毛","黑色");
　　alert(cat1.type); // 猫科动物
　　cat1.eat(); // 吃老鼠
```
这时所有实例的`type`属性和`eat()`方法，其实都是同一个内存地址，指向`prototype`对象，因此就提高了运行效率。
### 在类的外部通过.语法添加
我们还可以在类的外部通过`.` 语法进行添加，因为在实例化对象的时候，并不会执行到在类外部通过`.` 语法添加的属性，所以实例化之后的对象是不能访问到`.` 语法所添加的对象和属性的，只能通过该类访问。
### 三者的区别
通过构造函数、原型和`.` 语法三者都可以在类上添加属性和方法。但是三者是有一定的区别的。
**构造函数**：通过this添加的属性和方法总是指向当前对象的，所以在实例化的时候，通过this添加的属性和方法都会在内存中复制一份，这样就会造成内存的浪费。但是这样创建的好处是即使改变了某一个对象的属性或方法，不会影响其他的对象（因为每一个对象都是复制的一份）。
**原型**：通过原型继承的方法并不是自身的，我们要在原型链上一层一层的查找，这样创建的好处是只在内存中创建一次，实例化的对象都会指向这个`prototype` 对象，但是这样做也有弊端，因为实例化的对象的原型都是指向同一内存地址，改动其中的一个对象的属性可能会影响到其他的对象
**`.` 语法**：在类的外部通过`.` 语法创建的属性和方法只会创建一次，但是这样创建的实例化的对象是访问不到的，只能通过类的自身访问
## javascript也有private public protected
对于java程序员来说private public protected这三个关键字应该是很熟悉的哈，但是在js中，并没有类似于private public protected这样的关键字，但是我们又希望我们定义的属性和方法有一定的访问限制，于是我们就可以模拟private public protected这些访问权限。
不熟悉java的小伙伴可能不太清楚private public protected概念（其他语言我也不清楚有没有哈，但是应该都是类似的~），先来科普一下小知识点~

 - public：public表明该数据成员、成员函数是对所有用户开放的，所有用户都可以直接进行调用
 - private：private表示私有，私有的意思就是除了class自己之外，任何人都不可以直接使用，私有财产神圣不可侵犯嘛，即便是子女，朋友，都不可以使用。
 - protected：protected对于子女、朋友来说，就是public的，可以自由使用，没有任何限制，而对于其他的外部class，protected就变成private。

### js中的private 
因为javascript函数级作用域的特性（在函数中定义的属性和方法外界访问不到），所以我们在函数内部直接定义的属性和方法都是私有的。

### js中的public
通过new关键词实例化时，this定义的属性和变量都会被复制一遍，所以通过this定义的属性和方法就是公有的。
通过prototype创建的属性在类的实例化之后类的实例化对象也是可以访问到的，所以也是公有的。

### js中的protected
在函数的内部，我们可以通过this定义的方法访问到一些类的私有属性和方法，在实例化的时候就可以初始化对象的一些属性了。

### new的实质
虽然很多人都已经了解了new的实质，那么我还是要再说一下new 的实质
 `var o = new Object()`
 1. 新建一个对象o
 2. `o. __proto__ = Object.prototype` 将新创建的对象的`__proto__`属性指向构造函数的`prototype`
 3. 将this指向新创建的对象
 4. 返回新对象，但是这里需要看构造函数有没有返回值，如果构造函数的返回值为基本数据类型`string,boolean,number,null,undefined`,那么就返回新对象，如果构造函数的返回值为对象类型，那么就返回这个对象类型

### 栗子~
```
var Book = function (id, name, price) {
        //private(在函数内部定义，函数外部访问不到，实例化之后实例化的对象访问不到)
        var num = 1;
        var id = id;
        function checkId() {
            console.log('private')
        }
        //protected(可以访问到函数内部的私有属性和私有方法，在实例化之后就可以对实例化的类进行初始化拿到函数的私有属性)
        this.getName = function () {
            console.log(id)
        }
        this.getPrice = function () {
            console.log(price)
        }

        //public(实例化的之后，实例化的对象就可以访问到了~)
        this.name = name;
        this.copy = function () {
            console.log('this is public')
        }

    }

    //在Book的原型上添加的方法实例化之后可以被实例化对象继承
    Book.prototype.proFunction = function () {
        console.log('this is proFunction')
    }

    //在函数外部通过.语法创建的属性和方法，只能通过该类访问，实例化对象访问不到
    Book.setTime = function () {
        console.log('this is new time')
    }
    var book1 = new Book('111','悲惨世界','$99')
    book1.getName();        // 111 getName是protected，可以访问到类的私有属性，所以实例化之后也可以访问到函数的私有属性
    book1.checkId();        //报错book1.checkId is not a function
    console.log(book1.id)   // undefined id是在函数内部通过定义的，是私有属性，所以实例化对象访问不到
    console.log(book1.name) //name 是通过this创建的，所以在实例化的时候会在book1中复制一遍name属性，所以可以访问到
    book1.copy()            //this is public
    book1.proFunction();    //this is proFunction
    Book.setTime();         //this is new time
    book1.setTime();        //报错book1.setTime is not a function
```
# 继承
> 继承：子类可以使用父类的所有功能，并且对这些功能进行扩展。继承的过程，就是从一般到特殊的过程。

其实继承都是基于以上封装方法的三个特性来实现的。
## 类式继承
所谓的类式继承就是使用的原型的方式，将方法添加在父类的原型上，然后子类的原型是父类的一个实例化对象。
```
//声明父类
    var SuperClass = function () {
        var id = 1;
        this.name = ['javascript'];
        this.superValue = function () {
            console.log('superValue is true');
            console.log(id)
        }
    };

    //为父类添加共有方法
    SuperClass.prototype.getSuperValue = function () {
        return this.superValue();
    };

    //声明子类
    var SubClass = function () {
        this.subValue = function () {
            console.log('this is subValue ')
        }
    };

    //继承父类
    SubClass.prototype = new SuperClass() ;

    //为子类添加共有方法
    SubClass.prototype.getSubValue= function () {
        return this.subValue()
    };

    var sub = new SubClass();
    var sub2 =  new  SubClass();

    sub.getSuperValue();   //superValue is true
    sub.getSubValue();     //this is subValue

    console.log(sub.id);    //undefined
    console.log(sub.name);  //javascript

    sub.name.push('java');  //["javascript"]
    console.log(sub2.name)  //["javascript", "java"]
```
其中最核心的一句代码是` SubClass.prototype = new SuperClass() ;`
类的原型对象`prototype`对象的作用就是为类的原型添加共有方法的，但是类不能直接访问这些方法，只有将类实例化之后，新创建的对象复制了父类构造函数中的属性和方法，并将原型`__proto__` 指向了父类的原型对象。这样子类就可以访问父类的`public` 和`protected` 的属性和方法，同时，父类中的`private` 的属性和方法不会被子类继承。

敲黑板，如上述代码的最后一段，使用类继承的方法，如果父类的构造函数中有引用类型，就会在子类中被所有实例共用，因此一个子类的实例如果更改了这个引用类型，就会影响到其他子类的实例。
**提一个小问题~为什么一个子类的实例如果更改了这个引用类型，就会影响到其他子类的实例呢，在javascript中，什么是引用类型呢，引用类型和其他的类型又有什么区别呢？**
## 构造函数继承
正式因为有了上述的缺点，才有了构造函数继承，构造函数继承的核心思想就是`SuperClass.call(this,id)`,直接改变this的指向，使通过this创建的属性和方法在子类中复制一份，因为是单独复制的，所以各个实例化的子类互不影响。但是会造成内存浪费的问题
```
//构造函数继承
    //声明父类
    function SuperClass(id) {
        var name = 'javascript'
        this.books=['javascript','html','css'];
        this.id = id
    }

    //声明父类原型方法
    SuperClass.prototype.showBooks = function () {
        console.log(this.books)
    }

    //声明子类
    function SubClass(id) {
        SuperClass.call(this,id)
    }

    //创建第一个子类实例
    var subclass1 = new SubClass(10);
    var subclass2 = new SubClass(11);

    console.log(subclass1.books);
    console.log(subclass2.id);
    console.log(subclass1.name);   //undefined
    subclass2.showBooks();
```
## 组合式继承
我们先来总结一下类继承和构造函数继承的优缺点

|  | 类继承 | 构造函数继承 |
| ------------- |:-------------| :-----|
| 核心思想 | 子类的原型是父类实例化的对象 | SuperClass.call(this,id) |
| 优点 | 子类实例化对象的属性和方法都指向父类的原型 | 每个实例化的子类互不影响 |
| 缺点 | 子类之间可能会互相影响 | 内存浪费 |
所以组合式继承就是汲取两者的优点，即避免了内存浪费，又使得每个实例化的子类互不影响。
```
//组合式继承
    //声明父类
    var SuperClass = function (name) {
        this.name = name;
        this.books=['javascript','html','css']
    };
    //声明父类原型上的方法
    SuperClass.prototype.showBooks = function () {
        console.log(this.books)
    };

    //声明子类
    var SubClass = function (name) {
        SuperClass.call(this, name)

    };

    //子类继承父类（链式继承）
    SubClass.prototype = new SuperClass();

    //实例化子类
    var subclass1 = new SubClass('java');
    var subclass2 = new SubClass('php');
    subclass2.showBooks();
    subclass1.books.push('ios');    //["javascript", "html", "css"]
    console.log(subclass1.books);  //["javascript", "html", "css", "ios"]
    console.log(subclass2.books);   //["javascript", "html", "css"]

```
 
## 寄生组合继承
那么问题又来了~组合式继承的方法固然好，但是会导致一个问题，父类的构造函数会被创建两次（call()的时候一遍，new的时候又一遍），所以为了解决这个问题，又出现了寄生组合继承。
刚刚问题的关键是父类的构造函数在类继承和构造函数继承的组合形式中被创建了两遍，但是在类继承中我们并不需要创建父类的构造函数，我们只是要子类继承父类的原型即可。所以说我们先给父类的原型创建一个副本，然后修改子类`constructor`属性，最后在设置子类的原型就可以了~
 
```
//寄生式继承
    function inheritObject(subClass,superClass) {
        //复制一份父类的原型保存在变量中
        var p = inheritObject(superClass.prototype);
        //修正因为重写子类原型导致子类constructor属性被修改
        p.constructor = subClass;
        //设置子类的原型
        subClass.prototype = p;
    }
    //定义父类
    var SuperClass = function (name) {
        this.name = name;
        this.books = ['javascript','html','css']
    };
    //定义父类原型方法
    SuperClass.prototype.getBooks = function () {
        console.log(this.books)
    };

    //定义子类
    var SubClass = function (name) {
        SuperClass.call(this,name)
    }

    inheritObject(SubClass,SuperClass);
    
    var subclass1 = new SubClass('php')
```

 
 
 
 

 
 
 
 
 
 
 
 

 
 

 
 
 
 
 

  



 
 

 

 
 

 
 

 