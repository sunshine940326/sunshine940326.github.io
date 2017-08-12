---
title: Hexo 1：【基础】利用 hexo + Gitpage 开发自己的博客
date: 2016-09-16 01:07:17
tags: [Hexo建站初级教程,Githubpages,Hexo]
categories: [Hexo建站]
---
![这里写图片描述](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493223838128&di=c9a4b5d92b7ab41789dbde3069dbaf3a&imgtype=0&src=http%3A%2F%2Fpic4.zhimg.com%2Fd4c1239e75c02e8482c22017a6c8d407_r.jpg)

进入程序员这个坑之后就开始自己在网上扒资料，然而资料太多，情况太复杂，主要是看见别人的博客，感觉好高大上，并且感觉在茫茫的互联网有自己的小天地感觉也是极好的。不是为了给别人看，而是为了 记录自己的成长，记录自己的每一个脚印。
<!--more-->

Gitpage+hexo
------------

想要实现拥有一个独立的私有博客，我们需要两个东西，一个是可供浏览器访问的静态网页存储空间，这个我们选择gitPage，一个是一个静态网页生成工具，Octopress也好，Hexo也罢，这里我选择的是Hexo。

环境准备
====

1 安装Node
--------

到Node.js官网下载相应平台的最新版本，一路安装即可。我用的是node-v0.10.22-x86.msi

2 安装Git
-------
安装git，或安装github客户端，自我感觉github客户端很好用，界面很友好，同样操作起来也比git好用的多！我用的是window10系统，在官网下载数次都未安装成功，最后在知乎上终于找到安装包，链接: http://pan.baidu.com/s/1eS2mHxS 密码: yatq ，有需要的同学可以点击下载。

安装步骤
====

1 安装Hexo
------

使用git shell,依次输入以下代码命令：

```
cd /
npm install hexo-cli -g
```


命令解释：

**cd和/之间要有空格**，这条指令的作用是返回根目录，也可以在cd /后加入一个文件名，例如下文要用到的cd /Hexo 就可以指向这个文件夹，再输入代码行就默认在在此文件下执行。

2 安装博客所需文件
----------

```
cd /
hexo init Hexo
cd /Hexo
npm instal
hexo generate（可简写为hexo g）
hexo sever（可简写为hexo s）
```

命令解释:

- cd /这里返回的根目录取决于你在github客户端的设置，我设置的是F盘，所以返回得也是F盘，所以下面创建的Hexo文件夹也在F盘。

- Hexo这个文件名可以随便命名，存放的是构建博客所要用到的所有文件。

- 指向Hexo目录

- 安装依赖文件

- 编译

- 开启本地服务(第5、6步的操作可以合并成hexo s -g)

此时打开浏览器，在地址栏输入http://localhost:4000/
即可查看博客的原型，是不是看到了胜利的曙光；但是如果“显示无法访问此网站”也不要沮丧，我这步是直接看到页面的，你无法访问的原因可能你没有翻墙，因为页面中默认使用了ajax.google.com 下的js包。

那么如何翻墙呢？ 下面提供我所知道的两种方法：

这种方法比较简单，下载安装运行Lantern，可以官网下载的吧！这里提供一下安装包吧，链接: http://pan.baidu.com/s/1c2x7eRu
密码: z3kw

这种方法需要修改hosts文件，我的 hosts 文件路径：C:\Windows\System32\drivers\etc ，详细攻略：http://blog.my-eclipse.cn/host-google.html

如果你不想翻墙，可以采用这种方法：
进入你刚新建好的 blog根目录

```
 themes/landscape/layout/_partial

```
1，找到 after-footer.ejs把

```
<script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.min.js“ > </script>
```
替换成

> `<script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.min.js“ > </script>`

2，找到 header.ejs
注释掉或者删掉 下面这句css引用
`<link href="//fonts.googleapis.com/css?family=Source+Code+Pro" rel=”stylesheet” type=”text/css”>`
hexo server 之后。访问 http://localhost:4000 就会看到blog主页了。

如果你成功在http://localhost:4000/
下看到了博客原型，那么再进行一些简单的操作之后就可以马上拥有自己的博客了，是不是很激动！

> 行百里者半九十

不到成功的那一刻，一切欣喜若狂都是不值得的！如果你已经迫不及待，我们继续：

3 部署博客到服务器
--------

也就是把博客部署到github page提供的服务器上。

步骤

