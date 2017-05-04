---
title: hexo高级进阶
date: 2016-09-17 01:14:19
tags: hexo 
categories: git
---
![这里写图片描述](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493223838128&di=c9a4b5d92b7ab41789dbde3069dbaf3a&imgtype=0&src=http%3A%2F%2Fpic4.zhimg.com%2Fd4c1239e75c02e8482c22017a6c8d407_r.jpg)

这一部分的主要是一些高级进阶的功能，想自定义自己的主题，就需要这部分的内容。
<!--more-->

1、永久链接
===

你可以通过 _config.yml 或者文章的头部申明来设置文章的永久链接。

（1）变量
---

下面列举了可以使用在永久链接里的变量，除了下面这些，你可以使用固定链接中的任何属性。

    :year 4位的年，比如2015
    :month 2位的月，比如06
    :i_month 去掉前面0的月，比如9代表9月
    :day 两位的天，比如05代表5号
    :i_day 同理
    :title 文件名
    :id 文章ID
    :category 类别；如果文章没有指定，那么就是 default_category 字段设置的那个。

你也可以自定义每个变量，在 permalink_defaults 中这样设置：
```
permalink_defaults:
    lang: en
```

（2）举例说明
---

假设在_posts目录下有一篇名为hello-world.md的文章，声明如下：
```
title: Hello World
date: 2015-06-01
categories:
- foo
- bar
```
    设置为： :year/:month/:day/:title/ 结果为： 2015/06/01/hello-world
    设置为： :year-:month-:day-:title.html 结果为： 2015-06-01-hello-world.html
    设置为： :category/:title 结果为： foo/bar/hello-world

（3）多语言支持
---

你可以通过 new_post_name 和 permalink 字段的设定，来创建一个多语言的网站。
```
new_post_name: :lang/:title.md
permalink: :lang/:title/
```
当你创建一个新的文章的时候， hexo new "Hello World" --lang tw ，hexo会创建source/_posts/tw/Hello-World.md，那么 http://localhost:4000/tw/hello-world/ 便会指向该文章。
2、主题
===

hexo根目录中的theme目录就是主题的所在地，设置主题非常简单，只需将 _config.yml 中theme字段值设为主题名就行了。下面看一下一个主题的目录结构：
```
.
├── _config.yml
├── languages
├── layout
├── scripts
└── source
```
（1）主题全局设置
---

_config.yml配置文件，跟hexo的全局配置文件名一样。只是在不同的目录中，在该配置文件中的改动不需要重启服务，就可以实时体现在站点中。
（2）语言
---
语言文件夹，详细信息可以查看Localization(i18n)的说明，下面再介绍。
3、模版
===
模版基本上就是网站的布局了，如果你想要自己亲手制作一个Hexo的主题，那么就要深入了解这块内容了，每一个主题至少都要包含一个index模版，下面是各页面对应的模版名称：

    index 首页
    post 文章
    page 分页
    archive 归档
    category 分类归档
    tag 标签归档

（1）Layouts（布局）
---

如果页面结构类似，举个例子，两个模版都含有header以及footer，你就可以考虑通过「布局」让两个模板共享相同的结构。一个布局文件必须要能显示 body 变量的内容，如此一来模板的内容才会被显示，例如：
```
<!--index.ejs-->
index

<!--layout.ejs-->
<html>
  <body><%- body %></body>
</html>
```
生成的结果如下：
```
<!DOCTYPE html>
<html>
  <body>index</body>
</html>
```
每个模板都默认使用 layout 布局，您可在文章的前置申明中指定其他布局，比如“post”或者“page”或是设为false来关闭布局功能（如果不填默认是post，这个在_config.yml中可以设置默认值），您甚至可在布局中再使用其他布局来建立嵌套布局。

