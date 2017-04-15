---
title: Git使用中的报错情况
date: 2017-03-11 23:54:11
tags: [git,实战经验] 
categories: git
description: [git,git实战,git报错]
---
在Git的使用过程中，难免会有这样那样的错误，对于刚开始使用git的小白来说，来记录一下使用过程中报错情况以及怎么处理的
<!--more-->

#　`git pull`时报错
```
$ git pull
remote: Counting objects: 100, done.
remote: Compressing objects: 100% (57/57), done.
remote: Total 60 (delta 36), reused 3 (delta 0)
Unpacking objects: 100% (60/60), done.
From 180.166.124.26:/var/git/fzc
   d8ec768..7c13661  master     -> origin/master
Updating d8ec768..7c13661
error: Your local changes to the following files would be overwritten by merge:
        protected/modules/m/views/detail/house.php
        protected/modules/m/views/list/house.php
        protected/modules/web/views/default/list.php
        protected/modules/web/views/detail/house.php
        protected/modules/web/views/list/house.php
        static_src/web/js/houseList/nprogress.js
        static_src/web/js/list/nprogress.js
Please commit your changes or stash them before you can merge.
error: The following untracked working tree files would be overwritten by merge:
        static_dist/web/js/houseList/houseList-min-50ae65dad4.js
        static_dist/web/js/list/list-min-dd27ec4ef4.js
Please move or remove them before you can merge.
Aborting

```
大意就是说你修改的文件在之前的commit中没有提交，远端的文件和本地的文件冲突
解决方法
1. 昨天遇到这个问题的时候是本地修改的文件不需要提交了，直接放弃就可以了，
 ```
 $ git checkout --filename
 ```
 然后远端的文件就覆盖了你的本地文件，然后在`git pull`,之后就可以`git add`、`git commit`、`git push`三部曲了
 
 2. 还可以保存本地的状态
 `git stash`
然后再
`git pull  origin master`
但是提示我`No local changes to save`

然后我再pull的时候提示我
```
$ git pull
Updating d8ec768..7c13661
error: The following untracked working tree files would be overwritten by merge:
        static_dist/web/js/houseList/houseList-min-50ae65dad4.js
        static_dist/web/js/list/list-min-dd27ec4ef4.js
Please move or remove them before you can merge.
Aborting


```
然后我想放弃这两个文件就报错了
```
$ git checkout  static_dist/web/js/houseList/houseList-min-50ae65dad4.js
error: pathspec 'static_dist/web/js/houseList/houseList-min-50ae65dad4.js' did not match any fi         le(s) known to git.

```
3. 所以我请来了我们的phper，他说可以直接提交 = =
先是查看一下现在的状态
```
$ git status
On branch master
Your branch is behind 'origin/master' by 3 commits, and can be fast-forwarded.
  (use "git pull" to update your local branch)
Untracked files:
  (use "git add <file>..." to include in what will be committed)

        static_dist/m/css/about/about-min-e5159328af.css
        static_dist/m/css/authentication/authentication-min-2315b81179.css
        static_dist/m/css/defaultIndex/defaultIndex-min-ecc8a57574.css
        static_dist/m/css/defaultList/defaultList-min-df3ee5323b.css
        static_dist/m/css/detailHouse/detailHouse-min-8f6835d719.css
        static_dist/m/css/detailIndex/detailIndex-min-24e3587ee2.css
        static_dist/m/css/detailOrder/detailOrder-min-ffa8b47793.css
        static_dist/m/css/listHouse/listHouse-min-53c056c915.css
        static_dist/m/css/payIndex/payIndex-min-78a3d6e471.css
        static_dist/m/css/publicMain/publicMain-min-243df56309.css
        static_dist/m/css/userDetail/userDetail-min-bf3f5d072e.css
        static_dist/m/css/userIndex/userIndex-min-7898459c71.css
        static_dist/m/css/userLogin_reg/userLogin_reg-min-718b2d35d8.css
        static_dist/m/css/userOrder/userOrder-min-5f18d80c90.css
        static_dist/m/css/userProject/userProject-min-fcc2e92ff7.css
        static_dist/web/css/bankguide/bankguide-min-eb72d15494.css
        static_dist/web/css/defaultIndex/defaultIndex-min-ccc49d9d39.css
        static_dist/web/css/detail/detail-min-714ac29c22.css
        static_dist/web/css/houseDetail/houseDetail-min-ea5da2d35e.css
        static_dist/web/css/houseList/houseList-min-5ad0e311df.css
        static_dist/web/css/list/list-min-7b339899d6.css
        static_dist/web/css/publicMain/publicMain-min-51e7cfd8d2.css
        static_dist/web/js/houseList/houseList-min-50ae65dad4.js
        static_dist/web/js/list/list-min-dd27ec4ef4.js

nothing added to commit but untracked files present (use "git add" to track)

```
然后确认这些文件都不需要了，在checkout一遍
```
$ git checkout .

```
然后在发布三部曲
