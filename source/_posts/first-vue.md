---
title: 一个项目初试 vue
date: 2017-11-06 13:24:51
tags: [vue] 
categories: [vue]
top: 1000
---

![这里写图片描述](http://img.blog.csdn.net/20171107134140655?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

> 本文首发于我的个人网站： http://cherryblog.site/

# 前言
现在 vue 已经是火了不能再火的前端框架了，但是自己一直坚持先将原生 JavaScript 学好之后再开始学习框架，所以入手 vue 的时间就比较晚，也比较短。加上我们公司的技术栈偏传统，所以就只能自己就在慕课网上找了 [vue 的视频](http://coding.imooc.com/class/74.html)（有兴趣的可以加我微信要资源），相信大家很多人都已经了解了这个项目，也有很多人有项目的源码，然后我就按照视频和源码重写了一遍。

**本项目适用于初入前端的开发人员**，如果你已经是 vue 开发的老手，那么可以直接左上角了。本文比较基础，只适用于 vue 的入门项目。说实在话，这个项目不需要太高的前端水平，只要有一点点，一点点就够了~但是所涉及的范围比较广，作为 vue 入门是可以的。

<!--more-->
# 效果
> github 地址：https://github.com/sunshine940326/elm-vue2

首先安装依赖，然后直接运行就可以了~
> `npm install`
> `npm run dev`


## 技术栈
**`vue2`、`node`、`stylus`、`ES6`、`webpack`、`vue-router`、`vue-resource`、`mock`、`eslint`**

听到这些名字是不是觉得很眼熟啊~现在，你要清楚这个工具都是用来做什么的。
### stylus
`Stylus` 是一个 CSS 的预处理框架，2010 年产生，来自 Node.js 社区，主要用来给 Node 项目进行 CSS 预处理支持其本质上做的事情与   SASS/LESS 等类似。

其实 `stylus` 和 `sass` 的 `Sass` 语法基本上是一样的。所以你要是使用 sass/less 习惯的话换成 sass/less 也是可以的。

### vue-cli
vue-cli 是一个官方发布 vue.js 项目脚手架,使用 vue-cli 可以快速创建 vue 项目的脚手架工具，当然你也可以自己创建。

### ES6
现在已经是标配了，没什么好说的，不过这个项目也就是用到了最基本的语法，`let`、`const` 和箭头函数这些基本的语法，所以 ES6 有一点基础就可以啦，不需要全部都懂的~

### webpack 
webpack 是一个模块打包器。它的主要目标是将 JavaScript 文件打包在一起,打包后的文件用于在浏览器中使用，这个项目使用的是 webpack2，也是业界标配，没什么争议

### vue-resource
vue-resource 可以实现向服务器发送请求。
vue-resource 是 Vue.js 的一款插件，它可以通过 XMLHttpRequest 或 JSONP 发起请求并处理响应。也就是说，jQuery 的 `$.ajax` 能做的事情，vue-resource 插件一样也能做到，而且 vue-resource 的 API 更为简洁。另外，vue-resource 还提供了非常有用的 inteceptor 功能，使用 inteceptor 可以在请求前和请求后附加一些行为，比如使用 inteceptor 在 ajax 请求时显示 loading 界面。

### vue-router
因为我们的项目是一个 SPA 的单页应用，所以我们不能跳转到其他页面（**单页**应用），那么我们就需要将组件映射到路由，然后告诉路由在哪里渲染组件内容。


### mock
因为这个项目是一个前后端分离的项目，所以我们要自己模拟数据，让前端攻城师独立于后端进行开发。该项目 mock 数据是通过 node 的 express 框架。

这些技术栈可以说是现在大部分公司的标配，所以学习一下还是有必要的~
学习以上技术栈的内容建议全部参考官方 API。详细的这里就不在细说。

# 你可以学习到....
通过这个项目，你可以学习到：

1. **如何配置 webpack**
2. **vue 最基本的指令、父组件和子组件之间怎么传值**
3. **如何使用 express 框架的 router 模拟服务器发送的请求**
4. **如何使用 vue-resource 来发送请求**
5. **怎么 mock 数据，学会前后端分离的开发方式**
6. **怎么使用 vue-router 开发 SPA 单页应用**
7. **了解一个项目完整的开发流程**
8. **学会组件化、模块化的开发模式**
9. **学会使用 eslint 检查代码规范**
10. **学会使用字体图标**

# vue
vue 是什么就不再赘述了~
我们来说下 vue 的两大核心思想，一个是 组件化，一个是数据驱动 

## 组件化开发
组件化就是将一个整体合理拆分为一个一个小块（组件），组件可重复使用。
我们使用组件化是将我们的项目中多次出现的部分抽离出来形成一个 component，在这个 component 中包含这个组件的 html、js、css 和 image 文件。

比如说我的 header 文件
```
header
│   ├── brand@2x.png
│   ├── brand@3x.png
│   ├── bulletin@2x.png
│   ├── bulletin@3x.png
│   ├── decrease_1@2x.png
│   ├── decrease_1@3x.png
│   ├── decrease_2@2x.png
│   ├── decrease_2@3x.png
│   ├── discount_1@2x.png
│   ├── discount_1@3x.png
│   ├── discount_2@2x.png
│   ├── discount_2@3x.png
│   ├── guarantee_1@2x.png
│   ├── guarantee_1@3x.png
│   ├── guarantee_2@2x.png
│   ├── guarantee_2@3x.png
│   ├── header.vue
│   ├── invoice_1@2x.png
│   ├── invoice_1@3x.png
│   ├── invoice_2@2x.png
│   ├── invoice_2@3x.png
│   ├── special_1@2x.png
│   ├── special_1@3x.png
│   ├── special_2@2x.png
│   └── special_2@3x.png

```
将这个 header 所需要的所有 image 都放在这个 header 文件夹中，然后 html、css、js 都在 `header.vue` 里面，这样一个 header 所需要的所有资源都在 header 文件夹中。

我们如果在其他的 component 中引用这个组件，只需要 import 导入 `header.vue` 这个文件就可以了~

将同功能的组件文件放到同一目录下，结构清晰、职责明确，视图、样式、脚本的关系显著，也易于单元测试，是独立展示和交互的最小单元。

使用 vue 进行组件化开发可以解决组件的复用性（样式、逻辑、属性）、组件间的通信等问题。

## 数据驱动
数据驱动是前端的未来发展方向，释放了对 DOM 的操作，让 DOM 随着数据的变化自然而然的变化（尤神原话），不必过多的关注 DOM，只需要将数据组织好即可。

vue、react、angular 和传统的 jQuery 开发的主要区别就是对 view 层的渲染，使前端不必在关心怎么操作 DOM（其实有好多人使用 jQuery 就是为了更方便的操作 DOM），而是将注意力放在业务上。

# vue-cli
在介绍完了一些基本的内容之后，相信你已经对我们要进行的项目有了一个大概的了解。
那先从第一步开始，使用 vue 的脚手架工具 vue-cli 快速搭建一个 vue 项目。

## 安装 vue-cli
安装 vue-cli 很简单，只需要一个命令就好~（前提是你已经安装了 node，并且版本是 node 4+）

`npm install --global vue-cli`

安装完之后你就可以初始化一个 webpack 项目
`vue init webpack projectname`

之后会进入安装阶段，需要输入一些项目的信息
![vue-cli安装成功](https://user-gold-cdn.xitu.io/2017/11/7/df2ad4b3b4ec752a479fd472c7ad69f4)

之后就按照提示执行下面命令安装一些 npm 包然后启动项目
```
cd vue-test
npm install
npm run dev
```

然后我们就可以在我们的浏览器中看到自动打开了一个 `http://localhost:8080/#/` ，这就是我们的第一个 vue 项目。
![第一个vue项目](https://user-gold-cdn.xitu.io/2017/11/7/11c5077d875635e42962ead2bd0d5e5d)

# 目录结构
```
.
├── README.md
├── build                 // webpack 配置相关
├── config                // webpack 配置相关
├── index.html            // 项目入口
├── node_modules          // 通过 npn install 安装的依赖代码库
├── package.json          // 项目配置文件
├── src                   // 我们开发存放的源码
├── .babelrc              // babel 的一些配置
├── .editorconfig         // 编译器配置 
├── .eslintignore         // 忽略语法检查的文件
├── .eslintrc.js          // eslint 的配置文件
├── .gitignore            // 不进行版本控制的文件
├── .postcssrc.js
└── static                // 存放第三方资源

```

我们从目录结构可以看出，整个项目的入口是 `index.html` 文件，但是在这个文件中只有一个 id 为 app 的 div。这是因为我们使用的 webpack 将其他需要的 js、css 等文件都动态的加载到这个文件中。

## src 结构
我们再来看一下 src 文件的结构:
```
.
├── App.vue
├── components
├── main.js
└── common
```
app.vue 是项目的主 vue 文件，`main.js` 是项目的主 js 文件（可以在 webpack 的配置文件`webpack.base.conf.js` 中配置）。

## `main.js` 文件 
在 `main.js` 中：
```
import Vue from 'vue';
import App from './App';

new Vue({
  el: '#app',
  render: h => h(App)
});
```
我们先新创建一个 vue 实例，然后将导入的 App 挂载到 `#app` 上。这样 `index.html` 中的 `<div id="app"></div>`，就有了 `App.vue` 的内容。


# 配置 webpack
当我们使用 `npm run dev` 命令启动项目的时候，会查找 `package.json` 文件中 `script` 对象的 `dev` 对应的文件：
`package.json`
```
{
  
  "scripts": {
    "dev": "node build/dev-server.js",
    "start": "node build/dev-server.js",
    "build": "node build/build.js",
    "lint": "eslint --ext .js,.vue src"
  },
 }
```
所以在我们输入 `npm run dev` 启动项目之后，就会执行 `build/dev-server.js` 里面的文件。

## `build/dev-server.js` 文件
我们来看一下这个 `build/dev-server.js` 文件；

该文件的主要作用是：
1. 检查node和npm的版本、引入相关插件和配置
2. webpack对源码进行编译打包并返回 compiler 对象
3. 创建 express 服务器
4. 配置开发中间件（webpack-dev-middleware）和热重载中间件（webpack-hot-middleware）
5. 挂载代理服务和中间件
6. 配置静态资源
7. 启动服务器监听特定端口（8080）
8. 自动打开浏览器并打开特定网址（localhost:8080）

代码注释如下，文件比较长= =，不想看可以忽略
```
// 检查 Nodejs 和 npm 版本
require('./check-versions')();

// 获取基本配置
var config = require('../config');
// 如果 Node 的环境变量中没有设置当前的环境（NODE_ENV），则使用config中的dev环境配置作为当前的环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn');            // opn 是一个可以调用默认软件打开网址、图片、文件等内容的插件，使用 opn 自动打开 dev-server 坚挺的端口
var path = require('path');          // nodejs 的一个 api，提供了一些文件路径的操作方法
var express = require('express');    // 是 nodejs 的一个框架，我们使用 express  启动一个 web server
var webpack = require('webpack');    // 引入 webpack
var proxyMiddleware = require('http-proxy-middleware');      // http-proxy-middleware是一个express中间件，用于将http请求代理到其他服务器
var webpackConfig = require('./webpack.dev.conf');           // 开发环境下的 webpack 配置

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port;              // dev-server 监听的端口，如果没有在命令行传入端口号，则使用config.dev.port设置的端口，例如8080
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser;          // 用于判断是否要自动打开浏览器的布尔变量，当配置文件中没有设置自动打开浏览器的时候其值为 false
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable;                      // HTTP 代理表，指定规则，将某些API请求代理到相应的服务器

var app = express();                                         // 创建 express 服务器

var appData = require('../data.json');                       // 引入 mock 使用的数据
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();

apiRoutes.get('/seller', function (req, res) {
  res.json({
    erron: 0,
    data: seller
  })
});

apiRoutes.get('/ratings', function (req, res) {
  res.json({
    erron: 0,
    data: ratings
  })
});

apiRoutes.get('/goods', function (req, res) {
  res.json({
    erron: 0,
    data: goods
  })
});

app.use('/api', apiRoutes);

var compiler = webpack(webpackConfig);                                  // webpack 根据配置开始编译打包源码并返回 compiler 对象

var devMiddleware = require('webpack-dev-middleware')(compiler, {       // webpack-dev-middleware将webpack编译打包后得到的产品文件存放在内存中而没有写进磁盘
  publicPath: webpackConfig.output.publicPath,                          // 设置访问路径为 webpack 配置中的 output 里面所对应的路径
  quiet: true                                                           // 设置为true，使其不要在控制台输出日志
});

var hotMiddleware = require('webpack-hot-middleware')(compiler, {       // webpack-hot-middleware，用于实现热重载功能的中间件
  log: false,                                                           // 关闭控制台的日志输出
  heartbeat: 2000                                                       // 发送心跳包的频率
})

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {                 // webpack(重新)编译打包完成后并将js、css等文件inject到html文件之后，通过热重载中间件强制页面刷新
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {                    // 根据 proxyTable 中的代理请求配置来设置express服务器的http代理规则
  var options = proxyTable[context];
  if (typeof options === 'string') {
    options = {target: options};                                        // 格式化 options，例如将'www.example.com'变成{ target: 'www.example.com' }
  }
  app.use(proxyMiddleware(options.filter || context, options))
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());                     // 重定向不存在的 URL，用于支持 SPA（单页应用）

// serve webpack bundle output
app.use(devMiddleware);                                                 // 挂载 webpack-dev-middleware 中间件，提供 webpack 编译打包后的产品文件服务

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);                                                 // 挂载热重载中间件

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);      // 提供 static 文件夹上的静态文件服务
app.use(staticPath, express.static('./static'));

var uri = 'http://localhost:' + port;              // 访问链接

var _resolve;                                      // 创建promise，在应用服务启动之后resolve,便于外部文件require了这个dev-server之后的代码编写
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...');            // webpack-dev-middleware 等待 webpack 完成所有编译打包之后输出提示语到控制台，表明服务正式启动
devMiddleware.waitUntilValid(() => {                // 服务正式启动才自动打开浏览器进入页面
  console.log('> Listening at ' + uri + '\n');
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
});

var server = app.listen(port);                       // 启动express服务器并监听相应的端口

module.exports = {                                   // 暴露本模块的功能给外部使用
  ready: readyPromise,
  close: () => {
    server.close()
  }
};
```

## `build/webpack.base.conf.js` 文件
我们来简单看一下 webpack 的配置文件
webpack.base.conf.js 主要完成了下面这些事情：
1. 配置 webpack 编译入口
2. 配置 webpack 输出路径和命名规则
3. 配置模块 resolve 规则
4. 配置不同类型模块的处理规则

该文件的注释版如下：同样，文件比较长= =
```
var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

// 返回绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {                                                     // webpack 文件入口
    app: './src/main.js'
  },
  output: {                                                    // webpack 输出路径
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    // 自动补全文件路径
    extensions: ['.js', '.vue', '.json'],
    // 提供别名，缩短路径长度
    alias: {
      'vue$': 'vue/dist/vue.esm.js',                           // import Vue from 'vue/dist/vue.common.js'可以写成 import Vue from 'vue'
      '@': resolve('src'),
    }
  },
  // 不同类型模块的处理规则
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',                               // 对src和test文件夹下的 .js 和 .vue 文件使用 eslint-loader 进行代码规范检查
        enforce: 'pre',                                        // 在 loder 之前进行处理
        include: [resolve('src'), resolve('test')],            // 只对此目录下的文件经行处理
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',                                  // 对所有.vue文件使用vue-loader进行编译
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',                                // 对 src 和 test 文件夹下的 .js 文件使用 babel-loader 将 es6+ 的代码转成 es5
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',                                  // 对图片资源文件使用url-loader
        options: {
          limit: 10000,                                        // 图片小于 10kb 的情况转化为 base64
          name: utils.assetsPath('img/[name].[hash:7].[ext]')  // 其他的图片转移到静态资源文件夹
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',                                  // 对多媒体资源文件使用url-loader
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,               // 对字体资源文件使用url-loader
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}

```
# vue 怎么使用组件
## `App.vue` 文件
我们先来看一下入口的 vue 文件 `App.vue`
在 `App.vue` 文件中：
```
<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">卖家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
  </div>
</template>

<script>
  import header from './components/header/header.vue';

  const ERR_OK = 0;
  export default {
    data() {
      return {
        seller: {}
      };
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
        if (response.erron === ERR_OK) {
          this.seller = Object.assign({}, this.seller, response.data);
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl";

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)

</style>
```
在这个文件中，我们可以看到一个最基本的 vue 文件的构成。
1. template
2. script
3. style

其实也就相当于是 html、script 和 css 都放在了一个文件中。

我们可以看出来 `App.vue` 基本上就是我们项目的主页面了，根据组件化的思想，我们将 header 单独创建出来，称为一个 component，然后我们怎么在 `App.vue` 中使用这个 header 组件呢？
1. 在 script 标签中 import 这个 `header.vue` 文件
2. 在 export 的时候声明这个 component
3. 在 template 中就可以使用这个 component 了

## 该项目中的组件
我们来看下 component 文件，看一下整个项目都有哪些 vue 组件
```
├── cartcontrol         // 控制购物陈增加的加号和减号
├── food                // 商品详情页
├── goods               // 商品页面
├── header              // header 
├── ratings             // 评论页面
├── ratingselect        // 选择满意还是不满意   
├── seller              // 卖家页面
├── shopcart            // 商品页面底部购物车
├── split               // 分隔的 div
└── star                // 评分组件，显示小星星
```

# 怎么使用 vue-router 设置路由
在上面的 `App.vue` 中，我们应该可以看到 tab 的 div 中使用了 vue-router，为什么使用 vue-router 在简介中也写明了。下面我们来看一下怎么使用 vue-router 的；
1. 在 `main.js` 中使用 `vue-router`
```
import VueRouter from 'vue-router';
Vue.use(VueRouter);
```
2. 在 `main.js` 中注册组件
```
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';
```
3. 使用 vue-router
```
Vue.use(VueRouter);
```
4. 定义路由
```
const routes = [
  {
    path: '/',
    redirect: '/goods'
  },
  {
    path: '/goods',
    component: goods
  },
  {
    path: '/ratings',
    component: ratings
  },
  {
    path: '/seller',
    component: seller
  }
];
```
5. 创建 router 实例，然后传 routes 配置

```
const router = new VueRouter({
  routes
});

```
6. 将 router 挂载到根节点上
```
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
```
7. 使用 `router-link to`
然后在 `template` 中使用 `router-link to` 就可以通过路由访问对应的 component 
8. 我们就可以通过 `http://localhost:8080/#/goods` 访问到商品的页面，`http://localhost:8080/#/ratings` 可以访问评论页面

![评论页面](https://user-gold-cdn.xitu.io/2017/11/7/68333cb6549a82252e9e43123447e11f)

# 数据 mock
在前面已经简单介绍了什么是数据的 mock，那么我们来实现一下~

先需要准备一个 json 文件，模拟服务器给你传的数据（前提是你要和你们的后端商量好数据格式）。

1. 我们先使用 node 的 express 框架启动一个 web serve
```
var app = express();  
```

2. 然后我们将我们的数据引入
```
var appData = require('../data.json'); 
```
3. 这样我们就将我们的数据存在了 appData 这个变量里面了。
4. 使用 express.Router 类创建模块化、可挂载的路由句柄
```
var apiRoutes = express.Router();
```
5. 利用 express 模块下的 router 对象提供的 get 方法设置请求路径以及成功后的回调函数
```
apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  })
});

apiRoutes.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
});

apiRoutes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  })
});
```
6. 设置访问数据路径
```
app.use('/api', apiRoutes);
```

`app.use('/api', apiRoutes)` 表明这个路径用于提供数据，当我们访问 `/api/musicData` 时候，将会返回 Data 的数据给我们。

比如我们访问 `http://localhost:8080/api/goods`，就可以访问到刚刚设置的 data.json 中的 goods 对象中的数据。

![goods数据](https://user-gold-cdn.xitu.io/2017/11/7/d9ac6cce492d487668d6d857a2f754ec)
7. 使用 `vue-resource` 请求数据
我们刚刚使用的 express 的 router 已经设置好了服务器返回的接口，那么我们现在就可以使用 `vue-resource` 来访问这个接口获取数据了。
8. 我们先在 `main.js` 中引用 `vue-resource`
```
import VueResource from 'vue-resource';
Vue.use(VueResource);
```
9. 然后我们在 created 的时候就可以使用 `$http` 发起请求，在发送请求后，使用then方法来处理响应结果，then方法有两个参数，第一个参数是响应成功时的回调函数，第二个参数是响应失败时的回调函数（这里只处理了请求成功的情况）。然后请求到的数据就放在了 this.seller 对象中。

```
this.$http.get('/api/seller').then((response) => {
  response = response.body;
  if (response.erron === ERR_OK) {
    this.seller = Object.assign({}, this.seller, response.data);
  }
});
```
10. 然后我们就可以直接使用 seller 了，比如我们想使用 seller 对象中的 name 的值
```
"seller": {
  "name": "粥品香坊（回龙观）"
}
```

```
<h1 class="title">{{seller.name}}</h1>
```
# v-on
我们先来看一下默认的主页面是如何实现的，首先在最上面是一个 header 组件，点击 header 之后会出现商家信息的弹出层

![header 弹出层](https://user-gold-cdn.xitu.io/2017/11/7/76adcc76fbb126a212e23896e0253508)

我们就来看一下这个点击是怎么实现的。
```
<template>
  <div class="header" @click="showDetail">
    <div class="detail" v-show="detailShow">
    </div>
  </div>
</template>
```
在我们的 header 组件中，有一个 detail 组件，当我们点击 header 的时候，detail 就会显示。

这里我们用到的是 vue 的两个指令： `@click` 和 `v-show`。

`@click` 是 `v-on` 指令的缩写。`@click="showDetail"` 也就相当于 `v-on:click="showDetail"` 这样写你是不是有点熟悉了呢。这样我们就会调用 methods 里面的 `showDetail` 方法。

```
export default{
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
        event.cancelBubble = true;
      }
    },
};
```

# v-show
v-show 指令是控制元素的显示和隐藏，当 v-show 的值为 true 的时候，就会显示该元素，当 v-show 的值为 false 的时候，该元素就会隐藏。

所以我们给 `class="detail"` 这个 div 设置一个 `v-show="detailShow"`，将变量 detailShow 赋值给 `v-show`，detailShow 变量的初始值我们设置在 `data(){}` 的返回函数中，初始值设置为 false，然后在点击 header 的时候，将 detailShow 设置为 true。这样 `class="detail"` 这个 div 就显示了~

# v-bind
然后我们点击了 header 之后显示了 detail 页面，我们可以看到：

![header-detail](https://user-gold-cdn.xitu.io/2017/11/7/22df5f3481ea64b4e6cab4d81e07f4d9)

这里前面的 icon 是怎么实现的呢，不同的活动对应不同的 icon，并且每一个商家的活动也都不相同。

如果使用传统的 jquery 开发的话可能就会比较麻烦，但是在 vue 中，我们只需要使用 `v-bind` 指令就可以了。

我们将该元素与 class 绑定，`v-bind:class` 的值为数组 classMap 。

```
<div class="support" v-if="seller.supports">
  <span class="icon" :class="classMap[seller.supports[0].type]"></span>
  <span class="text">
    {{seller.supports[0].description}}
  </span>
</div>
```

classMap 数组的值为:
```
created() {
  this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
},
```
所以，`seller.supports[0].type` 就和 classMap 的值相关联起来了，如果 `seller.supports[0].type` 值为 0，那么对应 classMap 的第一个索引，也就是 `decrease`。

这样，该 icon 对应的 class 就是 decrease，然后我们设置 class 为 decrease 对应的样式就可以了~

这样就可以做到传入不同的参数显示不同的样式了~

# v-for
其实从指令的名字就可以看出来，这个指令和循环有关，可以让我们循环 dom 结构。

我们用 v-for 指令根据一组数组的选项列表进行渲染。v-for 指令需要使用 item in items 形式的特殊语法，items 是源数据数组并且 item 是数组元素迭代的别名。

![header-detail](https://user-gold-cdn.xitu.io/2017/11/7/22df5f3481ea64b4e6cab4d81e07f4d9)

比如在 header 中，这部分就可以使用 v-for
```
<ul class="supports">
  <li class="support-item" v-for="item in seller.supports">
    <span class="icon" :class="classMap[item.type]"></span>
    <span class="text">{{item.description}}</span>
  </li>
</ul>
```
# vue 中的动画
 vue 中实现动画的操作有好多种，比如可以使用 vue 自带的 `transition`、css 动画、js 钩子函数

我们在这里使用的是最简单的 vue 自带的 `transition`，使用方法如下：
1. `<transition>` 元素作为单个元素/组件的过渡效果。`<transition>` 只会把过渡效果应用到其包裹的内容上，而不会额外渲染 DOM 元素，也不会出现在检测过的组件层级中。

我们要先写一个 `<transition>` 标签
```
<transition name="fade">
<transition>
```
然后我们直接设置 CSS 样式就可以
```
&.fade-enter-active, &.fade-leave-active
  transition: all 0.5s
&.fade-enter, &.fade-leave-active
  opacity: 0
  background: rgba(7, 17, 27, 0)
```
![transition](https://user-gold-cdn.xitu.io/2017/11/7/2591fef644eb9649e6faaa8b4d5d02d4)

# ref
ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例

其实我感觉 ref 和 id 类似，就是在 html 中设置 ref，然后就可以在 js 中使用 $ref 来获取该元素。

# Vue.set
Vue.set 设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。这个方法主要用于避开 Vue 不能检测属性被添加的限制。

还是我们这个点击加号添加购物车这个需求，我们给这个加号元素添加一个 addCart 事件，然后

```
methods: {
  addCart(event) {
    if (!event._constructed) {
      return;
    }
    if (!this.food.count) {
      Vue.set(this.food, 'count', 1);
    } else {
      this.food.count++;
    }
    this.$emit('add', event.target);
 },
}
```


# 组件间的通信
## 父组件向子组件传值
比如我们在 App.vue 中需要将 seller 的值（从数据中获取的 json 对象）传递给 header 组件
1. 在 header 组件中使用 props
```
export default{
  props: {
    seller: {
      type: Object
    }
  },
}
```
2. 在父组件 App.vue 中的 header 标签中对 seller 进行动态绑定。
```
<div id="app">
  <v-header :seller="seller"></v-header>
</div>
```
这样我们就可以再子组件中使用父组件传入的数据了。

## 子组件向父组件传值
![购物车控制器](https://user-gold-cdn.xitu.io/2017/11/7/2204ec94f52e15a280721b0fc48e6873)

在这个里面，子组件是 cartcontrol，父组件是 goods 商品页面。

我们现在想实现点击加号然后实现一个小球下落的特效，这个时候需要获取到当前元素的坐标信息，这个时候我们就需要子组件向父组件传值，将改 dom 元素传过去，使得父元素获取到当前元素，然后再获取坐标信息。

1. 子组件中需要以某种方式例如点击事件的方法来触发一个自定义事件，例如：
```
<div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>

```
2. 将需要传的值作为 $emit 的第二个参数，该值将作为实参传给响应自定义事件的方法
```
addCart(event) {
  if (!event._constructed) {
    return;
  }
  if (!this.food.count) {
    Vue.set(this.food, 'count', 1);
  } else {
    this.food.count++;
  }  
  this.$emit('add', event.target);
},
```
3. 在父组件中注册子组件并在子组件标签上绑定对自定义事件的监听
```
<div class="cartcontrol-wrapper">
  <cartcontrol @add="addFood" :food="food"></cartcontrol>
</div>
```

# 待续...
当然，这只是最基本的 vue 项目搭建方式和一些 vue 的基本指令和操作，这是一个入门，以后应该还更，留个坑~



 