也许你看到官方Docs这么说，还是不明白说的是什么意思，后面我会通过创建个人简历的布局示例来详细讲解这一块内容。
（2）Partials（局部模版）
---
局部模版可以让你在不同的模版中分享相同的组件，例如Header、Footer或者Sidebar侧边栏等等，可以利用局部模版功能将各个组件分割成独立的文件，便于维护。例如：
```
<!--partial/header.ejs-->
<h1 id="logo"><%= config.title %></h1>

<!--index.ejs-->
<%- partial('partial/header') %>
<div id="content">Home page</div>
```
生成后就是：
```
<h1 id="logo">My Site</h1>
<div id="content">Home page</div>
```
这个很容易理解，就是将局部模块里的内容，原封不动的拷贝到引用它的文件中。
（3）Local Variables（本地变量）
---

这里的变量就是针对局部模版来使用的，您可以在局部模块中指定局部变量来进行传递。例如：
```
<!--partial/header.ejs-->
<h1 id="logo"><%= title></h1>

<!--index.ejs-->
<%- partial('partial/header', {title: 'Hello World'}) %>
<div id="content">Home page</div>
```
生成后就是：
```
<h1 id="logo">Hello World</h1>
<div id="content">Home page</div>
```
这个也不难理解，就是传递变量的过程。
（4）Optimization（最优化）
----

假如你的主题特别复杂，因为要生成的文件过于庞大，这样会导致hexo生成性能下降，除了优化主题外，你还可以通过Fragment Caching(局部缓存)的功能来处理。它的主要功能就是缓存局部的内容，减少文件查询。常用在那些很少变动的模块中，比如Header、Footer等等，例如：
```
<%- fragment_cache('header', function(){
  return '<header></header>';
});
```
如果使用局部模版的话，如下：
```
<%- partial('header', {}, {cache: true});
```
但是需要注意的是，如果开启了 relative_link 参数的话，就不要使用局部缓存的功能，因为relative link在每个页面可能不同。
4、变量
===
（1）全局变量
---

    site 网站变量
        site.posts 所有文章
        site.pages 所有分页
        site.categories 所有分类
        site.tags 所有标签
    page 针对改页面的内容以及前置申明中所设定的变量
    config 配置文件中的变量
    theme 主题配置文件中的变量
    _ lodash 函数库
    path 当前页面的路径（不含根路径）
    url 页面完整网址
    env 环境变量

（2）页面变量
---
Page(page)这里指的是 hexo new page 创建的那个页面

    page.title 文章标题
    page.date 文章建立日期
    page.updated 文章更新日期
    page.comments 留言是否开启
    page.layout 布局名称
    page.content 文章完整内容
    page.excerpt 文章摘要
    page.more 除了摘要的其他内容
    page.source 文章原始路劲
    page.full_source 文章完整原始路径
    page.path 文章网址（不含根路径），通常在主题中使用 url_for(page.path)
    page.permalink 文章永久网址
    page.prev 上一篇文章，如果此为第一篇文章则为 null
    page.next 下一篇文章，如果此为最后一篇文章则为 null
    page.raw 文章原始内容
    page.photos 文章的照片（用于相册）
    page.link 文章的外链（用于链接文章）

Post(post)这里指的是文章页面，与page布局相同，添加如下变量：

    page.pulished 文章非草稿为true
    page.categories 文章分类
    page.tags 文章标签

**首页(index)**

    page.per_page 每一页显示的文章数
    page.total 文章数量
    page.current 当前页码
    page.current_url 当前页的URL
    page.posts 当前页的文章
    page.prev 前一页页码，如果为第一页，该值为0
    page.prev_link 前一页URL，如果为第一页，则为''
    page.next 后一页页码，如果为最后一页，则为0
    page.next_link 后一页URL，如果为最后一页，则为''
    page.path 当前页网址（不含根路径），通常在主题中使用 url_for(page.path)

归档页(archive)与 index 布局相同，但是新增如下变量：

    archive 为true
    year 归档年份（4位）
    month 归档月份（不包含0）

分类页(category)与 index 布局相同，但是新增如下变量：

    category 分类名称

