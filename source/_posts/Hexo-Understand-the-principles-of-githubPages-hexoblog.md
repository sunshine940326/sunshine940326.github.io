---
title: 了解githubPages+hexo搭建博客的原理
date: 2017-02-26 14:30:15
tags: hexo 
categories: git
---
之前用githubPages+hexo搭建了一个自己的博客：sunshine940326.github.io(就是你现在看到的博客)，当时还不知道怎么使用git和github，所以只是跟着网上的教程在一步一步操作，现在了解了git知道怎么使用之后才慢慢明白其中的原理。
<!--more-->

什么是github pages
---------------------
1. 什么是github pages
 github是项目托管网站，列出了项目的源文件，所以github  有一个pages功能，可以自定义主页，用来代替默认的列出源列表的这个页面
 > 所以，github Pages可以被认为是用户编写的、托管在github上的静态网页。

2. 下面是GitHub Pages 官方文档:
- https://pages.github.com/ 
- http://help.github.com/pages

3. GitHub提供两种类型的主页(https://help.github.com/articles/user-organization-and-project-pages):

 - 个人或组织主页 - 页面内容位于 master 下 
 - 项目主页 - 页面内容位于每个项目的master下
 
 我们创建的博客属于个人页面（也可以创建为项目主页，不过默认的域名不一样，个人理解）




怎么使用github pages
------------------
1. 使用个人或组织页面
使用个人或组织页面，需要先创建一个和你的账号同名的仓库，比我我的github账号是sunshine940326，那么我需要创建一个名为sunshine940326.github.io的repo，然后在master上提交你的项目代码，这样就可以通过网址：http://sunshine940326.github.io来访问我的个人博客。
2. 使用项目主页的方法如下

 - 设置的方法很简单，只需要在你项目的右上角点击setting
    ![这里写图片描述](http://img.blog.csdn.net/20170226100516628?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
 - 找到下方的pages，将默认的none改成master分支![这里写图片描述](http://img.blog.csdn.net/20170226100803503?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
 - 点击保存，之后就可以在github pages后面看到你的项目链接了，你可以直接通过这个链接查看你master分支中代码的html内容![这里写图片描述](http://img.blog.csdn.net/20170226101029145?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)


> user pages只有一个, project pages可以有多个, 对于个人博客而言, 两种方式都可以.如果用户申请了自己的域名, 还可以使用CNAME文件自定义domain name, 这样访问你的域名就自动访问到github上的页面. 用户也可以自定义404页面.

什么是hexo以及安装hexo
----------------
说完了githubpages，继续来说一下什么是hexo
1. 什么是Hexo
google的第一条结果的解释是这样的
![这里写图片描述](http://img.blog.csdn.net/20170226102946906?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
点开这个链接就是中文版的官网了，**强烈建议大家多看看官方教程**，比看其他的教程有用多了

hexo是基于node环境，所以你需要先安装node，进行一些操作需要用到命令行，所以建议大家直接装一个git bash
这是git for windows自带的一组程序，提供了Linux风格的shell，在该环境下，您可以直接用上面提到的命令来安装Node.js。打开它的方法很简单，在任意位置单击右键，选择“GitBash Here”即可。由于Hexo的很多操作都涉及到命令行，您可以考虑始终使用Git Bash来进行操作。
2. 安装 Git
 - Windows：下载并安装 git.[百度云git下载地址](https://github.com/waylau/git-for-win)
 - Mac：使用 Homebrew, MacPorts ：brew install git;或下载 安装程序 安装。
 - Linux (Ubuntu, Debian)：sudo apt-get install git-core
 - Linux (Fedora, Red Hat, CentOS)：sudo yum install git-core
3. 安装node
 安装node的方式有很多种，我建议直接使用安装程序安装[node安装程序](https://nodejs.org/en/)
> 对于windows用户来说，建议使用安装程序进行安装。安装时，请勾选Add to PATH选项。
**安装node是需要配置环境变量的**

 安装完成之后打开命令行，输入 node -v，如果有返回版本号，即说明安装成功
4. 安装Hexo
当你安装好了git和node之后，就可以安装hexo了，好激动有没有，先不要激动的太早，这才刚开始= =
只需要输入下面的代码就可以安装hexo
在任意位置新建一个文件夹名为hexo ````
$ cd d:/hexo
$ npm install hexo-cli -g
$ hexo init blog
$ cd blog
$ npm install
$ hexo g # 或者hexo generate
$ hexo s # 或者hexo server可以在http://localhost:4000/ 查看
````
至此，你可以在浏览器输入http://localhost:4000/，预览你的博客了，通常都是一篇hello world= =
然后我们就需要将我们的项目部署到github上

**首先需要明白所谓部署到github的原理。**
**之前步骤中在Github上创建的那个个人项目的repo（sunshine940326.github.io）一个最大的特点就是其master中的html静态文件，可以通过链接http:// .github.io来直接访问。**
**Hexo -g 会生成一个静态网站（第一次会生成一个public目录），这个静态文件可以直接访问。**
**需要将hexo生成的静态网站，提交(git commit)到github上。**
然后我们需要配置_config.yml配置文件
目前我安装所用的本地环境如下：(可以通过hexo -v查看)`$ hexo -v
hexo: 3.2.2
hexo-cli: 1.0.2
os: Windows_NT 6.3.9600 win32 x64
http_parser: 2.7.0
node: 4.5.0
v8: 4.5.103.37
uv: 1.9.1
zlib: 1.2.8
ares: 1.10.1-DEV
icu: 56.1
modules: 46
openssl: 1.0.2h
`
要想部署到github，我们需要作如下配置（貌似不同版本的hexo配置不同，主要是hexo2.0和hexo3.0，所以你需要先查看自己安装的hexo版本）
**注意type:后面有一个空格**
将repository后面的链接换成你的博客名字`# Deployment
 Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repository: https://github.com/sunshine940326/sunshine940326.github.io.git`
然后在执行
`$ hexo clean
 $ hexo g
 $ hexo s
 $ hexo d
`
5. 命令解释：

 - hexo clean：清除public，当 source文件夹中的部分资源更改过之后，特别是对文件进行了删除或者路径的改变之后，需要执行这个命令，然后重新编译。
 - hexo generate (hexo g)： 编译，一般部署上去的时候都需要编译一下，编译后，会出现一个 public 文件夹，将所有的md文件编译成html文件 开启本地服务，
 - hexo server (hexo s) 启动本地web服务，用于博客的预览
 - hexo deploy (hexo d) 部署播客到远端（比如github, heroku等平台）：部署博客到github上，如果一切顺利，你就通过访问usename.github.io访问你的博客了！
 - 是的，现在你拥有了自己的博客！
然后你就可以输入http://sunshine940326.github.io来查看你的博客啦~
注意需要提前安装一个扩展：`$ npm install hexo-deployer-git --save`

装饰你的个人博客
------------------
至此，已经完成了github pages+hexo搭建博客的步骤，现在需要装饰你的博客
1. Hexo 主题配置
就和当时我们用的qq空间一样，我们可以直接用写好的主题，然后我们就只需要写文章就好  
这里以主题NexT为例进行说明。
2. 安装主题 `$ hexo clean
$ git clone https://github.com/iissnan/hexo-theme-next themes/next
`
3. 启用主题

修改Hexo目录下的_config.yml配置文件中的theme属性，将其设置为next。
4. 更新主题```
$ cd themes/next
$ git pull
$ hexo g # 生成
$ hexo s # 启动本地web服务器
```

现在打开http://localhost:4000/ ，会看到我们已经应用了一个新的主题。
你可以在[Themes·Hexo](https://github.com/hexojs/hexo/wiki/Themes)上选择你的主题，我使用的Next主题
参考[Next官方文档](http://theme-next.iissnan.com/getting-started.html),内容十分详尽

