---
title: gulp（一）
date: 2017-03-18 20:00:06
tags: JavaScript
categories: JavaScript
---
因为新的工作使用的是gulp，所以学习一下gulp，本文主要参考的是：http://www.cnblogs.com/2050/p/4198792.html.   以及gulp的官网
<!--more-->
# gulp的工作原理简述
## 下Grunt.js和Gulp.js工作方式的区别
>grunt主要是以文件为媒介来运行工作流的，比如在grunt中执行完一个任务后，会把结果写在一个临时文件中，然后可以在这个临时文件内容的基础上执行其他任务，执行完之后又把结果写入到临时文件中，，然后又以这个为基础继续执行其他任务...但是在gulp中，使用的是nodejs中的stream（流），首先获取到需要的stream，然后可以通过stream的`pipe()`方法把流导入到你想要的地方，比如gulp的插件中，经过插件处理后的流又可以继续导入到其他插件中，当然也可以把流写到文件中，所以gulp是以stream为媒介的，它不需要频繁的生成临时文件，这也是gulp比grunt快的一个原因

## gulp传入的路径参数与最终生成文件的关系
> 理解了gulp传入路径参数与最终生成文件的关系，就可以理解怎么使用`gulp.dest() `这个方法。gulp的流程是这样的：首先通过`gulp.src()`方法获取到我们想要处理的文件流，然后把文件流通过pipe方法导入到gulp插件中，最后把经过插件处理后的流再通过pipe方法导入到`gulp.dest()`中，`gulp.dest()`方法则把流中的内容写入到文件中，这里首先需要弄清楚一点的是，我们给`gulp.dest()`传入的路径参数，只能用来指定要生成的文件的目录，而不能指定生成文件的文件名，它生成文件的文件名使用的是导入到它的文件流自身的文件名，**所以生成的文件名是由导入到它的文件流决定的**即使我们给它传入一个带有文件名的路径的参数，然后它也会把这个文件名

# gulp安装
gulp是基于node环境的，所以首先需要安装node环境
然后以全局方式安装gulp
```
npm install -g gulp
```
全局安装gulp之后还需要在每个要使用gulp的项目中都单独安装一次。把目录切换到你的项目文件夹中，然后执行
```
npm install gulp
```
如果想要在安装的时候把gulp写进项目package.json文件的依赖中，可以加上 --save-dev
```
npm install --save-dev gulp
```

# 开始使用gulp
## 建立gulpfile.js文件
建立一个`gulpfile.js`文件，这个文件就是gulp的主文件，之后要做的事情就是在`gulpfile.js`文件中定义我们的任务就好，下面是一个最简单的`gulpfile.js`
```
var gulp = require('gulp');
gulp.task('default',function(){
  console.log('Hello world')  
})

```
此时我们的目录结构是这样的
├── gulpfile.js
├── node_modules
│ └── gulp
└── package.json

## 运行gulp任务
要运行gulp任务，只需切换到存放`gulpfile.js `文件的目录，然后在命令行执行`gulp`命令就可以，`gulp`后面加上要执行的任务名，例如`gulp task1`，如果没有指定任务名。则是按照默认的`defaule`任务

# gulp的api
gulp只要四个api，`gulp.task()`、`gulp.src()`,`gulp.dest()`,`gulp.watch()`

## gulp.src
这个方法用来读取你需要操作的文件

`gulp.src()`方法正是用来获取流的，但是要注意这个流里的内容不是原始的文件流，而是一个虚拟文件对象流，这个虚拟文件对象中存储着原始文件的路径、文件名、内容信息等，

```
gulp.src(globs[,options])
```
globs参数是文件匹配模式，用来匹配文件路径（包括文件名），当然这里也可以直接指定某个具体的文件路径，当有多个匹配模式时，该参数可以为一个数组

option是可选参数，通常情况下我们不需要用到


# gulp.dest()
`gulp.dest()`是用来写文件的，其语法为：
```
gulp.dest(path[,option])

```
`path`为写入文件的路径
option为一个可选的参数，通常我们不需要用到
