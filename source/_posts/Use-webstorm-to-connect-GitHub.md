---
title: 【git】使用 webstorm 连接 github
date: 2017-02-24 10:40:20
tags: git
categories: git
---
本文主要讲了怎么使用webstorm连接自己的github，从而做到版本控制自己的代码，用起来很方便，在coding完之后直接可以commit和push，但是时间长了发现还是有一定的不方便（应该是自己还不会用= =），本文持续更新，*★,°*:.☆\(￣▽￣)/$:*.°★*。撒花！~
<!--more-->
昨天重新捣鼓了下github，给自己立一个flag，每天都要写总结，记录这一天学习的内容

说起来很惭愧，之前用webstorm都是把其当成编辑器使用，不知道可以导入工程的概念= =，表打我，因为我们公司好多项目都是在playcanvas下开展的，不能直接打开index.html浏览项目，每次都需要开启终端，开启python，然后我们同事说你用webstorm可以直接打开，然后我试了下，不行，就没有再继续尝试下去了，直到用sass的时候，我发现按照网上的方式，怎么都添加不了watch，一直报错,然后用webstorm创建工程发现就可以了，心塞塞~然后在知乎上看了一个问答才发现我一直在暴殄天物，[WebStorm 有哪些过人之处？](https://www.zhihu.com/question/20936155)，说一下我现在觉得有用的功能：
 

 - 连接ftp，可以直接上传文件，一键就可以更新
 - 就是自带git功能，并且可以连接github，也是可以一键更新，没有什么命令行那么麻烦

因为我还没有那么高的水平，所以目前就觉得这两点比较方便= =，待以后发现更多的强大功能

今天记录一下怎么用webstorm连接github以及一些操作说明
怎么连接用webstorm连接github这点自行百度。
在连接到github上之后，想要把你的项目上传到github上，
1、点击右上方的VCS然后import...→share....
![这里写图片描述](http://img.blog.csdn.net/20170224184547396?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

2、填写一下新建仓库的名称和描述，然后点击share，就可以在你的github下创新一个新的仓库
![这里写图片描述](http://img.blog.csdn.net/20170224184718834?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

3、然后你就会发现你的左侧文件都变成了红色，红色代表你还没有add到缓存区，点击右键，将你要上传的文件add到缓存区。
![这里写图片描述](http://images2015.cnblogs.com/blog/1004353/201608/1004353-20160815113925453-1269489073.png)
add之后文件就会变成绿色的了，接下来要commit，直接右下角可以选择commit and push我理解的commit就是发布版本的意思，将你add到缓存区的文件发布成版本，这里还是本地的版本，需要push到github上，就是同步到github上
![这里写图片描述](http://img.blog.csdn.net/20170224185234305?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3Vuc2hpbmU5NDAzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

之后再push，也可以点击上方的VSC-git-push

附文件颜色代表的含义：
红色：本地新增文件，没有关联到git，ctrl + k 提交不到git；

绿色：由红色add to 转变而成，ctrl + k 可以提交的新增文件；

蓝色：文件内容有修改；

灰色：本地删除的文件（待删除的文件，远程没删）ctrl + k ,ctrl + shift + k 提交就没了。

总结一下就是先share到github（在github上创建仓库）→将文件add到缓存区→commit发布版本→push到github（同步到github上）；

这些步骤可以再上方的VCS完成也可以在左侧的包管理器右键

在右下角还可以口管理分支

附上查找的资料，他们写的比较详细，我就不再赘述
 - [利用WebStorm来管理你的Github](http://www.cnblogs.com/liulinjie/p/5708149.html)
 - [git checkout 命令详解](http://www.tuicool.com/articles/A3Mn6f)
 - [webstormGit上的使用](http://www.cnblogs.com/zhaoxiu/p/5772466.html)
 - [使用webstorm操作git](http://www.cnblogs.com/jinguangguo/p/4868152.html)
 - [使用webstorm上传代码到github](http://www.cnblogs.com/vanstrict/p/5677716.html)