标签页(tag)与 index 布局相同，但是新增如下变量：

    tag 标签名称

5、帮助函数
===
帮助函数被用于在模版中快速插入内容。
（1）URL
---

    url_for 返回一个带root路径的url，用法： <%- url_for(path) %>
    relative_url 返回from相对的to路径，用法： <%- relative_url(from, to) %>

    gravatar 插入Gravatar图片，用法： <%- gravatar(email, [size])%> ，例如：

    <%- gravatar('a@abc.com') %>
    // http://www.gravatar.com/avatar/b9b00e66c6b8a70f88c73cb6bdb06787
    <%- gravatar('a@abc.com', 40) %>
    // http://www.gravatar.com/avatar/b9b00e66c6b8a70f88c73cb6bdb06787?s=40

（2）HTML
---
   1 css 载入CSS文件。用法： <%- css(path, ...)%> ， path 可以是数据或者字符串，如果 path 开头不是 / 或任何协议，则会自动加上根路劲；如果后面没有加上 .css 扩展名的话，也会自动加上。示例如下：

    <%- css('style.css') %>
    // <link rel="stylesheet" href="/style.css" type="text/css">


    <%- css(['style.css', 'screen.css']) %>
    // <link rel="stylesheet" href="/style.css" type="text/css">
    // <link rel="stylesheet" href="/screen.css" type="text/css">

   2 js 载入 JavaScript 文件。用法： <%- js(path, ...) %> ， path 可以是数组或字符串，如果 path 开头不是 / 或任何协议，则会自动加上根路径；如果后面没有加上 .js 扩展名的话，也会自动加上。

    <%- js('script.js') %>
    // <script type="text/javascript" src="/script.js"></script>
    <%- js(['script.js', 'gallery.js']) %>
    // <script type="text/javascript" src="/script.js"></script>
    // <script type="text/javascript" src="/gallery.js"></script>

   3 link_to 插入链接。用法： <%- link_to(path, [text], [options]) %> ， options 参数有：
  - external 在新窗口中打开链接，默认值为false
  - class Class名称，也就是html标签a的class名
  - id ID名，也就是html标签a的id名

    示例如下：




    <%- link_to('http://www.google.com') %>
     // <a href="http://www.google.com" title="http://www.google.com">http://www.google.com</a>
    <%- link_to('http://www.google.com', 'Google') %>
    // <a href="http://www.google.com" title="Google">Google</a>


    <%- link_to('http://www.google.com', 'Google', {external: true, class: "link"}) %>
    // <a href="http://www.google.com" title="Google" target="_blank" rel="external" class="link">Google</a>

   4 mail_to 插入电子邮件链接。用法： <%- mail_to(path, [text], [options])%> ， options 参数有：
   - class Class名称，也就是html标签a的class名
   - id ID名，也就是html标签a的id名
   - subject 邮件主题
   - cc 抄送（CC）
   - bcc 密送（BCC）
   - body 邮件内容

    示例如下：




    <%- mail_to('a@abc.com') %>
    // <a href="mailto:a@abc.com" title="a@abc.com">a@abc.com</a>
    <%- mail_to('a@abc.com', 'Email') %>
    // <a href="mailto:a@abc.com" title="Email">Email</a>

   5 image_tag 插入图片。用法： <%- image_tag(path, [options]) %> ， options 参数有：
   - class Class名称，也就是html标签a的class名
   - id ID名，也就是html标签a的id名
   - alt 替代文字
   - width 宽度
   - height 高度

    基本上就是 img 标签里的属性值。

6 favicon_tag 插入favicon。用法：
```<%- favicon_tag(path) %>```

7 feed_tag 插入feed链接。用法：
```<%- feed_tag(path, [options]) %> ```，参数有： title 和 type (默认值为atom)

