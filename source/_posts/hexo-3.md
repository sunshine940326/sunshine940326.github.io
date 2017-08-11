---
title: hexo高阶教程：想让你的博客被更多的人在搜索引擎中搜到吗？
date: 2017-04-16 13:24:51
tags: [hexo高阶教程,hexo+gulp,hexo+七牛,hexo百度收录,hexo百度统计,hexo seo] 
categories: git
---
![title](http://img.blog.csdn.net/20170810182823396?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
上一次在掘金上发表的`hexo`高阶教程：[hexo高阶教程next主题优化之加入网易云音乐、网易云跟帖、动态背景、自定义主题、统计功能](http://cherryblog.site/Hexo-high-level-tutorialcloudmusic,bg-customthemes-statistical.html)，收到了不少朋友的喜欢，手动比心♪(＾∀＾●)ﾉ，也有不少朋友私信我给我提改进的意见，本着生命就是要折腾的原则，我又做了如下的优化：  
 
 - seo优化
 - 多终端修改项目
 - 同时托管到github和coding上
 - 设置google和百度sitemap，让搜索引擎更好的抓取你的网站
 - 使用gulp对css、js进行优化
 - 接入七牛图床
 - 加入打赏功能
 - 加入照片模块
 
开始做这个博客的时候是想着记录自己学习的过程，并没有指望别人发现（自己比较菜，写的都是一些基础的东西，也没有什么特别nb的技巧值得炫耀〒▽〒），但是自从给博客增加了统计的功能之后，并且在掘金社区发布之后，看着每天还有那么百十号人来看看，内心还有点小激动呢~[]~(￣▽￣)~*  
> 酒香不敌巷子深
> 我们要做对搜索引擎友好的站点
<!--more-->
所以我就在想，怎么才能让其他小伙伴搜索到我写的文章呢？于是就想到了对网站进行seo优化，这段时间也一直在做网站的seo优化，对于hexo生成的博客来说，代码其实修改的并不多，主要是要多用心去给各个搜索引擎提交你的sitemap，让搜索引擎的小蜘蛛多来你的站点，这样别人在搜索东西的时候才有更多的可能搜出你的文章，给你的网站带来人气~

作为一个前端工作者，对网站的优化肯定还是需要有很多的，奈何时间基本都被工作占用，所以就先把优化功能先放了放，只进行了代码压缩

在这半个月的时间，对于hexo搭建搭建的个人博客，虽然没有让我对某一门语言的深度增加，但是却让我对整个建站流程的宽度增加了不少，优化是一件比写出代码的技术难度还要高的事情。
# seo优化
推广是一个烦人的事情啊喂，特别是对于我们搞技术的来说，可能就不擅长推广，那么怎么才能让别人知道我们呢，我们就要想办法让别人通过搜索就可以搜索到你博客的内容，给我们带来自然流量，这就需要seo优化,让我们的站点变得对搜索引擎友好
> SEO是由英文Search Engine Optimization缩写而来， 中文意译为“搜索引擎优化”。SEO是指通过站内优化比如网站结构调整、网站内容建设、网站代码优化等以及站外优化。
## 让百度收录你的站点
我们首先要做的就是让各大搜索引擎收录你的站点，我们在刚建站的时候各个搜索引擎是没有收录我们网站的，在搜索引擎中输入`site:<域名>`,如果如下图所示就是说明我们的网站并没有被百度收录。我们可以直接点击下面的“网址提交”来提交我们的网站
![查看站点是否被百度收录](http://img.blog.csdn.net/20170504171112514?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
### 验证网站所有权
登录百度站长平台：http://zhanzhang.baidu.com,只要有百度旗下的账号就可以登录，登录成功之后在站点管理中点击[添加网站](http://zhanzhang.baidu.com/site/siteadd)然后输入你的站点地址，建议输入的网站为www开头的，不要输入github.io的，因为github是不允许百度的spider爬取github上的内容的，所以如果想让你的站点被百度收录，只能使用自己购买的域名
![百度站长添加网站](http://img.blog.csdn.net/20170504172333359?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
在选择完网站的类型之后需要验证网站的所有权，验证网站所有权的方式有三种：文件验证。html标签验证和cname解析验证，使用哪一种方式都可以，都是比较简单的，**但是一定要注意，使用文件验证文件存放的位置需要放在source文件夹下，如果是html文件那么hexo就会将其编译，所以必须要加上的`layout:false`，这样就不会被hexo编译。（如果验证文件是txt格式的就不需要）**，其他两种方式也是很简单的，我个人推荐文件验证和cname验证，cname验证最为简单，只需加一条解析就好~
![验证网站所有权](http://img.blog.csdn.net/20170504175857203?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
### 生成网站地图
我们需要使用npm自动生成网站的sitemap，然后将生成的sitemap提交到百度和其他搜索引擎
#### 安装sitemap插件
```
npm install hexo-generator-sitemap --save     
npm install hexo-generator-baidu-sitemap --save
```
#### 修改博客配置文件
在根目录配置文件中修改url为你的站点地址
```
# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: http://cherryblog.site
root: /
permalink: :title.html
permalink_defaults:
```
**执行完之后就会在网站根目录生成sitemap.xml文件和baidusitemap.xml文件**，可以通过http://www.cherryblog.site/baidusitemap.xml,查看该文件是否生成，其中sitemap.xml文件是搜索引擎通用的文件，baidusitemap.xml是百度专用的sitemap文件。
### 向百度提交链接
然后我们就可以将我们生成的sitemap文件提交给百度，还是在百度站长平台，找到链接提交，这里我们可以看到有两种提交方式，自动提交和手动提交，自动提交又分为主动推送、自动推送和sitemap
> 如何选择链接提交方式
> 1、主动推送：最为快速的提交方式，推荐您将站点当天新产出链接立即通过此方式推送给百度，以保证新链接可以及时被百度收录。
> 2、自动推送：最为便捷的提交方式，请将自动推送的JS代码部署在站点的每一个页面源代码中，部署代码的页面在每次被浏览时，链接会被自动推送给百度。可以与主动推送配合使用。
> 3、sitemap：您可以定期将网站链接放到sitemap中，然后将sitemap提交给百度。百度会周期性的抓取检查您提交的sitemap，对其中的链接进行处理，但收录速度慢于主动推送。
> 4、手动提交：一次性提交链接给百度，可以使用此种方式。

一般主动提交比手动提交效果好，这里介绍主动提交的三种方法
从效率上来说：
> **主动推送>自动推送>sitemap**

![连接提交](http://img.blog.csdn.net/20170504205614072?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
#### 主动推送
安装插件`npm install hexo-baidu-url-submit --save`
然后再根目录的配置文件中新增字段
```
baidu_url_submit:
  count: 100 # 提交最新的一个链接
  host: www.cherryblog.site # 在百度站长平台中注册的域名
  token: 8OGYpxowYnhgVsUM # 请注意这是您的秘钥， 所以请不要把博客源代码发布在公众仓库里!
  path: baidu_urls.txt # 文本文档的地址， 新链接会保存在此文本文档里
```
在加入新的deploye
```
deploy:
 - type:baidu_url_submitter
```
 这样执行`hexo deploy`的时候，新的链接就会被推送了
#### 设置自动推送
在主题配置文件下设置,将baidu_push设置为true：
```
# Enable baidu push so that the blog will push the url to baidu automatically which is very helpful for SEO
baidu_push: true
```
然后就会将一下代码自动推送到百度，位置是themes\next\layout\_scripts\baidu_push.swig,这样每次访问博客中的页面就会自动向百度提交sitemap
```
{% if theme.baidu_push %}
<script>
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';        
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
</script>
{% endif %}
```
#### sitemap
将我们上一步生成的sitemap文件提交到百度就可以了~
![将sitemap提交到百度](http://img.blog.csdn.net/20170504211420159?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
我记得被百度收录过程还是蛮久的，一度让我以为我的方法有问题，提交链接在站长工具中有显示大概是有两天的时候，站点被百度收录大概花了半个月= =，让大家看一下现在的成果
在百度搜索`site:cherryblog.site`已经可以搜索到结果
![站点已被百度收录](http://img.blog.csdn.net/20170504212208725?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
在搜索框输入域名也可以找到站点
![站点已被百度收录](http://img.blog.csdn.net/20170504212800850?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
输入关键字的名字也可以在第二页就找到呢，好开森~
![站点已被百度收录](http://img.blog.csdn.net/20170504213218169?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
## 让google收录你的站点
相比于百度，google的效率实在不能更快，貌似十分钟左右站点就被收录了，其实方法是和百度是一样的，都是先验证你的站点所有权，然后提交sitemap
google站点平台：https://www.google.com/webmasters/，然后就是注册账号、验证站点、提交sitemap，一步一步来就好，过不了过久就可以被google收录了
![站点已被google收录](http://img.blog.csdn.net/20170504221124520?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
![站点已被google收录](http://img.blog.csdn.net/20170504221145864?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
![站点已被google收录](http://img.blog.csdn.net/20170504221202442?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
## 让其他搜索引擎收录你的站点
除了百度和google两大搜索引擎，还有搜狗、360等其他的搜索引擎，流程都是一样的
 ，大家就自行选择添加哈，这里就不再赘述了~
## 优化你的url
seo搜索引擎优化认为，网站的最佳结构是**用户从首页点击三次就可以到达任何一个页面**，但是我们使用hexo编译的站点打开文章的url是：sitename/year/mounth/day/title四层的结构，这样的url结构很不利于seo，爬虫就会经常爬不到我们的文章，于是，我们可以将url直接改成sitename/title的形式，并且title最好是用英文，在根目录的配置文件下修改permalink如下：
```
url: http://cherryblog.site
root: /
permalink: :title.html
permalink_defaults:
```
## 其他seo优化
seo优化应该说是一个收益延迟的行为，可能你做的优化短期内看不到什么效果，但是一定要坚持，seo优化也是有很深的可以研究的东西，从我们最初的网站设计，和最基础的标签的选择都有很大的关系，网站设计就如我们刚刚说的，要让用户点击三次可以到达网站的任何一个页面，要增加高质量的外链，增加相关推荐（比如说我们经常见到右侧本站的最高阅读的排名列表），然后就是给每一个页面加上keyword和描述
在代码中，我们应该写出能让浏览器识别的语义化HTML，这样有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重；并且对外链设置nofollow标签，避免spider爬着爬着就爬出去了（减少网站的跳出率），并且我们要尽量在一些比较大的网站增加我们站点的曝光率，因为spider会经常访问大站，比如我们在掘金等技术社区发表文章中带有我们的站点，这样spider是很有可能爬到我们中的站点的，so....
 - 网站**外链**的推广度、数量和质量
 - 网站的**内链**足够强大
 - 网站的**原创**质量
 - 网站的**年龄**时间
 - 网站的**更新频率**（更新次数越多越好）
 - 网站的**服务器**
 - 网站的**流量**：流量越高网站的权重越高
 - 网站的**关键词排名**：关键词排名越靠前，网站的权重越高
 - 网站的**收录**数量：网站百度收录数量越多，网站百度权重越高
 - 网站的浏览量及深度：**用户体验**越好，网站的百度权重越高
# 同时托管到github和coding上
前面已经提到过一个惨绝人寰的消息，那就是github是不允许百度的爬虫爬取内容的，所以我们的项目如果是托管在github上的话基本是不会被百度收录的，所以我又同时托管到了coding上，然后在做解析的时候海外的ip 指向到github，国内的或者说百度的直接指向coding
## 将你的项目托管在coding上
![coding](http://img.blog.csdn.net/20170506111627464?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
> Coding 是一个面向开发者的云端开发平台[1]  ，目前提供代码托管，运行空间，质量控制，项目管理等功能。此外，还提供社会化协作功能，包含了社交元素，方便开发者进行技术讨论和协作。
> 2016年3月CODING宣布收购代码托管平台GitCafe。

之前好多小伙伴都是将项目托管在gitcafe上，但是现在gitcafe被coding收购了，于是就转到coding上了，之前好多人说github的服务器在国外，于是就转战国内的coding了，我将代码迁移至coding还有另外一个原因，github不让百度的爬虫爬取啊，让我哭一会，不然也不会这样折腾。coding就是中国版的github（只是打一个比喻），有提供pages服务。
### 在coding上创建仓库
首先我们先要创建一个coding账号并且在coding上创建一个项目,必须要是公开项目，私有项目是没有page服务的，项目名称可以随意起
![创建coding项目](http://img.blog.csdn.net/20170506114106649?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
### 将hexo博客同步到新创建的仓库中
第一次使用coding需要使用ssh，方法和之前github是一样一样的，将ssh公钥复制到coding上
![自己的ssh公钥](http://img.blog.csdn.net/20170506114846918?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
![coding中贴入ssh](http://img.blog.csdn.net/20170506114917277?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)  
在coding中添加过ssh公钥之后我们需要修改hexo根目录下的配置文件,官方要求配置格式如下
```
deploy:
  type: git
  message: [message]
  repo:
    github: <repository url>,[branch]
    gitcafe: <repository url>,[branch] 
```
所以我的配置就是这样的(我这个配置github和coding都有ssh和https两种方式)：
```
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repo:
    #github: git@github.com:sunshine940326/sunshine940326.github.io.git
    github: https://github.com/sunshine940326/sunshine940326.github.io.git
    coding: git@git.coding.net:cherry940326/cherry940326.git
    #coding: https://git.coding.net/cherry940326/cherry940326.git
```
完成之后在git bash 中输入
```
ssh -T git@git.coding.net
```
如果得到如图提示就说明配置成功了
![配置成功ssh](http://img.blog.csdn.net/20170506120449863?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
然后重新部署hexo就将代码上传至coding上了
### 设置coding的pages服务
将代码上传至coding之后我们就要开启pages服务了，在pages页面我们只需要将部署来源选择为master分支，然后将自定义域名填写我们自己购买的域名就可以了
![找到pages](http://img.blog.csdn.net/20170506121132351?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
![配置pages](http://img.blog.csdn.net/20170506120956994?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
### 设置域名解析
然后我们到万网下面设置我们的域名解析，将默认ip解析到coding上（这里要注意，解析到coding时记录值是pages.coding.me，并没有具体的账号名或者仓库名，并且只有设置完成域名解析才可以在coding上设置自定义域名），将海外的ip解析到github上，设置如下：
![域名解析](http://img.blog.csdn.net/20170506122622186?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)


----------
至此就完成了将你的hexo编译的博客同时部署在github和coding上
# 多终端编辑hexo博客
之前就想到了一个问题，如果我想要在公司写博客怎么办，或者说如果我换电脑了怎么办，因为在github中的我们github.io项目是只有编译后的文件的，没有源文件的，也就是说，如果我们的电脑坏了，打不开了，我们的博客就不能进行更新了，所以我们要把我们的源文件也上传到github上，这道题的解题思路（哈哈，突然想到这个词了）是，将我们的源文件上传至username.github.io的Hexo分支，并且设置为默认分支（分支需要自己创建），然后对我们的源文件进行版本管理，这样我们就可以在另一台电脑上pull我们的源码，然后编译完之后push上去。
> 更为优雅的方式是使用travis-ci，然后用webhook自动部署。你只需要写markdown，push到github就行了。根本不用关心deploy，只要维护你的markdown就行。详情请参考：http://blog.bigruan.com/2015-03-09-Continuous-Integration-Your-Hexo-Blog-With-TravisCI/
## 创建Hexo分支
创建两个分支：master 与 Hexo,并将Hexo设置为默认分支（这个Hexo分支就是存放我们源文件的分支，我们只需要更新Hexo分支上的内容据就好，master上的分支hexo编译的时候会更新的）
## 删除文件夹内原有的.git缓存文件夹并编辑.gitignore文件
因为有些主题是从git上clone过来的，所以我们要先删除.git缓存文件，否则会和blog仓库冲突（.git默认是隐藏文件夹，需要先开启显示隐藏文件夹。**.git文件夹被删除后整个文件对应的git仓库状态也会被清空**)
.gitignore文件作用是声明不被git记录的文件，blog根目录下的.gitignore是hexo初始化带来的，可以先删除或者直接编辑，对hexo不会有影响。建议.gitignore内添加以下内容：
```
/.deploy_git
/public  
/_config.yml

```
> .deploy_git是hexo默认的.git配置文件夹，不需要同步
public内文件是根据source文件夹内容自动生成，不需要备份，不然每次改动内容太多
即使是私有仓库，除去在线服务商员工可以看到的风险外，还有云服务商被攻击造成泄漏等可能，所以不建议将配置文件传上去 
## 初始化仓库
然后我们再初始化仓库，重新对我们的代码进行版本控制
```
git init
git remote add origin <server>
```
`<server>`是指在线仓库的地址。origin是本地分支,remote add操作会将本地仓库映射到云端
## 将博客源文件上传至Hexo分支
依次执行
```
git add .
git commit -m "..."
git push origin hexo
```
提交网站相关的文件； 
## 对B电脑进行的操作
假设B电脑现在没有我们的源文件
```
git init
git remote add origin <server> #将本地文件和云端仓库映射起来。
git fetch --all
git reset --hard origin/master
```
## 日常改动
平时我们对源文件有修改的时候记得先pull一遍代码，再将代码push到Hexo分支，就和日常的使用git一样~
1. 依次执行git add .、git commit -m "..."、git push origin Hexo指令将改动推送到GitHub（此时当前分支应为Hexo）；
2. 然后才执行hexo g -d发布网站到master分支上。
# 使用gulp压缩你的代码
当你在你的博客页面右键查看源代码的时候，你会发现你的html页面中会有大段大段的空白，这个时候我们就要使用压缩工具对我们的代码进行压缩，在前一段时间参见的前端开发者大会（FDCon2017）中，携程的框架式就有讲到，在携程，线上的资源是需要申请的（单位具体到k），所以说我们的代码不压缩实在是太奢侈~
## 什么是gulp
在2017年的前端中，gulp似乎不是最流行的自动化工具，但是谁让我们公司用的是gulp呢。为了能和公司用一样的构建工具，所以我自己的博客也是使用的gulp。
gulp是前端开发过程中对代码进行构建的工具，是自动化项目的构建利器。不仅能对网站的资源进行优化，并且能在开发过程中能够对很多重复的任务使其自动完成。
> 能自动化地完成 javascript/coffee/sass/less/html/image/css 等文件的的测试、检查、合并、压缩、格式化、浏览器自动刷新、部署文件生成，并监听文件在改动后重复指定的这些步骤。在实现上，她借鉴了Unix操作系统的管道（pipe）思想，前一级的输出，直接变成后一级的输入，使得在操作上非常简单。

既然gulp是基于node，所以我们就要先有node环境，不过我们本身就是使用hexo构建我们的博客，就已经是基于node环境了~

### npm小知识
npm（node package manager）nodejs的包管理器，用于node插件管理（包括安装、卸载、管理依赖等）
####使用npm安装插件：`npm install <name> [g] [--save -dev]`

 - `<name>`:node 插件名称
 - `-g`:全局安装，会在node安装的根目录下载对应的包，在计算机的任何文件都可以使用该插件，默认的node安装目录是：`C:\Users\Administrator\AppData\Roaming\npm`;如果不带该属性，将会安装在当前目录，下载安装包的位置是当前目录的`node_modules`文件夹
 - `--save`：将配置信息保存在node项目配置文件`package.json`中
 - `-dev`：保存至`package.json` 的devDependencies节点，如果没有该属性，该插件将会被保存至dependencies节点，devDependencies和dependencies有什么区别呢？其实从名字就应该可以看出来两者的区别，devDependencies中dev是development（开发）的缩写，dependencies是依赖的意思。所以 dependencies 是程序正常运行所需要安装的依赖，而devDependencies是开发所需要的依赖，比如一些单元测试的包~
 -  为什么要保存至package.json？因为我们使用node的时候需要很多的包，所以我们将我们的配置信息，也就是我们需要包的名称等其他信息保存至一个文件中，如果说其他开发者就可以直接使用一个命令就可以安装和我们相同的配置，这个命令就是`npm install`，就可以下载`package.json` 下所有需要的包。`npm install --production`则只下载dependencies下的包
####  使用npm卸载插件：`npm unstall <name> [-g] [--save-dev]`
 -  在npm中要卸载插件不是将文件夹删除就可以了，因为你的配置信息还在package中，所以要使用`npm unstall <name> [-g] [--save-dev]` 命令
 -  删除全部插件:`rimraf node_modules `（首先你需要先安装rimraf 插件）
#### 更新npm插件：`npm update <name> [g] [--save-dev]`
### 使用cnpm
什么是cnpm呢，大家都知道，由于不可描述原因，我们访问国外的资源有时候的速度，大家懂的，所以淘宝除了一个npm镜像，服务器就在中国。c可以理解为China（应该可以这样理解吧）,cnpm使用方法和npm完全相同，只需将npm全部换成cnpm就可以。本文都是使用的npm，如果想要尝试cnpmde的麻烦自行替换~
> 这是一个完整 npmjs.org 镜像，你可以用此代替官方版本(只读)，同步频率目前为 10分钟 一次以保证尽量与官方服务同步。

cnpm 官网地址：http://npm.taobao.org；
安装命令为`npm install cnpm -g --registry=https://registry.npm.taobao.org`
> 注意：安装完后最好查看其版本号`cnpm -v`或关闭命令提示符重新打开，安装完直接使用有可能会出现错误；
## 全局安装gulp
言归正传，简单介绍了gulp和npm，我们需要的是使用gulp压缩我们的代码
`npm install gulp -g`,然后`npm -v` 查看版本号就可以知道我们是不是安装成功了~*★,°*:.☆\(￣▽￣)/$:*.°★*。撒花！
## 新建package.json
使用`npm init`就可以创建package.json文件
![创建package.json文件](http://img.blog.csdn.net/20170502214954885?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)，然后输入yes之后你就会在文件夹中找到创建好的package.json文件。来贴一下我现在的package.json文件，已经是安装了不少包的了~
```
{
  "name": "hexo-site",
  "version": "0.0.0",
  "private": true,
  "hexo": {
    "version": "3.2.2"
  },
  "dependencies": {
    "gulp": "^3.9.1",
    "gulp-htmlclean": "^2.7.14",
    "gulp-htmlmin": "^3.0.0",
    "gulp-imagemin": "^3.2.0",
    "gulp-minify-css": "^1.2.4",
    "gulp-uglify": "^2.1.2",
    "hexo": "^3.2.0",
    "hexo-baidu-url-submit": "0.0.5",
    "hexo-deployer-git": "^0.2.0",
    "hexo-generator-archive": "^0.1.4",
    "hexo-generator-baidu-sitemap": "^0.1.2",
    "hexo-generator-category": "^0.1.3",
    "hexo-generator-index": "^0.2.0",
    "hexo-generator-sitemap": "^1.1.2",
    "hexo-generator-tag": "^0.2.0",
    "hexo-renderer-ejs": "^0.2.0",
    "hexo-renderer-marked": "^0.2.10",
    "hexo-renderer-stylus": "^0.3.1",
    "hexo-server": "^0.2.0",
    "hexo-util": "^0.6.0",
    "hexo-wordcount": "^2.0.1"
  },
  "devDependencies": {
    "gulp-babel": "^6.1.2",
    "gulp-clean": "^0.3.2",
    "hexo-generator-baidu-sitemap": "^0.1.2"
  }
}
```
## 本地安装gulp插件
在你的Hexo目录下右键`git bash here`然后执行`npm install <name> --save`,和gulp有关的包名称有以下几个，只需将`<name>`替换一下就好~
```
"gulp": "^3.9.1",
    "gulp-htmlclean": "^2.7.14",
    "gulp-htmlmin": "^3.0.0",
    "gulp-imagemin": "^3.2.0",
    "gulp-minify-css": "^1.2.4",
    "gulp-uglify": "^2.1.2",
```
聪明的你是不是觉得有些眼熟，对的，就是我po出来的package.json中`dependencies`下面对应的包名称和版本号~是不是和刚刚所讲的npm的知识联系到了一块呢~
## 建立gulp.js
gulp.js是gulp的配置文件，需要我们手动创建（应该还会有更高级的方法T T ）
我的gulp.js文件如下
```
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');

// 获取 gulp-imagemin 模块
var imagemin = require('gulp-imagemin')

// 压缩 public 目录 css
gulp.task('minify-css', function() {
    return gulp.src('./public/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./public'));
});
// 压缩 public 目录 html
gulp.task('minify-html', function() {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,  //清除HTML注释
            collapseWhitespace: true,  //压缩HTML
            collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input checked />
            removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
            minifyJS: true,  //压缩页面JS
            minifyCSS: true  //压缩页面CSS
        }))
        .on('error', function(err) {
            console.log('html Error!', err.message);
            this.end();
        })
        .pipe(gulp.dest('./public'))
});
// 压缩 public/js 目录 js
gulp.task('minify-js', function() {
    return gulp.src('./public/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});


// 压缩图片任务
// 在命令行输入 gulp images 启动此任务
gulp.task('images', function () {
    // 1. 找到图片
    gulp.src('./photos/*.*')
    // 2. 压缩图片
        .pipe(imagemin({
            progressive: true
        }))
        // 3. 另存图片
        .pipe(gulp.dest('dist/images'))
});

// 执行 gulp 命令时执行的任务
gulp.task('build', [
    'minify-html','minify-css','minify-js','images',
]);
```
## 执行gulp：`gulp build`
![gulpbuild执行结果](http://img.blog.csdn.net/20170503180052628?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
### 在git bash中执行
在git bash中直接输入命令`gulp build`就可以，这个`gulp build`是你自己创建的任务，你创建的任务是什么名的就在gulp后面跟什么名字
### 在webstorm中执行
webstorm真的太强大，已经帮我们继承了gulp，我们只需要动动鼠标就可以执行gulp
![在webstorm中执行gulp](http://img.blog.csdn.net/20170502222748614?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
# 增加七牛图床
增加七牛图床就是要将我们电脑上的图片上传至七牛，然后获得外链，在我们使用md写博客的时候直接插入外链，更方便的是可以直接获取带水印、压缩、剪裁过后的图片~
## 注册七牛
万年不变的第一步，注册。官网：[七牛云](https://portal.qiniu.com/signup?code=3lnd6wvc103f6)
## 上传资源
在登录成功之后，点击对象存储
![上传资源至七牛](http://img.blog.csdn.net/20170503180639396?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
上传完图片之后，关闭上传页面，可以在图片列表的最后面有一个眼睛的icon，点击之后就会在右下角找到该图片的外链，在用md写博客的时候就可以直接加入外链就好~也可以对上传的源文件进行重命名，因为大部分我上传到七牛上的图片都是相册中使用的，所以我将源文件的名字都改成统一的形式，在引用的时候只需要修改最后的数字就可以~
![上传资源至七牛](http://img.blog.csdn.net/20170504121228530?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
### 添加水印
使用七牛图床最棒的地方在于可以对图片进行处理，我就只拿添加水印来举例。
七牛可以对上传的图片添加图片样式
![增加图片样式](http://img.blog.csdn.net/20170504164007175?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
增加图片样式就是对图片进行处理，这里的处理方式有很多，比如缩放方式、裁剪、增加图片水印、设置输出格式。
![增加图片样式](http://img.blog.csdn.net/20170504164411602?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
在设置了图片样式之后我们要怎么使用呢，开始我也是一脸懵逼的，不知道怎么使用，百度之后才知道，你直接访问获取的外链就是你上传的原图，在外链的后面加上连接符和你的样式名称访问的就是经过处理后的图片，有没有很赞~既可以访问到你的原图片，也可以访问到经过处理后的图片，只不过是连接不同，还可以给一个图片增加多个样式访问，就不需要我们一张一张对图片进行处理了~简直不能太赞~(～￣▽￣)～比如:我的原图地址是：http://oova2i5xh.bkt.clouddn.com/IMG49.jpg，可以看到是一张很大的不带水印的图片
![这里写图片描述](http://img.blog.csdn.net/20170504165826626?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
然后在该地址后加上我设置的连接符,"-"和我的样式名称：http://oova2i5xh.bkt.clouddn.com/IMG49.jpg-cherryblogImg，就可以看到是一张带水印的小图，我进行了缩放和加水印
![这里写图片描述](http://img.blog.csdn.net/20170504170056689?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
  