- 首先回到git shell按ctrl+c，之后输入y即可


- 修改Hexo文件夹下_config.yml文件，如下图所示修改，repository后的地址要改成你自己的地址：`deploy:  type: github  repo: https://github.com/yourname/blog.git`


继续回到git shell输入命令：

```
 hexo clean
 hexo g
 hexo s
 hexo d
```

命令解释:

- 清除public，当 source 文件夹中的部分资源更改过之后，特别是对文件进行了删除或者路径的改变之后，需要执行这个命令，然后重新编译。
编译，一般部署上去的时候都需要编译一下，编译后，会出现一个 public 文件夹，将所有的md文件编译成html文件
- 开启本地服务，
- 部署博客到github上，如果一切顺利，你就通过访问usename.github.io访问你的博客了！
是的，现在你拥有了自己的博客！

发表博文
====

千辛万苦建立了博客，那么我们来学习一下如何发表博文。

新建博文
----

继续回到git shell输入：

hexo new "新博文的名字"
即可在 Hexo\source_posts 目录中找到”新博文的名字.md”这个文件。你就可以使用maekdown编辑器打开进行编写博客内容了。

**Markdown编辑器**

推荐两款我所使用的markdown编辑器：

**MIU**，据说是仿mac版的mou，界面相当友好，非常喜欢，官网都下载不了，挺小众，可能我就是典型的少说派，我也是偶然间得到，在此提供下载地址：
链接: http://pan.baidu.com/s/1slMPeTR
密码: 2pnk
**正在使用的Atom:**更为先进的文本代码编辑器 ,由 Github 打造的下一代编程开发神器,其中支持markdown。
可能会遇到的问题

> hexo new [layout] "postName" #新建文章

其中layout是可选参数，默认值为post。有哪些layout呢，请到scaffolds目录下查看，这些文件名称就是layout名称。当然你可以添加自己的layout，方法就是添加一个文件即可，同时你也可以编辑现有的layout，比如post的layout默认是hexo\scaffolds\post.md

```
title: { { title } }
date: { { date } }
tags:
---
```

大括号与大括号之间我多加了个空格，否则会被转义，不能正常显示。
我想添加categories，以免每次手工输入，只需要修改这个文件添加一行

```
title: { { title } }
date: { { date } }
categories:
tags:
---
```


postName是md文件的名字，同时也出现在你文章的URL中，postName如果包含空格，必须用”将其包围，postName可以为中文。

注意，所有文件：后面都必须有个空格，不然会报错。

看一下刚才生成的文件hexo\source\_posts\postName.md

```
title: postName #文章页面上的显示名称，可以任意修改，不会出现在URL中
date: 2013-12-02 15:30:16 #文章生成时间，一般不改，当然也可以任意修改
categories: #文章分类目录，可以为空，注意:后面有个空格
tags: #文章标签，可空，多标签请用格式[tag1,tag2,tag3]，注意:后面有个空格
---
```

始使用markdown格式输入你的正文。，你就可以用喜爱的编辑器尽情书写你的文章。关于markdown语法，可以参考我的文章Markdown简明语法。

**fancybox**
可能有人对这个Reading页面中图片的fancybox效果感兴趣，这个是怎么做的呢。
很简单，只需要在你的文章*.md文件的头上添加photos项即可，然后一行行添加你要展示的照片：
```
layout: photo
title: 我的阅历
date: 2085-01-16 07:33:44
tags: [hexo]
photos:
- http://bruce.u.qiniudn.com/2013/11/27/reading/photos-0.jpg
- http://bruce.u.qiniudn.com/2013/11/27/reading/photos-1.jpg
```

经过测试，文件头上的layout: photo可以省略。

不想每次都手动添加怎么办？同样的，打开您的hexo\scaffolds\photo.md
```
layout: { { layout } }
title: { { title } }
date: { { date } }
tags:
photos:
-
---
```
然后每次可以执行带layout的new命令生成照片文章：

```
hexo new photo "photoPostName" #新建照片文章
```
description
markdown文件头中也可以添加description，以覆盖全局配置文件中的description内容，请参考下文_config.yml的介绍。
```
title: hexo你的博客
date: 2013-11-22 17:11:54
categories: default
tags: [hexo]
description: 你对本页的描述
---
```
hexo默认会处理全部markdown和html文件，如果不想让hexo处理你的文件，可以在文件头中加入layout: false。

