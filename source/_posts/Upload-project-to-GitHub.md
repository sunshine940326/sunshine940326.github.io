---
title: 【git】将项目上传至 github
date: 2017-02-25 17:35:35
tags: git 
categories: git
---
概括的说明什么是git和github，以及怎么上传你的项目到github。主要说明在使用github时遇到的问题
<!--more-->

什么是git：
-------

之前我使用过svn进行和队友合作开发项目，觉得svn是一个很好的工具，可以避免代码冲突，解决团队代码的同步问题，svn是集中式的版本控制系统，而git是分布式的版本控制系统
有人拿git和svn比较，我觉得git更偏向于版本控制，就是自己对自己的代码进行控制，有了版本的概念和回滚，即使不是变成人员也可以使用，比如作家可以管理自己的作品。

关于git怎么使用的，百度可以搜出来一大堆，这里就不再赘述了，推荐廖雪峰老师的教程[Git教程 - 廖雪峰的官方网站](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/)


对github的初步认识
---------
因为现在使用github还不是特别熟练，只指出最基本的，
github是做什么的，github不仅仅是程序员可以使用的，在知乎上看完之后仿佛开启了新世界的大门[怎么使用Github](https://www.zhihu.com/question/20070065)

我现在的使用有两个方面：
 1. 使用gitPage+hexo创建自己的博客，不过我发现如果单纯的以内容为主，在github上建一个仓库其实就是可以的，完全可以达到记录的目的，但谁让咱们是技术工作者呢，为了逼格更高一些，也为了运用更多的技术（前端工作者，有一个自己的网站可以把技术用上何乐而不为呢）
 但是现阶段我还没有完全搞明白gitpage+hexo创建博客的原理，所以这个工程就一直停滞不前，先挖一个坑┗|｀O′|┛ 嗷~~
 2. 第二个使用github是将自己平时做的demo和小项目做一个备份，相当于自己的在线作品库
 3. 当然，github最出名的功能还是版本控制，但是目前还没有领略其精髓，再挖一个坑，嘤嘤嘤~
 4. 和海内外同胞共享资源，

使用github遇到的问题，ssh秘钥变为灰色
----------------
先来说一个我遇到的问题，不知道你们有没有遇到，因为不经常上github，所以有的时候我的ssh都会变成灰色的，这样本地就连接不上github，于是找到了解决方法：因为没有设置用户名和邮箱，解决方法如下：
“Git”->“Git Bash”，输入

```
$ git config --global user.name "Your Name"
$ git config --global user.email email@example.com
$ ssh -T Git@github.com
```

git config命令的–global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。


执行完最后一步的时候，刷新github的setting页面，就可以看见ssh中的钥匙变成绿色的

但是在最后一步的时候报错了

```
ssh: connect to host github.com port 22: Connection timed out
```
解决方法是
在存放公钥私钥(id_rsa和id_rsa.pub)的文件里，新建config文本，内容如下：

```
Host github.com
User YourEmail@163.com
Hostname ssh.github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
Port 443
```
YourEmail为您的邮箱
再次执行“ssh -T git@github.com”时，会出现提示如下，回车”yes”即可。 
![这里写图片描述](http://img.blog.csdn.net/20160113200605078)

这时验证就可以通过。 


将你的项目托管至github的方式
---------------
这里要说一下的是，最开始我认为github只是用来对代码进行版本控制的工具，不知道要怎么用，现在大概总结了三种在github上建仓库的方式：
 1. 网页版的github网页
 2. 客户端版本的github,windows版本的github客户端很多都安装不了，在官网下载数次都未安装成功，最后在知乎上终于找到安装包，链接: http://pan.baidu.com/s/1eS2mHxS 密码: yatq ，有需要的同学可以点击下载。
 3. 我最喜欢的方式，通过webstorm跟github连接，就可以写完代码直接push，相当之方便，方法不是很难，大家自行百度

首先要新建一个项目，然后有三种上传项目的方式：

 1. …or create a new repository on the command line  新建一个项目

```
echo "# 2017-02-23" >> README.md     新建一个README.md文件并在里面写入 2017-02-23
git init                             初始化一个git的本地仓库，这时会生成一个.git的隐藏文件
git add README.md                    用命令git add告诉Git，把文件添加到仓库(实际上就是把文件修改添加到暂存区)
git commit -m "first commit"         用命令git commit告诉Git，把文件提交到仓库(实际上就是把暂存区的所有内容提交到当前分支)（git commit -m "有意义的附加说明"）
git remote add origin https://github.com/sunshine940326/2017-02-23node1.git   将本地仓库与远程建立联系
git push -u origin master            提交给远程的github .需要说明的是首次提交需要 加-u ,再次提交不需要加-u 即写成git push  origin master
```
 2. …or push an existing repository from the command line  通过命令行提交一个已有的项目

```
git remote add origin https://github.com/sunshine940326/2017-02-23node1.git
git push -u origin master
```
 3. …or import code from another repository   从其他项目引入

```
You can initialize this repository with code from a Subversion, Mercurial, or TFS project.
```

这里先埋一个坑，在第一种方法进行到git remote add origin这一步的时候一直报错Failed connect to    github.com:443 显示超时
网上的解决方法没有看懂，先贴出来：[git遇到的诡异错误: Failed connect to github.com:443](http://blog.csdn.net/u011249920/article/details/55190409)

总结一下用命令行提交项目的步骤（已经init过了）：
 1. git add 将要同步的文件add到暂存区 add后面可以直接跟文件名或文件夹名，也可以直接跟 .表示全部（add和.之间有空格）
 2. git commit -m "first commit"
 3. push origin master
 
 可以使用git status查看文件状态
