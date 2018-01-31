---
title: react（二）：用实例认识react
date: 2017-03-02 21:34:44
tags: react
categories: JavaScript
---
昨天在认识了什么是react之后，今天开始用代码来写一些demo，跟着慕课网的视频一起写demo发现运行不出来，找其原因是视频太老了，react已经更新换代了，摔！！
然后跟着阮一峰老师一起写12个demo，阮一峰老师的教程：[React 入门实例教程](http://note.youdao.com/http://www.ruanyifeng.com/blog/2015/03/react.html)，希望大家可以看一下老师写的demo
[github地址](https://github.com/sunshine940326/reactDemo/tree/master)，求fork，求star，(～￣▽￣)～
<!--more-->
# HTML模板
这是一个最简单的react模板
```
<!DOCTYPE html>
<html>
<head>
    <script src="../build/react.js"></script>
    <script src="../build/react-dom.js"></script>
    <script src="../build/browser.min.js"></script>
</head>
<body>
<div id="container"></div>
<script type="text/babel">
    ReactDOM.render(
            <div>
                hello world
            </div>
        ,document.getElementById('container')
    )
</script>
</body>
</html>
```
## 不同版本的react之间的差异
### jsx和babel
在之前我所观看的慕课网的初识react的视频中的模板和这个有些出入，发现在慕课网上敲出来的代码没有效果，原因是react已经更新，其实最主要的变化主要是 之前使用jsxTransformer来编译JSX语法的，现在是使用babel来编译的，使用时的区别是：
1. script标签由原来的"text/jsx"变为"text/babel"
2. 所引入的js库有原来的react.js和jsxTransformer.js变为browser.js
>   1. JSX是什么JSX其实是JavaScript的扩展，React为了代码的可读性更方便地创建虚拟DOM等原因，加入了一些类似XML的语法的扩展。
>   2. 编译器——jsxTransformerJSX代码并不能直接运行，需要将它编译成正常的JavaScript表达式才能运行，jsxTransformer.js就是这一编译器的角色。
>   3. 第二代编译器——babel
> React官方博客发布了一篇文章，声明其自身用于JSX语法解析的编译器JSTransform已经过期，不再维护，React JS和React Native已经全部采用第三方Babel的JSX编译器实现。原因是两者在功能上已经完全重复，而Babel作为专门的JavaScript语法编译工具，提供了更为强大的功能。而browser.js是babel编译器的浏览器版本。
### React.reader和ReactDOM.render
另一个变更的地方就是React.reader和ReactDOM.render，或许你也在网上看到有的代码用的是react，有的用的是reactDOM
> 这个是react最新版api，也就是0.14版本做出的改变。主要是为了使React能在更多的不同环境下更快、更容易构建。于是把react分成了react和react-dom两个部分。这样就为web版的react和移动端的React Native共享组件铺平了道路。也就是说我们可以跨平台使用相同的react组件。
> 
>  新的react包包含了React.createElement，.createClass，.Component，.PropTypes，.children以及其他元素和组件类。这些都是你需要构建组件时助手。 
> 
> 而react-dom包包括ReactDOM.render，.unmountComponentAtNode和.findDOMNode。在 react-dom/server ，有ReactDOMServer.renderToString和.renderToStaticMarkup服务器端渲染支持。
> 
> 总的来说，两者的区别就是：ReactDom是React的一部分。ReactDOM是React和DOM之间的粘合剂，一般用来定义单一的组件，或者结合ReactDOM.findDOMNode（）来使用。更重要的是ReactDOM包已经允许开发者删除React包添加的非必要的代码，并将其移动到一个更合适的存储库。
---
通过以上的介绍，你应该就清楚了这个demo个行代码的意思了
script加载的三个库：`react.js`：React的核心库， `react-dom.js`:react中和dom有关的库，`Browser.js`将将jsx转化为js
`ReactDOM.render(componments,containerName)`函数是将`componments`插入到`containerName`中，这个方法有两个参数，第一个是要插入的dom，后一个是插入到什么地方。上面的代码是将一个内容为hello world的div插入到id位container的div中。
react中可以直接在js中写html标签，这里运用的是jsx语法。但是这里并不是真正的dom节点，只是虚拟的dom，因为直接修改html的dom代价太大，所以我们操作虚拟dom，然后react有自己的diff算法，对比改动的地方，再完成对dom的操作（自己肤浅的理解）
# 虚拟DOM
>组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM （virtual DOM）。只有当它插入文档以后，才会变成真实的 DOM 。根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 DOM diff ，它可以极大提高网页的性能表现。
这里有几点需要注意的：
1. `componments`只能是一个dom节点，你可以插入两个标签，但是一定要用一个标签包裹在外面，也就是说最外层一定要是一个标签
至此，我们的第一个react工程就写好了，可以在浏览器中查看效果，效果如下![image](http://image.beekka.com/blog/2015/bg2015033109.png)
# JXL语法
>JSX是React的核心组成部分，它使用XML标记的方式去直接声明界面，界面组件之间可以互相嵌套。可以理解为在JS中编写与XML类似的语言,一种定义带属性树结构（DOM结构）的语法，它的目的不是要在浏览器或者引擎中实现，它的目的是通过各种编译器将这些标记编译成标准的JS语言。
**利用 JSX 编写 DOM 结构，可以用原生的 HTML 标签，也可以直接像普通标签一样引用 React 组件。这两者约定通过大小写来区分，小写的字符串是 HTML 标签，大写开头的变量是 React 组件。**
### 使用 HTML 标签：
```
import React from 'react';
import { render } from 'react-dom';

var myDivElement = <div className="foo" />;
render(myDivElement, document.getElementById('mountNode'));
```
HTML 里的 `class` 在 JSX 里要写成 `className`，因为 `class` 在 JS 里是保留关键字。同理某些属性比如 `for` 要写成 `htmlFor`。

### 使用组件：

```
import React from 'react';
import { render } from 'react-dom';
import MyComponent from './MyComponet';

var myElement = <MyComponent someProperty={true} />;
render(myElement, document.body);

```
更多关于使用jsx的方法请见[使用 JSX](https://hulufei.gitbooks.io/react-tutorial/content/jsx-in-depth.html)
# component组件
component在react里面可以认为是组件的意思，是react中最小也是最重要的组成部分，在概念上类似于模块
将代码封装成组件之后我们就可以像插入普通html标签一样插入这个组件，React.createClass 方法就用于生成一个组件类（查看 [demo04](https://github.com/sunshine940326/reactDemo/tree/master/demo4)）。
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="container"></div>

<script type="text/babel">
var HellOMessage = React.createClass({
    render:function () {
        return <h1>Hello {this.props.name}</h1>
    }
});
    
    ReactDOM.render(
            <HellOMessage name="John" />
            ,document.getElementById('container')
    )
</script>
</body>
</html>
```
**因为这里是插入的组件，所以`HellOMessage`首字母需要大写

上面代码中，变量 `HelloMessage` 就是一个组件类。模板插入 `<HelloMessage />` 时，会自动生成 HelloMessage 的一个实例（下文的"组件"都指组件类的实例）。所有组件类都必须有自己的 `render` 方法，用于输出组件。

组件的用法与原生的 HTML 标签完全一致，可以任意加入属性，比如 `<HelloMessage name="John">` ，就是 `HelloMessage` 组件加入一个 `name` 属性，值为 `John`。组件的属性可以在组件类的 `this.props` 对象上获取，比如 `name` 属性就可以通过 `this.props.name` 读取。上面代码的运行结果如下。
![image](http://image.beekka.com/blog/2015/bg2015033108.png)

`this.props` 对象的属性与组件的属性一一对应，但是有一个例外，就是 `this.props.children` 属性。它表示组件的所有子节点（查看 [demo05](https://github.com/sunshine940326/reactDemo/tree/master/demo5)）


```
var NotesList = React.createClass({
  render: function() {
    return (
      <ol>
      {
        React.Children.map(this.props.children, function (child) {
          return <li>{child}</li>;
        })
      }
      </ol>
    );
  }
});

ReactDOM.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.body
);
```

>这里需要注意， `this.props.children` 的值有三种可能：如果当前组件没有子节点，它就是 `undefined` ;如果有一个子节点，数据类型是 `object` ；如果有多个子节点，数据类型就是 `array` 。所以，处理 `this.props.children` 的时候要小心。
React 提供一个工具方法 `React.Children` 来处理 `this.props.children` 。我们可以用 `React.Children.map` 来遍历子节点，而不用担心 `this.props.children` 的数据类型是 `undefined` 还是 `object`。更多的 `React.Children` 的方法，[请参考官方文档](https://facebook.github.io/react/docs/react-api.html)。
# PropTypes
组件的属性可以接受任意值，字符串、对象、函数都可以。所以我们react提供了一种机制，验证别人在使用我们的组件时提供的参数是否符合要求
组件类的`PropTypes`属性，就是用来验证组件实例的属性是否符合要求（查看 [demo06](https://github.com/sunshine940326/reactDemo/tree/master/demo6)）。
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="../build/react.js"></script>
    <script src="../build/react-dom.js"></script>
    <script src="../build/browser.min.js"></script>

</head>
<body>
<div id="container"></div>
<script type="text/babel">
var data = "123";

    var TestPropsType = React.createClass({
        propsType:{
            title:React.propsType.string.isRequired,
        },
        render: function () {
            return <h1>{this.props.title}</h1>
        }
    })

    ReactDOM.render(
            <TestPropsType title={data}/>


            ,document.getElementById('container')
    )
</script>
</body>
</html>

```
这就是验证了在使用`TestPropsType`这个组件时`title`属性是必须的并且传入的参数是字符串，如果将`data` 改为`var data = 123`，`title`属性就通不过验证了,会报错
# 获取真实的DOM节点
从组件获取真实 DOM 的节点，就要用到 ref 属性（查看 [demo07](https://github.com/sunshine940326/reactDemo/tree/master/demo7) ）。
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="../build/react.js"></script>
    <script src="../build/react-dom.js"></script>
    <script src="../build/browser.min.js"></script>

</head>
<body>
<div id="container"></div>
<script type="text/babel">
    var MyComponent = React.createClass({
        handleClick : function () {
            this.refs.myTextInput.focus();
        },
        render:function () {
            return(
                    <div>
                        <input type="text" ref="myTextInput"/>
                        <input type="text" value="Focus the text input" onClick={this.handleClick}/>
                    </div>
            )
        }
    })

    ReactDOM.render(
            <MyComponent/>
            ,document.getElementById('container')
    )
</script>
</body>
</html>

```
这个demo中，组件`MyConmponent`的子节点有一个文本输入框，用于获取用户的输入。所以我们必须获取真实的DOM节点，所以在文本框的`input`标签有一个ref属性，然后`this.refs.[redName]`就会返回这个真实的DOM节点。
# state
组件免不了要与用户互动，React的一大创新就是jiang将组件看成是一个状态机，一开始就有一个初始状态，然后用户互动，导致状态的改变，从而重新渲染UI（查看 [demo08](https://github.com/sunshine940326/reactDemo/tree/master/demo8) ）
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="../build/react.js"></script>
    <script src="../build/react-dom.js"></script>
    <script src="../build/browser.min.js"></script>
</head>
<body>
<div id="container"></div>
<script type="text/babel">
    var LikeBtn = React.createClass({
        getInitialState: function () {
            return {liked:false}
        },

        handleClick:function (event) {
            this.setState({liked:!this.state.liked})
        },

        render:function () {
            var text = this.state.liked ? 'like' : 'haven\'t liked';
            return(
                    <p onClick={this.handleClick}>
                        You {text} this. click to toggle
                    </p>
            )
        }
    })

    ReactDOM.render(
            <LikeBtn/>
            ,document.getElementById('container')
    )

</script>
</body>
</html>

```

在这个demo中，在组件`LikeBtn`中，首先为其定义了`InitialState:liked:false`,就是`liked`初始时的状态为`false`,然后当用户点击时,导致状态的变化，`this.setState`方法就修改`state`,将`liked`修改，每次修改以后，自动调用 `this.render` 方法，再次渲染组件。
# React state与props区别
`state`与`props`都是描绘组件的特性的，所以有时候会容易混淆，所以来说一下两者的区别
`state`可以理解为状态，可以认为是组件自带的性质，当发生交互效果的时候可以通过钩子检测到然后判断是否需要改变状态，状态改变时组件也会进行相应的更新。比如在demo8里面，初始的状态为`false`，然后当我们点击组件（发生了交互，触发事件），然后状态改变`liked`的状态变为`true`，因为状态的改变，所以`p`中的文字就会做出相应的改变
`props`可以理解为属性，是由父组件继承来的，所以一旦定义就不能改变
## props属性的用法
### 键值对：值可以有多种形式<HelloWorld name= ? /> 
- 字符串："XiaoWang";
- 求值表达式 {123}、{"XiaoWang"};
- 数组{[1,2,3]};
- 变量{variable};
- 函数求值表达式{function}（不推荐，如果需要函数可以单独把函数提取出来然后单独调用函数）;
### 展开语法{...props}：
React会自动把对象中的属性和值当做属性的赋值
```
var HelloWorld =React.createClass({
     rencer:function () {
         return <p>Hello,{this.props.name1 + ' 'this.props.name2}</p>;
     },
 });
 var HelloUniverse = React.createClass({
     getInitialState:function () {
         return {
             name1:'Tim',
             name2:'John',
         };
     },
     handleChange: function (event) {
         this.setState({name: event.target.value});
     },
     render: function () {
         return <div>
         <HelloWorld name={...this.state}></HelloWorld>
         <br/>
         <input type="text" onChange={this.handleChange} />
         </div>
     },
 });
 ReactDom.render(<HelloUniverse />,document.body);
```
### getDefaultProps
getDefaultProps 方法可以用来设置组件属性的默认值。
```
var MyTitle = React.createClass({
  getDefaultProps : function () {
    return {
      title : 'Hello World'
    };
  },

  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});
ReactDOM.render(<MyTitle />,document.body);

```
##  state状态的用法
### getInitialState

`object getInitialState()`

`getInitialState `方法用于定义初始状态，也就是一个对象，这个对象可以通过 `this.state` 属性读取。在组件挂载之前调用一次。返回值将会作为 `this.state` 的初始值。

### setState

`setState(object nextState[, function callback])`
合并 `nextState` 和当前 `state`。这是在事件处理函数中和请求回调函数中触发 UI 更新的主要方法。另外，也支持可选的回调函数，该函数在 `setState` 执行完毕并且组件重新渲染完成之后调用。`this.setState` 方法用于修改状态值，每次修改以后，自动调用 `this.render` 方法，再次渲染组件。

### replaceState

`replaceState(object nextState[, function callback])`
类似于 `setState()`，但是删除之前所有已存在的 `state` 键，这些键都不在 `nextState` 中。
# 表单
用户在表单填入的内容，属于用户跟组件的互动，所以不能用 `this.props` 读取（查看 [demo9](https://github.com/sunshine940326/reactDemo/tree/master/demo9) ）。

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="../build/react.js"></script>
    <script src="../build/react-dom.js"></script>
    <script src="../build/browser.min.js"></script>

</head>
<body>
<div id="container"></div>
<script type="text/babel">
var InputTest = React.createClass({
    getInitialState: function () {
        return{
            value : 'hello!'
        };
    },
    handleChange: function (event) {
        this.setState({
            value:event.target.value
        });
    },
    render: function () {
        var value = this.state.value;
        return(
                <div>
                    <input type="text" value={value} onChange={this.handleChange}/>
                    <p>{value}</p>
                </div>
        )
    }
});

    ReactDOM.render(
            <InputTest/>
            ,document.getElementById('container')
    )
</script>
</body>
</html>

```
上述代码的效果是有一个输入框，输入框下面是一个`p`标签，第一次打开输入框和下面的文字都是Hello！然后改变输入框的内容就会在下面显示。

文本输入框的值，不能用 `this.props.value` 读取，而要定义一个 `onChange` 事件的回调函数，通过 `event.target.value` 读取用户输入的值。`textarea` 元素、`select`元素、`radio`元素都属于这种情况
# componments的生命周期
组件的生命周期分为三个状态：
- Mounting：已插入真实DOM
- Updating： 正在被重新渲染
- Unmounting：已移除真实的DOM
React 为每个状态都提供了两种处理函数，`will` 函数在进入状态之前调用，`did` 函数在进入状态之后调用，三种状态共计五种处理函数。
- componentWillMount()
- componentDidMount()
- componentWillUpdate(object nextProps, object nextState)
- componentDidUpdate(object prevProps, object prevState)
- componentWillUnmount()
此外，React 还提供两种特殊状态的处理函数。
- componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
- shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用

![这里写图片描述](http://img.blog.csdn.net/20170303184018708?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

![这里写图片描述](http://img.blog.csdn.net/20170303184131615?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

下面是一个例子（查看 [demo10](https://github.com/sunshine940326/reactDemo/tree/master/demo10) )。


```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="../build/react.js"></script>
    <script src="../build/browser.min.js"></script>
    <script src="../build/react-dom.js"></script>

</head>
<body>
<div id="container"></div>
<script type="text/babel">
    var Hello = React.createClass({
        getInitialState:function () {
            alert('init')
            return{
                opacity:1.0
            }
        },

        componentWillMount:function () {
          alert('Will')
        },

        componentDidMount:function () {
            alert('Did')
            this.timer = setInterval(function () {
                var opacity = this.state.opacity;
                opacity -= 0.05;
                if(opacity<0.1){
                    opacity = 1.0
                }
                this.setState({
                    opacity: opacity
                });
            }.bind(this),100)
        },
        render:function () {
            return(
                <div style={{opacity:this.state.opacity}}>
                    Hello {this.props.name}
                </div>
            )
        }
    });

    ReactDOM.render(
        <Hello name="world!"/>
        ,document.getElementById('container')
    )
</script>
</body>
</html>

```
整理demo写了三个函数：getInitialState、componentWillMount、componentDidMount可以通过弹出的内容来很直观的知道到component的生命周期。

为什么用bind函数，作为javascript初学者的我是这样理解的，我们在componentDidMount函数中又增加了定时器函数setInterval，所以在定时器函数的内部使用this的话，this代表的是setInterval的实例对象，但是我们需要this指向componentDidMount的实例对象，所以需要用bind函数将this指向改变，还有一种写法：

```
componentDidMount:function () {
            alert('Did')
            var _self  = this;
            _self.timer = setInterval(function () {
                var opacity = _self.state.opacity;
                opacity -= 0.05;
                if(opacity<0.1){
                    opacity = 1.0
                }
                _self.setState({
                    opacity: opacity
                });
            },100)
        },
```
这是在setInterval函数外，先将this对的复制给一个局部变量 _self,然后在setInterval函数内使用这个局部变量_self就可以在setInterval函数内使用componentDidMount中的this，这种好理解但是逼格不够高，( ￣ー￣)( ￣ー￣)
# AJAX
组件的数据来源，通常是通过 Ajax 请求从服务器获取，可以使用 `componentDidMount` 方法设置 Ajax 请求，等到请求成功，再用 `this.setState` 方法重新渲染 UI （查看 [demo11](https://github.com/sunshine940326/reactDemo/tree/master/demo11)) ）。
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="../build/react.js"></script>
    <script src="../build/react-dom.js"></script>
    <script src="../build/browser.min.js"></script>
    <script src="../build/jquery.min.js"></script>

</head>
<body>
 <div id="container"></div>

 <script type="text/babel">
     var UserGist = React.createClass({
         getInitialState:function () {
             return{
                 username: '',
                 lastGistUrl: '',
             }
         },

         componentDidMount:function () {
             $.get(this.props.source,function (result) {
                 var lastGist = result[0];
                 if(this.isMounted()){
                     this.setState({
                         username: lastGist.owner.login,
                         lastGistUrl: lastGist.html_url
                     });
                 }
             }.bind(this));
         },

         render: function () {
             return(
                 <div>
                     {this.state.username}'s last gist is <a href={this.lastGistUrl}>here</a>.
                 </div>
             )
         }
     })

     ReactDOM.render(
         <UserGist source="https://api.github.com/users/octocat/gists"/>
         ,document.getElementById('container')
     )
 </script>
</body>
</html>
```






