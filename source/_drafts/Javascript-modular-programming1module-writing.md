
title: Javascript模块化编程（一）：模块的写法
date: 2017-03-07 22:40:16
tags: [js模块化,js]
categories: js

---
不得不说现在“前端”的知识点实在是太多了，(ಥ_ಥ)
就在昨天，我就是想看一下webpack怎么使用，然后在慕课网的视频中用到了commonJS的知识，今天我就想查一下什么是有关commonJS的知识，然后发现查到了是和node和AMD/CMD相关，望天(ಥ_ಥ)，最后发现这些都是js模块化编程的内容，于是决定跟着阮一峰老师学习js模块化变成

<!--more-->

# 了解基本概念：AMD/CMD/commonJS
先来大体说一些这些都是什么东西：
AMD/CMD/commonJS都是JavaScript模块化变的规范


> 因为有了模块，我们就可以更方便地使用别人的代码，想要什么功能，就加载什么模块。
但是，这样做有一个前提，那就是大家必须以同样的方式编写模块，否则你有你的写法，我有我的写法，岂不是乱了套！考虑到Javascript模块现在还没有官方规范，这一点就更重要了。



- AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。
- CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。
- commonJS是nodejs在推广过程中对模块定义的规范化产出。

因为node主要是将javascript语言用于服务器端编程，所以对应的commonJS主要是针对服务端，AMD/CMD主要是针对浏览器端。

## AMD(Asynchronous Module Definition)
全称是Asynchronous Module Definition，即异步模块加载机制。

## commonJS
CommonJS 的目标是定义一套普通应用程序使用的API，从而填补原生JavaScript标准库过少的缺点。终极目标是实现一个像python，java中含有的标准库。现在非常火爆的node.js实际上就是CommonJS 的一个实现。

通过 CommonJS 的规范和代码可以看出，require 是同步的，模块系统需要同步读取模块文件内容，并编译执行以得到模块接口。在服务端，比如node.js，这一般来说没有问题，文件请求都是本地获取，对性能没有什么影响。但是放在浏览器端，问题就出来了，等到所有模块同步加载完毕，时间不知道要过去多久了。
> CommonJS 最早叫做 ServerJS，Modules 1.0规范在node.js上实践的很好，由于知道自身在浏览器中的不足，CommonJS社区把名字改为CommonJS，意为想统一服务器端和浏览器端，但是要实现浏览器端，就要有新的版本的标准，在新的版本制定过程中，社区出现了分歧，在这个分歧中，分出了AMD规范。
> 
> 由于风格和机制的差异，最终，AMD从CommonJS社区中独立了出来
--[JavaScript模块化开发（二）——CommonJS规范](http://www.feeldesignstudio.com/2013/09/javascript-module-pattern-commonjs/?utm_source=caibaojian.com)


# 那么AMD/CMD又有什么区别呢？
AMD和CMD的区别 
1. 对于依赖的模块，AMD 是 提前执行 ，CMD 是 延迟执行 。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible. 
2. CMD 推崇 依赖就近 ，AMD 推崇 依赖前置 。（这一点是非常重要的区别） 
3. AMD 的 API 默认是 一个当多个用 ，CMD 的 API 严格区分，推崇 职责单一 。


# 总结
不得不说，其实这篇文章大部分都是摘录的，反思了一下，归根结底还是自己对这些概念理解的不清，首先是没有找到系统的讲解文章，其次是自己没有用到项目中去，自我批评。

先挖个坑，以后我胡汉三还会回来的~