**文章摘要**
在需要显示摘要的地方添加如下代码即可：

```
以上是摘要
<!--more-->
以下是余下全文
```
more以上内容即是文章摘要，在主页显示，more以下内容点击『> Read More』链接打开全文才显示。

hexo中所有文件的编码格式均是UTF-8。


优雅的在博客上插入图片
-----------

看到很多博客上说使用七牛，但是这种方法可能是用着最爽的，我们来看一下如何使用：

首先确认 _config.yml 中更改 post_asset_folder:true 。
回到git shell，输入

npm install https://github.com/CodeFalling/hexo-asset-image --save

继续执行

```
 hexo clean
 hexo g
 hexo s
 hexo d
```

重新创建一个博客名字，然后发现Hexo\source_posts下多了一个与博客名字相同的空文件夹


然后就可以把我们博客中要用到的图片存放在这个文件夹下，需要时直接引用即可，是不是特别方便？
提醒：

写一篇博文时尽量只使用一种markdown编辑器，如果同时使用两个编辑器，我感觉不同编辑器对markdown语法的编译还是有一些差别的，用这个编辑器写好的格式用另一个编辑器打开却乱了！

预览和发表
-----

继续重复以下命令即可实现预览和发表，恭喜你已经在自己建设的博客网站上发表了第一篇博文！

```
1.  hexo clean
2.  hexo g
3.  hexo s
4.  hexo d
```

更高大上的发表博文的方法