（3）条件函数
---
    is_current 判断 path 是否符合目前页面的网址。 <%- is_current(path, [strict]) %>
    is_home 判断目前是否为首页。
    is_post 检查目前是否为文章。 <%- is_post() %>
    is_archive 检查目前是否为存档页面。 <%- is_archive() %>
    is_year 检查目前是否为年度归档页面。 <%- is_year() %>
    is_month 检查目前是否为月度归档页面。 <%- is_month() %>
    is_category 检查目前是否为分类归档页面。 <%- is_category() %>
    is_tag 检查目前是否为标签归档页面。 <%- is_tag() %>

（4）字符串处理
---
   - trim 清除字符串开头和结尾的空格。 ```<%- trim(string) %>`

   - strip_html 清除字符串中的 HTML 标签。``` <%- strip_html(string) %> ```，示例：
```
    <%- strip_html('It's not <b>important</b> anymore!') %>
    // It's not important anymore!
```
   - titlecase 把字符串转换为正确的 Title case。 ```<%- titlecase(string) %> ```示例：
```
    <%- titlecase('this is an apple') %>
    # This is an Apple
```

- markdown 使用 Markdown 解析字符串。 <%- markdown(str) %> 示例：
```
    <%- markdown('make me **strong**') %>
    // make me <strong>strong</strong>
```

- render 解析字符串。``` <%- render(str, engine, [options]) %>```

    word_wrap 使每行的字符串长度不超过 length 。 length 预设为 80。 ```<%- word_wrap(str, [length]) %> ```，示例：
```
    <%- word_wrap('Once upon a time', 8) %>
    // Once upon\n a time
```

- truncate 移除超过 length 长度的字符串。 ```<%- truncate(text, length) %> ```示例：
```
    <%- truncate('Once upon a time in a world far far away', 16) %>

    // Once upon a time
```

（5）模板
---
   - partial 载入其他模板文件，您可在 locals 设定区域变量。 <%- partial(layout, [locals], [options]) %>

    参数 | 描述 | 默认值 --- | --- | --- cache | 缓存（使用 Fragment cache） | false only | 限制局部变量。在模板中只能使用 locals 中设定的变量。 | false

   - fragment_cache 局部缓存。它储存局部内容，下次使用时就能直接使用缓存。 <%- fragment_cache(id, fn); 示例：

    <%- fragment_cache('header', function(){
          return '<header></header>';
    }) %>

（6）日期与时间
---
   - date 插入格式化的日期。 date 可以是 UNIX 时间、ISO 字符串、Date 对象或 [Moment.js] 对象。 format 默认为 date_format 配置信息。 <%- date(date, [format]) %> 示例：





    <%- date(Date.now()) %>
    // Jan 1, 2013
    <%- date(Date.now(), 'YYYY/M/D') %>
    // 2013/1/1

   - date_xml 插入 XML 格式的日期。 date 可以是 UNIX 时间、ISO 字符串、Date 对象或 [Moment.js] 对象。 <%- date_xml(date) %> ，示例：
```
    <%- date_xml(Date.now()) %>
    // 2013-01-01T00:00:00.000Z
```
   - time 插入格式化的时间。 date 可以是 UNIX 时间、ISO 字符串、Date 对象或 [Moment.js] 对象。 format 默认为 time_format 配置信息。 ```<%- time(date, [format]) %>``` 示例：
