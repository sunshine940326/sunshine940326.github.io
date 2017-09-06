---
title: 【canvas】教你实现知乎登录动态粒子背景
date: 2017-05-24 13:24:51
tags: [html5,前端,canvas] 
categories: [html5,canvas]
---
![最终效果图](http://img.blog.csdn.net/20170525212539678?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
<!--more-->
> 本文首发于我的个人博客：http://cherryblog.site/
> github项目地址：https://github.com/sunshine940326/canvas-nest


首先上效果图：
![最终效果图](http://img.blog.csdn.net/20170525212539678?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
实现起来也是很简单的， 按照我的步骤一步一步来就可以了~
# html代码
首先要制作我们的页面，用到的是html5的新标签canvas；其实canvas就是我们需要用javascript脚本语言来绘图的“画布”，只是相当于一个容器呈现我们画图的结果，所以我们在页面中需要创建一个充满屏幕的canvas
```
<body>
   <canvas id="canvas"></canvas>
   <div class="text">仿知乎动态粒子效果背景</div>
</body>
```
是的，`body`中只有这两行代码就可以了，甚至可以只有一行代码
# css样式
css样式也没有什么好说的，只是要让canvas充满屏幕就可以了
```
html{height: 100%}
        body{margin: 0;height: 100%;
            background: #fff;}
        canvas{display: block;width: 100%;height: 100%;}
        .text{
            width: 100%;
            background: transparent;
            display: flex;
            justify-content: center;
            height: 100%;
            line-height: 100%;
            top: 0;
            position: absolute;
            top: 50%;
            font-size: 50px;
        }
```
写法不唯一，只要要你的canvas是充满整个屏幕的就好，当然，你要是不需要充满屏幕也可以~
# js代码
说完了html和css，那么就剩js了，主要是通过js脚本来创建每个线段和粒子的~github上的例子中使用的是es6编写的，不过在demo中也使用了gulp安装babel可以将es6代码转化为es5（所以索demo中同时有es6的代码也有es5的代码，大家按需下载~）主要的思路如下

 1. 设置单个粒子的随机x，y坐标和圆圈的半径
 2. 使用canvas的api进行绘制粒子（圆圈）和粒子之前连线，设置一个范围，在此范围内的粒子圆心到圆心通过直线连接
 3. 让粒子在屏幕范围内移动
 4. 设置鼠标的交互事件，相当于以鼠标位置的x,y坐标为圆心，固定或随机值为半径重新创建了一个粒子，并且也在一定范围内也设置和其他粒子的连线（同第二步）
 其实思路就以上五点，只不过我们需要了解canvas的api才能绘出我们想要的结果
 
##  设置单个粒子的随机x，y坐标和圆圈的半径
```
//创建对象
    //以一个圆为对象
    //设置随机的 x，y坐标，r半径，_mx，_my移动的距离
    //this.r是创建圆的半径，参数越大半径越大
    //this._mx,this._my是移动的距离，参数越大移动
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = Math.random() * 10 ;
        this._mx = Math.random() ;
        this._my = Math.random() ;

    }
```

## canvas 画圆和画直线

```
{  //canvas 画圆和画直线
   //画圆就是正常的用canvas画一个圆
   //画直线是两个圆连线，为了避免直线过多，给圆圈距离设置了一个值，距离很远的圆圈，就不做连线处理
   drawCircle(ctx) {
      // beginPath() 方法开始一条路径，或重置当前的路径
     ctx.beginPath();   
     //arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
     ctx.arc(this.x, this.y, this.r, 0, 360)
     //closePath() 方法创建从当前点到开始点的路径。
     ctx.closePath();
     //fillStyle()方法设置或返回用于填充绘画的颜色、渐变或模式。
     ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
     //fill()方法	填充当前绘图（路径）
     ctx.fill();
   }

   drawLine(ctx, _circle) {
      let dx = this.x - _circle.x;
      let dy = this.y - _circle.y;
      let d = Math.sqrt(dx * dx + dy * dy)
      //设置粒子圆心之间连线的范围为150
      if (d < 150) {
         ctx.beginPath();
         //开始一条路径，移动到位置 this.x,this.y。创建到达位置 _circle.x,_circle.y 的一条线：
         ctx.moveTo(this.x, this.y);   //起始点
         ctx.lineTo(_circle.x, _circle.y);   //终点
         ctx.closePath();
         ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)';
          ctx.stroke();
   }
}
``` 

## 粒子移动

```
{
    // 粒子移动
    // 圆圈移动的距离必须在屏幕范围内
    move(w, h) {
    
   
        this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx);
        this._my = (this.y < h && this.y > 0) ? this._my : (-this._my);
        this.x += this._mx / 2;
        this.y += this._my / 2;
    }
}
```

## 完整js

```
class Circle {
    //创建对象
    //以一个圆为对象
    //设置随机的 x，y坐标，r半径，_mx，_my移动的距离
    //this.r是创建圆的半径，参数越大半径越大
    //this._mx,this._my是移动的距离，参数越大移动
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = Math.random() * 10 ;
        this._mx = Math.random() ;
        this._my = Math.random() ;

    }

    //canvas 画圆和画直线
    //画圆就是正常的用canvas画一个圆
    //画直线是两个圆连线，为了避免直线过多，给圆圈距离设置了一个值，距离很远的圆圈，就不做连线处理
    drawCircle(ctx) {
        ctx.beginPath();
        //arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
        ctx.arc(this.x, this.y, this.r, 0, 360)
        ctx.closePath();
        ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
        ctx.fill();
    }

    drawLine(ctx, _circle) {
        let dx = this.x - _circle.x;
        let dy = this.y - _circle.y;
        let d = Math.sqrt(dx * dx + dy * dy)
        if (d < 150) {
            ctx.beginPath();
            //开始一条路径，移动到位置 this.x,this.y。创建到达位置 _circle.x,_circle.y 的一条线：
            ctx.moveTo(this.x, this.y);   //起始点
            ctx.lineTo(_circle.x, _circle.y);   //终点
            ctx.closePath();
            ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)';
            ctx.stroke();
        }
    }

    // 圆圈移动
    // 圆圈移动的距离必须在屏幕范围内
    move(w, h) {
        this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx);
        this._my = (this.y < h && this.y > 0) ? this._my : (-this._my);
        this.x += this._mx / 2;
        this.y += this._my / 2;
    }
 }
 //鼠标点画圆闪烁变动
 class currentCirle extends Circle {
    constructor(x, y) {
        super(x, y)
    }

    drawCircle(ctx) {
        ctx.beginPath();
        //注释内容为鼠标焦点的地方圆圈半径变化
        //this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2;
        this.r = 8;
        ctx.arc(this.x, this.y, this.r, 0, 360);
        ctx.closePath();
        //ctx.fillStyle = 'rgba(0,0,0,' + (parseInt(Math.random() * 100) / 100) + ')'
        ctx.fillStyle = 'rgba(255, 77, 54, 0.6)'
        ctx.fill();

    }
 }
 //更新页面用requestAnimationFrame替代setTimeout
 window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

 let canvas = document.getElementById('canvas');
 let ctx = canvas.getContext('2d');
 let w = canvas.width = canvas.offsetWidth;
 let h = canvas.height = canvas.offsetHeight;
 let circles = [];
 let current_circle = new currentCirle(0, 0)

 let draw = function () {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < circles.length; i++) {
        circles[i].move(w, h);
        circles[i].drawCircle(ctx);
        for (j = i + 1; j < circles.length; j++) {
            circles[i].drawLine(ctx, circles[j])
        }
    }
    if (current_circle.x) {
        current_circle.drawCircle(ctx);
        for (var k = 1; k < circles.length; k++) {
            current_circle.drawLine(ctx, circles[k])
        }
    }
    requestAnimationFrame(draw)
 }

 let init = function (num) {
    for (var i = 0; i < num; i++) {
        circles.push(new Circle(Math.random() * w, Math.random() * h));
    }
    draw();
 }
 window.addEventListener('load', init(60));
 window.onmousemove = function (e) {
    e = e || window.event;
    current_circle.x = e.clientX;
    current_circle.y = e.clientY;
 }
 window.onmouseout = function () {
    current_circle.x = null;
    current_circle.y = null;
};
```


# 更多canvas的api
canvas现在可以写出很多酷炫的效果，详细的api请见：http://www.runoob.com/jsref/dom-obj-canvas.html
 
 
  
