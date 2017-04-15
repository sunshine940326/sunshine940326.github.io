---
title: hexo高阶教程next主题优化之加入网易云音乐、网易云跟帖、动态背景、自定义主题、统计功能
date: 2017-04-09 22:32:30
tags: [git,hexo教程] 
categories: git
---
# 前言
本篇文章是在已经搭建好gitpage+hexo的博客的前提下（不懂怎么搭建的可以参考我的另一篇博文：[了解githubPages+hexo搭建博客的原理](http://cherryblog.site/2017/02/26/%E4%BA%86%E8%A7%A3githubPages-hexo%E6%90%AD%E5%BB%BA%E5%8D%9A%E5%AE%A2%E7%9A%84%E5%8E%9F%E7%90%86/) 或者[利用Gitpage+hexo开发自己的博客](http://cherryblog.site/2016/09/16/%E5%88%A9%E7%94%A8Gitpage-hexo%E5%BC%80%E5%8F%91%E8%87%AA%E5%B7%B1%E7%9A%84%E5%8D%9A%E5%AE%A2/)，这两篇博文都比较详细的教大家最基础的怎么将博客搭建起来。本篇博文是使用next主题的进击版本，主要是有以下内容

 - 域名绑定，将github博客和你的独有域名绑定
 - 添加更多的menu内容
 - 添加头像
 - 定义网站个性logo
 - 自定义样式，重写默认样式，个性化定制你的博客
 - 炫酷动态背景制作
 - 添加网易云音乐
 - 添加网易云跟帖
 - 添加leancloud阅读次数统计功能
 - 添加wordcount页面字数统计
 - 添加fork me on github功能

要想最快的知道这些功能的效果，请移步我的个人博客：http://cherryblog.site/ ，顺便求个fork，大爷们看过可以评论一下，试一下新加上的网易云跟帖效果怎么样ヽ(●´ε｀●)ノ 
<!--more-->
首先要说一下我使用的版本，这个是很重要的，我的博客最先创建于2016年的9月份，距离现在已经有大半年了，所以好多版本都已经进行了更新，特别是next主题集成了更多的插件，简直不要太爽＼（＠￣∇￣＠）／

> hexo  v3.2.2
> next  v5.1.0
> node v4.5.0
 
在改成自己想要的效果之后，对整体的hexo的next主题我有了一个大概的了解，其实next主题的最新版（5.1）已经集成了大部分我们需要的插件，只需要在主题配置文件中将默认的false改为true即可，但是我们也仍然需要知道都有哪些新的功能，最有效的方法是直接去查看官网的api：[next官网](http://theme-next.iissnan.com/)![这里写图片描述](http://img.blog.csdn.net/20170409220356907?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
> 授之于鱼不如授之于渔
希望我们都能够理解其源码，制作出属于自己专属的个性化博客(•̀ᴗ•́)

 我们需要改的文件其实也就那么几个，大部分是不需要更改，next都已经帮我们配置好了~
 默认目录结构：
```
.
├── .deploy
├── public
├── scaffolds
├── scripts
├── source
|   ├── _drafts
|   └── _posts
├── themes
├── _config.yml
└── package.json
```
- deploy：执行hexo deploy命令部署到GitHub上的内容目录
- public：执行hexo generate命令，输出的静态网页内容目录
- scaffolds：layout模板文件目录，其中的md文件可以添加编辑
- scripts：扩展脚本目录，这里可以自定义一些javascript脚本
- source：文章源码目录，该目录下的markdown和html文件均会被hexo处理。该页面对应repo的根目录，404文件、favicon.ico文件，CNAME文件等都应该放这里，该目录下可新建页面目录。
 - drafts：草稿文章
 - posts：发布文章
- themes：主题文件目录
- _config.yml：全局配置文件，大多数的设置都在这里
- package.json：应用程序数据，指明hexo的版本等信息，类似于一般软件中的关于按钮

我们最先修改的应该是在hexo根目录下的配置文件`_config.yml`文件，这里是配置整个站点的配置信息，在文章的最后贴出我的配置文件，有兴趣的朋友可以参考一下~
 其次就是我们的主题配置文件
 在对应的主题下的`_config.yml` 因为我使用的是next主题，所以目录的路径为`C:\Hexo\themes\next\_config.yml` 这里配置的是使用主题的配置文件，这个配置文件的东西就有点多了，我们大部分的修改也是在这个文件下完成的。比如说使用集成的第三方插件，默认为false，我们需要将其改为true并且配置相应的app_key就可以使用该插件了~有木有很方便(^ ◕ᴥ◕ ^)
 然后我们需要修改样式的话是需要设置css和甚至是修改模板，
 页面展现的全部逻辑都在每个主题中控制，源代码在hexo\themes\你使用的主题\中，以next主题为例：
```
├── .github            #git信息
├── languages          #多语言
|   ├── default.yml    #默认语言
|   └── zh-Hans.yml      #简体中文
|   └── zh-tw.yml      #繁体中文
├── layout             #布局，根目录下的*.ejs文件是对主页，分页，存档等的控制
|   ├── _custom        #可以自己修改的模板，覆盖原有模板
|   |   ├── _header.swig    #头部样式
|   |   ├── _sidebar.swig   #侧边栏样式
|   ├── _macro        #可以自己修改的模板，覆盖原有模板
|   |   ├── post.swig    #文章模板
|   |   ├── reward.swig    #打赏模板
|   |   ├── sidebar.swig   #侧边栏模板
|   ├── _partial       #局部的布局
|   |   ├── head       #头部模板
|   |   ├── search     #搜索模板
|   |   ├── share      #分享模板
|   ├── _script        #局部的布局
|   ├── _third-party   #第三方模板
|   ├── _layout.swig   #主页面模板
|   ├── index.swig     #主页面模板
|   ├── page           #页面模板
|   └── tag.swig       #tag模板
├── scripts            #script源码
|   ├── tags           #tags的script源码
|   ├── marge.js       #页面模板
├── source             #源码
|   ├── css            #css源码
|   |   ├── _common    #*.styl基础css
|   |   ├── _custom    #*.styl局部css
|   |   └── _mixins    #mixins的css
|   ├── fonts          #字体
|   ├── images         #图片
|   ├── uploads        #添加的文件
|   └── js             #javascript源代码
├── _config.yml        #主题配置文件
└── README.md          #用GitHub的都知道
```
# 绑定域名
绑定域名的思路如下：

 - 在万网购买自己喜欢的域名（.com的会贵一点，.site和.xyz的相对便宜一些，有的只需要几块钱一年就可以）
 - 解析DNS
 - 在hexo中添加CNAME文件

 
## 购买域名
之前没有买域名的时候我想使用网易云跟帖，发现在注册网易云跟帖的时候使用原来的域名提示“url已被使用”，这是因为网易云跟帖不认可二级域名，所以要自己买域名。
我选择的是[万网](https://wanwang.aliyun.com/)，阿里下面的。我选择了一个`.site`的域名，原价8元，使用阿里云app支付还优惠5元，等于3元到手一个域名（一年）~
按照官网的步骤一步一来就可以了~
## 解析DNS
购买完域名之后我们需要解析DNS地址，在管理控制台中的左侧有域名选项，然后找到你的域名，点击后面的“解析”
![这里写图片描述](http://img.blog.csdn.net/20170409132041051?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast )
 
  点击添加解析，记录类型选A或CNAME，
  

> A记录的记录值就是ip地址，github(官方文档)提供了两个IP地址，192.30.252.153和192.30.252.154，这两个IP地址为github的服务器地址，两个都要填上，
> 解析记录设置两个www和@，线路就默认就行了，CNAME记录值填你的github博客网址。如我的是sunshine940326.github.io。

## 在hexo中添加CNAME文件
接下来在你的hexo文件夹下source文件夹下新建一个CANME文件,里面加上你刚刚购买的域名比如我的`cherryblog.site`
![这里写图片描述](http://img.blog.csdn.net/20170409141726073?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast )
然后你就可以`hexo clean`,`hexo g`，`hexo d` 发布你的博客看看效果啦~
![这里写图片描述](http://img.blog.csdn.net/20170409142438270?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast )
**在这里我出现一个问题，就是单独输入域名是可以访问的，但是前面加上www之后就访问不聊了= =了，我感觉应该是可以的，但是不行，再等几天看看效果= =** 
# 添加菜单页
添加菜单页的思路（添加菜单页就是添加一个页面，有两种方式）：第一种是使用git命令`hexo new page "photo"` 就直接创建了` C:\Hexo\source\photo\index.md
`文件，然后编辑index.md 文件就可以了~
![这里写图片描述](http://img.blog.csdn.net/20170409165246422?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
第二种：手动创建上面的文件= =

 - 在主题的配置文件添加menu索引路径（根路径是hexo/source）,所以你如果想要更改页面的内容就去hexo/source下找到对应的文件夹，默认内容是在其index.md文件下
 - 在hexo的source文件下添加对应的文件夹
 - 在主题的配置文件添加menu_icon字段设置对应的icon
 - 修改language文件下zh-hans语言包
 - 在发表文章的时候添加对应的menu字段就可以看到

 
刚开始的时候不理解怎么添加分类页和添加文章的区别，公司有一个项目用到了wordpress，然后发现两者有相似的地方，不同的就是wordpress是有可视化的操作后台，而hexo是需要git bash自己创建**首先我们要分清什么是页面，什么是文章，**
**在hexo中menu下的内容都是新的页面**我们可以通过`hexo new page "pagename"` 创建，hexo默认的页面只有`home`,`archives`,`tags` 三个，之后我们写的博文就是文章，通过`hexo new "name"` 创建的`name.md` 文件在根目录的`source\_posts` 下，在每一个文章的头部，我们可以配置其tags或者categories内容，相当于文章是页面的下一级 
## 在配置文件中添加menu索引路径
我们可以在主题配置的_config文件下找到相应的字段，字段前加`#` 表示被注释掉，我们也可以自己添加menu的内容，比如我又新增了两个menu`life` 和`photo`
![这里写图片描述](http://img.blog.csdn.net/20170409143920151?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast )
这里添加的字段其实是加上文件索引的路径，这里hexo设置的根路径是`hexo/source` 接下来我们在这个根路径下建立相应的文件夹就可以实现点击mune跳转到相应的页面上了
![这里写图片描述](http://img.blog.csdn.net/20170409151941047?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast ),
没有明白什么意思的同学看下图

 
## 在source文件添加menu文件夹
我们需要在这个路径下自己建立对应的页面，比如说我新建了menu`life` 和`photos`，然后再source文件夹下面新建两个名字为`life` 和`photo` 的文件夹，里面添加一个`index.md` markdown文件，内容是类似这样的

```
title: photo
date: 2017-04-04 22:14:07
type: "photo"
comments: false
---
啦啦啦~
```
![这里写图片描述](http://img.blog.csdn.net/20170409152554707?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast )
这是一个markdown文件，你可以自己编写，但是我还不知道怎么把添加html文件= =，回来研究一下
## 给menu添加icon
如果只是上面的步骤，那么你可能会创建出一个新的页面，但是显示的效果会是这样：![这里写图片描述](http://img.blog.csdn.net/20170409153513929?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast )
怎么icon没有换？？？其实hexo中换icon是一个很简单的事情，因为hexo集成了`FontAwsome` 所以我们只需要在主题的配置文件中加入相应的icon名字即可
![这里写图片描述](http://img.blog.csdn.net/20170409153837056?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast )
## 查找`FontAwsome` icon
 这时候你想要换一个自己喜欢的icon怎么办，这就需要自己动手，丰衣足食了，你需要自己到[FontAwsome官网](http://www.bootcss.com/p/font-awesome/#)，然后鼠标往下拉，在图标集中选择自己喜欢的icon，然后记住名字，保存在上面的menu_icon字段中就可以啦~
 ![这里写图片描述](http://img.blog.csdn.net/20170409154335951?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)tips ：在字段中只需要填写icon-name后面跟的name即可，不需要加上前面的"icon-"
## 在language添加zh-hans翻译字段
上面的步骤完成之后你会发现，在你的博客首页显示的仍然是英文名，而我们想要有一个中文的名字，并且想要个性化定制我们的页面，我们可以在主题的language文件下的zh-hans（中文）语言包下增加相应的字段（做过翻译的童鞋应该都知道什么意思~）还可以修改其他的字段，这样就可以定制我们的博客了呢~
 ![这里写图片描述](http://img.blog.csdn.net/20170409171442363?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
## 在发表文章的时候添加对应的menu字段
在我们写文章的时候只要在头部信息添加相应的字段就在tags页面和categories中显示相应的分类，例如:
```
title: Git使用中的报错情况
date: 2017-03-11 23:54:11
tags: [git,实战经验] 
categories: git
---
```
tags、categories都是支持数组的形式的，可以添加多个tags、categories。这样我们在tags、categories页面就可以看见相应的分类了
![这里写图片描述](http://img.blog.csdn.net/20170409172519879?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
# 添加头像
我使用的主题头像是位于侧边栏，显示的效果如下，
![这里写图片描述](http://img.blog.csdn.net/20170409172733268?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)要添加一个这个的头像要怎么操作呢，其实思路就是将你要上传的头像放在你的文件夹中，然后再配置文件中引用正确的路径即可，当然也可以上传绝对路径。在你的主题配置文件找到avatar字段，然后将你得图片路径写在后面，我是新建了一个uploads文件夹，将图片放在下面
```
# Sidebar Avatar
# in theme directory(source/images): /images/avatar.jpg
# in site  directory(source/uploads): /uploads/avatar.jpg
avatar: /uploads/avatar.png
```
![这里写图片描述](http://img.blog.csdn.net/20170409173222538?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
# 设置网站logo
跟设置头像其实是一个思路，都是在配置文件中引入正确的地址就可以了，不过网站的logo是对图片有要求的，我们需要在[Favicon在线制作](http://tool.lu/favicon/)工具中制作32*32的.ico图片，然后放在source/images下面。然后在主题配置文件下添加主题配置文件中添加：`favicon: images/favicon.ico`
# 自定义样式
不得不说next还是很人性化的，你可以个性化定制你的网站，你所有的改动（css）需要放在主题文件的source/css/_costum/costum.styl文件中，会覆盖原来的css，所以只要你不想要你修改的样式，只需要删除这个文件夹就可以了，再也不用担心还原不回去了~
![这里写图片描述](http://img.blog.csdn.net/20170409174107213?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
# 炫酷动态背景
之前做过一个类似的canvas-nest的效果。新版本的next已经支持canvas-nest了，但是效果不怎么样，就不用了，但是也介绍一下，毕竟简单，只有两步就可以了。
添加修改代码`next/layout/_layout.swig`在`</body>`之前加上
```
{% if theme.canvas_nest %}
<script type="text/javascript" src="//cdn.bootcss.com/canvas-nest.js/1.0.0/canvas-nest.min.js"></script>
{% endif %}
```
打开`next/_config.yml`，添加以下代码就可以了：
```
 # Canvas-nest
canvas_nest: true
```
这种虽然简单，但是我认为效果不够好，于是我决定添加原生的js来仿知乎的登录界面做背景，这就需要修改模板来实现了。首先我们要知道next文件的结构，这样我们想改什么就知道在什么位置了~
![这里写图片描述](http://img.blog.csdn.net/20170409180317491?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
所以我们需要在layout下面的`_layout.swig` 添加一个canvas

然后使用原生js写一个仿知乎页面,详情script代码可以从github上clone：
https://github.com/sunshine940326/canvas-nest

```
<script>
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
        ctx.fillStyle = 'rgba(255, 77, 54, 0.3)'
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
</script>
```
# 添加网易云音乐
在知道了页面的结构之后，你就可以将你的播放器添加在页面的任意位置，开始我是放在了首页，然后发现一上来就自动播放太吵了，于是就放在了侧边栏，想要听得朋友可以手动点击播放，
我们可以直接在网易云音乐中搜索我们想要插入的音乐，然后点击生成外链播放器
![这里写图片描述](http://img.blog.csdn.net/20170409181717791?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
然后可以根据你得设置生成相应的html代码，将获得的html代码插入到你想要插入的位置即可
![这里写图片描述](http://img.blog.csdn.net/20170409181941920?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
我放在了`layout/_macro/sidebar.swig` 文件下

```
<div id="music163player">
    <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=280 height=86 src="//music.163.com/outchain/player?type=2&id=38358214&auto=0&height=66">
    </iframe>
</div>
```
然后就可以在侧边栏看见我的播放器了~
![这里写图片描述](http://img.blog.csdn.net/20170409191354574?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
# 网易云跟帖
之前用的是多说，但是多说在2017年6月1日就关闭评论服务了= =，很忧伤，于是转到了网易云跟帖。由于最新版（5.1）版本的next已经集成了网易云跟帖，所以只需要在主题的设置文件中配置你的productKey就可以了。获取productKey也很简单，在官网[网易云跟帖](https://manage.gentie.163.com/)中注册，然后在获取代码>通用代码中拿到productKey，之后在你的主题配置文件中的gentie_productKey字段后添加即可~
#添加Fork me on GitHub
去网址https://github.com/blog/273-github-ribbons 挑选自己喜欢的样式，并复制代码，添加到themes\next\layout_layout.swig的body标签之内即可
记得把里面的url换成自己的!
# hexo-wordcount实现统计功能 
![这里写图片描述](http://img.blog.csdn.net/20170409212441592?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
wordcount可以实现字数统计，阅读时常还有总字数的统计功能
只需要`npm install hexo-wordcount --save` 就可以安装wordcount插件，
主要功能
字数统计:WordCount
阅读时长预计:Min2Read
总字数统计: TotalCount
安装完插件之后在主题的配置文件中开启该功能就可以~
```
# Post wordcount display settings
# Dependencies: https://github.com/willin/hexo-wordcount
post_wordcount:
  item_text: true
  wordcount: true
  min2read: true
```
# leancloud阅读次数统计
next也集成了leancloud，在[leancloud官网](https://leancloud.cn/)
中注册账号等一步一步的操作就不说了哈~，我们主要是为了拿到app_key和app_id,然后在主题配置文件做一下配置
```
# Show number of visitors to each article.
# You can visit https://leancloud.cn get AppID and AppKey.
leancloud_visitors:
  enable: true
  app_id: yourapp_id
  app_key: yourapp_key
```
然后再leancloud的控制台中的存储添加一个counter的class就可以检测到我们的浏览量了，同时在你文章的副标题也可以看到有阅读次数的显示
![这里写图片描述](http://img.blog.csdn.net/20170409213510970?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

# 个人网站地址：http://cherryblog.site/，顺便求个fork
# 附录1：站点配置文件
```
 # Hexo Configuration
## Docs: https://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/

# Site   站点信息
title: Cherry's Blog    #站点名字
subtitle: To Be a Batter Me  #副标题
description: 做更好的自己   #站点描述，在侧边栏显示
author: Cherry   #博主名字
email: 991939332@qq.com #联系邮箱
language: zh-Hans   #使用的语言包，语言包在主题文件的language文件夹下，可以更改网站显示出的文案
timezone:

# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: http://yoursite.com
root: /
permalink: :year/:month/:day/:title/
permalink_defaults:

# Directory
source_dir: source
public_dir: public
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
skip_render:

# Writing
new_post_name: :title.md # File name of new posts
default_layout: post
titlecase: false # Transform title into titlecase
external_link: true # Open external links in new tab
filename_case: 0
render_drafts: false
post_asset_folder: true  #新建一个页面后自动生成一个同名文件夹（默认为false）
relative_link: false
future: true
highlight:
  enable: true
  line_number: true
  auto_detect: false
  tab_replace:

# Category & Tag
default_category: uncategorized
category_map:
tag_map:

# Date / Time format
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD
time_format: HH:mm:ss

# Pagination
## Set per_page to 0 to disable pagination
per_page: 10
pagination_dir: page

# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: next

# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repository: https://github.com/sunshine940326/sunshine940326.github.io.git
  #repository: ssh://git@github.com/sunshine940326/sunshine940326.github.io
```

