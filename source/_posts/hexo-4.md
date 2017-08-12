---
title: Hexo 7：【原理】深入理解 Hexo
date: 2017-08-12 13:24:51
tags: [hexo高阶教程,hexo原理,github的pages服务] 
categories: [Hexo建站]
---
![title](http://img.blog.csdn.net/20170810182823396?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

一直在用 Hexo 写博客，但是对其原理并不是很清晰，在网上找了一些资料，对 Hexo 有了新的认识，现在就来记录一下

<!--more-->
# 使用 Hexo + github pages 搭建博客
记得刚开始知道 Hexo + github pages 搭建博客是在 2016 年，那时候，闺蜜非常激动的给我说自己建了一个博客，然后给我发过来了一个地址，我打开之后感觉她技术好牛逼啊，这都可以做到（因为潜意识中，创建一个网址是需要很复杂的过程的，并且要让别人通过地址访问也是一个很麻烦甚至觉得很花钱的一件事情）。

然后她给我说很简单，是用 Hexo + github pages 搭建的，当时是一脸懵逼啊，然后百度了一下，发现很多人都在使用 Hexo + github pages 搭建博客。

拖延症的我又过了几个月才开始按照网上的教程一步一步的创建自己的博客。

## github 的 pages 服务 

开始只是按照网上的教程一步一步跟着做，将项目源码托管在 github 上，使用 github 的 pages 服务。其实 github 的 pages 服务不只是可以展示博客，你的每一个 github 仓库都有 pages 服务，可以通过简单的设置通过项目的 index.html 为入口展示你的项目，这一点也很实用啊有木有！但是大部分的 pages 服务都是用来搭建个人博客的。

例如，我之前的 canvasStar 的项目，我将源码上传到了 github 上，然后如下设置：
![pages服务第一步](http://img.blog.csdn.net/20170811153556910?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

![pages服务第二步](http://img.blog.csdn.net/20170811154125248?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

> github pages支持静态页面的解析

然后你就可以通过图中红色框框圈出的地址来访问。

## coding 的 pages 服务
在初创博客的时候，是将代码放在 github 上，然后通过 pages 访问，然后了解到国内访问 github 速度还是慢一些，并且 github 不会被百度收录，不利于 SEO，所以又将代码托管到了 coding 上，coding 也有类似的 pages 服务。也用了一段时间，但是 coding 现在不升级为会员打开有广告。于是就自己买了个虚拟主机，将代码直接放在了虚拟主机上。

## 为什么使用 Hexo + github pages 搭建博客
Hexo 是用来生成 HTML 的，github pages 用来展示 HTML（根据上面的介绍，我们可以理解我们还可以使用 coding 的 pages 服务，如果自己有服务器的话，可以上传到自己的服务器）。

# Hexo
使用 Hexo + github pages 搭建博客，刚刚我们简单介绍了 github pages，那么现在我们就该介绍一下 Hexo，我们了解到 Hexo 是用来生成 HTML 的，那么这篇文章我们就主要来讲一下 Hexo 是怎样生成 HTML 的。

## 什么是 Hexo
![hexo官网](http://img.blog.csdn.net/20170811161953548?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
在 Hexo 的官网，我们可以直观的看到对 Hexo 的介绍：**快速、简洁且高效的博客框架**

在 Hexo 的文档中，我们可以找到官方对 Hexo 的定义：
> Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

在官方文档中安装了 Hexo 中我们就安装了 Hexo，然后我们就可以看到文档结构如下：
```
.
├── _config.yml      // 站点配置文件
├── db.json          // 缓存文件
├── node_modules     // 安装的插件以及hexo所需的一些nodejs模块
├── package.json     // 项目的依赖文件
├── scaffolds        // 模版文件
├── source           // 源文件，用来存放你的文章 md 文件
└── themes           // 主题文件
```

然后我们可以安装主题，比我我安装的 NexT 主题，安装完之后会在 `themes` 下面产生一个 next 文件存放主题中的内容，文档结构如下：
```
.
├── LICENSE
├── README.en.md       // READEME 英文版
├── README.md          // READEME 中文文件
├── _config.yml        // 主题配置文件
├── bower.json
├── gulpfile.coffee
├── languages         // 多语言配置文件
├── layout            // 模板文件
├── package.json      // 项目的依赖文件
├── scripts           // 主题的脚本文件
├── source            // 主题的资源文件 CSS IMG
└── test
```

## Hexo 的工作原理
这里我们来分析一下 Hexo 每次部署的流程
1. hexo g：生成静态文件。将我们的数据和界面相结合生成静态文件的过程。会遍历主题文件中的 `source` 文件夹（js、css、img 等静态资源），然后建立索引，然后根据索引生成 `pubild` 文件夹中，此时的 `publid` 文件是由 html、 js、css、img 建立的纯静态文件可以通过 `index.html` 作为入口访问你的博客。
2. hexo d：部署文件。部署主要是根据在 `_config.yml` 中配置的 `git` 仓库或者 `coding` 的地址，将 `public` 文件上传至 github 或者 coding 中。然后再根据上面的 github 提供的 pages 服务呈现出页面。当然你也可以直接将你生成的 `public` 文件上传至你自己的服务器上。

# Hexo 的模板引擎
> 模板引擎的作用，就是将界面与数据分离。最简单的原理是将模板内容中指定的地方替换成数据，实现业务代码与逻辑代码分离。

我们可以注意到，在 Hexo 中，`source` 文件夹和 `themes` 文件夹是在同级的，我们就可以将 `source` 文件夹理解为数据库，而主题文件夹相当于 界面。然后我们 `hexo g` 就将我们的数据和界面相结合生成静态文件 `public`。

Hexo 的模板引擎是默认使用 ejs 编写的。hexo首先会解析 md 文件，然后根据 layout 判断布局类型，再调用其他的文件，这样每一块的内容都是独立的，提高代码的复用性。最终会生成一个 html 页面。

模板文件在 `layout` 文件夹下，`layout` 文件文档结构如下：
```
.
├── _custom                           // 通用布局
├── _layout.swig                      // 默认布局布局
├── _macro                            // 插件模板
├── _partials                         // 局部布局
├── _scripts                          // script模板
├── _third-party                      // 第三方插件模板
├── archive.swig                      // 归档模板
├── category.swig                     // 分类模板
├── index.swig                        // 首页模板
├── page.swig                         // 其他模板
├── photo.swig                        // 照片模板（自定义）
├── post.swig                         // 文章模板
├── schedule.swig                     // 归档模板
└── tag.swig                          // 标签模板
```
> 每个模板都默认使用layout布局，您可在文章的前置申明中指定其他布局，比如“post”或者“page”或是设为false来关闭布局功能（如果不填默认是post，这个在_config.yml中可以设置默认值），您甚至可在布局中再使用其他布局来建立嵌套布局。

在我们新建页面或者新建文章的使用可以选定我们使用的模板。`hexo new [layout] <title>`就会使用对应的模板。

其中 `_layout.swig` 是通用模板，里面引入了 `head`、`footer` 等公共组件，然后在其他的模板中会引入这个 `_layout.swig` 通用模板，比如 `post.swig` 模板
```
{% extends '_layout.swig' %}
{% import '_macro/post.swig' as post_template %}
{% import '_macro/sidebar.swig' as sidebar_template %}


{% block title %} {{ page.title }} | {{ config.title }} {% endblock %}

{% block page_class %}page-post-detail{% endblock %}


{% block content %}

  <div id="posts" class="posts-expand">
    {{ post_template.render(page) }}

    <div class="post-spread">
      {% if theme.jiathis %}
        {% include '_partials/share/jiathis.swig' %}
      {% elseif theme.baidushare %}
        {% include '_partials/share/baidushare.swig' %}
      {% elseif theme.add_this_id %}
        {% include '_partials/share/add-this.swig' %}
      {% elseif theme.duoshuo_shortname and theme.duoshuo_share %}
        {% include '_partials/share/duoshuo_share.swig' %}
      {% endif %}
    </div>
  </div>

{% endblock %}

{% block sidebar %}
  {{ sidebar_template.render(true) }}
{% endblock %}


{% block script_extra %}
  {% include '_scripts/pages/post-details.swig' %}
{% endblock %}

```
其中在第 11 行
```
{% block content %} 
    // 中间为该模板自定义内容
{% endblock %}
```
# 数据的填充
数据的填充主要是 `hexo -g` 的时候将数据传递给 swig 模板，然后再由 swig 模板填充到 HTML 中。

## 配置文件中的数据
Hexo 的配置文件 `_config.yml` 使用 [yml语法](http://docs.ansible.com/ansible/latest/YAMLSyntax.html) 。例如博客的名字、副标题等等之类。这些数据项组织在 config 对象中。可以数字、字符串、对象、数组，

## 配置文件中数据的使用
如果要在模板中使用某个具体的值，比如字符串、数字、逻辑变量或者对象的某个成员，可以在主题的模板文件 swig 中直接使用：
```
{% block title %} {{ page.title }} | {{ config.title }} {% endblock %}
```

## Hexo 中的变量
Hexo 提供了很多的变量，比如我们上面使用的 `page` 变量，还有 `site` 变量等，这些都是 Hexo 提供的，我们可以拿来直接使用的，常用的变量有：
- `site`：对应整个网站的变量，一般会用到 `site.posts.length` 制作分页器。
  - `site.posts` 所有文章
  - `site.pages` 所有分页
  - `site.categories` 所有分类
  - `site.tags` 所有标签
- `page`：存放当前页面的信息，例如我在 `index.ejs` 中使用 `page.posts` 获取了当前页面的所有文章而不是使用 `site.posts`。
- `config`：`config` 变量我们在主目录下配置文件 `_config.yml` 中保存的信息。
- `theme`：`theme` 变量是我们在主题目录下配置文件 `_config.yml` 中保存的信息。
- `path`：当前页面的路径（不含根路径）。
- `url`：页面完整网址。

### 页面变量

Page(page) 这里指的是 `hexo new page` 创建的那个页面
- `page.title`：文章标题
- `page.date`：文章建立日期
- `page.updated`：文章更新日期
- `page.comments`：留言是否开启
- `page.layout`：布局名称
- `page.content`：文章完整内容
- `page.excerpt`：文章摘要
- `page.more`：除了摘要的其他内容
- `page.source`：文章原始路劲
- `page.full_source`：文章完整原始路径
- `page.path`：文章网址（不含根路径），通常在主题中使用url_for(page.path)
- `page.permalink`：文章永久网址
- `page.prev`：上一篇文章，如果此为第一篇文章则为null
- `page.next`：下一篇文章，如果此为最后一篇文章则为null
- `page.raw`：文章原始内容
- `page.photos`：文章的照片（用于相册）
- `page.link`：文章的外链（用于链接文章）

### Post(post) 变量
这里指的是文章页面，与page布局相同，添加如下变量：
- `page.pulished`：文章非草稿为true
- `page.categories`：文章分类
- `page.tags`：文章标签

### 首页(index)
- `page.per_page`：每一页显示的文章数
- `page.total`：文章数量
- `page.current`：当前页码
- `page.current_url`：当前页的URL
- `page.posts`：当前页的文章
- `page.prev`：前一页页码，如果为第一页，该值为0
- `page.prev_link`：前一页URL，如果为第一页，则为''
- `page.next`：后一页页码，如果为最后一页，则为0
- `page.next_link`：后一页URL，如果为最后一页，则为''
- `page.path`：当前页网址（不含根路径），通常在主题中使用url_for(page.path)

### 归档页(archive) 
与index布局相同，但是新增如下变量：
- `archive` 为true
- `year` 归档年份（4位）
- `month` 归档月份（不包含0）

# 总结
非要说 Hexo 是什么的话，我觉得就是生成静态页面的工具，可以将我们使用 markdown 编写的内容与主题模板相结合，生成 HTML 静态文件。并且可以和 github 的 pages 或者其他可以将静态页面展现出来的服务（例如 coding 的 pages 服务）相结合，一键部署。

再深入一点讲 Hexo 的原理的话，那就应该是使用 [yaml 语言](http://www.ruanyifeng.com/blog/2016/07/yaml.html?f=tt) 做配置文件，使用 [ejs](http://www.360doc.com/content/16/0115/10/597197_528136785.shtml) 或者 [swig](https://www.ibm.com/developerworks/cn/aix/library/au-swig/) 作为主题模板，与使用 markdown 书写的内容结合，生成静态 HTML 文件。

# 参考文献：
- [Hexo Docs](http://www.ituring.com.cn/article/199295)
- [写一个自己的Hexo主题](https://segmentfault.com/a/1190000006057336)
- [Hexo 主题制作指南](http://www.360doc.com/content/16/0913/16/33651124_590545274.shtml#/)
- [hexo原理浅析](https://segmentfault.com/a/1190000008784436)
