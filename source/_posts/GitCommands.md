---
title: Git常用命令&完成一个小工作流
date: 2017-03-15 22:32:30
tags: git 
categories: git
description: [git常用命令,git使用技巧,git实战]
---
本篇长期更新，记录一些常用的git命令和使用git团队合作的命令

<!--more-->
# git的工作步骤
1. 修改文件的工作目录
2. 将这些文件添加到暂存区
3. 执行commit操作，发布版本
4. push将发布的版本推送到git仓库

# git常见术语
## commit
提交持有的库的当前状态，每个提交的对象有父commit对象的指针。从给定的commit可以遍历寻找父指针，查看历史记录的提交。

## branches
分支用来创建另一条线的发展，默认情况下，git的主分支，是master分支，和上线的版本是一样的，平时要工作的新功能创建一个分支，功能完成之后，它被合并回master分支，每当做出一个commit，HEAD更新为最新提交

## tags
git中的tag指向一次commit的id。通常用来给开发做版本号。

### 打标签
```
git tag -a v1.01 -m "Relase version 1.01"
```

`git tags `是打标签的命令，`-a`是添加标签，其后要跟新标签号，-m及后面的字符串是对该标签的注释

### 提交标签到远端仓库
```
git push origin -tags
```

就像git push origin master 把本地修改提交到远程仓库一样，-tags可以把本地的打的标签全部提交到远程仓库。

### 删除标签
```
git tag -d v1.01
```
`-d`表示删除，后面跟版本号

### 删除远程标签

```
git push origin :refs/tags/v1.01
```
### 查看标签
`git tag`
或者
`git tag -l`

# clone
克隆操作不仅仅是检出的工作拷贝，也反映了完整的信息

# pull
pull操作是用于两个存储库实例之间的同步

# push
将本地仓库中的文件同步到远端库中

# head
HEAD指针总是指向分支的最新提交，每当你做了一个提交。HEAD更新为最新提交,HEAD树枝存储在.git/refs/heads/中

# git常用命令

```
初始化新版本库：git init
全局设置：git config   --global user.name "xzavier"  git config --global user.email "xzavier.xxx.com"
克隆版本库：git clone "url"
查看分支：git branch
创建分支：git branch branch_nema
切换分支：git checkout branch_name
创建+切换分支：git checkout -b branch_name
合并某分支到当前分支：git merge branch_name
重命名分支：git branch -m branch_name branch_new_name //不会覆盖已经存在的分支
重命名分支：git branch -M branch_name branch_new_name //会覆盖已经存在的分支
删除分支：git branch -d branch_name 
强制删除分支： git branch -D branch_name
删除远程分支： git push origin : branch_name //可以使用这种语法，推送一个空分支到远程分支，其实就相当于删除远程分支
拉取代码：git pull orgin branch_name
查看更改：git status
查看更改细节：git diff file_name
查看谁修改过代码：git blame filename
回到上次修改：git reset --hard
添加单个文件：git add filename.js
添加所有js文件：git add *.js
添加所有文件：git add .
提交添加的文件：git commit -m "your description about this branch"
提交单个文件：git commit -m "your description about this branch" filename.js
push分支：git push orgin your_branch_name
备份当前分支内容：git stash
查看历史记录：git log
创建标签：git tag 1.0.0  //标签无法重命名
显示标签列表：git tag
切出标签：git checkout 1.0.0
删除标签：git tag -d 1.0.0
查看git远程地址：git remote -v
更改远程git地址：git remote set -url origin https://github.com/USERNAME/OTHERREPOSITORY.git  ; git remote set-url origin git@github.com:USERNAME/OTHERREPOSITORY.git

```

# git+gulp小工作流
早上上班的时候切换到master分支，拉一下代码
```
git pull origin master

```
开始写代码，新建一个分支
```
git checkout -b branch_name

```
正在码代码的时候，如果其他分支有需要处理的bug，先将当前状态保存一下：
```
git stash
```
切换到别的分支修改代码：
```
git checkout -b branch_name

```
修复bug后提交代码查看修改：
```
git status
```
需要查看修改的细节：
```
git diff file_name
```
没有问题就提交：
```
git add .
git commit "your description"
git push orgin your_branch_name
```

解决完bug切换到原来的分支
```
git checkout -b you_old_branch
```
恢复刚刚保存的内容：
```
git stash   //备份当前的工作区的内容，保存到git栈

git stash pop  //从git栈中读取最近一次保存的内容，恢复工作区的相关内容，由于会存在多个stash内容，所以用栈来保存，pop出最近一个stash中读取的内容并恢复
git stash list //显示git栈内所有的备份，可以利用这个列表来决定从哪个地方恢复
git stash clear //清空git栈，此时使用git等图形化工具会发现，原来stash的那些节点都消失了
```

恢复代码之后又可以开始码代码了，代码写完之后，提交三部曲：
```
git add .
git commit "your description"
git push orgin your_branch_name
```

最后合并到master，多个队员一起开发，一般合并master时会遇到冲突，这是需要解决冲突，冲突一般是多个开发人员修改同一处代码造成的，拉取master代码（队友也没有合并master就商量好拉他的代码，最后解决完冲突只把你这个分支提交就好了）
```
git pull orgin master

```
或者
```
git pull orgin his/her_branch_name
```


用gulp构建工具
在修改bug的时候将环境调成本地环境
`protected`<`config`<`dev.php`下的`#当前环境  'env' => ''`
`env`为空为上线环境，`env`为`dev`为本地环境

先把env改成dev 然后改你要改的 改完在gitbash里执行以下gulp build 然后把env改成空 这时候引用的是构建好的线上环境代码 再本地看一下没问题了 再提交

然后查看完线上环境没有问题了可以进行`gulp build`，可能会报错

```
Error: ENOENT: no such file or directory, open 'C:\xampp\htdocs\fzc\static_tmp\rev\images\web\rev-manifest.json'
    at Error (native)
```
这是要clean一下，`gulp clean:temp`
然后在`gulp build`
之后就可以git三件套了


摘自：[前端资源系列（1）-Git常用命令&设置快捷命令&小工作流](https://segmentfault.com/a/1190000005945614)


