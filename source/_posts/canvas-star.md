---
title: 【canvas】一个少女心满满的例子带你入门 canvas
date: 2017-08-06 14:40:06
tags: [html5,canvas]
categories: [HTML]
top: 8
---

![canvas入门](http://img.blog.csdn.net/20170801184128503?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

> 本文首发于我的个人博客：http://cherryblog.site/ 
> github项目地址：https://github.com/sunshine940326/canvasStar
> 项目演示地址：https://sunshine940326.github.io/canvasStar/

<!--more-->

之前看到了一个很好看的canvas效果，然后拿来做我的博客背景，不少童鞋留言说求教程，并且反应说太耗内存，于是前一段我就重写了一遍，并且使用离屏渲染进行优化，效果还是挺显著的。但是因为毕竟是canvas，需要一直进行重绘，所以还是比较耗内存的，但是比优化之前已经好很多了。并且最近准备自己写插件，于是就拿这个练手了，

github地址：https://github.com/sunshine940326/canvasStar 

代码还有很多的不足，求大神 review (づ｡◕‿‿◕｡)づ~

# canvas 基本知识
## 什么是 canvas
`canvas` 是 HTML5 新定义的标签，通过使用脚本（通常是 JavaScript）绘制图形。
`<canvas>`  标签只是图形容器，相当于一个画布，`canvas` 元素本身是没有绘图能力的。所有的绘制工作必须在 JavaScript 内部完成，相当于使用画笔在画布上画画。

默认情况下，`<canvas>` 没有边框和内容。默认是一个 300*150 的画布，所以我们创建了 `<canvas>` 之后要对其设置宽高。
**我们可以通过html属性‘width’，‘height’来设置canvas的宽高，不可以通过 css 属性来设置宽高。因为通过 css 属性设置的宽高会使 canvas 内的图像按照 300*150 时的比例放大或缩小**

## getContext()
`context` 是一个封装了很多绘图功能的对象，我们在页面中创建一个 `canvas` 标签之后，首先要使用 `getContext()` 获取 canvas 的上下文环境，目前 `getContext()` 的参数只有 `2d`，暂时还不支持 `3d` 

`getContext("2d")` 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。

##  canvas 元素绘制图像
canvas 创建图形有两种方式
### context.fill()
`fill()` 方法填充当前的图像（路径）。默认颜色是黑色。在填充前要先使用 `fillStyle` 设置填充的颜色或者渐变，并且如果路径未关闭，那么 `fill()` 方法会从路径结束点到开始点之间添加一条线，以关闭该路径（正如 `closePath()` 一样），然后填充该路径。
### context.stroke()
`stroke()` 方法会实际地绘制出通过 `moveTo()` 和 `lineTo()` 方法定义的路径。默认颜色是黑色。在进行图形绘制前，要设置好绘图的样式
```
fillStyle()//填充的样式
strokeStyle()//边框样式
context.lineWidth()//图形边框宽度
```
## 绘制矩形
用 canvas 绘制一个矩形很简单
```
fillRect(x,y,width,height)  // 实心矩形 
strokeRect(x,y,width,height)        // 空心矩形
```

 - x ：起始点的 x 坐标
 - y ：起始点的 y 坐标
 - width ： 矩形的宽
 - height ： 矩形的高

```
//html代码
<canvas id="canvas"></canvas>
//script代码
   var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.fillRect(0, 0, 100, 100);
    context.strokeRect(120, 0, 100, 100);
```
显示如下：
![canvas绘制矩形有填充颜色](http://img.blog.csdn.net/20170803192642241?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

我们可以看出，在没有设置颜色的情况下，默认是黑色的。

我们还可以通过设置 `fillStyle` 或者 `fillStyle` 改变其填充颜色。
```
context.fillStyle = "pink";
context.strokeStyle = "darkred";
context.fillRect(0, 0, 100, 100);
context.strokeRect(120, 0, 100, 100);
```
效果如下
![canvas绘制矩形有填充颜色](http://img.blog.csdn.net/20170803200651020?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 清除矩形区域

clearRect(x,y,width,height)
``` 
 - x ：清除矩形起始点的 x 坐标
 - y ：清除矩形起始点的 y 坐标
 - width ： 清除矩形矩形的宽
 - height ： 清除矩形矩形的高
```
var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
context.fillRect(0, 0, 100, 100);
context.strokeRect(120, 0, 100, 100);
context.fillStyle = "pink";
context.strokeStyle = "darkred";
context.fillRect(0, 120, 100, 100);
context.strokeRect(120, 120, 100, 100);
context.clearRect( 50,50,120,120)

效果如下：

![清除矩形](http://img.blog.csdn.net/20170803201130050?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 实心圆
`context.arc(x, y, radius, starAngle,endAngle, anticlockwise)`
 - x : 圆心的 x 坐标
 - y：圆心的 y 坐标
 - radius ： 半径
 - starAngle ：开始角度
 - endAngle：结束角度
 - anticlockwise ：是否逆时针（true）为逆时针，(false)为顺时针
```
context.beginPath();
context.arc(300, 350, 100, 0, Math.PI * 2, true);
//不关闭路径路径会一直保留下去
context.closePath();
context.fillStyle = 'rgba(0,255,0,0.25)';
context.fill();
```
效果如下：

![canvas绘制圆弧](http://img.blog.csdn.net/20170803201728632?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 圆弧
如果不填充颜色，实心圆就是圆弧
```
    context.beginPath();
    context.arc(600, 350, 100, 0, Math.PI , true);
    context.strokeStyle = 'pink';
    context.closePath();
    context.stroke();
   
    context.beginPath();
    context.arc(300, 350, 100, 0, Math.PI , true);
    context.strokeStyle = 'red';
    //没有closePath
    context.stroke();
```
效果如图：
![canvas绘制圆弧](http://img.blog.csdn.net/20170804121122961?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

 - 系统默认在绘制第一个路径的开始点为beginPath
 - 如果画完前面的路径没有重新指定beginPath，那么画第其他路径的时候会将前面最近指定的beginPath后的全部路径重新绘制
 - 每次调用context.fill（）的时候会自动把当次绘制的路径的开始点和结束点相连，接着填充封闭的部分

所以说，如果第一个圆弧没有 `closePath()` 并且第二个圆弧没有 `beginPath()` 的话就是这样的效果：

![canvas绘制矩形](http://img.blog.csdn.net/20170804121543455?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

##  绘制线段 
 - `moveTo(x,y)`：把路径移动到画布中的指定点，不创建线条
 - `lineTo(x,y)`：添加一个新点，然后在画布中创建从该点到最后指定点的线条
 - 每次画线都从 moveTo 的点到 lineTo 的点，

```
    context.strokeStyle = 'pink';
    context.moveTo(0, 0);
    context.lineTo(100, 100);
    context.stroke();*/
```
效果如下：
![canvas绘制片段](http://img.blog.csdn.net/20170804121929082?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
**如果没有 moveTo 那么第一次 lineTo 的效果和 moveTo 一样，**
例如：

```
    context.strokeStyle = 'pink';
    context.lineTo(100, 100);
    context.lineTo(200, 200);
    context.stroke();*/
```
效果如下：
![canvas绘制线段](http://img.blog.csdn.net/20170804122123451?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
**每次lineTo后如果没有moveTo，那么下次lineTo的开始点为前一次lineTo的结束点**
例如：
```
// 绘制片段
    context.strokeStyle = 'pink';
    context.lineTo(200, 200);
    context.lineTo(200, 100);
    context.lineTo(100,50);
    context.stroke();
```
效果如下：
![canvas绘制线段](http://img.blog.csdn.net/20170804122231176?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
我们可以使用 canvas 的线段绘制各种各样的图形，比如绘制一个六边形
```
var n = 0;
    var dx = 150;
    var dy = 150;
    var s = 100;
    context.beginPath();
    context.fillStyle = 'pink';
    context.strokeStyle = 'rgb(0,0,100)';
    var x = Math.sin(0);
    var y = Math.cos(0);
    var dig = Math.PI / 15 * 5;
    for (var i = 0; i < 6; i++) {
        var x = Math.sin(i * dig);
        var y = Math.cos(i * dig);
        context.lineTo(dx + x * s, dy + y * s);
        console.log( x ,y )
    }
    context.closePath();
    context.fill();
    context.stroke();
```
![使用canvas绘制六边形](http://img.blog.csdn.net/20170804151434159?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
绘制 30 角形：
```
var n = 0;
    var dx = 150;
    var dy = 150;
    var s = 100;
    context.beginPath();
    context.fillStyle = 'pink';
    context.strokeStyle = 'rgb(0,0,100)';
    var x = Math.sin(0);
    var y = Math.cos(0);
    var dig = Math.PI / 15 * 7;
    for (var i = 0; i < 30; i++) {
        var x = Math.sin(i * dig);
        var y = Math.cos(i * dig);
        context.lineTo(dx + x * s, dy + y * s);
        console.log( x ,y )
    }
    context.closePath();
    context.fill();
    context.stroke();
```
效果如下：

![canvas绘制 30 脚形](http://img.blog.csdn
.net/20170804152344651?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 线性渐变
`var lg= context.createLinearGradient(xStart,yStart,xEnd,yEnd)`
`lg.addColorStop(offset,color)`

 - xstart:渐变开始点x坐标
 - ystart:渐变开始点y坐标
 - xEnd:渐变结束点x坐标
 - yEnd:渐变结束点y坐标
 - offset:设定的颜色离渐变结束点的偏移量(0~1)
 - color:绘制时要使用的颜色

例如：
```
    var g1 = context.createLinearGradient(0, 0, 0, 300);
    g1.addColorStop(0, '#E55D87'); 
    g1.addColorStop(1, '#5FC3E4');
    context.fillStyle = g1;
    context.fillRect(0, 0, 400, 300);
```
效果如下：

![canvas绘制渐变](http://img.blog.csdn.net/20170804164331469?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 径向渐变

`var rg=context.createRadialGradient(xStart,yStart,radiusStart,xEnd,yEnd,radiusEnd)`
`rg.addColorStop(offset,color)`

 - xStart：发散开始圆心x坐标
 - yStart：发散开始圆心y坐标
 - radiusStart：发散开始圆的半径
 - xEnd：发散结束圆心的x坐标
 -  yEnd：发散结束圆心的y坐标
 - radiusEnd：发散结束圆的半径
 - offset：设定的颜色离渐变结束点的偏移量(0~1)
 - color：绘制时要使用的颜色

![径向渐变原理](http://pic002.cnblogs.com/images/2012/407398/2012080314164328.png)
例如：
```
// 同心圆径向渐变
    var g1 = context.createRadialGradient(200, 150, 0, 200, 150, 200);
    g1.addColorStop(0.1, '#F09819');
    g1.addColorStop(1, '#EDDE5D');
    context.fillStyle = g1;
    context.beginPath();
    context.arc(200, 150, 100, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
```
![canvas绘制同心圆径向渐变](http://img.blog.csdn.net/20170804172346775?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
```
//不同圆心的径向渐变模型
    var g1 = context.createRadialGradient(100, 150, 10, 300, 150, 80);
    g1.addColorStop(0.1, '#F09819');
    g1.addColorStop(0.8, 'red');
    g1.addColorStop(1, '#EDDE5D');

    context.fillStyle = g1;
    context.fillRect(0, 0, 300, 500);
```
效果图：

![不同圆心径向渐变](http://img.blog.csdn.net/20170804175425719?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 图形变形 

### 缩放

`scale(x,y)`
 - x ：x坐标轴按 x 比例缩放
 - y ：x坐标轴按 y 比例缩放

### 旋转

`rotate(angle)`
 -  angle ：坐标轴旋转x角度（角度变化模型和画圆的模型一样）

### 平移

`translate(x,y)`

 - x ：坐标原点向x轴方向平移x
 - y ：坐标原点向y轴方向平移y

平移，缩放，旋转先后顺序不同，坐标轴的变化图，图片来源于网络：

![平移缩放旋转先后顺序不同坐标轴的变化图](http://pic002.cnblogs.com/images/2012/407398/2012080316350654.png)

## 图形组合

`globalCompositeOperation=type`
设置或返回新图像如何绘制到已有的图像上。最后的效果取决于 type 的值
type：
 - source-over（默认值）:在原有图形上绘制新图形
 - destination-over:在原有图形下绘制新图形
 - source-in:显示原有图形和新图形的交集，新图形在上，所以颜色为新图形的颜色
 - destination-in:显示原有图形和新图形的交集，原有图形在上，所以颜色为原有图形的颜色
 - source-out:只显示新图形非交集部分
 - destination-out:只显示原有图形非交集部分
 - source-atop:显示原有图形和交集部分，新图形在上，所以交集部分的颜色为新图形的颜色
 - destination-atop:显示新图形和交集部分，新图形在下，所以交集部分的颜色为原有图形的颜色
 - lighter:原有图形和新图形都显示，交集部分做颜色叠加
 - xor:重叠飞部分不现实
 - copy:只显示新图形
效果图如下，图片来源于网络

![效果图](http://pic002.cnblogs.com/images/2012/407398/2012080317515321.png)

## 阴影

```
shadowOffsetX：设置或返回阴影距形状的水平距离（默认值为 0）
shadowOffsetY：设置或返回阴影距形状的垂直距离（默认值为 0）
shadowColor：设置或返回用于阴影的颜色
shadowBlur：设置或返回用于阴影的模糊级别（值越大越模糊）
```

例如：

```
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(100,100,10,0,2 * Math.PI);
    context.shadowColor = 'white';
    context.shadowBlur = 10;
    context.fill();
    context.closePath();
```

我们看到的效果就是我们在开头提起的例子中的 star 粒子的效果，因为其有白色阴影的效果，所以看起来像是发光一样，效果如下图：

![带阴影效果的圆形](http://img.blog.csdn.net/20170805132804029?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 图像绘制
`drawImage()`
向画布上绘制图像、画布或视频

 - 在画布上定位图像：`context.drawImage(img,x,y);`
 - 在画布上定位图像，并规定图像的宽度和高度：`context.drawImage(img,x,y,width,height);` 
 - 剪切图像，并在画布上定位被剪切的部分：`context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);`
 -  `img`：规定要使用的图像、画布或视频。
 - `sx`：可选。开始剪切的 x 坐标位置。
 - `sy`：可选。开始剪切的 y 坐标位置。
 - `swidth`：可选。被剪切图像的宽度。
 - `sheight`：可选。被剪切图像的高度。
 - `x`：在画布上放置图像的 x 坐标位置。
 - `y`：在画布上放置图像的 y 坐标位置。
 - `width`：可选。要使用的图像的宽度。（伸展或缩小图像）
 - `height`：可选。要使用的图像的高度。（伸展或缩小图像）
  
![canvas绘制图形例子](http://pic002.cnblogs.com/images/2012/407398/2012080410231479.png)

## 图像平铺
`createPattern(image,type)`
type:

 - no-repeat:不平铺
 - repeat-x:横方向平铺
 - repeat-y:纵方向平铺
 - repeat:全方向平铺

## 图像裁剪

`clip()`从原始画布剪切任意形状和尺寸的区域，需要先创建裁剪区域，再绘制图像；一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）。您也可以在使用 clip() 方法前通过使用 save() 方法对当前画布区域进行保存，并在以后的任意时间对其进行恢复（通过 restore() 方法）。
例如：

```
    // 设置剪切区域（粉色矩形）
    context.rect(0,0,500,400);
    context.fillStyle = "pink";
    context.fill();
    context.clip();

    // 在剪切区域中绘制图形（白色矩形）
    context.fillStyle = "white";
    context.fillRect(10,10,100,100);

    // 之后绘制的图形只能显示在剪切区域之内（红色矩形）
    context.fillStyle = "red";
    context.fillRect(100,100,600,600)

```

效果如下：可以看到我们设置的红色矩形是一个 600*600 的矩形，但是显然是没有显示完的，**一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）。**

![canvas进行图像剪切](http://img.blog.csdn.net/20170805163432597?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

所以说我们可以在使用 clip() 方法前通过使用 save() 方法对当前画布区域进行保存，并在以后的任意时间对其进行恢复（通过 restore() 方法）。
代码如下：

```
context.save();
    // 设置剪切区域
    context.rect(0,0,500,400);
    context.fillStyle = "pink";
    context.fill();
    context.clip();

    // 在剪切区域中绘制图形
    context.fillStyle = "white";
    context.fillRect(10,10,100,100);

    context.restore();
    // 之后绘制的图形只能显示在剪切区域之内
    context.fillStyle = "red";
    context.fillRect(100,100,600,600)
```

这样就可以正常显示了：

![canvas进行图像裁剪](http://img.blog.csdn.net/20170805163713137?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 绘制文字

```
fillText(text,x,y)：绘制实心文字
strokeText()：绘制文字描边（空心）
textAlign：设置或返回文本内容的当前对齐方式
textBaseline：设置或返回在绘制文本时使用的当前文本基线
font：设置或返回文本内容的当前字体属性
```

例如：

```
    context.font="40px Arial";
    context.fillText("Hello world",200,200);
    context.strokeText("Hello world",200,300)
```

效果如下：

![canvas绘制文字](http://img.blog.csdn.net/20170806152010585?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

# 准备工作

> 好的开始是成功的一半

简单介绍了下 canvas 的常用 api，大家发现是不是也没有那么难呢~(￣▽￣)~*，那么让我们回到标题，一起来看一下这个少女心满满的例子是怎样实现的~

canvas 其实写一个炫酷的特效在技术上并不难，难的是你的创意，因为 canvas 实现粒子的效果还是比较惊艳的，但其实代码都是比较简单的，无非就是随机的创建图形或者路径，当然图形也是闭合的路径。在加上一定的位移就可以了。但是你要设计出一个好的特效是非常不容易的。

所以我们就先来分析一下这个效果由那几部分构成，将其拆分开来。

特效pc端演示地址：https://sunshine940326.github.io/canvasStar/ （当然，可以直接查看我的博客，背景暂时就是这个，不知道什么时候会变，捂脸ing：http://cherryblog.site/）

## 分析 star 的表现和行为
我们可以将其一直位移向上的粒子称为 star，我们观察 star 的特点：

 - 开始创建时位置随机（坐标随机）
 - 透明度随机
 - 创建时的大小在一定范围内（半径在一定范围内）
 - 匀速上升
 - 总数不变

所以我们就可以总结出 star 的特点就是总数固定，创建时坐标和半径还有透明度随机，匀速上升。是不是很简单了呢~[]~(￣▽￣)~*

## 分析 dot 的表现和行为
再让我们来看一下随着鼠标移入产生的粒子，我们称为 dot，同理，我们观察得到 dot 的特点

 - 列表内容
 - 鼠标移动时产生
 - 新产生的 dot 和之前的 3 个 dot 产生连线
 - 向四周移动
 - 达到一定条件消失
 
这样，我们就完成了一半了呢~将事件屡清楚之后我们就可以开始着手撸代码了！

## 背景的 HTML 和 CSS

其实需要的 HTML 代码和 CSS 代码很简答的，HTML 只需要一行就可以了呢，设置一个渐变的背景蒙层和一个 `canvas` 标签。

HTML 和 CSS 如下：

```

<div class="filter"></div>
<canvas id="canvas"></canvas>

html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: black;
            background: linear-gradient(to bottom, #dcdcdc 0%, palevioletred 100%);
        }

        #main-canvas {
            width: 100%;
            height: 100%;
        }

        .filter {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: #fe5757;
            animation: colorChange 30s ease-in-out infinite;
            animation-fill-mode: both;
            mix-blend-mode: overlay;

        }

        @keyframes colorChange {
            0%, 100% {
                opacity: 0;
            }
            50% {
                opacity: .7;
            }
        }
```

是的，我使用的是一个渐变的背景，不仅是从上到下的渐变，并且颜色也是会渐变的，效果如下：

![渐变背景](http://img.blog.csdn.net/20170806160547970?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

# 设置参数以及获取 dom 对象

```
    /*
     * @var star_r：star半径系数，系数越大，半径越大
     * @var star_alpha：生成star的透明度，star_alpha越大，透明度越低
     * @var initStarsPopulation：初始化stars的个数
     * @var move_distance：star位移的距离，数值越大，位移越大
     * @var dot_r : dot半径系数，系数越大，半径越大
     * @var dot_speeds : dots运动的速度
     * @var dot_alpha : dots的透明度
     * @var aReduction：dot消失条件，透明度小于aReduction时消失
     * @var dotsMinDist：dot最小距离
     * @var maxDistFromCursor：dot最大距离
     * */
    var config = {
        star_r : 3,
        star_alpha : 5,
        initStarsPopulation : 150,
        move_distance : 0.25,
        dot_r : 5,
        dot_speeds : 0.5,
        dot_alpha : 0.5,
        dot_aReduction : 0.01,
        dotsMinDist : 5,
        maxDistFromCursor : 50,
    };
    var stars = [],
        dots = [],
        canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        WIDTH,
        HEIGHT,
        mouseMoving = false,
        mouseMoveChecker,
        mouseX,
        mouseY;
```

# 绘制单个 star

```
    /* 设置单个 star
     * @param id：id
     * @param x：x坐标
     * @param y：y坐标
     * @param useCache：是否使用缓存
     * */
    function Star(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.cacheCanvas = document.createElement("canvas");
        this.cacheCtx = this.cacheCanvas.getContext("2d");
        this.r = Math.floor(Math.random() * star_r) + 1;
        this.cacheCtx.width = 6 * this.r;
        this.cacheCtx.height = 6 * this.r;
        var alpha = ( Math.floor(Math.random() * 10) + 1) / star_alpha;
        this.color = "rgba(255,255,255," + alpha + ")";
        if (useCache) {
            this.cache()
        }
    }
```

# 让每一个 star 动起来
这里我使用的是原型的方式，将 `draw`、`cache`、`move` 和 `die` 方法都设置在 `Star` 的原型上，这样在使用 `new` 创建对象的时候，每一个 star 都可以继承这些方法。

```
Star.prototype = {
        draw : function () {
            if (!this.useCacha) {
                ctx.save();
                ctx.fillStyle = this.color;
                ctx.shadowBlur = this.r * 2;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            } else {
                ctx.drawImage(this.cacheCanvas, this.x - this.r, this.y - this.r);
            }
        },

        cache : function () {
            this.cacheCtx.save();
            this.cacheCtx.fillStyle = this.color;
            this.cacheCtx.shadowColor = "white";
            this.cacheCtx.shadowBlur = this.r * 2;
            this.cacheCtx.beginPath();
            this.cacheCtx.arc(this.r * 3, this.r * 3, this.r, 0, 2 * Math.PI);
            this.cacheCtx.closePath();
            this.cacheCtx.fill();
            this.cacheCtx.restore();
        },

        move : function () {
            this.y -= move_distance;
            if (this.y <= -10) {
                this.y += HEIGHT + 10;
            }
            this.draw();
        },

        die : function () {
            stars[this.id] = null;
            delete stars[this.id]
        }
    };
```

# 绘制 dot 

```
function Dot(id, x, y, useCache) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = Math.floor(Math.random() * dot_r)+1;
        this.speed = dot_speeds;
        this.a = dot_alpha;
        this.aReduction = dot_aReduction;
        this.useCache = useCache;
        this.dotCanvas = document.createElement("canvas");
        this.dotCtx = this.dotCanvas.getContext("2d");
        this.dotCtx.width = 6 * this.r;
        this.dotCtx.height = 6 * this.r;
        this.dotCtx.a = 0.5;
        this.color = "rgba(255,255,255," + this.a +")";
        this.dotCtx.color = "rgba(255,255,255," + this.dotCtx.a + ")";
        this.linkColor = "rgba(255,255,255," + this.a/4 + ")";
        this.dir = Math.floor(Math.random()*140)+200;

        if( useCache){
            this.cache()
        }
    }
```

# 让每一个 dot 动起来

```
Dot.prototype = {
        draw : function () {
            if( !this.useCache){
                ctx.save();
                ctx.fillStyle = this.color;
                ctx.shadowColor = "white";
                ctx.shadowBlur = this.r * 2;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }else{
                ctx.drawImage(this.dotCanvas, this.x - this.r * 3, this.y - this.r *3);

            }
        },

        cache : function () {
            this.dotCtx.save();
            this.dotCtx.a  -= this.aReduction;
            this.dotCtx.color = "rgba(255,255,255," + this.dotCtx.a + ")";
            this.dotCtx.fillStyle = this.dotCtx.color;
            this.dotCtx.shadowColor = "white";
            this.dotCtx.shadowBlur = this.r * 2;
            this.dotCtx.beginPath();
            this.dotCtx.arc(this.r * 3, this.r * 3, this.r, 0, 2 * Math.PI, false);
            this.dotCtx.closePath();
            this.dotCtx.fill();
            this.dotCtx.restore();
        },
        link : function () {
            if (this.id == 0) return;
            var previousDot1 = getPreviousDot(this.id, 1);
            var previousDot2 = getPreviousDot(this.id, 2);
            var previousDot3 = getPreviousDot(this.id, 3);
            var previousDot4 = getPreviousDot(this.id, 4);


            if (!previousDot1) return;
            ctx.strokeStyle = this.linkColor;
            ctx.moveTo(previousDot1.x, previousDot1.y);
            ctx.beginPath();
            ctx.lineTo(this.x, this.y);
            if (previousDot2 != false) ctx.lineTo(previousDot2.x, previousDot2.y);
            if (previousDot3 != false) ctx.lineTo(previousDot3.x, previousDot3.y);
            if (previousDot4 != false) ctx.lineTo(previousDot4.x, previousDot4.y);

            ctx.stroke();
            ctx.closePath();
        },

        move : function () {


            this.a -= this.aReduction;
            if(this.a <= 0 ){
                this.die();
                return
            }
            this.dotCtx.a  -= this.aReduction;
            this.dotCtx.color = "rgba(255,255,255," + this.dotCtx.a + ")";
            this.color = "rgba(255,255,255," + this.a + ")";
            this.linkColor = "rgba(255,255,255," + this.a/4 + ")";
            this.x = this.x + Math.cos(degToRad(this.dir)) * this.speed;
            this.y = this.y + Math.sin(degToRad(this.dir)) * this.speed;

            this.draw();
            this.link();

        },

        die : function () {
            dots[this.id] = null;
            delete dots[this.id];
        }
    };
```

# 鼠标移入事件监听
此外，我们还需要设置一些其他的函数和对鼠标移入事件的监听，这里就不再赘述了，感兴趣的同学可以直接到 github 下载源码。

# canvas 离屏渲染优化
我所使用的离屏优化是基于此文，原文写的很好，大家感兴趣的话可以去看一下：http://www.cnblogs.com/axes/p/3567364.html?utm_source=tuicool&utm_medium=referral。
因为这个效果之前我也在博客用当做背景过，不少同学都反应很卡，所以我就找了下优化的教程做了下优化，我发现对性能影响最大的可能就是 canvas 的离屏渲染优化了，这也是 canvas 的最常见优化之一。

名字听起来很复杂，什么离屏渲染，其实就是设置缓存，绘制图像的时候在屏幕之外的地方绘制好，然后再直接拿过来用，这不就是缓存的概念吗?!︿(￣︶￣)︿.

> 建立两个 canvas 标签，大小一致，一个正常显示，一个隐藏（缓存用的，不插入dom中），先将结果draw缓存用的canvas上下文中，因为游离canvas不会造成ui的渲染，所以它不会展现出来，再把缓存的内容整个裁剪再 draw 到正常显示用的 canvas 上，这样能优化不少。

其实已经体现在上述的代码中的，比如，创建 star 的代码中：

```
 /* 设置单个star
     * @param id：id
     * @param x：x坐标
     * @param y：y坐标
     * @param useCache：是否使用缓存
     * */
    function Star(id, x, y, useCache) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.useCacha = useCache;
        this.cacheCanvas = document.createElement("canvas");
        this.cacheCtx = this.cacheCanvas.getContext("2d");
        this.r = Math.floor(Math.random() * star_r) + 1;
        this.cacheCtx.width = 6 * this.r;
        this.cacheCtx.height = 6 * this.r;
        var alpha = ( Math.floor(Math.random() * 10) + 1) / star_alpha;
        this.color = "rgba(255,255,255," + alpha + ")";
        if (useCache) {
            this.cache()
        }
    }
```

细心的同学可能就会发现

```
        this.cacheCanvas = document.createElement("canvas");
        this.cacheCtx = this.cacheCanvas.getContext("2d");
```

这段代码就是又创建了一个 canvas 标签，然后再 star 的原型中有一个 cache 方法，这个 cache 方法就是在刚刚创建的 canvas 中绘制 star，而不是直接在原来的 canvas 画布中绘制的。

```
        cache : function () {
            this.cacheCtx.save();
            this.cacheCtx.fillStyle = this.color;
            this.cacheCtx.shadowColor = "white";
            this.cacheCtx.shadowBlur = this.r * 2;
            this.cacheCtx.beginPath();
            this.cacheCtx.arc(this.r * 3, this.r * 3, this.r, 0, 2 * Math.PI);
            this.cacheCtx.closePath();
            this.cacheCtx.fill();
            this.cacheCtx.restore();
        },
```

之后我们需要将我们绘制的离屏 canvas 使用 `drawImage` 方法插入到我们最先开始创建的 canvas 画布中。

这里要注意的是，创建的离屏 canvas 的大小，因为太大的话同样会浪费性能，所以我们可以创建和我们每一个 star 粒子相同的 canvas ，但是这个例子中不适用，要将离屏的 canvas 设置的稍微大一些，因为我们还需要设置发光的效果（也就是设置阴影）。

# 发福利
发福利的时间到了~╰(￣▽￣)╭，很多小伙伴对 canvas 不是很感兴趣，但是想直接使用这个效果，于是我就将其封装起来，你只需要引入这个 JS，在 HTML 中添加一个 id 为 canvas 的标签，然后设置相应的 CSS 就可以~

> github 下载地址：https://github.com/sunshine940326/canvasStar

在 README 中有使用方法~因为是第一次自己封装函数，自己一个人在不停的摸索中前进，所以还有很多的不足，希望有大神可以指点一二~






 