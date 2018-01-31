---
title: 【读书笔记】《锋利的jQuery》
date: 2017-08-21 14:54:11
tags: [读书笔记] 
categories: [book-movie-music]
---

![锋利的jQuery](http://www.java1234.com/uploads/allimg/140406/1-1404060R111453.jpg)

前一段在当当和京东上趁着打折买了十几本编程的书，励志要全部看完！在此立一个 flag，最近也是一直在读书，发现书中更能深入的学到系统的知识。并且如果再能将书中的内容用自己的语言表达出来那就更好了。

书名：《锋利的 jQuery》

简介：这本书适合初学 JS 的童靴看~内容比较基础，我是想看 JQ 源码，然后发现和源码没有半毛钱关系，只是**比较全的介绍 jQuery 的用法**。对没有系统看过 jQuery 用法的，或者 js 的初学者还是有一定帮助的，但是如果你有一定的 js 基础，还是不要浪费时间了。其实 jQuery 好多的用法我们并不清楚，只是将 jQuery 当做方便的元素选择器来使用，其实 jQuery 能做的远比这多得多。 

推荐指数：☆☆☆

<!--more-->

# jQuery 的优势
- 强大的选择器
- 出色的 DOM 操作的封装
- 可靠的事件处理机制
- 完善的 Ajax
- 不污染顶级变量
- 出色的浏览器兼容性
- 链式操作方式
- 隐式迭代
- 行为层与结构层分离
- 丰富的插件支持
- 完善的文档
- 开源

## 不污染顶级变量
jQuery 只建立一个名为 jQuery 的对象，其所有的函数方法都在这个对象之下。其别名 `$` 也可以随时交出控制权，绝对不会污染其他变量。该特性使 jQuery 可以与其他 JavaScript 库共存。

## 链式操作方式
jQuery 的链式操作方式：对放生在同一个 jQuery 对象上的一组动作，可以直接连写而无需重复获取对象。

## 隐式迭代
当用 jQuery 找到带有 “.myClass” 类的全部元素，然后隐藏它们时，无需循环遍历每一个返回的元素。**jQuery 里的方法都被设计成自动操作对象集合，而不是单独的对象**

# jQuery 代码的编写
**在 jQuery 库中，`$` 就是 `jQuery` 的一个简写形式**，例如 `$(#.foo)` 与 `jQuery(#.foo)` 是等价的

## `window.onload` 和 `$(document).ready()` 对比

  -- | `window.onload` | `$(document).ready()`
  -- |---|---
执行时间 | 必须等待网页中所有的内容加载完毕（）包括图片才执行 | 只需要 DOM 加载完就执行（不包括图片等） 
编写个数 | 不能同时编写多个 | 能同时编写多个 | 
简化写法 | 无 | $(document).ready(function(){}) 可以简写成 $(function(){})

## jQuery 的链式操作风格
jQuery 的链式操作方式：对放生在同一个 jQuery 对象上的一组动作，可以直接连写而无需重复获取对象。
例如：
```js
$(this).addClass("current").next().show().parent().siblings().children("a").removeClass("current").next().hide();
```
为了阅读方便，也可以将代码改为如下格式：
```js
  $(this).addClass("current")            // 给当前元素添加 "current" 样式
  .next().show()                         // 下一个元素显示
  .parent().siblings().children("a").removeClass("current")  // 父元素的同辈元素的子元素 <a> 移除 "current" 样式
  .next().hide();                        // 他们的下一个元素隐藏
```

## jQuery 对象和 DOM 对象
DOM 对象就是 DOM 树种的节点，通过原生 JavaScript 的 `getElementsByTagName` 或者 `getElementsByTagId` 等获取，DOM 对象可以使用 JavaScript 中的方法。

jQuery 对象是通过 jQuery 包装 DOM 过后的对象。

在 jQuery 对象上无法使用 DOM 对象的任何方法，同理，也不能在 DOM 对象上使用任何 jQuery 的方法啊。所以我们要区分什么是 jQuery 的方法，什么是 JS 原生的方法。例如，下面这些都是错误的
```js
   $("#id").innerHTML
   $("#id").checked
   document.getElementById("id").html()
 
```
### jQuery 对象和 DOM 对象相互转换
为了能更好的区分哪些是 jQuery 哪些是 DOM 对象，我们约定俗成使用 jQuery 获取的对象我们在变量前面加上 `$` 符号。

#### jQuery 对象转化为 DOM 对象
1. `[index]` 方法，就是在 jQuery 对象后面加上索引，比如：

```js
  var $cr = $(#cr);           // jQuery 对象
  var cr = $cr[0];            // 将 jQuery 转化为 DOM 对象
  alert( cr.checked );        // 检查是否转化成功
  
```
2. `get(index)` 方法

```js
  var $cr = $(#cr);           // jQuery 对象
  var cr = $cr.get(0);        // 将 jQuery 转化为 DOM 对象
  alert( cr.checked );        // 检查是否转化成功
```
#### DOM 对象转化为 jQuery 对象
DOM 对象转化为 jQuery 对象很简单，只需要用 `$()` 将 DOM 对象包装起来就好。
```js
 var cr = document.getElmentByID("cr");     // DOM 对象
 var $cr = $(cr)                             // 将 DOM 对象转为 jQuery 对象
```

## 解决 jQuery 和其他库的冲突
之前遇到过类似的问题，是使用的插件需要较低版本的 jQuery（因为不进行维护了），然后和项目中使用的较高版本的 jQuery 不兼容，所以在网上查到了一个项目中是可以使用两个不同版本的 jQuery 的。

在 jQuery 库中，几乎所有的插件都被限制在它的命名空间里。通常，全局对象都被很好地储存在 jQuery 的命名空间里。因此和其他库一起使用时，不会引起冲突。

**默认情况下，jQuery 用 $ 作为自身的快捷方式。**

### jQuery 库在其他库之后导入
在其他库和 jQuery 库都被加载完毕后，可以在任何时候调用 jQuery.noConflict()
函来将变量 `$` 的控制权移交给其他 JavaScript 库。
```js
   // 引入 其他 JS 库
   // 引入 jQuery
   <script>
        jQuery.noConflict();   // 将变量 $ 的控制权移交给其他 JS 库
        jQuery(function(){
            jQuery("p").click(function){
                alert( jQuery(this).text() );
            }
        })
   </script>
```
也可以自定义一个快捷方式：
```js
   // 引入 其他 JS 库
   // 引入 jQuery
   <script>
        $j.noConflict();   // 将变量 $ 的控制权移交给其他 JS 库
        $j(function(){
            $j("p").click(function){
                alert( $j(this).text() );
            }
        })
   </script>
```

如果你还想继续使用 `$` 而不管其他函数的 `$()` 方法，同时又不想与其他库冲突，那么你可以
```js
        jQuery.noConflict();   // 将变量 $ 的控制权移交给其他 JS 库
        (function( $ ){        // 定义匿名函数并设置形参 $
            $("p").click(function){
                alert( $(this).text() );
            };
        }(jQuery));            // 执行匿名函数并设置形参 jQuery

```

### jQuery 库在其他库之前导入
如果 jQuery 库在其他库之前导入，那么就可以直接使用“jQuery”来做一些 jQuery 的工作，同时可以使用 `$()` 方法作为其他库的快捷方式（**也就是说不需要写 `jQuery.noConflict(); `**）

# jQuery 选择器

## 基本选择器
选择器 | 描述 | 返回 
---|---|---|
#id | 根据给定的 ID 匹配一个元素 | 单个元素 
.class | 根据给定的类名匹配一个元素 | 集合元素
element | 根据给定的元素名匹配一个元素（相当于 tagName ） | 集合元素
* | 匹配所有元素 | 集合元素
select1,select2,select3 | 将每一个选择器匹配到的元素合并后一起返回 | 集合元素


## 层次选择器
选择器 | 描述 | 返回 
---|---|---|
ancestor descendant(空格) | 选取 ancestor 元素里所有的 descendant（后代）元素 | 集合元素
parent > child | 选取子元素 | 集合元素
prev + next | 选取紧接在 prev 元素后面的 next 元素 | 集合元素
prev + siblings | 选取 prev 元素之后的所有 siblings 元素 | 集合元素

## 过滤选择器
选择器 | 描述 | 返回 
---|---|---|
:first | 选取第一个元素 | 单个元素
:last | 选取最后一个元素 | 单个元素
:not(selector) | 去除所有与给定选择器匹配的元素 | 集合元素
:even | 索引为偶数（索引从 0 开始） | 集合元素
:odd | 索引为奇数（索引从 0 开始） | 集合元素
:eq(index) | 索引等于 index 的元素（index 从 0 开始） | 单个元素
:gt(index) | 索引大于 index | 集合元素
:lt(index) | 索引小于 index | 集合元素
:header(index) | 所有的标题元素 h1、h2、h3 等 | 集合元素
:animated | 正在执行动画的所有元素 | 集合元素
:focus | 当前获取焦点的元素 | 集合元素

## 内容过滤选择器
选择器 | 描述 | 返回 
---|---|---|
:contains(text) | 文本中含有 “text” 的元素 | 集合元素
:empty | 不包含子元素或者文本的空元素 | 集合元素
:has(selector) | 含有选择器所匹配的元素 | 集合元素
:parent | 含有子元素或文本 | 集合元素
:hidden | 选取所有不可见的元素 | 集合元素
:visible | 选取所有可见的元素 | 集合元素

## 属性过滤选择器
选择器 | 描述 | 返回 | 示例
---|---|---| --- |
[attribute] | 拥有此属性的元素 | 集合元素 | `$("div[id]")` 选择所有拥有 id 属性的 div
[attribute=value] | 属性的值为 value 的元素 | 集合元素 | `$("div[tittle = test]")` 属性 `title` 为 `test` 的 div
[attribute!=value] | 属性的值不为 value 的元素 | 集合元素 | `$("div[tittle != test]")` 属性 `title` 不为 `test` 的 div
[attribute^=value] | 属性的值以 value 开始的元素 | 集合元素 | `$("div[tittle^ = test]")` 属性 `title` 以 `test` 开始的 div
[attribute$=value] | 属性的值为 value 结束的元素 | 集合元素 | 
[attribute*=value] | 属性的值含有 value 的元素 | 集合元素 | 
[attribute\|=value] | 属性的值等于或者以该字符串为前缀（该字符后跟 `-` 字符）的元素 value 的元素 | 集合元素 | 
[attribute~=value] | 属性的用空格分隔的值中包含一个给定的 value | 集合元素 |
[attribute][attrubute][attribute]| 用属性选择器合并成一个复合属性选择器，满足多个条件，每选择一次，缩小一次范围 | 集合元素

## 子元素过滤选择器
选择器 | 描述 | 返回 
---|---|---|
:nth-child(index/even/odd/equation) | 选取每个父元素下的第 index 个子元素或者奇偶元素（index 从 1 开始）| 集合元素
:first-child | 选取每个父元素第一个子元素 | 集合元素
:last-child | 选取每个父元素最后一个子元素 | 集合元素
:only-child | 如果某个元素是它父元素中唯一的子元素，则会被匹配 | 集合元素

## 表单过滤选择器
选择器 | 描述 | 返回 
---|---|---|
:enabled | 选取所有可用元素 | 集合元素
:disable | 选取所有不可用元素 | 集合元素
:checked | 选取所有被选中元素（复选框、单选框） | 集合元素
:selected | 选取所有被选中元素（下拉列表）| 集合元素

## 表单选择器
选择器 | 描述 | 返回 
---|---|---|
:input | 选取所有的 <input> <textarea> <select> <button> | 集合元素
:text | 选择所有单行文本框 | 集合元素
:password | 选择所有的密码框 | 集合元素
:radio | 选择所有的单选框 | 集合元素
:checkout | 选择所有的多选框 | 集合元素
:submit | 选择所有的提交按钮 | 集合元素
:image | 选择所有的图像按钮 | 集合元素
:reset | 选择所有的重置按钮 | 集合元素
:button | 选择所有的按钮 | 集合元素
:file | 选择所有的上传域 | 集合元素
:hidden | 选择所有的不可见元素 | 集合元素

## jQuery 选择器完善的处理机制
- 如果元素不存在时，JS 不会保存阻塞其他代码的运行。
- `$(#ID)` 或者其他选择器获取的永远是对象，即使网页上没有此元素。使用 jQuery 检查某个元素是否存在要不能使用 

```js
   if( $(#tt) ){
       dosomething
   }
```
而是根据元素是否有长度判断：
```js
   if( $(#tt).length > 0 ){
       dosomething
   }
```
或者转化为 DOM 元素来判断

```js
   if( $(#tt)[0] ){
       dosomething
   }
```
# jQuery 中的 DOM 操作

## HTML DOM 操作
### 插入节点
方法 | 描述 | 示例 
---|---|---|
append() | 向每个匹配的元素内部追加内容 | $(A).append(B) 将 B 追加到 A 中
appendTo() | 将所有匹配的元素追加到指定元素中 |  $(B).appendTo(A) 将 B 追加到 A 中
prepend() | 向每个匹配的元素内部前置内容 | 
after() | 在每个匹配的元素之后插入内容 | $(A).after(B) 将 B 插入到 A 后面
insertAfter() |  将所有匹配的元素插入到指定元素的后面 |  $(B).insert    After(A) 将 B 插入到 A 后
before() | 在每个匹配的元素之前插入内容 | $(A).before(B) 将 B 插入在 A 的前面
insertBefore()|将所有匹配的元素插入到指定元素的前面 |  $(B).insertBefore(A) 将 B 插入在 A 的前面

### 删除节点
#### remove()
从 DOM 中删除所有匹配的元素，传入的参数用于根据 jQuery 表达式来删选元素
```js
   $("ul li:eq(1)").remove();  // 获取第二个 <li> 元素节点后，将它从网页中删除
   $li.appendTo("ul");         // 把刚才删除的元素添加到 <ul> 元素中
```
这个方法的返回值是一个指向已被删除的节点的引用，因此可以将其保存在一个变量中，以后还可以使用。

#### detach()
detach() 和 delete() 一样，也是从 DOM 中去掉所有匹配的元素，但是两者的区别是，这个方法不会把匹配的元素从 jQuery 对象中删除，去掉的元素的所有绑定的事件、附加的数据等都会保留下来。

#### empty()
清空元素中所有的后代节点。**注意是清空元素内的所有节点，并不清除选中的元素**

### 复制节点
复制节点可以使用 `clone()` 方法
```js
   $("ul li").click(function(){
       $(this).clone().appendTo("ul");
   })
```
但是这样复制的节点，被复制的新元素并不具有任何行为，如果需要新元素也具有相同的行为，那么就需要在 `clone()` 方法中传入参数 `true`

```js
   $("ul li").click(function(){
       $(this).clone(true).appendTo("ul");
   })
```

### 其他方法

方法名 | 描述 | 
---|---
replaceWith()  |  将所有匹配的元素都替换成 HTML 或者 DOM 元素，绑定的事件将会消失
replaceAll()  | 和 replaceWith() 相反 
wrap() | 将所有的元素单独包裹
wrapAll() | 将所有匹配的元素用一个元素来包裹 **如果被包裹的元素中间有其他的元素，那么其他的元素会被放到包裹元素之后**
wrapInner() | 将每一个匹配的元素的字内容（包括文本节点）用其他结构化的标记包裹起来
attr() | 获取和设置元素属性，传递一个参数为获取元素属性，传递两个参数为设置元素属性
removeAttr() | 删除文档中某个元素的特定属性
addClass() | 追加样式
removeClass() | 移除样式 **如果参数为空，则清空该元素的所有 class**
toggleClass() | 切换样式 如果类名存在则删除，如果类名不存在则添加
hasClass() | 是否含有某个样式，返回布尔值
html() | 读取或者设置某个元素中的 HTML 内容 **传递一个参数为获取 HTML 中的内容，传递两个参数为设置 HTML 的内容**
text() | 读取或者设置某个元素中的文本内容 **传递一个参数为获取文本内容，传递两个参数为设置文本内容**
val() | 读取或设置元素的值 **在用于表单元素时，可以设置相应的元素被选中**
children() | 获得匹配元素的子元素的集合 **（子元素非后代元素）**
next() |  获得匹配元素后面紧邻的同辈元素
prev() | 获得匹配元素前面紧邻的同辈元素
siblings() | 获得匹配元素前后面紧邻的同辈元
closest() | 取得最近的匹配元素
parent() | 获得集合中每个元素的父级元素
parents() | 获得集合中每个元素的祖先元素
closest() | 从元素本身开始，逐级向上级元素匹配，并返回最先匹配的祖先元素


##  CSS DOM 操作

方法 | 描述
---|---
css() | 读取和设置 style 对象的各种属性（如果值是数字，将会自动转化为像素值，样式名不带
“”样式使用驼峰写法）
offset() | 获取元素在当前视窗的相对偏移，返回的对象包含两个属性 `top`、`left`
position() | 获取元素相对于最近一个 position 样式属性设置为 relation 或者 absolute 的父节点的相对偏移
scrollTop() 、scrollLeft() | 获取元素滚动条距离顶端的距离和距离左侧的距离

# JS 中的事件
## 事件绑定
```js
  bind(type [, date ], fn )
```
1. 第一个参数是事件类型，类型包括：`blur` `focus` `load` `resize` `scroll` `unload` `cliock` `dblclick` `mousedown` `mouseup` `mouseover` `mouseout` `mouseenter` `mouseleave` `change` `select` `submit` `keyup` `keydown` `keypress` `keyup` `error`
2. 第二个参数为可选参数，作为 `event.data` 属性值传递给事件对象的额外数据对象
3. 第三个参数是用来绑定的处理函数

**jQuery 的事件处理函数比 JS 原生的事件处理函数少了个 `on`**

像 `click` `mouseover` `mouseout` 这类事件，可以直接简写

## 合成事件
jQuery 中有两个合成事件，`hover()` `toggle()`
### hover()

```js
   hover(enter,leave)
```
`hover(fn1,fn2,...fnN)` 方法用于模拟光标悬停事件，当光标移动到元素上时，会触发第一个函数（enter），当光标移出这个元素时会触发第二个函数（leave）

### toggle()
toggle() 方法用于模拟鼠标的连续点击事件，第一次单击元素，触发第一个函数，第二次单击同一个元素，会触发第二个函数，如果有更多的函数，则依次触发，直到最后一个。

## 事件冒泡
假设网页上有两个元素，其中一个嵌套在另一个元素里面，并且都被绑定了 click 事件。同时 `<body>` 元素上也绑定了 click 事件，这样的话，点击最内层的元素，会触发三次 click 事件。这是因为 JavaScript 的事件冒泡机制。

在 jQuery 中，提供了 `stopPropagation()` 方法来停止冒泡。

## 阻止默认行为
网页中有自己的默认行为，例如单击超链接会跳转，单击“提交”按钮后表单会提交，有时需要阻止默认行为。

jQuery 提供了 `preventDefault()` 方法来阻止元素的默认行为。

## 事件对象的属性

方法名称 | 描述
---|---
event.type  | 获取到事件的类型
event.preventDefault() | 阻止默认的事件行为
stopPropagation() | 阻止事件冒泡
event.tagent() | 获取到触发事件的元素
event.relatedTarget() | mousover 和 mouseout 所发生的元素
event.pageX event.pageY | 获取到光标相对于页面的 x 坐标和 y 坐标
event.which() | 鼠标单击事件中获取到的左、中、右键，在键盘事件中获取键盘的按键
event.metaKey() | 为键盘事件获取 `ctrl` 键

## 移除事件

```js
   unbind([type],[data])

```
第一个参数是事件类型，第二个参数是要移除的函数。
如果没有参数，则删除所有的绑定事件

## one() 方法
对于只要触发一次，随后要立即解除绑定的情况，jQuery 提供了 `one()` 方法。
当处理函数触发一次后，立即被删除。

## 模拟操作
trigger() 方法完成模拟操作，
```js
   trigger(type,[data])
```
第一个参数是要触发的事件类型，第二个参数是要传递给事件处理函数的附加参数，可以通过传递的参数来区分这次事件是代码触发还是用户触发的

# jQuery 中的动画
 
方法名 | 说明
---|---
hide()  show()  | 同时修改多个样式属性，即高度、宽度和不透明度
fadeIn() fadeOut() | 只改变不透明度
slideUp() slideDown() | 只改变高度
toggle() | 用来代替 hide() 和 show() 方法
slideToggle() | 用来代替 slideUp() 和 slideDown()
fadeToggle() | 用来代替 fadeIn() 和 fadeOut()
animate() | 属于自定义动画的方法

**jQuery 中的任何动画效果，都可以指定三种速度参数，`slow`、`normal`、`fast`，对应的时间长度分别是 0.6 秒，0.4 秒和 0.2 秒，也可以传入参数，传入数字作为参数不需要加引号，使用关键字需要加引号。**

## 动画队列
当一个 `animate()` 方法中应用多个属性时，动画是同时发生的。
当以链式方法调用时，动画是按顺序发生（除非 `queue` 选项为 `false`）。
默认情况下，动画都是同时发生的。
当以回调的形式应用动画方式时，按照回调顺序发生。

## 停止动画
```js
   stop([clearQueue,gotoEnd])
  
```
`clearQueue` 是否要清空未执行的动画队列
`gotoEnd` 是否直接跳转到末状态

## 判断元素是否处于动画状态
**要始终避免动画累计而导致的动画与用户行为不一样的情况。**当用户快速在某个元素上执行 `animate()` 时，就会出现动画累加。

解决方法是判断元素是否处于动画状态，如果用户不处于动画状态，才为元素添加新的动画，否则不添加。

## 延迟动画
在动画执行的过程中，如果想对动画进行延迟操作，那么可以使用 `delay()` 方法。

# jQuery 与 Ajax 
## Ajax 的优势
- 不需要插件的支持
- 优秀的用户体验
- 提高 Web 程序的性能
- 减轻服务器和带宽的负担

## Ajax 的不足
- 浏览器对 XMLHttpRequest 对象的支持度不足
- 破坏浏览器前进后退按钮的正常功能
- 对搜索引擎的支持程度不够
- 开发和调试工具的缺乏

## 使用原生 JS 写一个 Ajax
1. 定义一个函数，通过该函数来获取异步信息

```js
    function Ajax(){         // 定义一个函数，通过该函数来获取异步信息
        
    }
```
2. 声明一个空对象来装入 XMLHttpRequest 对象

```js
   var xmlHttpReq = null;        // 声明一个空对象来装入 XMLHttpRequest 对象
```
3. 实例化一个 XMLHttpRequest 对象

```js
    if(window.XMLHttpRequest){
        xmlHttpReq = new XMLHttpRequest();   // 实例化一个 XMLHttpRequest 对象
    }
```
4. 使用 `open()` 方法初始化 XMLHttpRequest 对象，指定 HTTP 方法和要使用的服务器 URL;

```js
   xmlHttpReq.open("GET","test.php",true);   // 调用 open() 方法并采用异步方式
```
5. 使用 `onreadystatechange` 属性来注册该回调事件处理器，当 readystatus 状态改变时，会激发 onreadystatechange 事件然后调用回调函数。

```js
   xmlHttpReq.onreadystatechange = RequestCallBack;
```
6. 使用 send() 方法发送请求，使用 GET 方式可以不指定参数或者使用 null 参数

```js
   xmlHttpReq.send(null);
```
7. 当请求状态改变时，XMLHttpRequest 对象调用 onreadystatechange 属性注册的事件处理器，在处理响应之前，事件处理器应该首先检查 readyStatus 的值和 HTTP 状态。当请求完成加载（`readyStatus == 4`）并且响应已经成功（HTTP 状态值为 200），就可以处理响应内容；

```js
        function RequestCallBack() {
            if(xmlHttpReq.readyState == 4){
                if(xmlHttpReq.status == 200){
                    document.getElementById("resText").innerHTML = xmlHttpReq.responseText;
                }
            }
        }
```

## jQuery 中的 Ajax

jQuery 对 Ajax 操作进行封装，在 jQuery 中，`$.ajax()` 是最底层的方法，第二层是 `load()`、`$.get()`、`$.post()`、`$.grtJSON()`。

### load() 方法
#### 载入 HTML 文档

```js
   load( url [,data] [,callback])
```


参数列表 | 类型 | 说明
---|--- | ---
url | String | 请求 HTML 页面的 URL 地址
data | Object | 发送至服务器的 key/value 数据
callback | Function | 请求完成时的回调函数，无论请求失败或成功

比如说我们要将一个页面追加到另一个页面，被追加的文件为 `inner.html`，内容如下
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<p>测试</p>

</body>
</html>
```
内容只有一个 `<p>` 标签，然后我们创建另一个页面，用来触发 Ajax 事件，并用来显示追加的 HTML，页面内容如下：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="../jQuery.min.js"></script>
</head>
<body>
<input type="button" id="send" value="获取">
<div id="resText"></div>

<script>
    $(function () {
        $('#send').click(function () {
            $('#resText').load('inner.html')
        })
    })
</script>
</body>
</html>
```
当，点击按钮时，页面如下：
![load() 方法](http://img.blog.csdn.net/20170821122356450?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

#### 载入部分 HTML 文档
当前我们也可能载入部分的 HTML 文档，例如只需要载入 `inner.html` 中的 `test` 类，那么：
```js
    $('#resText').load('inner.html .test')
```
#### 传递方式，如果没有设置传递方式，那么使用 GET 方式，如果有传递参数，那么为 `POST` 方式。

#### 回调
```js
   $('#resText').load('inner.html .test', functiong(responseText,textStatus,XMLHttpRequest){
       // responseText : 请求返回的内容
       // textStatus : success、error、notmodified、timeout
       // XMLHttpRequest : XMLHttpRequest 对象
   })
```

### `$.get()` 方法
`$.get()` 方法使用 GET 方式来进行异步请求

```js
    $.get( url [, data] [, callback] [, type])
```

参数名称 | 类型 | 说明
---|--- | ---
url | String | 请求 HTML 页的 URL 地址
data（可选） | Object | 发送至服务器的 key/value 数据会作为 QueryString 附加到请求 URL 中
callback（可选） | Function | 载入成功时回调函数（只有当 Reaponse 的返回状态是 success 才调用）自动将请求的结果和状态传递给方法
type（可选）| String | 服务器端返回内容的格式，包括 xml、html、script、json、text、_default



### `$.post()` 方法
`$.post()` 方法使用 GET 方式来进行异步请求

```js
    $.post( url [, data] [, callback] [, type])
```

### GET 方式和 POST 请求方式的区别
- GET 请求将参数跟在 URL 后进行传递，POST 则作为 HTTP 消息的实体内容发送给 web 服务器，
- GET 方式通常传递的数据不超过 2kb，POST 方式理论上没有限制
- GET 方式请求的数据会被浏览器缓存起来，

### $.ajax() 方法
$.ajax() 方法是 jQuery 最底层的 Ajax 实现，
```js
   $.ajax(option)
```

参数名称 | 类型 | 说明
---|---| ---
url | String | 发送请求的 URL（默认为当前页面） 
type  | String | 请求方式，默认为 GET 
timeout | Number | 设置请求超时时间（毫秒）
data | Object 或 String | 发送到服务器的数据
dataTpye | String | 预期服务器返回的数据类型
beforeSend | Function | 发送请求前可以修改 XMLHttpResponse 对象的函数
complete | Function | 请求完成后调用的回调函数（请求失败或者成功均调用）
success | Function | 请求成功后调用的回调函数
error | Function | 请求失败后调用的回调函数
global | Function | 默认为 true。是否触发全局 Ajax 事件

### 序列化元素
`serialize()` 方法能够将 DOM 元素内容序列化为字符串，用于 Ajax 请求。即使在表单中再增加字段，脚本仍然能够使用。并且不需要做其他多余工作。

`serializeArray()` 方法，该方法不是返回字符串，是将 DOM 序列化后，返回 JSON 格式的数据。

`$.param()` 方法，用来对一个数组或对象按照 key/value 进行序列化。
```js
    var obj = {a:1,b:2,c:3};
    var k = $.param(obj);
    alert(k);   // 输出 a=1&b=2&c=3
```

# jQuery 性能优化
## 使用合适的选择器
1. $("#id") id 选择器无疑是最佳提高性能的方式。因为 jQuery 底层直接调用本地方法 `document.getElementById()`，直接通过 id 返回对应的元素可以有效的缩小你定位的 DOM 元素，**建议从最近的 ID 元素开始往下搜索**。
2. $("p")、$("div")、$("input") 标签选择器是性能优化第二选择，因为 jQuery 也是直接调用 JS 原生方法
3. $(".class") 这是 jQuery 封装的函数，ie9+ 以上是使用 JS 的原生方法，ie9 一下是使用 DOM 搜索方式来实现
4. $("[attribute=value]")：利用属性来定位 DOM 元素，大部分都是使用 DOM 搜索方式来达到效果。所以性能并不是很理想
5. $(":hidden")：这和上面利用属性类似，并且 jQuery 需要搜索每一个元素来定位这个选择器，所以尽量不要使用。

## 缓存对象
我们可以将经常用的对象使用变量缓存起来，因为 jQuery 会在创建每一个选择器的过程中，查找 DOM。
**不要让相同的选择器在你的代码中出现多次。**

## 循环时的 DOM 操作
在一些循环时，例如 `for()`、`while()`、`$.each()` 使用这些方法处理 DOM 元素时，要尽可能的减少操作 DOM，可以使用变量将来储存元素，最后一次性将生产的 DOM 插入或者删除。

## 数组方式使用 jQuery 对象
使用 jQuery 选择器获得的结果是一个 jQuery 对象，然而，jQuery 类库会让你感觉你正在使用一个定义了索引和长度的数组。在性能方面，建议使用 for 或者 while 循环来处理，而不是 `$.each()`

## 事件代理
每一个 JavaScript 事件（例如：click、mouseover 等）都会冒泡到父节点，当我们需要给多个元素调用同个函数时会很有用。

比如，我们要单击表格的行使得改行背景颜色改变
```js
    $("myTable td").click(function(){
        $(this).css("background",'red')
    })
```
如果你是这样写的话，那么恭喜你，提供了一个错误的示例，🎉🎉。这样的弊端是，假使总共有 100 个 td，那么在使用以上方式的时候，你绑定了 100 个事件，天辣，是不是很恐怖。

正确的姿势是，只需要向他们的父节点绑定一次事件，然后通过 `event.target` 获取到当前点击的元素。
```js
    $("myTable").click(function(){
        var $clicked =  $(e.target);   // 捕捉到触发的目标元素
        $clicked.css("background",'red');
    })
```
也可以这样写
```js
    $("myTable td").on('click','td', function(){
        $(this).css("background",'red')
    })
```















