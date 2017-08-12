---
title: Hexo 3：【高阶】附件插入音乐、分享、评论、标签页、搜索
date: 2016-09-17 01:01:48
tags: [Hexo] 
categories: [Hexo建站]

---
![title](http://img.blog.csdn.net/20170810182823396?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
hexo高阶教程，教你怎样在你的博客中插入音乐、分享、评论和标签页
<!--more-->

博客中插入图片
----------
基本分为两种办法
1. 放在本地文件
首先在username.github.io目录下确认 _config.yml 中有 post_asset_folder:true 。
在 hexo 目录，执行`$ npm install https://github.com/CodeFalling/hexo-asset-image --save`

之后再使用 hexo new 'new' 创建新博客的时候，会在source/_posts里面创建.md文件的同时生成一个相同的名字的文件夹。把该文章中需要使用的图片放在该文件夹下即可。
使用的时候
`![“图片描述”（可以不写）](/文件夹名/你的图片名字.JPG)
例如：
！[ ] (new/text.jpg)`

2. 放在七牛上，需要先注册，上传图片生成链接，直接在文章中使用链接即可。
3. 也可以放在服务器上，在图片链接输入绝对路径就可以
4. 我通常用的方法，因为在webstorm中写md格式的文章不能同时预览，所以我一般都是在csdn写博客的界面写好，在copy到webstorm上，这样就可以直接在其中插入图片，其实相当于你在引用你在csdn中发表文章里面图片的绝对路径


插入音乐
-------
可以使用网易云音乐，搜索想要的歌曲，点击歌曲名字进入播放器页面，点击生成外链播放器；复制代码，直接粘贴到博文中即可。这样会显示一个网易的播放器

```
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=298 height=52 src="http://music.163.com/outchain/player?type=2&id=32192436&auto=1&height=32"></iframe>

//其中的width=298 height=52 均改为0就看不到了，依然可以播放音乐
```


集成多说评论，分享
---------

申请多说帐号,打开页面点击我要安装注册帐号

在themes/next目录下打开 _config.yml，设置

```
  duoshuo_shortname:  nanshanyi //上面多说域名中填的内容
  需要分享的打开duoshuo_share: true 即可，支持分享到微博、QQ空间、微信
```

然后打开themes\landscape\layout_partial\article.ejs文件
把以下代码
```
  <% if (!index && post.comments && config.disqus_shortname){ %>
  <section id="comments">
    <div id="disqus_thread">
      <noscript>Please enable JavaScript to view the <a href="//disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    </div>
  </section>
  <% } %>
```
替换为
```
<% if (!index && post.comments && config.duoshuo_shortname){ %>
  <section id="comments">
    <!-- 多说评论框 start -->
    <div class="ds-thread" data-thread-key="<%= post.layout %>-<%= post.slug %>" data-title="<%= post.title %>" data-url="<%= page.permalink %>"></div>
    <!-- 多说评论框 end -->
    <!-- 多说公共JS代码 start (一个网页只需插入一次) -->
    <script type="text/javascript">
    var duoshuoQuery = {short_name:'<%= config.duoshuo_shortname %>'};
      (function() {
        var ds = document.createElement('script');
        ds.type = 'text/javascript';ds.async = true;
        ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
        ds.charset = 'UTF-8';
        (document.getElementsByTagName('head')[0]
         || document.getElementsByTagName('body')[0]).appendChild(ds);
      })();
      </script>
    <!-- 多说公共JS代码 end -->
  </section>
  <% } %>
```
然后你hexo s ,打开http://localhost:4000/ 打开文章看一下，评论和分享已经静静的躺在那了


添加标签页
------
创建标签页或者创建分类页面方法具体请查看官方文档：[hexo-主题引用](http://theme-next.iissnan.com/theme-settings.html)

概括一下分为三步：
1. 新建页面
2. 在菜单中将其显示
3. 给文章加标签，如果所有的文章都没有标签，那么标签页将显示空白
**分类页面同理**

在username.github.io文件目录下执行
```
$ hexo new page tags //会在username.github.io/source下创建tags文件夹内部是一个index.md和index文件夹
```
修改username.github.io/themes/next/_config.yml
```
menu:
  home: /      //主页
  #categories: /categories //分类
  archives: /archives   //归档
  tags: /tags   //标签（添加此行即可）
  about: /about   //关于
  #commonweal: /404.html
```
首页菜单就会有便签项，点击即可进入标签页。

添加搜索功能
-------
next支持Swiftype 、微搜索和Local Search
1. Swiftype （收费的没有免费版，进可以使用15天）是为网站和移动应用提供内部搜索的工具，点击进入Swiftype注册页面 ，注册之后需要填写自己的博客的网址
然后选择

![Swiftype注册页面](http://upload-images.jianshu.io/upload_images/966908-7aed60a7543e2571.png?imageMogr2/auto-orient/strip%7CimageView2/2)

选择 install Search

![swiftype](http://upload-images.jianshu.io/upload_images/966908-8cfb4600366ab1c0.png?imageMogr2/auto-orient/strip%7CimageView2/2)


途中的即为swiftype_key
修改nanshanyi.github.io/themes/next/_config.yml中的
```
swiftype_key:上面红圈中的内容
```

点击 resume Configuration 选择 search field edit

![swiftype](http://upload-images.jianshu.io/upload_images/966908-6673e77e95e084da.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


save
发布即可看到效果

![swiftype](http://upload-images.jianshu.io/upload_images/966908-fd0c0885439ef44d.png?imageMogr2/auto-orient/strip%7CimageView2/2)
2. 添加本地搜索
安装 hexo-generator-search，在nanshanyi.github.io目录下执行以下命令：
```
$ npm install hexo-generator-search --save
```
在nanshanyi.github.io/themes/next/_config.yml添加
```
search:
      path: search.xml
      field: post
```

发布即可看到效果，和上面的 swiftType 效果差不多，就不再粘图片了。

文／_南山忆（简书作者）
原文链接：http://www.jianshu.com/p/a52b68794a6b
著作权归作者所有，转载请联系作者获得授权，并标注“简书作者”。