使用Travis CI自动部署你的Hexo博客到Github,请参考[手把手教你使用Travis CI自动部署你的Hexo博客到Github上](http://i.woblog.cn/2016/05/04/%E6%89%8B%E6%8A%8A%E6%89%8B%E6%95%99%E4%BD%A0%E4%BD%BF%E7%94%A8Travis%20CI%E8%87%AA%E5%8A%A8%E9%83%A8%E7%BD%B2%E4%BD%A0%E7%9A%84Hexo%E5%8D%9A%E5%AE%A2%E5%88%B0Github%E4%B8%8A/#more)

使用could9在线更新博客，这样的话即使更换了电脑，也能优雅的更新博客了。详细请参考：用c9.io实现在线更新博客

安装主题
----

如果你跟我一样觉得原始的博客主题很low，想更换一个高逼格的，那我们继续往下进行：

选择主题

你可以在[Themes·Hexo](https://github.com/hexojs/hexo/wiki/Themes)上选择你喜欢的主题，我使用的Next主题

安装Next主题
---

参考[Next官方文档](http://theme-next.iissnan.com/getting-started.html),内容十分详尽！

安装主题的方法就是一句git命令：

```
git clone https://github.com/heroicyang/hexo-theme-modernist.git themes/modernist
```

目录是否是modernist无所谓，只要与_config.yml文件一致即可。

安装完成后，打开hexo\_config.yml，修改主题为modernist

```
theme: modernist
```
打开hexo\themes\modernist目录，编辑主题配置文件_config.yml：

```
menu: #配置页头显示哪些菜单
#  Home: /
  Archives: /archives
  Reading: /reading
  About: /about
#  Guestbook: /about

excerpt_link: Read More #摘要链接文字
archive_yearly: false #按年存档

widgets: #配置页脚显示哪些小挂件
  - category
#  - tag
  - tagcloud
  - recent_posts
#  - blogroll

blogrolls: #友情链接
  - bruce sha's duapp wordpress: http://ibruce.duapp.com
  - bruce sha's javaeye: http://buru.iteye.com
  - bruce sha's oschina blog: http://my.oschina.net/buru
  - bruce sha's baidu space: http://hi.baidu.com/iburu

fancybox: true #是否开启fancybox效果

duoshuo_shortname: buru #多说账号

google_analytics:
rss:
```
更新主题

```
cd themes/modernist
git pull
```

评论框
---

静态博客要使用第三方评论系统，hexo默认集成的是Disqus，因为你懂的，所以国内的话还是建议用[多说](https://hexo.io/plugins/)
直接用你的微博/豆瓣/人人/百度/开心网帐号登录多说，做一下基本设置。如果使用modernist主题，在modernist_config.yml中配置duoshuo_shortname为多说的基本设置->域名中的shortname即可。你也可以在多说后台自定义一下多说评论框的格式，比如评论框的位置，对于css设置，可以[参考这里](http://dev.duoshuo.com/docs/4ff1cfd0397309552c000017)，我是在HeroicYang的基础上修改的。

如果你是有的其他第三方评论系统，将通用代码粘贴到hexo\themes\modernist\layout\_partial\comment.ejs里面，如下：

```
<% if (config.disqus_shortname && page.comments){ %>
<section id="comment">
  #你的通用代码
<% } %>
```
构建新页面
-----

那些小图标都是一个新页面，需要手动创建，那么如何创建？

回到git shell，

hexo new page "页面名称"
比如你要创建一个about页面，就输入hexo new page “about”

正确显示各页面内容

发表博文后发现点击上面建立的页面后发现是空白页，比如，打开标签页面，发现是空白，或者提示找不到！

解决方法：以标签页为例，打开Hexo\source\tags下index.md文件，修改如下：



comments: false即关闭此页面的评论功能

type: “tags”这里的值根据你想更改的页面决定

更改过后，在重新部署到github上，你就可以点击各个页面查看，发现一切都是那么美好！

安装插件
----

hexo支持的插件：[Plugins | Hexo](https://hexo.io/plugins/)
想安装什么插件，按照相关README.md中介绍操作即可。

安装多说评论、不蒜子（或LeanCloud）和分享插件，参考:[第三方服务集成](http://theme-next.iissnan.com/third-party-services.html#swfitype)，介绍非常全面！好好用来装饰你的博客吧！

安装sitemap和feed插件时，如果遇到问题，可以参考:[博客搬迁记 - 从WordPress到Hexo](http://www.imys.net/20150513/wordpress-to-hexo.html#%E6%97%A0%E6%B3%95%E5%BC%80%E5%90%AFRSS%E5%92%8Csitemap)，安装sitemap后要到[百度站长](http://zhanzhang.baidu.com/?castk=LTE=)提交你的网站，首先要添加站点，然后在链接提交你的sitemap.xml，详细操作参考:[为Hexo博客生成sitemap](http://www.gfwsb.com/2016/use-sitemap-for-hexo/)

安装swiftype插件，如果遇到问题，可以参考[利用swiftype为hexo添加站内搜索](http://www.jerryfu.net/post/search-engine-for-hexo-with-swiftype-v2.html)

图床
---

考虑到博客的速度，同时也为了便于博客的迁移，图床是必须的。我墙裂推荐七牛，访问速度极快，支持日志、防盗链和水印。

免费用户有每月10GB流量+总空间10GB+PUT/DELETE 10万次请求+GET 100万次请求，这对个人博客来说足够，有一点要说明的是，七牛没有目录的概念，但是文件名可以包含/，比如2013/11/27/reading/photos-0.jpg，参考这里[关于key-value存储系统](https://support.qiniu.com/hc/)。

七牛除了作为图床还可以作为其他静态文件存储空间，比如我的个人站点首页有个字库文件和JS文件下载较慢，有时间会把它弄到七牛上去，以提高首页打开速度。请看这篇[Linux中国采用七牛云存储支撑图片访问](https://linux.cn/article-2311-1.html)。

如果非要说不足的话，就是文件管理界面不是很友好，不支持CNAME到分配的永久链接，也不能绑定未备案的自有域名，必须备案才可以。

如果你对七牛web版的文件管理界面不满意，可以用官方的[七牛云存储工具](http://docs.qiniu.com/tools/v6/index.html)。

您还可以使用如下图床服务 FarBox，Dropbox，又拍云
主题优化
----

Next主题很美观，个人也非常喜欢，但是一点令我们烦恼的就是主题加载的特别缓慢，那怎么优化呢？请参考一下两篇博文，作者已经总结的非常详细了，有需要的可以拜读一下，受益匪浅！

[提升Hexo的NexT主题加载速度](http://www.gfwsb.com/2016/improveNexTspeed/)

[使用gulp精简hexo博客代码](http://www.5941740.cn/2016/02/19/%E4%BD%BF%E7%94%A8gulp%E7%B2%BE%E7%AE%80hexo%E5%8D%9A%E5%AE%A2%E4%BB%A3%E7%A0%81/)

绑定域名
---

购买域名，我是在[万网](https://account.aliyun.com/login/login.htm?oauth_callback=http://netcn.console.aliyun.com/core/domain/tclist)购买的，可以申请到国际域名，免去了备案的繁杂过程，我居然申请了两个，由于自学前端，所以就构建了一个网站来展示自己写的一些demo，【至于如何快速的构建一个网站，从购买域名，云空间到上传文件，你可以试一下这个[网站](http://www.xiaoerguo.com/),但是现在可以用github page做服务器，也可以构建多个项目主页来展现demo，是我马上要研究的方向，自己上传云服务器感觉步骤好繁琐，看一下在github建立项目主页能否得到改善！】还一个正好闲置着，所以就拿来解析到github page上，以后就可以通过自己的域名访问自己的博客了！

如何操作：在 Hexo\source 文件夹里新建一个名为 CNAME 的文件，用文本编辑器打开，添加内容 yourwebsite.com （你的个人域名 ）。保存后，部署你的博客即可。如果这步遇到问题，也可手动在万网上解析，github page提供的IP：

192.30.252.153

192.30.252.154

制作ICO图标
---

favicon.ico一般用于作为缩略图的网站标志，[在线制作网站](http://www.bitbug.net/)
关于是否绑定域名

经过这几天的试用，关于是否绑定域名，发表一下自己的看法，如果你仅仅是使用个人主页来托管个人博客。绑定与否看你自己的想法，如果你还想使用github的项目主页来展示平时写的一些小练习demo，那我劝你不要绑定个人域名了，关于如何使用github的项目主页，请参考[单个GitHub帐号下添加多个GitHub Pages的相关问题](http://chitanda.me/2015/11/03/multiple-git-pages-in-one-github-account/),这样你就可以直接在需要展示的项目下添加gh-pages分支，然后通过访问“用户名。github.io/项目名/*.html”来查看页面展示效果了。这多方便，不用自己在上传云空间了，省去了一堆麻烦事！

#至此，基本操作介绍完毕，以下内容普通用户无需了解。
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

接下来是重头戏_config.yml，做个简单说明：
```
# Hexo Configuration
## Docs: http://zespia.tw/hexo/docs/configure.html
## Source: https://github.com/tommy351/hexo/

# Site #整站的基本信息
title: 不如 #网站标题
subtitle: 码农，程序猿，未来的昏析师 #网站副标题
description: bruce sha's blog | java | scala | bi #网站描述，给搜索引擎用的，在生成html中的head->meta中可看到
author: bruce #网站作者，在下方显示
email: bu.ru@qq.com #联系邮箱
language: zh-CN #语言

# URL #域名和文件结构
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: http://ibruce.info #你的域名
root: /
permalink: :year/:month/:day/:title/
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code

# Writing #写文章选项
new_post_name: :title.md # File name of new posts
default_layout: post #默认layout方式
auto_spacing: false # Add spaces between asian characters and western characters
titlecase: false # Transform title into titlecase
external_link: true # Open external links in new tab
max_open_file: 100
multi_thread: true
filename_case: 0
render_drafts: false
highlight: #代码高亮
  enable: true #是否启用
  line_number: false #是否显示行号
  tab_replace:

# Category & Tag #分类与标签
default_category: uncategorized # default
category_map:
tag_map:

# Archives #存档，这里的说明好像不对。全部选择1，这个选项与主题中的选项有时候会有冲突
## 2: Enable pagination
## 1: Disable pagination
## 0: Fully Disable
archive: 1
category: 1
tag: 1

# Server #本地服务参数
## Hexo uses Connect as a server
## You can customize the logger format as defined in
## http://www.senchalabs.org/connect/logger.html
port: 4000
logger: true
logger_format:

# Date / Time format #日期显示格式
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: MMM D YYYY
time_format: H:mm:ss

# Pagination #分页设置
## Set per_page to 0 to disable pagination
per_page: 10 #每页10篇文章
pagination_dir: page

# Disqus #社会化评论disqus，我使用多说，在主题中配置
disqus_shortname:

# Extensions #插件，暂时未安装插件
## Plugins: https://github.com/tommy351/hexo/wiki/Plugins
## Themes: https://github.com/tommy351/hexo/wiki/Themes
## 主题
theme: modernist # raytaylorism # pacman # modernist # light
exclude_generator:

# Deployment #部署
## Docs: http://zespia.tw/hexo/docs/deploy.html
deploy:
  type: github
  repository: git@github.com:bruce-sha/bruce-sha.github.com.git #你的GitHub Pages仓库
```
修改局部页面
---

页面展现的全部逻辑都在每个主题中控制，源代码在hexo\themes\你使用的主题\中，以modernist主题为例：
```
.
├── languages          #多语言
|   ├── default.yml    #默认语言
|   └── zh-CN.yml      #中文语言
├── layout             #布局，根目录下的*.ejs文件是对主页，分页，存档等的控制
|   ├── _partial       #局部的布局，此目录下的*.ejs是对头尾等局部的控制
|   └── _widget        #小挂件的布局，页面下方小挂件的控制
├── source             #源码
|   ├── css            #css源码
|   |   ├── _base      #*.styl基础css
|   |   ├── _partial   #*.styl局部css
|   |   ├── fonts      #字体
|   |   ├── images     #图片
|   |   └── style.styl #*.styl引入需要的css源码
|   ├── fancybox       #fancybox效果源码
|   └── js             #javascript源代码
├── _config.yml        #主题配置文件
└── README.md          #用GitHub的都知道
```
如果你需要修改头部，直接修改hexo\themes\modernist\layout\_partial\header.ejs，比如头上加个搜索框：
```
<div>
<form class="search" action="//google.com/search" method="get" accept-charset="utf-8">
 <input type="search" name="q" id="search" autocomplete="off" autocorrect="off" autocapitalize="off" maxlength="20" placeholder="Search" />
 <input type="hidden" name="q" value="site:<%- config.url.replace(/^https?:\/\//, '') %>">
</form>
</div>
```
将如上代码加入即可，您需要修改css以便这个搜索框比较美观。

再如，你要修改页脚版权信息，直接编辑hexo\themes\modernist\layout\_partial\footer.ejs。同理，你需要修改css，直接去修改对应位置的styl文件。

统计
---

页面上显示访问次数可以使用 [不蒜子](http://busuanzi.ibruce.info/)，两行代码即可搞定。

因Google Analytics偶尔被墙，故用百度统计，以modernist主题为例，介绍如何添加。
编辑文件hexo\themes\modernist\_config.yml，增加配置选项：

```
baidu_tongji: true
```
新建文件hexo\themes\modernist\layout\_partial\baidu_tongji.ejs，内容如下：

```
<% if (theme.baidu_tongji){ %>
<script type="text/javascript">
#你的百度统计代码
</script>
<% } %>
```
注册并登录百度统计获取你的统计代码。

编辑文件hexo\themes\modernist\layout\_partial\head.ejs，在『/head』之前增加：

```
<%- partial('baidu_tongji') %>
```
重新生成并部署你的站点。

不出意外的话，在你的站点的每个页面的左上角都会看到一个恶心的百度LOGO。你只能在『百度统计首页->网站列表->获取代码->系统管理设置->统计图标设置->显示图标』，把那个勾去掉。百度真是恶心，我准备还是用Google Analytics。

分享
---

我没有添加分享，觉得这个不是很必要，导致页面看起来啰嗦。以加网为例介绍如何添加：

- 在hexo\themes\modernist\layout\_partial\post下新建jiathis.ejs文件。
注册加网获得你的分享代码，写入jiathis.ejs。
- 在hexo\themes\modernist\layout\_partial\article.ejs中，添加<%-partial(‘post/jiathis’)%>。
-分享服务还可以使用如下企业提供的技术[加网](http://www.jiathis.com/)，[bShare](http://www.bshare.cn/)，[百度分享](http://share.baidu.com/)。

网站图标

看一下hexo\themes\modernist\layout\_partial\head.ejs，找到这句：

```
<link rel="icon" type="image/x-icon" href="<%- config.root %>favicon.ico">
```
你懂的，将你的favicon.ico放到工程根目录下即可，也就是hexo\source目录。可以[在Faviconer](http://www.faviconer.com/)制作你的ico图标，国内有[比特虫](http://www.bitbug.net/)。

自定义挂件
---

除了默认已提供的挂件外，你还可以自定义自己的小挂件，在hexo\themes\modernist\layout\_widget\下，新建自己的ejs文件，如myWidget.ejs，然后在配置文件hexo\themes\modernist\_config.yml中配置。
```
widgets:
  - myWidget
```
用上述方法可以添加新浪微博小挂件。

- 生成自己的微博组件。
- 添加hexo\themes\modernist\layout\_widget\weibo.ejs文件。
- 配置hexo\themes\modernist\_config.yml。
插件
--

安装插件：
```
npm install <plugin-name> --save
```
启用插件：在*hexo\_config.yml文件添加：
```
plugins:
- <plugin-name>  #插件名
```
升级插件：
```
npm update
```
卸载插件：
```
npm uninstall <plugin-name>
```
RSS插件
将上述命令中的『plugin-name』，替换为hexo-generator-feed。一旦安装完成，你可以在配置显示你站点的RSS，文件路径\atom.xml。

你可以用rss作为迁移工具，用如下命令读取其他位置的rss：

```
hexo migrate rss <source>
```
『source』是本地或网络文件路径。

Sitemap插件
将上述命令中的『plugin-name』，替换为hexo-generator-sitemap。你可以将你站点地图提交给搜索引擎，文件路径\sitemap.xml。

更多插件的安装方法，请参考[官方Wiki](https://github.com/hexojs/hexo/wiki/Plugins)。

如果你按照上述步骤做，但插件不起作用，没有生成atom.xml和sitemap.xml，也没有报错，那么你应该cd到你的hexo初始化目录，在该目录下重新安装插件，重试。

迁移
---

hexo支持从其他类型站点迁移，如通用RSS，Jekyll，Octopress，WordPress等，这一部分我没试过。请参考官方文档Hexo Migration。

搜索引擎
---

你可以到[屈站长](http://www.sousuoyinqingtijiao.com/)提交你的站点给搜索引擎。其他内容如添加站点或页面的description，提交Sitemap，添加百度统计，Google Analytics等等，参考本文其他章节的内容，不再一一阐述。

更新
---

更新hexo：

```
npm update -g hexo
```
更新主题：
```
cd themes/你的主题
git pull
```
更新插件：
```
npm update
```
干掉IE

Kill IE6 提示的javascript代码，请自行搜索。

换机器
---

你要保留好自己的博客源码。换机器写博客，就只能使用各种网盘的同步功能，或者你把你的站点源文件提交到某代码托管服务器。另外，貌似这篇很牛逼，Hexo 服务器端布署及 Dropbox 同步。

我的办法是这样的，先在一个目录下做好Node+Git+Hexo的绿色环境，写个hexos.bat可以一键启动hexo工作台，把整个目录用Dropbox同步，这样随便在办公室或家的任何笔记本台式机都可以写博客，也不用处理什么文件拷贝备份的事情，非常爽。

统计功能
---

为hexo博客添加访问次数统计功能

其它

网站加速

[Webluker-CDN 网站加速 免费CDN DNS解析](http://www.webluker.com/)

Webluker-FAQ索引

网站监控

[监控宝-网站监控 网页监控 服务器监控](http://www.jiankongbao.com/)

[监控宝-常见问题](http://www.jiankongbao.com/faq)

参考文献
====



- [hexo + github + 多说 来搭建免费博客](http://blog.netpi.me/%E5%AE%9E%E7%94%A8/hexo/)

- [利用swiftype为hexo添加站内搜索](http://www.jerryfu.net/post/search-engine-for-hexo-with-swiftype-v2.html)

- [博客搬迁记 - 从WordPress到Hexo](http://www.imys.net/20150513/wordpress-to-hexo.html#%E6%97%A0%E6%B3%95%E5%BC%80%E5%90%AFRSS%E5%92%8Csitemap)

- [在 hexo中无痛使用本地图片](http://www.tuicool.com/articles/umEBVfI)

- [手把手教你使用Travis CI自动部署你的Hexo博客到Github上](http://i.woblog.cn/2016/05/04/%E6%89%8B%E6%8A%8A%E6%89%8B%E6%95%99%E4%BD%A0%E4%BD%BF%E7%94%A8Travis%20CI%E8%87%AA%E5%8A%A8%E9%83%A8%E7%BD%B2%E4%BD%A0%E7%9A%84Hexo%E5%8D%9A%E5%AE%A2%E5%88%B0Github%E4%B8%8A/#more)

- [为Hexo博客生成sitemap](http://www.gfwsb.com/2016/use-sitemap-for-hexo/)


- [使用gulp精简hexo博客代码](http://www.5941740.cn/2016/02/19/%E4%BD%BF%E7%94%A8gulp%E7%B2%BE%E7%AE%80hexo%E5%8D%9A%E5%AE%A2%E4%BB%A3%E7%A0%81/)

- [单个GitHub帐号下添加多个GitHub Pages的相关问题](http://chitanda.me/2015/11/03/multiple-git-pages-in-one-github-account/)

- [hexo你的博客](http://ibruce.info/2013/11/22/hexo-your-blog/)
