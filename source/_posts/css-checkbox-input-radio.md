---
title: css：默认的checkbox、input、radio太丑了？我来教你改变使用纯css3改写的带动画的默认样式
date: 2017-05-10 20:54:11
tags: [css,checkbox优化,input优化,radio优化] 
categories: css
---
最近在做公司后台的优化项目，拿到设计稿一看，设计师觉得默认的input、checkbox、radio太丑了，要优化，在做了几个demo之后找到了要怎么优化这些样式的方法，我优化的原则有以下几点：

 1. 因为是在已有的项目上做优化，所以尽量在不改变原有结构的基础上进行修改
 2. input、checkbox这些大都是表单里面的元素，所以大部分跟后台有交互，保留原有属性，只能增加新的class或者id
 3. 这里我全都是使用的css3制作的，并且其属性也都是input，当然也可以直接使用img代替，或者用div+span模拟，但是这就不叫做“优化”，而是模仿了。
# checkbox
首先来看一个checkbox，实现这个动画其实很简单，只运用css就可以实现。实现的原理是绑定checkout和label,用label控制是否checked。点击label的时候改变checkbox的属性
    先将checkbox隐藏，然后label为一个只有border的框框，使用after和befor伪元素来实现对号的两部分。
    先将after和before设置宽度为width*0.4，height为0，设置不同的旋转角度，让befor和after合起来刚好是一个对号。
    然后用css动画设置使其height达到width*0.7和width*0.35并控制动画使其连贯播放，
 ![经过改变后的checkbox](http://img.blog.csdn.net/20170510225117354?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)