---
title: html5拖放--15行js代码实现两个div内容互换
date: 2017-05-24 13:24:51
tags: [html5,前端] 
categories: html5
---
![html5拖放](http://img.blog.csdn.net/20170523231217677?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
<!--more-->
> 本文首发于我的个人博客:http://cherryblog.site/ ，欢迎大家前去参观
> 本文项目地址，sortable插件地址：https://github.com/sunshine940326/sortable
> 源码地址：https://github.com/sunshine940326/drag
> 项目演示地址：https://sunshine940326.github.io/drag/

 在写我们后台的管理程序中需要有一个拖放的功能，然后我们有一个这样的功能，实现11个固定且大小不一的div互换，效果如下
![最终效果图](https://user-gold-cdn.xitu.io/2017/5/24/c9919143af8ac22486c3fb9fcfd5b981)

pc端演示地址：https://sunshine940326.github.io/drag/

作为一个小菜鸟，听到这样的消息我是蒙逼的= =，在网上找到一个插件，功能挺强大的
![sortable插件](https://user-gold-cdn.xitu.io/2017/5/24/0c1b872fd140ad1053ec1a7f0b03fa75)
![sortable插件](https://user-gold-cdn.xitu.io/2017/5/24/3b43ace9a1ed0d25d21a9e694604c71f)
> 插件地址：https://github.com/sunshine940326/sortable

但是这个插件只能拖动和放置，不能交换，也就是只能将div插入在其他div前面，其余的向后推移，并且不能做到交换div中的内容，而div容器不变的条件，然后我就和其他同事商量了一下交换两个div中的数据要怎么处理，然后同事说这个就比较麻烦了= =。需要写死div，然后先记录鼠标拖动前的div中的内容，然后判断鼠标放下的位置，在哪一个div的范围内，再交换两个的数据= =，真正做起来还不知道有什么坑。听着都怕，于是就暂且搁置了这个功能，直到有一天非做不可了，我百度了一下“怎么交换两个div”，然后找到了一个demo，天啦噜~整个实现过程全部代码50行不到，js代码之后十几行，整个过程不到半个小时就解决了，*★,°*:.☆\(￣▽￣)/$:*.°★*。撒花！效果如下：
![demo效果](https://user-gold-cdn.xitu.io/2017/5/24/e214bb0885534cf1b13f15cb563563e3)
> demo地址：https://github.com/sunshine940326/drag
查看代码，发现思路如下:

 1. ondragstart（ 用户开始拖动元素时触发）的时候使用该对象的dataTransfer.setData方法，并且用中间量记录点击的div
 2. ondragover (当某被拖动的对象在另一对象容器范围内拖动时触发此事件),拖动div的时候阻止拖动的默认事件（drop 事件的默认行为是以链接形式打开）
 3. ondrop (在一个拖动过程中，释放鼠标键时触发此事件)时候交换两个div的html
 百度了一下发现这是html的新特性drag，研究了一下有如下特点
# 拖放
本例的代码如下
```
<!DOCTYPE html>
<!DOCTYPE HTML>
<html>
<head>
    <style type="text/css">
        #div1
        {float:left; width:100px; height:35px; margin:10px;padding:10px;border:1px solid #aaaaaa;}
        #div2
        {float:left; width:200px; height:135px; margin:10px;padding:10px;border:1px solid #aaaaaa;}

    </style>
    <script type="text/javascript">
        function allowDrop(ev)
        {
            ev.preventDefault();
        }

        var srcdiv = null;
        function drag(ev,divdom)
        {
            srcdiv=divdom;
            ev.dataTransfer.setData("text/html",divdom.innerHTML);
        }

        function drop(ev,divdom)
        {
            ev.preventDefault();
            if(srcdiv != divdom){
                srcdiv.innerHTML = divdom.innerHTML;
                divdom.innerHTML=ev.dataTransfer.getData("text/html");
            }
        }
    </script>
</head>
<body>

<div id="div1" ondrop="drop(event,this)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event, this)">
    <p>ni hao!</p>
</div>
<div id="div2" ondrop="drop(event,this)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event, this)">
    <p>Hello world!</p>
</div>

</body>
</html>
```
拖放是一种常见的特性，即抓取对象以后拖到另一个位置。
在 HTML5 中，拖放是标准的一部分，任何元素都能够拖放。
## 设置元素为可拖放
首先，为了使元素可拖动，把 draggable 属性设置为 true ：
`<div draggable="true"></div>`
## 设置ondragstart 和并保存数据
ondragstart 属性调用了一个函数，drag(event,this)，它规定了被拖动的数据。dataTransfer.setData() 方法设置被拖数据的数据类型和值,在这个例子中，数据类型是 "text/html"，值是可拖动元素的innerHTML
```
function drag(ev,divdom){
   srcdiv=divdom;
   ev.dataTransfer.setData("text/html",divdom.innerHTML);
}
```
## 放到何处 - ondragover
ondragover 事件规定在何处放置被拖动的数据。
默认地，无法将数据/元素放置到其他元素中。如果需要设置允许放置，我们必须阻止对元素的默认处理方式。
这要通过调用 ondragover 事件的 event.preventDefault() 方法：
event.preventDefault()
```
function allowDrop(ev){
   ev.preventDefault();
}
``` 
##进行放置 - ondrop
当放置被拖数据时，会发生 drop 事件。
在上面的例子中，ondrop 属性调用了一个函数，drop(event)：
```
 function drop(ev,divdom){
    ev.preventDefault();
    if(srcdiv != divdom){
         srcdiv.innerHTML = divdom.innerHTML;
      divdom.innerHTML=ev.dataTransfer.getData("text/html");
    }
}
``` 
 

 
 