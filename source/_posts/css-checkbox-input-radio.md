---
title: 【CSS】默认的checkbox、input、radio太丑了？我来教你改变使用纯css3改写的带动画的默认样式
date: 2017-05-10 20:54:11
tags: [css,checkbox优化,input优化,radio优化] 
categories: CSS
---
![](http://img.blog.csdn.net/20170515213354489?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
> 项目的github地址为： https://github.com/sunshine940326/css3formeledemo 
 > 本文首发于我的个人博客，http://cherryblog.site/ ；欢迎大家查看我的其他博客
最近在做公司后台的优化项目，拿到设计稿一看，设计师觉得默认的input、checkbox、radio太丑了，要优化，在做了几个demo之后找到了要怎么优化这些样式的方法，我优化的原则有以下几点：

 - 因为是在已有的项目上做优化，所以尽量在不改变原有结构的基础上进行修改
 - input、checkbox这些大都是表单里面的元素，所以大部分跟后台有交互，保留原有属性，只增加新的class或者id
 - 只使用css3，并且其属性也都是input，当然也可以直接使用img代替，或者用div+span模拟，但是这就不叫做“优化”，而是模仿了。
 - 使用sass，只需要改变参数就可以反复多次使用
 <!--more-->

# 思路
大致的原理都是使用html原生的标签元素标签`checkbox`或者`input`，在后面加上`label`标签，将一些原有的元素隐藏，然后再用css设置你想要样式，行为方面都是根据原生属性来判断，不需要使用js。所有的html代码都是
```
div.container
    input type="checkbox" id="checkbox" 
    label for="checkbox"
    div.bottom-line
```
都是利用css的原生属性来判断用户的操作,先将原本的checkbox隐藏，然后再设置label的样式，最后设置`input[type=checkbox]:checked+label`的样式 
# checkbox
## checkbox demo1
首先来看一个checkbox，实现这个动画其实很简单，只运用css就可以实现。实现的原理是绑定checkout和label,用label控制是否checked。点击label的时候改变checkbox的属性
    先将checkbox隐藏，然后label为一个只有border的框框，使用after和befor伪元素来实现对号的两部分。
    先将after和before设置宽度为width*0.4，height为0，设置不同的旋转角度，让befor和after合起来刚好是一个对号。
    然后用css动画设置使其height达到width*0.7和width*0.35并控制动画使其连贯播放，
###  html
```
<div class="cb-container">
    <input type="checkbox" id="checkbox">
    <label for="checkbox" class="cb-label"></label>
</div>
```
###  scss
```

$checked-color: #fff;
$checked-bg:rgb(101,141,181);
$unchecked-color: #cfcece;
$unchecked-bg:rgb(249,249,249);
$checkbox-height: 100px;
$background-color:#fff;
$font-color:#dcdcdc;
$duration: .4s;
.cb-container{
  width: 1000px;
  text-align: center;
  margin-top: 50px;
}

html, body{
  padding:0;
  margin:0;
  background-color: $background-color;
  color:$font-color;
  font-family:'Open Sans';
}
#checkbox{
  display:none;
}

.cb-label{
  height: $checkbox-height;
  width: $checkbox-height;
  background: $unchecked-bg;
  border: $checkbox-height * .1 solid $unchecked-color;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  transition: border-color ease $duration/2;
  -moz-transition: border-color ease $duration/2;
  -o-transition: border-color ease $duration/2;
  -webkit-transition: border-color ease $duration/2;
  cursor: pointer;
  &::before,&::after{
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    height: 0;
    width: $checkbox-height * 0.2;
    background: $checked-color;
    display: inline-block;
    -moz-transform-origin: left top;
    -ms-transform-origin: left top;
    -o-transform-origin: left top;
    -webkit-transform-origin: left top;
    transform-origin: left top;
    content: '';
    -webkit-transition: opacity ease 0.5s;
    -moz-transition: opacity ease 0.5s;
    transition: opacity ease 0.5s;
  }
  &::before{
    top:$checkbox-height * 0.76;
    left: $checkbox-height * 0.31;
    -moz-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
    -o-transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }
  &::after {
    top: $checkbox-height * .45;
    left: $checkbox-height * 0;
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
}
input[type=checkbox]:checked + .cb-label,
.cb-label.checked{

  background: $checked-bg;
  border-color:$checked-bg;
  &::after{
    border-color:$checked-color;
    height: $checkbox-height * .35;
    -moz-animation: dothabottomcheck $duration/2 ease 0s forwards;
    -o-animation: dothabottomcheck $duration/2 ease 0s forwards;
    -webkit-animation: dothabottomcheck $duration/2 ease 0s forwards;
    animation: dothabottomcheck $duration/2 ease 0s forwards;
  }

  &::before{
    border-color:$checked-color;
    height: $checkbox-height * 1;
    -moz-animation: dothatopcheck $duration ease 0s forwards;
    -o-animation: dothatopcheck $duration ease 0s forwards;
    -webkit-animation: dothatopcheck $duration ease 0s forwards;
    animation: dothatopcheck $duration ease 0s forwards;
  }

}
@-moz-keyframes dothabottomcheck{
  0% { height: 0; }
  100% { height: $checkbox-height *0.35; }
}

@-webkit-keyframes dothabottomcheck{
  0% { height: 0; }
  100% { height: $checkbox-height *0.35; }
}

@keyframes dothabottomcheck{
  0% { height: 0; }
  100% { height: $checkbox-height *0.35;  }
}

@keyframes dothatopcheck{
  0% { height: 0; }
  50% { height: 0; }
  100% { height: $checkbox-height * 0.7; }
}
@-webkit-keyframes dothatopcheck{
  0% { height: 0; }
  50% { height: 0; }
  100% { height: $checkbox-height * 0.7; }
}
@-moz-keyframes dothatopcheck{
  0% { height: 0; }
  50% { height: 0; }
  100% { height: $checkbox-height * 0.7; }
}

```
![经过改变后的checkbox](http://img.blog.csdn.net/20170514194453879?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
## checkboxdemo2
![checkboxdemo2](http://img.blog.csdn.net/20170514230458375?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
## checkboxdemo3
![checkboxdemo3](http://img.blog.csdn.net/20170514230233384?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
## checkboxdemo4
![checkboxdemo4](http://img.blog.csdn.net/20170514230324436?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
# input
input的优化源于在掘金上看到的一篇文章，效果着实小清新，于是就使用拿来主义，写了一个简易版的demo，效果如下，运用的是flex布局还有伪元素placeholder来实现的。
![input效果](http://img.blog.csdn.net/20170512115931755?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
 
 - 输入框清除默认样式
 - 当输入框获得焦点时，输入框原本的文字向上移，并且下方蓝色的线宽度由0变为100
 - 如果没有输入内容，还变为未输入的状态
先贴上代码
## html代码
html结构很简单，使用的是HTML原生的form元素input和label；在效果中的“请输入内容”这几个字不是使用的`placeholder`，而是使用的label，但是也设置有`placeholder`,只不过是把`placeholder`的透明度设置为0，因为我们需要根据`placeholder`是否显示来设置下方line的宽度和label的位置。
 
```
div.input-container
    input type="input" id="input" placeholder="请输入内容"
    label for="input"
    div.bottom-line
```
完整html代码如下
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="scss/main.css">
</head>
<body>
<div class="input-container">
    <input type="input" id="input" placeholder="请输入内容">
    <label for="input">请输入内容</label>
    <div class="bottom-line"></div>
</div>
</body>
</html>
```
## css代码
全部的动画效果都只使用了css，但是使用的一些新特性浏览器兼容性还没有那么好，兼容到ie10.布局使用的是flex，动画效果用的是用的transform。运用伪类placeholder判断是否输入了文字，如果输入了文字下方的line宽度变为100%；label中的文字上移并且变小
代码如下:
```
$width: 500px;
$label-font-color: #3f4f5b;
$label-focus-font-color: rgb(82, 97, 108);
$border-bottom-color: #d5d5d5;
$focus-border-color: rgb(101, 141, 181);
$transform-top: 10px;
$transform-time: 0.3s;
$scale: 0.9;

.input-container {
  width: $width;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: reverse;
  -ms-flex-flow: column-reverse;
  flex-flow: column-reverse;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  margin: 100px auto
}

.input-container input {
  -webkit-box-ordinal-group: 11;
  order: 10;
  -ms-flex-order: 10;
  outline: none;
  border: none;
  width: 100%;
  padding: 10px 0;
  font-size: 20px;
  border-bottom: 1px solid $border-bottom-color;
  text-indent: 10px;
}

.input-container input::-moz-placeholder {
  opacity: 0;
}

.input-container input::-webkit-input-placeholder {
  opacity: 0;
}

.input-container input:-ms-input-placeholder {
  opacity: 0;
}

.input-container input, .input-container label {
  transition: all $transform-time;
}

.input-container label {
  -webkit-box-ordinal-group: 101;
  -ms-flex-order: 100;
  order: 100;
  color: $label-font-color;
  -webkit-transform-origin: left bottom;
  transform-origin: left bottom;
  -webkit-transform: translate(10px, 40px);
  transform: translate(0px, 40px);
}

.input-container .bottom-line {
  order: 2;
  width: 0;
  height: 2px;
  background: $focus-border-color;
  transition: all $transform-time;
}

.input-container input:focus {
  border-bottom-color: #fff;
}

.input-container input:focus ~ div, .input-container input:not(:placeholder-shown) ~ div {
  width: 100%
}

.input-container input:focus + label, .input-container input:not(:placeholder-shown) + label {
  color: $label-focus-font-color;
  -webkit-transform: translate(10px) scale($scale);
  transform: translate(10px) scale($scale)
}

```
 
