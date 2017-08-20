---
title: 常见 CSS 布局方式
date: 2017-08-20 14:40:06
tags: [CSS]
categories: [CSS]
top: 1000
---

![](https://user-gold-cdn.xitu.io/2017/8/20/b6e622a73fdbf94b10e7e22a6023f2db?imageView2/1/w/1200/h/700/q/85/interlace/1)

# 前言
温馨提示：本文较长，图片较多，本来是想写一篇 CSS 布局方式的，但是奈何 CSS 布局方式种类太多并且实现方法太多，所以本文主要是介绍 flex 布局和 grid 布局，以及 CSS 常见的居中方式和两种经典的布局方式“圣杯布局”和“双飞翼布局”。想到哪写到哪，请各位见谅。
<!--more-->


![本文思维导图，欢迎补充](http://img.blog.csdn.net/20170818161843140?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)


# 传统盒模型布局方式
我们的传统布局方式就是通过盒模型，使用 `display` 属性（文档流布局） + `position` 属性（定位布局） + `float`属性（浮动布局）。这个大家都比较熟悉，没有掌握的同学再去恶补一下基础
## 文档流布局
这是最基本的布局方式，就是按照文档的顺序一个一个显示出来，块元素独占一行，行内元素共享一行，这个相信大家都比较熟悉了，就不再赘述了

## 浮动布局
浮动方式布局就是使用 `float` 属性，使元素脱离文档流，浮动起来。这个大家也比较熟悉，就不再赘述了。

## 定位布局
我们也可以通过 `position` 属性来进行定位，这个大家也比较熟悉了，就不再赘述了。

# flex 布局
![image](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071002.png)
仅仅通过上述的三种布局方式还是有一些缺陷，比如我们不能只使用一个属性来实现垂直居中布局，所以就产生了第四种布局方式：flex 布局。

## 什么是 flex 布局

> 2009年，W3C 提出了一种新的方案----Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。

> Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

flex 是一种新型的布局方式，使用该布局方式可以实现几乎所有你想要的效果。但是要注意其浏览器的兼容性，flex 只支持 ie 10+，所有还是要根据你的项目情况使用（没错，我们要求至少 ie 9，(ಥ_ಥ)）。
![flex 的浏览器支持情况](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071003.jpg)

## 使用 flex 布局
flex 的使用方法很简单，只需要将其 `display` 属性设置为 `flex` 就可以，也可以设置行内的 flex，记得 Webkit 内核的浏览器，必须加上 `-webkit` 前缀。**注意，设为 Flex 布局以后，子元素的 `float`、`clear` 和 `vertical-align` 属性将失效。**
```css
   .ele{
       display: -webkit-flex;
       display: flex;
       display: inline-flex;
       display: -webkit-inline-flex;
   }
```
> 在 flex 中，最核心的概念就是容器和轴，所有的属性都是围绕容器和轴设置的。其中，容器分为父容器和子容器。轴分为主轴和交叉轴（主轴默认为水平方向，方向向右，交叉轴为主轴顺时针旋转 90°）。

在使用 flex 的元素中，默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）
主轴开始的位置称为 `main start`，主轴结束的位置称为 `main end`。
同理，交叉轴开始的位置称为 `cross start`，交叉轴结束的位置称为 `cross end`。
在使用 flex 的子元素中，占据的主轴空间叫做 `main size`，占据的交叉轴空间叫做 `cross size`。

![flex基本概念](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)

### 父容器属性
父容器上有六个属性
- [flex-direction：主轴的方向。](#flex-direction)
- [flex-wrap：超出父容器自容器的排列样式。](flex-wrap)
- flex-flow：`flex-direction` 属性和 `flex-wrap` 属性的简写形式。
- justify-content：子容器在主轴的排列方向。
- align-items：子容器在交叉轴的排列方向。
- align-content：多根轴线的对齐方式。

#### <span id="flex-direction">flex-direction 属性</span>
flex-direction 属性决定主轴的方向（**主轴的方向不一定是水平的，这个属性就是设置主轴的方向，主轴默认是水平方向，从左至右，如果主轴方向设置完毕，那么交叉轴就不需要设置，交叉轴永远是主轴顺时针旋转 90°**）。
```css
.ele {
  flex-direction: row;                // 默认值，主轴为水平方向，起点在左端。
  flex-direction: row-reverse;        // 主轴为水平方向，起点在右端。
  flex-direction: column;             // 主轴为垂直方向，起点在上。
  flex-direction: column-reverse;     // 主轴为垂直方向，起点在下。
}
```
![flex-direction 属性](http://img.blog.csdn.net/20170813144447429?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

#### <span id="flex-wrap">flex-wrap 属性</span>
`flex-wrap` 属性决定子容器如果在一条轴线排不下时，如何换行。
```css
.ele {
 flex-wrap: nowrap;          // 默认，不换行
 flex-wrap: wrap;            // 换行，第一行在上方。
 flex-wrap: wrap-reverse     // 换行，第一行在下方。
```
![flex-wrap 属性](http://img.blog.csdn.net/20170813183945775?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

#### justify-content 属性
`justify-content` 属性定义了子容器在主轴上的对齐方式。

```css
.ele{
    justify-content: flex-start;      // 默认，左对齐
    justify-content: flex-end;        // 右对齐
    justify-content: center;          // 居中
    justify-content: space-between;   // 两端对齐，项目之间的间隔都相等。
    justify-content: space-around;    // 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
    
}
```![justify-content 属性](http://img.blog.csdn.net/20170813202345666?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

#### flex-flow 属性
`flex-flow` 属性是 `flex-direction` 属性和 `flex-wrap` 属性的简写形式，默认值为 `row nowrap`。

```css
.ele {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

#### align-items 属性
`align-items`属性定义自容器在交叉轴上如何对齐。
具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。

```css
.ele{
    align-items: flex-start;    // 交叉轴的起点对齐。
    align-items: flex-end;      // 交叉轴的终点对齐。
    align-items: center;        // 交叉轴的中点对齐。
    align-items: baseline;      // 项目的第一行文字的基线对齐。
    align-items: stretch;       // 默认，如果项目未设置高度或设为auto，将占满整个容器的高度。
}
```
![align-items 属性](http://img.blog.csdn.net/20170813203714645?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

#### align-content 属性
`align-content` 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
```
.ele{
    align-content: flex-start;   // 与交叉轴的起点对齐
    align-content; flex-end;     // 与交叉轴的终点对齐。
    align-content: center;       // 与交叉轴的中点对齐。
    align-content: space-between;// 与交叉轴两端对齐，轴线之间的间隔平均分布。
    align-content: space-around; // 每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
    align-content: stretch;     // 默认 轴线占满整个交叉轴。
}
```

![align-content 属性](http://img.blog.csdn.net/20170813232730851?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

### 子容器属性
子容器也有 6 个属性：
- order：子容器的排列顺序
- flex-grow：子容器剩余空间的拉伸比例
- flex-shrink：子容器超出空间的压缩比例
- flex-basis：自容器在不伸缩情况下的原始尺寸
- flex：子元素的 `flex` 属性是 `flex-grow`,`flex-shrink` 和  `flex-basis` 的简写
- align-self

#### order 属性
`order` 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0。
```css
.ele{
   order: num; 
}
```
![order 属性](http://img.blog.csdn.net/20170814115136328?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

#### flex-grow 属性
`flex-grow` 属性定义子容器的伸缩比例。按照该比例给子容器分配空间。
```css
.ele{
    flex-grow: <number>; /* default 0 */
}
   
```
![flex-grow 属性](http://img.blog.csdn.net/20170814122820811?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

#### flex-shrink 属性
`flex-shrink` 属性定义了子容器弹性收缩的比例。如图，超出的部分按 1:2 的比例从给子容器中减去。**此属性要生效，父容器的 `flex-wrap` 属性要设置为 ` nowrap`**
```css
.ele{
    flex-shrink: <number>; /* default 0 */
}

```
![flex-shrink 属性](http://img.blog.csdn.net/20170814135516978?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

#### flex-basis 属性
`flex-basis` 属性定义了自容器在不伸缩情况下的原始尺寸，主轴为横向时代表宽度，主轴为纵向时代表高度。
```css
.ele{
    flex-basis: <length> | auto; /* default auto */
}
```
![flex-basis 属性](http://img.blog.csdn.net/20170814141224001?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

#### flex 属性
子元素的 `flex` 属性是 `flex-grow`,`flex-shrink` 和  `flex-basis` 的简写，默认值为 `0` `1` `auto`。后两个属性可选。

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

#### align-self 属性
子容器的 `align-self` 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖父容器 `align-items` 属性。默认值为 `auto`，表示继承父元素的 `align-items `属性，如果没有父元素，则等同于 `stretch`。
```css
.ele{
    align-self: auto;             // 继承父元素的 align-items 属性
    align-self: flex-start;       // 交叉轴的起点对齐。
    align-self: flex-end;         // 交叉轴的终点对齐。
    align-self: center;           // 交叉轴的中点对齐。
    align-self: baseline;         // 项目的第一行文字的基线对齐。
    align-self: stretch;          // 默认，如果项目未设置高度或设为auto，将占满整个容器的高度。
}
```

![ align-self 属性](http://img.blog.csdn.net/20170814144451266?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

# grid 网格布局
flex 布局虽然强大，但是只能是一维布局，如果要进行二维布局，那么我们还需要使用 grid。

grid 布局又称为“网格布局”，可以实现二维布局方式，和之前的 表格`table`布局差不多，然而，这是使用 CSS 控制的，不是使用 HTML 控制的，同时还可以依赖于媒体查询根据不同的上下文得新定义布局。

> 网格布局还可以让我们摆脱现在布局中存在的文档流限制，换句话说，你的结构不需要根据设计稿从上往上布置了。这也意味着您可以自由地更改页面元素位置。这最适合你在不同的断点位置实现你最需要的布局，而不再需要为响应你的设计而担心HTML结构的问题。

和 `table` 布局不同的是，`grid` 布局不需要在 HTML 中使用特定的标签布局，所有的布局都是在 CSS 中完成的，你可以随意定义你的 grid 网格。

> 没有 HTML 结构的网格布局有助于使用流体、调整顺序等技术管理或更改布局。通过结合 CSS 的媒体查询属性，可以控制网格布局容器和他们的子元素，使用页面的布局根据不同的设备和可用空间调整元素的显示风格与定位，而不需要去改变文档结构的本质内容。

## 浏览器兼容性如下：
![浏览器兼容](http://img.blog.csdn.net/20170815115847523?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## grid 网格布局中的基本概念
此部分直接摘自[CSS Grid布局：什么是网格布局](http://www.w3cplus.com/css3/what-is-css-grid-layout.html)
### 网格线(Grid Lines)
网格线组成了网格，他是网格的水平和垂直的分界线。一个网格线存在行或列的两侧。我们可以引用它的数目或者定义的网格线名称。
![网格线(Grid Lines)](http://www.w3cplus.com/sites/default/files/blogs/2014/1410/css-grid-layout-1.jpg)

### 网格轨道(Grid Track)
网格轨道是就是相邻两条网格线之间的空间，就好比表格中行或列。所在在网格中其分为grid column和grid row。每个网格轨道可以设置一个大小，用来控制宽度或高度。
![网格轨道(Grid Track)](http://www.w3cplus.com/sites/default/files/blogs/2014/1410/css-grid-layout-2.jpg)

### 网格单元格(Grid Cell)
网格单元格是指四条网格线之间的空间。所以它是最小的单位，就像表格中的单元格。
![网格单元格(Grid Cell)](http://www.w3cplus.com/sites/default/files/blogs/2014/1410/css-grid-layout-3.jpg)

### 网格区域(Grid Area)
网格区域是由任意四条网格线组成的空间，所以他可能包含一个或多个单元格。相当于表格中的合并单元格之后的区域。
![网格区域(Grid Area)](http://www.w3cplus.com/sites/default/files/blogs/2014/1410/css-grid-layout-4.jpg)

## 使用 grid 布局
使用 grid 布局很简单，通过display属性设置属性值为 grid 或 inline-grid 或者是 subgrid（该元素父元素为网格，继承父元素的行和列的大小） 就可以了。

网格容器中的所有子元素就会自动变成网格项目（grid item），然后设置列（grid-template-columns）和 行（grid-template-rows）的大小，设置 `grid-template-columns` 有多少个参数生成的 grid 列表就有多少个列。

**注：当元素设置了网格布局，column、float、clear、vertical-align属性无效。**

如果没有设置 `grid-template-columns`，那么默认只有一列，宽度为父元素的 100%，例如

比如我们设置如下的 HTML，
```html
<div class="grid-container">
    <div class="item item1">1</div>
    <div class="item item2">2</div>
    <div class="item item3">3</div>
    <div class="item item4">4</div>
    <div class="item item5">5</div>
    <div class="item item6">6</div>
</div>
```

在 CSS 中，我们不设置 `grid-template-columns`，只设置 `grid-template-row`
```css
        .grid-container{
            display: grid;
            grid-template-rows: 50px 80px 100px;
            background: pink;
        }
        .item{
            border: 2px solid palegoldenrod;
            color: #fff;
            text-align: center;
            font-size: 20px;
        }
```
显示如下
![不设置 grid-template-columns](http://img.blog.csdn.net/20170814164634389?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

设置了 `grid-template-columns` 的话，设置了几个参数，就有几列（不超过 grid item 的个数），然后设置的 `grid-template-row` 参数就是每一列的高度（超出列数的高度无效）

比如：
```css
        .grid-container{
            padding: 20px;
            display: grid;
            grid-template-rows: 50px 100px 60px 80px;
            grid-template-columns: 50px 40px 100px 80px;
            background: pink;
        }
        .item{
            border: 2px solid palegoldenrod;
            color: #fff;
        }
```
虽然我们设置了四个 `grid-template-rows`，但是因为只有两行，所以只有前两个值生效。效果如下：
![设置 grid-template-columns](http://img.blog.csdn.net/20170814174614895?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

当然，我们也可以像 flex 一样设置每一列的宽度：
```css
        .grid-container{
            padding: 20px;
            display: grid;
            grid-template-rows: 50px 100px 60px;
            grid-template-columns: 1fr 1fr 2fr;
            background: pink;
        }

```
注意到我们使用了一个新的单位：`fr`

> css fr 单位是一个自适应单位，fr单位被用于在一系列长度值中分配剩余空间，如果多个已指定了多个部分，则剩下的空间根据各自的数字按比例分配。

**tips：fr 是基于网格容器可用空间来计算的（flex 也是一样），所以我们可以和其他单位混合使用，如果需要的话**

是不是找到了 flex 的感觉，这样设置效果如下：
![使用 fr 按比例设置宽度](http://img.blog.csdn.net/20170814180851328?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 行或列最小和最大尺寸
`minmax()` 函数来创建行或列的最小或最大尺寸，第一个参数定义网格轨道的最小值，第二个参数定义网格轨道的最大值。可以接受任何长度值，也接受 `auto` 值。`auto` 值允许网格轨道基于内容的尺寸拉伸或挤压。
```css
        .grid-container{
            padding: 20px;
            display: grid;
            grid-template-rows: minmax(100px,200px) minmax(50px,200px);
            grid-template-columns: 1fr 1fr 2fr;
            background: pink;
            height: 300px;
        }
```
我们将第一行的高度设置为 `minmax(100px,200px)`，第二行的高度设置为`minmax(50px,200px)`，容器总高度设置为 `300px`，这时每一列的高度要怎么算呢？

先判断总高度是小于第一列高度的最大值和第二列高度的最大值之和的，如果大于最大值之和，那么第一列和第二列的高度都为设置的最大值，如果是小于最小值之和的话，那么第一列和第二列的高度都为设置的最小值。

现在问题来了，我们这种情况是总高度是小于第一列高度的最大值和第二列高度的最大值之和的，这样就是先用 总高度 `300px` - 第一列最小高度 `100px` - 第二列最小高度 `50px` = `150px`。
第一列高度：第一列最小高度 `100px` + `150px/2` = `175px`;
第二列高度：第一列最小高度 `50px` + `150px/2` = `125px`;

效果如下：
![最小和最大尺寸设置](http://img.blog.csdn.net/20170814192118660?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 重复行或者列
`repeat()` 属性可以创建重复的网格轨道。这个适用于创建相等尺寸的网格项目和多个网格项目。

`repeat()` 也接受两个参数：第一个参数定义网格轨道应该重复的次数，第二个参数定义每个轨道的尺寸。

```css
        .grid-container{
            padding: 20px;
            display: grid;
            grid-template-columns: repeat(2,100px);
            grid-template-rows: repeat(3,100px);
            background: pink;
        }
```
效果如下：
![repeat()](http://img.blog.csdn.net/20170814192933064?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 间距
`grid-column-gap`：创建列与列之间的距离。
`grid-row-gap`：行与行之间的距离。
```css
        .grid-container{
            padding: 20px;
            display: grid;
            grid-template-columns: repeat(2,100px);
            grid-template-rows: repeat(3,100px);
            grid-column-gap: 50px;
            grid-row-gap: 15px;
            background: pink;
        }
```
![设置间距](http://img.blog.csdn.net/20170814195253373?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

或者使用 `grid-gap` 是 `grid-row-gap` 和 `grid-column-gap`两个属性的缩写。

## 通过网格线定位 grid item
我们可以通过表格线行或者列来定位 grid item。比如：
```html
<div class="grid-container">
    <div class="item item1">1</div>
    <div class="item item2">2</div>
    <div class="item item3">3</div>
    <div class="item item4">4</div>
    <div class="item item5">5</div>
    <div class="item item6">6</div>
</div>
```
```css
        .grid-container{
            padding: 20px;
            display: grid;
            grid-template-columns: repeat(2,100px);
            grid-template-rows: repeat(3,100px);
            grid-column-gap: 50px;
            grid-row-gap: 15px;
            background: pink;
        }
        .item{
            border: 2px solid palegoldenrod;
            color: #fff;
            text-align: center;
            font-size: 20px;
        }
        .item1{
            grid-row-start: 2;
            grid-row-end: 3;
            grid-column-start: 2;
            grid-column-end: 3;
            background: #fffa90;
            color: #000;
        }
```
效果：

![通过网格线定位 grid item](http://img.blog.csdn.net/20170814200656453?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

`grid-row` 是 `grid-row-start` 和 `grid-row-end` 的简写。`grid-column` 是 `grid-column-start` 和 `grid-column-end` 的简写。

如果只提供一个值，指定了 `grid-row-start` 和 `grid-column-start` 的值。

如果提供两个值，第一个值是 `grid-row-start` 或者 `grid-column-start` 的值，第二个值是 `grid-row-end` 或者 `grid-column-end` 的值，两者之间必须要用/隔开。

```css
   grid-row: 2; 
   grid-column: 3 / 4;
```
这四个值可以用 `grid-area` 缩写，分别对应 `grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end`：
```css
    grid-area: 2 / 2 / 3 / 3;
```

## 合并单元行与合并单元列
这个就和 excel 中的合并单元行/列是相同的（**这个需要设置在 grid item 中**），
```css
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 4;
    grid-row-end: 4;
```
也可以使用 `grid-row` 和 `grid-column` 简写的形式，关键词 `span` 后面紧随数字，表示合并多少个列或行，`/` 前面是从第几行/列开始。
```css
    grid-row: 2 / span 3; 
    grid-column: span 2;
```
```css
        .grid-container{
            padding: 20px;
            display: grid;
            grid-template-columns: repeat(4,100px);
            grid-template-rows: repeat(3,100px);
            grid-column-gap: 50px;
            grid-row-gap: 15px;
            background: pink;

        }
        .item{
            border: 2px solid palegoldenrod;
            color: #fff;
            text-align: center;
            font-size: 20px;

        }
        .item1{
            grid-column-start: 1;
            grid-column-end: 3;
            grid-row-start: 2;
            grid-row-end: 4;
        }
```
效果如图：
![合并单元行与合并单元列](http://img.blog.csdn.net/20170815112506756?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 自定义网格线名称
在 grid 中，是可以自定义网格线的名称的，然后使用定义好的网格线来进行布局，**`[col1-start]` 网格线名称一定要使用 `[]` 括住**。
```html
<div class="grid-container">
    <div class="item a">a</div>
    <div class="item b">b</div>
    <div class="item c">c</div>
    <div class="item d">d</div>
    <div class="item e">e</div>
    <div class="item f">f</div>
    <div class="item g">g</div>
    <div class="item h">h</div>
    <div class="item i">i</div>
    <div class="item j">j</div>
</div>
```

```css
        .grid-container{
            text-align: center;
            height: 400px;
            padding: 100px;
            display: grid;
            grid-column-gap: 5px;
            grid-row-gap: 5px;
            background: pink;
            grid-template-columns: [col1-start] 100px [col1-end] 5px [col2-start] 100px [col2-end] 5px [col3-start]
            100px [col3-end] 5px [col4-start] 100px [col4-end];
            grid-template-rows: [row1-start] auto [row1-end] 5px [row2-start] auto [row2-end] 5px [row3-start] auto
             [row3-end] 5px [row4-start] auto [row4-end] 5px [row5-start] auto [row5-end];


        }


        .a { grid-column: col1-start / col3-end; grid-row: row1-start;
            background: #ffffff;}
        .b { grid-column: col4-start / col4-end; grid-row: row1-start / row5-end; background: orange; }
        .c { grid-column: col1-start; grid-row: row2-start; background: #ffffff;}
        .d { grid-column: col2-start; grid-row: row2-start; background: #ffffff;}
        .e { grid-column: col3-start; grid-row: row2-start; background: #ffffff;}
        .f { grid-column: col1-start / col2-end; grid-row: row3-start; background: #ffffff;}
        .g { grid-column: col3-start; grid-row: row3-start; background: #ffffff;}
        .h { grid-column: col1-start; grid-row: row4-start; background: #ffffff;}
        .i { grid-column: col2-start / col3-end; grid-row: row4-start; background: #ffffff;}
        .j { grid-column: col1-start / col3-end; grid-row: row5-start; background: #ffffff;}
```
最后的显示效果是这样的（文字和辅助线是后台添加的）：
![自定义网格线名称](http://img.blog.csdn.net/20170815170231394?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 通过网格区域命名和定位网格项目

### 什么是网格区域：
> 网格区域(grid-area)是一个逻辑空间，主要用来放置一个或多个网格单元格（Grid Cell）。他是由四条网格线(Grid line)，网格区域每边一条，四边相交组织的网格轨道(Grid Track)。简单点理解，网格区域是有四条网格线交织组成的网格空间，这个空间中可能是一个网格单元格，也可能是多个网格单元格。

### 定义网格区域
在CSS Grid Layout中定义网格区域有两种方式，一种是通过网格线来定义，另一种是通过grid-template-areas来定义。接下来看看两种定义网格区域的方法在具体使用过程中有何不同。

### 网格线定义网格区域
使用网格线定义网格区域的方法非常的简单，首先依赖于 `grid-template-columns` 和 `grid-template-rows` 显式定义网格线，甚至是由浏览器隐式创建网格线，然后通过 `grid-area` 属性通过取网格线，组成网格线交织区域，那么这个区域就是所讲的网格区域。在使用 `grid-area` 属性调用网格线，其遵循的规则是 `grid-area: row-start `/ `column-start` / `row-end` / `column-end`。

### `grid-template-areas` 定义网格区域
除了使用网格线的交组来定义网格区域之外，在 CSS Grid Layout 中还可以通过 `grid-template-areas` 属性来定义网格区域的名称，然后需要放在对应网格区域的元素，可以通过 `grid-area` 属性来指定。而且重复区域可以使用同一个名称来实现跨区域。另外对于空的轨道区域，可以使用点号 `.` 来代表
```html
<div class="grid-container">
    <div class="header ">header</div>
    <div class="content ">content</div>
    <div class="sidebar ">sidebar</div>
    <div class="footer ">footer</div>
</div>
```
```css
        .grid-container{
            text-align: center;
            padding: 20px;
            display: grid;
            grid-column-gap: 5px;
            grid-row-gap: 5px;
            background: pink;
            grid-template-areas: "header header header header header"
                                 "sidebar content content content content"
                                 "footer footer footer footer footer";

            grid-template-rows: 50px 150px 50px;
            grid-template-columns: 200px 200px 200px;

        }

        .header { grid-area:header; background: #fff}
        .content { grid-area: content; background: #fffa90}
        .sidebar { grid-area: sidebar; background: #5bc0de}
        .footer { grid-area: footer; background: #ffff00}
```
![grid-template-areas 定义网格区域](http://img.blog.csdn.net/20170815191900142?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

**我发现这样布局的一个优点，在不设置高度的情况下（父容器和 `grid-template-rows` 的值，或者 `grid-template-rows` 设置为 `auto` 时，`slider` 和 `content` 的高度是一致的，并且会根据其内的高度自适应）**

例如：
![不设置高度使高度自适应](http://img.blog.csdn.net/20170815193110669?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

# 常用的 CSS 布局 
在介绍了 CSS 的布局方式之后，我们来看一下常用的 CSS 布局有哪些

## 水平垂直居中（感觉总结的并不是很好）
感觉垂直居中真的是已经被讲烂了，但是在平时做项目时，我都是靠试的，导致面试的时候被问到有时候回答不上来，现在就用自己的方式来总结一下。其实这个方式是有很多的，但就是看的教程太多了，导致最后一个都没有记住，**所以我决定尽可能的将情况考虑完整，然后每一种情况只记住一个最佳实践。**

对于居中，我个人认为不需要背什么“x 种方式实现 xx”这样的例子，我们只需要了解其原理即可写出符合要求的 css。

水平、垂直居中，个人比较喜欢用绝对定位的方法实现，其次就是使用 `table` 布局，因为自带垂直居中。如果是单行的行内元素使用 `line-height` 等于 `height`，对于多行元素的垂直居中，大部分都是使用 `table` 元素（求推荐更好的布局），当然还有 flex 和 grid 布局。
### 水平居中
一般水平居中还是比较容易的，我一般都是先看子元素是固定宽度还是宽度未知

#### 固定宽度
这种方式是绝对定位居中，除了使用 `margin`，我们还可以使用 `transform`（注意浏览器兼容性，只适用于 ie9+，移动开发请忽略）

```css
        .container{
            width: 300px;
            height: 200px;
            background: pink;
            position: relative;
        }
        .inner{
            width: 100px;
            height: 50px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -25px;
            margin-left: -50px;
            background: #fff;
            text-align: center;
        }
```
```css
        .container{
            width: 300px;
            height: 200px;
            background: pink;
            position: relative;
        }
        .inner{
            width: 100px;
            height: 50px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            text-align: center;
        }
```


或者使用 `magin:0 auto`；但一般情况下我都会使用上一种，因为习惯了(ಥ_ಥ)
#### 宽度未知
将子元素设置为行内元素，然后父元素设置 `text-align: center`。
```css
        .container{
            width: 300px;
            height: 200px;
            background: pink;
            position: relative;
            text-align: center;
        }
        .inner{
            display: inline-block;
            
        }
```
#### 多个块状元素
上面的方式即使子元素不止一个也想实现水平居中也是有效的，（宽度固定不固定都可，不固定的话就不需要设置宽度，会被自动撑开，但是要考虑到撑爆的情况）例如：
```css
        .container{
            width: 250px;
            height: 200px;
            background: pink;
            position: relative;
            text-align: center;
            padding: 20px;
        }
        .inner{
            display: inline-block;
            width: 50px;
            height: 150px;
            margin: 0 auto;
            background: #fff;
            text-align: center;
        }
```
![多个子元素水平居中](http://img.blog.csdn.net/20170815201728276?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

当然也可以使用我们刚刚介绍的 flex，我们只需要让子元素在主轴上的对齐方式设置为居中就可以
```css
        .container{
            width: 250px;
            height: 200px;
            background: pink;
            display: flex;
            justify-content: center;
            padding: 20px;
        }
        .inner{
            background: #fff;
            width: 50px;
            height: 150px;
            margin-left: 10px;
        }
```

### 垂直居中
#### 单行行内元素
单行海内元素居中，只需要将子元素的行高等于高度就可以了。
```css
        #container {
            height: 400px;
            background: pink;
        }
        #inner{
            display: inline-block;
            height: 200px;
            line-height: 200px;
        }
```

#### 多行元素
上面的这种方式只能处理单行的行内元素，对于多行的行内元素是处理不了的，因为给每一个子元素都设置了 `line-height`，看了很多方法，要不是没有效果，要不然就是又局限性，提到最多的是使用 `table-cell` 的方式（但是貌似这个方法也有一点弊端，那就是其子元素的表现形式和行内元素类似，子元素不能独占一行），**当然如果你有更好的方式，欢迎提出**：
```css
        .container {
            width: 200px;
            height: 400px;
            background: pink;
            position: absolute;
            display: table;
            vertical-align:middle;
        }

        .inner{
            display: table-cell;
            vertical-align:middle;
        }
```

还有一个方法是设置一个空的行内元素，使其 `height:100%`，`display:inline-block`,`vertical-align: middle;` 并且 `font-size:0`。但是这样方式的原理我还不是很清楚，只是知道要设置一个空元素，高度和父元素相等，并且设置垂直居中的属性。但是，这只是用与所有的行内元素的宽度和不超过父元素的宽度的情况。

```html
<div class="container">
    <img src="WechatIMG110.jpg" width="50px" />
    <img src="WechatIMG110.jpg" width="50px" />
    <img src="WechatIMG110.jpg" width="50px" />
    <p>123</p>
</div>
```

```css
        .container{
            width: 400px;
            height: 100px;
            background: pink;
            text-align: center;

        }
        img{
            vertical-align: middle;

        }
        p{
            display: inline-block;
            height: 100%;
            line-height: 100%;
            vertical-align: middle;
            font-size: 0;
        }

```
效果：
![多行行内元素](http://img.blog.csdn.net/20170817164334324?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
另一个一劳永逸的方法就是 flex，但是要注意浏览器的兼容性。

## 图片和文字垂直居中
经常有看到设计稿是图片和文字垂直居中的，那么怎么才能让图片和文字垂直居中呢？
只需要给图片一个 `vertical-align: middle;` 属性就可以：
```html
<div class="container">
    <img src="WechatIMG110.jpg" height="260" />
    <p>123456</p>

</div>
```
```css
        .container {
            background: pink;
            padding: 20px;
            height: 400px;

        }
        .container img{
            display: inline-block;
            vertical-align: middle;
        }

        .container p{
            display: inline-block;

        }
```
效果如下：
![图片和文字垂直居中](http://img.blog.csdn.net/20170817145958621?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 重点来啦~
自我感觉总结的居中问题不是特别的好，我们现在可以来总结一下其中的原理：
- 我们要实现水平或者垂直居中，应该从两方面下手：元素自带居中的效果或者强制让其显示在中间。
- 所以我们先考虑，哪些元素有自带的居中效果，最先想到的应该就是 `text-align:center` 了，但是这个只对行内元素有效，所以我们要使用 `text-align:center` 就必须将子元素设置为 `display: inline;` 或者 `display: inline-block;`；
- 接下来我们可能会想既然有 `text-align` 那么会不会对应也有自带垂直居中的呢，答案是有的 `vertical-align:`，我一直不是很喜欢使用这个属性，因为十次用，9.9 次都没有垂直居中，一度让我怀疑人生。现在貌似也搞得不是很清楚，看了 [张鑫旭的文章](http://www.zhangxinxu.com/wordpress/2010/05/%E6%88%91%E5%AF%B9css-vertical-align%E7%9A%84%E4%B8%80%E4%BA%9B%E7%90%86%E8%A7%A3%E4%B8%8E%E8%AE%A4%E8%AF%86%EF%BC%88%E4%B8%80%EF%BC%89/) 居然看得也不是很懂，笑哭。目前就在 `table` 中设置有效，因为 `table` 元素 的特性，打娘胎里面带的就是好用。还有一种可以有效的方式是前面提到的空元素的方式，不过感觉多设置一个元素还不如使用 `table`。
- 还有一只设置垂直居中的是将行内元素的 `line-height` 和 `height` 设置为相同（只适用于单行行内元素）
- 固定宽度或者固定高度的情况个人认为设置水平垂直居最简单，可以直接使用绝对定位。使用绝对定位就是子元素相对于父元素的位置，所以将父元素设置 `position:reletive` 对应的子元素要设置 `position:absolute`，然后使用 `top:50%;left:50%`，将子元素的左上角和父元素的中点对齐，之后再设置偏移 `margin-top: 1/2 子元素高度;margin-left: 1/2 子元素宽度;`。这种方式也很好理解。
- 上面的绝对定位方法只要将 `margin` 改为 `transform` 就可以实现宽度和高度未知的居中（兼容性啊兄弟们！(ಥ_ಥ)）`transformX:50%;transformY:50%`；

不行，感觉总结的还是很渣，╮(╯▽╰)╭哎，谁有好的方法，求推荐。

# 圣杯布局
其实我还真是第一次听说圣杯布局这种称呼，看了下这个名字的由来，貌似和布局并没有什么关系，圣杯布局倒是挺常见的三栏式布局。两边顶宽，中间自适应的三栏布局。
效果如下：
![圣杯布局](http://img.blog.csdn.net/20170817175625160?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

这个布局方式的关键是怎么样才能使得在伸缩浏览器窗口的时候让中间的子元素宽度改变。可以适应浏览器的宽度变化使用百分比设置宽度再合适不过，所以我们要将中间子元素的宽度设置为 `100%`，左边和右边的子元素设置为固定的宽度。

我们就来实现一下这样的布局：
## 给出HTML结构
HTML 文件就很普通：
```html
<div class="container">
    <div class="middle">测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</div>
    <div class="left">left</div>
    <div class="right">right</div>
</div>
```
**这里我们要注意的是，中间栏要在放在文档流前面以优先渲染。**

## 给出每个子元素的样式
然后我们写 CSS，我们现将其三个元素的宽度和高度设置好，然后都设置为 `float:left`:
```css
        .middle{
            width: 100%;
            background: paleturquoise;
            height: 200px;
            float: left;
        }
        .left{
            background: palevioletred;
            width: 200px;
            height: 200px;
            float: left;
            font-size: 40px;
            color: #fff;
        }
        .right{
            width: 200px;
            height: 200px;
            background: purple;
            font-size: 40px;
            float: left;
            color: #fff;
        }
```
这时的效果如下：
![圣杯布局](http://img.blog.csdn.net/20170817180223490?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 使子元素在同一行显示
我们可以看出，现在三个子元素是在一排显示的，因为我们给中间的子元素设置的宽度是 `100%`，并且中间的子元素在文档流的最前面，最先被渲染。

那么我们要使得三个元素在同一排显示。接下来我们要将 `.left` 和 `.right` 向上提。实际上我们是使用 `margin-left` 为 负值来实现的，我们将 `.left` 的 `margin-left` 设置为 `-100%`（负的中间子元素的宽度），这样，左边的元素就会被“提升”到上一层。

然后就是右边子元素了，只需要设置 `margin-left` 设置为负的自身的宽度。

结果如下：
![这里写图片描述](http://img.blog.csdn.net/20170817182447419?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 使得中间子元素不被遮盖
从上一张截图显示中显示中间的子元素被遮挡了，所以说我们要解决这个问题，要怎么解决呢？嗯... 只要使得中间的子元素显示的宽度刚好为左边元素和右边元素显示中间的宽度就可以。同时我们还必须保证是使用的半分比的布局方式。

这样的话有一种方式可以即使中间的宽度减少，又可以使中间的宽度仍然使用 `100%`，那就是设置父元素的 `padding` 值，将父元素的 `padding-left` 设置为左边子元素的宽度，将父元素的 `padding-right` 设置为右边子元素的宽度。

显示效果如下：
![圣杯布局](http://img.blog.csdn.net/20170817185010297?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 将左边和右边的子元素像两边移动
嗯... 这貌似也不是我们想要的效果，但是，中间的子元素确实是在中间了，那么我们只需要设置相对位置，将左边的子元素和右边的子元素向两边移动就好。

最终的 CSS 代码如下：
```css
        .container{
            padding: 0 200px;
        }
        .middle{
            width: 100%;
            background: paleturquoise;
            height: 200px;
            float: left;
        }
        .left{
            background: palevioletred;
            width: 200px;
            height: 200px;
            float: left;
            font-size: 40px;
            color: #fff;
            margin-left:-100%;


        }
        .right{
            width: 200px;
            height: 200px;
            background: purple;
            font-size: 40px;
            float: left;
            color: #fff;
            margin-left:-200px;
            
        }
```

最终效果如下：
![圣杯布局](http://img.blog.csdn.net/20170817190022171?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

# 双飞翼布局
其实双飞翼布局是为了解决圣杯布局的弊端提出的，如果你跟我一起将上面的圣杯布局的代码敲了一遍，你就会发现一个问题，当你将浏览器宽度缩短到一定程度的时候，会使得中间子元素的宽度比左右子元素宽度小的时候，这时候布局就会出现问题。所以首先，这提示了我们在使用圣杯布局的时候一定要设置整个容器的最小宽度。

![圣杯布局弊端](http://img.blog.csdn.net/20170817190308441?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 双飞翼和圣杯布局区别

> 圣杯布局和双飞翼布局解决问题的方案在前一半是相同的，也就是三栏全部float浮动，但左右两栏加上负margin让其跟中间栏div并排，以形成三栏布局。

> 不同在于解决”中间栏div内容不被遮挡“问题的思路不一样：圣杯布局，为了中间div内容不被遮挡，将中间div设置了左右padding-left和padding-right后，将左右两个div用相对布局position: relative并分别配合right和left属性，以便左右两栏div移动后不遮挡中间div。

> 双飞翼布局，为了中间div内容不被遮挡，直接在中间div内部创建子div用于放置内容，在该子div里用margin-left和margin-right为左右两栏div留出位置。

> 作者：知乎用户
链接：https://www.zhihu.com/question/21504052/answer/50053054
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

所以只是一个小小的改动
```html
<div class="container">
    <div class="middle-container">
        <div class="middle">测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</div>

    </div>
    <div class="left">left</div>
    <div class="right">right</div>
</div>
```

```css
        .middle-container{
            width: 100%;
            background: paleturquoise;
            height: 200px;
            float: left;

        }

        .middle{
            margin-left: 200px;
            margin-right: 200px;
        }
        .left{
            background: palevioletred;
            width: 200px;
            height: 200px;
            float: left;
            font-size: 40px;
            color: #fff;
            margin-left:-100%;


        }
        .right{
            width: 200px;
            height: 200px;
            background: purple;
            font-size: 40px;
            float: left;
            color: #fff;
            margin-left:-200px;

        }
```
这样，在我们将中间元素宽度调到比两边元素小的时候，也是可以正常显示，但是如果总宽度小于左边元素或者右边元素的时候，还是会有问题。
![双飞翼布局](http://img.blog.csdn.net/20170817191305989?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)


# 提问
如果你已经看到了这里，那么很感谢，已经到最后了，我承认，这篇文章真的很长...

所以，来，打起精神，对于下面的布局方式，大家都什么好的布局方式或者奇淫技巧呢~
![布局方式](http://img.blog.csdn.net/20170817191751102?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

**其实我只是想知道左边头像和下面的文字垂直居中有什么好的方法。**

**此问题可以简化为，多个未知高度的元素如何垂直居中？对了，不使用 flex 和grid 布局，要求兼容 ie8+。**

大家捧个场，可以直接发邮件将你的代码发给我，我邮件地址：991939332@qq.com，谢谢大家，谢谢谢谢