```
    <%- time(Date.now()) %>
    // 13:05:12


    <%- time(Date.now(), 'h:mm:ss a') %>
    // 1:05:12 pm

   - full_date 插入格式化的日期和时间。 date 可以是 UNIX 时间、ISO 字符串、Date 对象或 [Moment.js] 对象。 format 默认为 time_format 配置信息。 <%- full_date(date, [format]) %> 示例：




    <%- full_date(new Date()) %>
    // Jan 1, 2013 0:00:00
    <%- full_date(new Date(), 'dddd, MMMM Do YYYY, h:mm:ss a') %>
    // Tuesday, January 1st 2013, 12:00:00 am

（7）列表
---

   - list_categories 插入分类列表。 <%- list_categories([categories], [options]) %>

    参数 | 描述 | 默认值 --- | --- | --- orderby | 分类排列方式 | name order | 分类排列顺序。 1 , asc 升序； -1 , desc 降序。 | 1 show_count | 显示每个分类的文章总数 | true style | 分类列表的显示方式。使用 list 以无序列表（unordered list）方式显示。 | list separator | 分类间的分隔符号。只有在 style 不是 list 时有用。 | , depth | 要显示的分类层级。 0 显示所有层级的分类； -1 和 0 很类似，但是显示不分层 级； 1 只显示第一层的分类。 | 0 class | 分类列表的 class 名称。 | category transform | 改变分类名称显示方法的函数 |

   - list_tags 插入标签列表。 <%- list_tags([tags], [options]) %>

    选项 | 描述 | 预设值 --- | --- | --- orderby | 标签排列方式 | name order | 标签排列顺序。 1 , asc 升序； -1 , desc 降序。 | 1 show_count | 显示每个标签的文章总数 | true style | 标签列表的显示方式。使用 list 以无序列表（unordered list）方式显示。 | list separator | 标签间的分隔符号。只有在 style 不是 list 时有用。 | , class | 标签列表的 class 名称。 | tag transform | 改变标签名称显示方法的函数 | amount | 要显示的标签数量（0 = 无限制） | 0

   - list_archives 插入归档列表。 ```<%- list_archives([options]) %>```

    参数 | 描述 | 默认值 --- | --- | --- type | 类型。此设定可为 yearly 或 monthly 。 | monthly order | 排列顺序。 1 , asc 升序； -1 , desc 降序。 | 1 show_count | 显示每个归档的文章总数 | true format | 日期格式 | MMMM YYYY style | 归档列表的显示方式。使用 list 以无序列表（unordered list）方式显示。 | list separator | 归档间的分隔符号。只有在 style 不是 list 时有用。 | , class | 归档列表的 class 名称。 | archive transform | 改变归档名称显示方法的函数 |

   - list_posts 插入文章列表。 ```<%- list_posts([options]) %>```

    参数 | 描述 | 默认值 --- | --- | --- orderby | 文章排列方式 | date order | 文章排列顺序。 1 , asc 升序； -1 , desc 降序。 | -1 style | 文章列表的显示方式。使用 list 以无序列表（unordered list）方式显示。 | list separator | 文章间的分隔符号。只有在 style 不是 list 时有用。 | , class | 文章列表的 class 名称。 | post amount | 要显示的文章数量（0 = 无限制） | 6 transform | 改变文章名称显示方法的函数 |

   - tagcloud 插入标签云。 ```<%- tagcloud([tags], [options]) %>```

    参数 | 描述 | 默认值 --- | --- | --- min_font | 最小字体尺寸 | 10 max_font | 最大字体尺寸 | 20 unit | 字体尺寸的单位 | px amount | 标签总量 | 40 orderby | 标签排列方式 | name order | 标签排列顺序。 1 , sac 升序； -1 , desc 降序 | 1 color | 使用颜色 | false start_color | 开始的颜色。您可使用十六进位值（ #b700ff ），rgba（ rgba(183, 0, 255, 1) ），hsla（ hsla(283, 100%, 50%, 1) ）或 [颜色关键字]。此变量仅在 color 参数开启时才有用。 | end_color | 结束的颜色。您可使用十六进位值（ #b700ff ），rgba（ rgba(183, 0, 255, 1) ），hsla（ hsla(283, 100%, 50%, 1) ）或 [颜色关键字]。此变量仅在 color 参数开启时才有用。 |

（8）其他
---
   - paginator 插入分页链接。 ```<%- paginator(options) %>```

    参数 | 描述 | 默认值 --- | --- | --- base | 基础网址 | / format | 网址格式 | page/%d/ total | 分页总数 | 1 current | 目前页数 | 0 prev_text | 上一页链接的文字。仅在 prev_next 设定开启时才有用。 | Prev next_text | 下一页链接的文字。仅在 prev_next 设定开启时才有用。 | Next space | 空白文字 | &hellp; prev_next | 显示上一页和下一页的链接 | true end_size | 显示于两侧的页数 | 1 mid_size | 显示于中间的页数 | 2 show_all | 显示所有页数。如果开启此参数的话， end_size 和 mid_size 就没用了。 | false

   - search_form 插入 Google 搜索框。 ```<%- search_form(options) %>```

    参数 | 描述 | 默认值 --- | --- | --- class | 表单的 class name | search-form text | 搜索提示文字 | Search button | 显示搜索按钮。此参数可为布尔值（boolean）或字符串，当设定是字符串的时候，即为搜索按钮的文字。 | false

   - number_format 格式化数字。 ```<%- number_format(number, [options]) %>```

    参数 | 描述 | 默认值 --- | --- | --- precision | 数字精度。此选项可为 false 或非负整数。 | false delimiter | 千位数分隔符号 | , separator | 整数和小数之间的分隔符号 | .
    示例：




    <%- number_format(12345.67, {precision: 1}) %>
    // 12,345.68
    <%- number_format(12345.67, {precision: 4}) %>
    // 12,345.6700


    <%- number_format(12345.67, {precision: 0}) %>
    // 12,345


    <%- number_format(12345.67, {delimiter: ''}) %>
    // 12345.67


    <%- number_format(12345.67, {separator: '/'}) %>
    // 12,345/67

   - open_graph 插入 open graph 资源。 <%- open_graph([options]) %>

    参数 | 描述 | 默认值 --- | --- | --- title | 页面标题 ( og:title ) | page.title type | 页面类型 ( og:type ) | blog url | 页面网址 ( og:url ) | url image | 页面图片 ( og:image ) | 内容中的图片 site_name | 网站名称 ( og:site_name ) | config.title description | 页面描述 ( og:desription ) | 内容摘要或前 200 字 twitter_card | Twitter 卡片类型 ( twitter:card ) | summary twitter_id | Twitter ID ( twitter:creator ) | twitter_site | Twitter 网站 ( twitter:site ) | google_plus | Google+ 个人资料链接 | fb_admins | Facebook 管理者 ID | fb_app_id | Facebook 应用程序 ID |

   - toc 解析内容中的标题标签 (h1~h6) 并插入目录。 <%- toc(str, [options]) %>

    参数 | 描述 | 默认值 --- | --- | --- class | Class 名称 | toc list_number | 显示编号 | true

    下面示例就是解析文章内容，并生成目录列表：
```
    <%- toc(page.content) %>```

6、本地化
===

所谓的本地化功能，就是在主题中设置不同的语言模版，在文件夹 languages ，然后通过设置改变网页中的预设文本。在模版中是通过 __ 或 _p 来引用的。

例如你在 _config.yml 中设置 language: zh-CN ，而网页模版中有这么一段引用：``` <h1 class="title"><%= __('comment') %></h1> ```，那么网站会在 languages 文件夹中找 zh-CH.yml 文件，并找到对应的 comment 值，将值显示在网站中。

这一块知道这些就基本上满足了自定义主题的需求了。
7、插件
===
这一块内容主要针对开发者的，帮助开发hexo的插件或者向hexo提供插件，主要就是通过github提交代码。大致可以了解一下Hexo的九种插件，您可以在 API 页面中获得更多信息：

    Generator
    Renderer
    Helper
    Deployer
    Processor
    Tag
    Console
    Migrator
    Filter

注意

1、上面提到的所有 Options 参数一定要按照 json 的格式来书写；

2、虽然官方Docs已经写得很详细了，但是缺乏实际例子，后续我会以我的站点为例，详细介绍一些功能如何使用。 或者直接在Github中fork我的主题 light-ch （基于hexo-theme-light主题的China版）自行查看代码。
