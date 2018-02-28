---
title: 2018 前端性能优化清单
date: 2018-02-28 13:24:51
tags: [性能,调试,翻译] 
categories: [翻译]
top: 9
---
![](https://user-gold-cdn.xitu.io/2018/2/28/161dba201c0a6499?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1)

前言：这篇文章我在掘金翻译计划中跟着一起翻译的文章（感谢掘金翻译），我翻译了第三部分，然后校对了第二部分，这篇文章对于前端性能优化的技术还是比较新颖和全面的，所以决定自己阅读一遍英文原文，然后又用思维导图整理了下重点，英文原文还是挺长的，所以
- 如果想要**粗略**的了解本文内容的可以直接查看我总结的思维导图
- 如果看完思维导图**觉得本文对你有所帮助的**，可以查看我自己翻译并根据其他人翻译整理后的文章
- 如果你**英文阅读没有障碍**，并且**觉得我翻译不好的**，可以直接阅读 [英文原文](https://www.smashingmagazine.com/2018/01/front-end-performance-checklist-2018-pdf-pages/)


**推荐大家时间充裕的话可以自己阅读英文原文，此文是根据掘金翻译的四篇文章 +  [其他的翻译文章](https://w3ctech.com/topic/2089) + 自己翻译修改得出的。因为翻译大家懂得，会有一些错误的地方，欢迎大家指出，本人不保证翻译没有错误，但已经尽力去翻译了，所以欢迎大家直接阅读英文原文！！欢迎大家直接阅读英文原文！！欢迎大家直接阅读英文原文！！**

<!--more-->
![2018 前端性能优化清单思维导图](https://user-gold-cdn.xitu.io/2018/2/28/161db9df64a2f3c1?w=1490&h=3002&f=png&s=709772)

我们都知道性能很重要，但是，我们是否真的一直都知道我们性能优化的瓶颈在哪？是代价昂贵的 JavaScript？是 web 字体很慢？还是比较大的图片？或者是渲染速度过于迟缓？tree-shaking（无用代码移除）、scope hoisting（作用域提升）、code-splitting（按需加载）、 intersection observer 以及 clients hints、CSS containment、HTTP/2 和 service workers 这些技术都是有利于性能优化的。并且，最重要的是，**我们要从哪里开始提升我们的性能呢**？并且要怎么建立长久有效的性能机制。


译者注：
- `tree-shaking`：`tree-shaking` 是 Webpack 2 引入的新功能，`tree-shaking` 是无用代码移除（DCE, dead code elimination）的一个方法，但和传统的方法不太一样。`tree-shaking` 找到需要的代码，灌入最终的结果；传统 DCE 找到执行不到的代码，从 AST 里清除。—— [如何评价 Webpack 2 新引入的 Tree-shaking 代码优化技术？](https://www.zhihu.com/question/41922432)
- `scope hoisting`：`scope hoisting` 是 Webpack 3 的新功能，又译作“作用域提升”。Webpack 将所有模块都用函数包裹起来，然后自己实现了一套模块加载、执行与缓存的功能，使用这样的结构是为了更容易实现 Code Splitting（包括按需加载）、模块热替换等功能。—— [Webpack 3 的新功能：Scope Hoisting](https://zhuanlan.zhihu.com/p/27980441)
- `code-splitting`：对于大型的 web 应用而言，把所有的代码放到一个文件的做法效率很差，特别是在加载了一些只有在特定环境下才会使用到的阻塞的代码的时候。Webpack有个功能会把你的代码分离成Chunk，后者可以按需加载。这个功能就是`code-splitting`。—— [在Webpack中使用Code Splitting实现按需加载](http://www.alloyteam.com/2016/02/code-split-by-routes/)
- `intersection observer`：可以自动"观察"元素是否可见，由于可见（visible）的本质是，目标元素与视口产生一个交叉区，所以这个 API 叫做"交叉观察器"。—— [IntersectionObserver API 使用教程](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)
- `clients hints`：自动响应式图片 —— [Automatic responsive images with Client Hints](https://cloudinary.com/blog/automatic_responsive_images_with_client_hints)
- `CSS containment`：新的 CSS 属性 Containment 允许开发者限制浏览器样式、布局和 paint 工作的范围。—— [CSS Containment in Chrome 52](https://developers.google.com/web/updates/2016/06/css-containment)
- `service workers`：实现离线页面 ——[Service worker concepts and usage](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)


在以前，性能优化经常是在项目完成才去考虑的，经常被推迟到项目的末期，这样优化的范围就会缩小，优化的内容通常是优化静态文件和调整一些服务器配置文件。但是现在，性能优化发生了很大的改变，这些是远远不够的。

性能不仅仅是一个技术问题：重要的是，当将它放入工作流中的时候，做出的设计决策必须受性能的提示。**性能必须被测量、监测和完善**，而网络日益增长的复杂性也使得跟踪性能的度量原来越难，因为度量会根据设备、浏览器、协议、网络类型和延迟而显着变化（CDN，ISP，缓存，代理，防火墙，负载均衡器和服务器都在性能上发挥作用）。

所以，我们就必须时刻记住性能优化 —— 从项目开始的时候直到网站最后发布。所以我们就创建了一个性能优化列表。（希望是公正的和客观的）2018 前端性能检查表 —— 可以帮助你解决你网站的优化问题，例如，响应时间如何更快，流畅的用户交互和不会流失用户的带宽。

（你也可以仅下载 2018 前端性能优化清单 的 [PDF 版本]((https://www.dropbox.com/s/8h9lo8ee65oo9y1/front-end-performance-checklist-2018.pdf?dl=0))（0.129 MB）或者下载 [Apple Pages 版本](https://www.dropbox.com/s/yjedzbyj32gzd9g/performance-checklist-1.1.pages?dl=0)（0.236 MB））

### 准备就绪：计划和度量
微小的优化对于保持性能也是十分重要的，但是时刻记着我们必须要有一个明确的目标，可度量的目标将影响整个过程中的任何决策。这里有几种不同的模式，并且下面的方法都是从自身角度出发，所以你要尽早确认你自己优化的优先级。

1. 树立性能优化意识

在很多团队中，前端开发者确切的知道常见的潜在问题是什么，应该用什么样的加载模块来修复。然而，只要开发或者设计那边有一方跟市场的意见不合，性能就不会长时间持续下去。所以，研究用户常见的抱怨的地方，看看提高性能如何帮助解决这些常见问题。

无论是在移动设备上还是在桌面上都需要运行性能实验并测量结果。 它会建立一个用真实数据为你们公司量身定制的案例研究。此外，要善于使用 [WPO Stats](https://wpostats.com/) 上发布的案例研究和实验中的数据，可以帮助提高你对性能和业务之前潜在关系的认识，以及性能对用户体验和业务度量的影响。仅仅说明绩效是不够的 - 你还需要建立一些可衡量和可追踪的目标来观察性能。
 
2. 目标：至少要比你最快的竞争对手还快 20%

根据 [心理学研究](https://www.smashingmagazine.com/2015/09/why-performance-matters-the-perception-of-time/#the-need-for-performance-optimization-the-20-rule)，如果你想要用户感觉你的网站比你竞争者的网站快，那么你至少需要比它们快 20%。研究你的主要竞争者，收集他们在手机和桌面上的性能，并且设置一个你能超过他们的临界值。要获取准确的结果和目标，首先要研究你的分析结果，看看你的用户都在做什么。你可以模拟第百分之九十的用户经验进行测试，收集数据，然后建立一个 [表格](http://v3.danielmall.com/articles/how-to-make-a-performance-budget/)，然后再减去 20% 就是你的目标（即 [性能预算](http://bradfrost.com/blog/post/performance-budget-builder/)）。现在你在测试之前就有了一些可度量的数据。

如果你比较在意预算并尝试去用最小的脚本来获得最快的交互时间，那么你就开始了你的“前端优化之旅”。Lara Hogan 关于如何使用性能预算来处理设计的 [指南](http://designingforperformance.com/weighing-aesthetics-and-performance/#approach-new-designs-with-a-performance-budget) 可以为设计人员提供有用的指引，而 [性能预算计算器](http://www.performancebudget.io/) 和 [Browser Calories ](https://browserdiet.com/calories/) 里都可以帮助创建预算（感谢 [Karolina Szczur](https://medium.com/@fox/talk-the-state-of-the-web-3e12f8e413b3) 提供）。


![ [Brad Frost 构建的性能预算](http://bradfrost.com/blog/post/performance-budget-builder/)](https://user-gold-cdn.xitu.io/2018/2/28/161db9ea3537c803?w=2000&h=1137&f=jpeg&s=53251)

除了性能外，还要考虑对你业务最有利的客户的行为。 设置和讨论**关键行动的可接受时间阈值**，并设置一个整个团队已经达成一致的 “UX ready”用户时间标记。 大部分情况下，用户的行为涉及许多不同部门，因此，按照设置的可接受的时间安排会避免很多问题。确保额外的资源和功能的额外成本其他成员都是可见和知晓的。

此外，正如 Patrick Meenan 所建议的那样，**最好在设计的过程中设置一个加载队列并且要知道这些顺序会存在哪些利弊**。你需要优先处理更重要的优先级，并且定义一个它们优先级的顺序，你也应该清楚哪些是可以推迟的。理想的情况，该队列也应该反映出 JS 和 CSS 的加载顺序，只要设计好了，那么在构建过程中处理它们就会很简单了。另外，还需要考虑的是在页面还在加载时页面的“中间状态”（例如，当 web 字体没有加载完时）。

计划计划计划，重要的事情说三遍！如果早期进行优化那么会很容易实现目标，但是没有计划或者没有制定切合实际的、为公司量身定制的业绩目标那么就很难保持性能。

3. 选择正确的度量

[不是所有的度量都一样重要](https://speedcurve.com/blog/rendering-metrics/)。 研究哪些度量对于你的应用程序最重要：通常，这与你能够以多快的速度开始渲染**最重要**的像素（以及它们的效果）以及如何为这些渲染像素提供输入最快的响应速度有关。 这可以帮助你为后续的工作提供最佳的优化结果。 不管怎样，不要专注于整个页面加载时间（例如 `onLoad` 和 `DOMContentLoaded` 时间），而是要优先按照用户可以感知到的页面加载。 也就是说要关注一组稍微不同的度量。 


<iframe src="https://player.vimeo.com/video/249524245" width="640" height="358" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>





[首次有内容渲染，视觉完整和可交互时间之间的区别](https://docs.google.com/presentation/d/1D4foHkE0VQdhcA5_hiesl8JhEGeTDRrQR4gipfJ8z7Y/present?slide=id.g21f3ab9dd6_0_33)。来自于：[@denar90](https://docs.google.com/presentation/d/1D4foHkE0VQdhcA5_hiesl8JhEGeTDRrQR4gipfJ8z7Y/present?slide=id.g21f3ab9dd6_0_33)

你可以参考下面这样度量：

* **首次有效渲染**（FMP，是指主要内容出现在页面上所需的时间），
* **[重要渲染时间](https://speedcurve.com/blog/web-performance-monitoring-hero-times/)**（页面最重要部分渲染完成所需的时间），
* **可交互时间**（TTI，是指页面布局已经稳定，关键的页面字体已经可见，主进程可以足够的处理用户的输入 —— 基本的时间标记是，用户可以在 UI 上进行点击和交互），
* **输入响应**，接口响应用户操作所需的时间，
* **Speed Index**，测量填充页面内容的速度。 分数越低越好，
* [自定义度量](https://speedcurve.com/blog/user-timing-and-custom-metrics/)，由你的业务需求和用户体验来决定。

Steve Souders 对 [每个度量都进行了详细的解释](https://speedcurve.com/blog/rendering-metrics/)。在许多情况下，根据你的应用程序的使用场景，[可交互时间和输入响应](https://medium.com/netflix-techblog/crafting-a-high-performance-tv-user-interface-using-react-3350e5a6ad3b) 会是最关键的。但这些度量可能会不同：例如，对于 Netflix 电视的用户界面来说，关键输入响应、内存使用和可交互时间更为重要。

4. **从具有代表性的用户使用的设备收集数据**

为了收集准确的数据，我们需要尽可能全的选择要测试的设备。最好是 Moto G4，或者一款中档的三星设备又或者是一个 Nexus 5X 这样的普通的设备。如果你手边没有设备，可以使用节流 CPU（5× 减速）来限制网速（例如，150 ms 的往返时延，1.5 Mbps 以下和0.7 Mbps 以上）实现在桌面设备上模拟移动设备的体验。最终，切换到常规的 3G，4G 和 Wi-Fi。为了使性能体验的影响更明显，你甚至可以使用 [2G ](https://www.theverge.com/2015/10/28/9625062/facebook-2g-tuesdays-slow-internet-developing-world) 或 [一个节流的 3G 网络](https://twitter.com/thommaskelly/status/938127039403610112)，以便进行更快的测试。

[![因为周二是一周中最慢的一天。Facebook推出了[2G Tuesdays](https://www.theverge.com/2015/10/28/9625062/facebook-2g-tuesdays-slow-internet-developing-world)，以提高对低速连接的能见度和灵敏度。（[图片来源](http://www.businessinsider.com/facebook-2g-tuesdays-to-slow-employee-internet-speeds-down-2015-10?IR=T)）](https://user-gold-cdn.xitu.io/2018/2/28/161db9ea4540fb71?w=400&h=400&f=png&s=4116)](https://www.theverge.com/2015/10/28/9625062/facebook-2g-tuesdays-slow-internet-developing-world)

幸运的是，有很多优秀的选项可以帮助你自动收集数据，并根据这些度量衡量你的网站在一段时间内的性能。 请记住，良好的性能度量是需要被动和主动监控工具的组合：


* **被动监测工具，**可以根据请求来模拟用户交互（**综合测试**，如**Lighthouse**，**WebPageTest**）
* **主动监测工具，** 是那些不断记录和评价用户交互行为的（**真正的用户监控**，如 **SpeedCurve**，**New Relic**  ——   这两种工具也提供综合测试）

前者在开发过程中特别有用，因为它可以在使用产品时持续跟踪。 后者在长期维护非常有用，因为它可以帮助你了解在实际访问站点时发生的性能瓶颈。通过使用导航定时、资源定时、绘图定时、长时间任务等内置的 RUM API，被动和主动性能监视工具一起提供应用程序性能的完整画面。 例如，你可以使用[PWMetrics](https://github.com/paulirish/pwmetrics)，[Calibre](https://calibreapp.com)，[SpeedCurve](https://speedcurve.com/)，[mPulse](https://www.soasta.com/performance-monitoring/)，[Boomerang](https://github.com/yahoo/boomerang) 和 [Sitespeed.io](https://www-origin.sitespeed.io/)，这些都是性能监测工具的绝佳选择。

注意：选择浏览器外部的网络级别的限制器总是比较安全的，例如 DevTools 由于实现的方式而存在与 HTTP/2 推送交互的问题（感谢Yoav！）。

[![[Lighthouse](https://developers.google.com/web/tools/lighthouse/)一个集成在 DevTools 的性能检测工具。
](https://user-gold-cdn.xitu.io/2018/2/28/161db9ea352b6e75?w=400&h=274&f=png&s=23160)](https://developers.google.com/web/tools/lighthouse/)

5. **与你的同事分享性能清单**

为了避免误解，要确保你团队里的每个同事都对清单很熟悉。每个决策都对性能有影响。项目将极大地受益于前端开发人员正确地将性能价值传达给整个团队。从而使每个人都对它负责，而不仅仅是前端开发人员。根据绩效预算和清单中定义的优先顺序来设计决策。

[![[RAIL](https://developers.google.com/web/fundamentals/performance/rail)，以用户为中心的性能模型。](https://user-gold-cdn.xitu.io/2018/2/28/161db9ea489e8e90?w=400&h=145&f=png&s=3686)](https://developers.google.com/web/fundamentals/performance/rail)

### 制定现实的目标
6. **控制响应时间在 100ms 内，控制帧速在 60 帧/秒**

为了让交互感觉起来很顺畅，接口有 100ms 来响应用户的输入。任何比它长的时间，用户都会认为该应用程序很慢。[RAIL，一个以用户为中心的性能模型](https://www.smashingmagazine.com/2015/10/rail-user-centric-model-performance/)会为你提供健壮的目标。为了让页面达到小于 100ms 的响应，页面必须要在小于 50ms 前最迟将控制权返回给主线程。[预计输入延迟时间](https://developers.google.com/web/tools/lighthouse/audits/estimated-input-latency) 告诉我们，如果我们能达到这个门槛，在理想情况下，它应该低于 50ms。对于像动画这样性能消耗比较大的地方，最好的做法是，在能够优化的地方，尽量优化到极致；在不能优化的地方，让性能开销降至最低。

同时，每一帧动画应该要在 16 毫秒内完成，从而达到 60 帧每秒（1秒 ÷ 60 = 16.6 毫秒） —— 最好可以在 10 毫秒完成。因为浏览器需要时间将新框架绘制到屏幕上，你的代码应该在触发 16.6 毫秒以内完成。[保持乐观](https://www.smashingmagazine.com/2016/11/true-lies-of-optimistic-user-interfaces/)和明智地利用空闲时间。显然，这些目标适用于运行时的性能，而不是加载性能。

7. **速度指标(SpeedIndex) < 1250，3G 上交互时间 < 5s，关键文件大小 < 170Kb（SpeedIndex < 1250, TTI < 5s on 3G, Critical file size budget < 170Kb）**

虽然这可能很难实现，一个好的最终目标是首次有效渲染低于 1 秒并且[速度指标](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index)的值低于 1250。因为我们是以 200 美金为基准的 Android 手机（如 Moto G4）和一个缓慢的 3G 网络上，模拟 400ms 的往返延时和 400kb 的传输速度，所以我们的目标是[可交互时间低于 5s](https://www.youtube.com/watch?v=_srJ7eHS3IM&feature=youtu.be&t=6m21s)，并且再次访问的时间低于 2s。

请注意，当谈到**可交互时间**时，最好来区分一下[首次交互和连续交互](https://calendar.perfplanet.com/2017/time-to-interactive-measuring-more-of-the-user-experience/)以避免对它们之间的误解。前者是在主要内容已经渲染出来后最早出现的点（窗口至少需要 5s，页面才开始响应）。后者是期望页面可以一直进行输入响应的点。

HTML 的前 14~15kb 加载是**是最关键的有效载荷块**  —— 也是第一次往返（这是在400 ms 往返延时下 1 秒内所得到的）预算中唯一可以交付的部分。一般来说，为了实现上述目标，我们必须在关键的文件大小内进行操作。[最高预算压缩之后 170 Kb](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)（0.8-1MB解压缩），它已经占用多达 1s （取决于资源类型）来解析和编译。稍微高于这个值是可以的，但是要尽可能地降低这些值。

尽管如此，还是可以提高绑定的规模预算。例如，你可以在浏览器主线程的活动中设置性能预算，例如，在开始渲染前的绘制时间或者[跟踪前端 CPU](https://calendar.perfplanet.com/2017/tracking-cpu-with-long-tasks-api/) 。像 [Calibre](https://calibreapp.com/)，[SpeedCurve](https://speedcurve.com/) 和 [Bundlesize](https://github.com/siddharthkp/bundlesize) 这些工具可以帮助你保持你的预算控制，并集成到你的构建过程。

[![[本来就很快的：现代化加载的最佳实践](https://speakerdeck.com/addyosmani/fast-by-default-modern-loading-best-practices) 来自 Addy Osmani（幻灯片 19）](https://user-gold-cdn.xitu.io/2018/2/28/161db9ea471840a1?w=400&h=224&f=png&s=9041)](https://speakerdeck.com/addyosmani/fast-by-default-modern-loading-best-practices)

### 定义环境
8. **做好构建工具的选型以及搭建好（适合自己的）构建工具**

[现如今不要太在意那些很酷的技术栈](https://24ways.org/2017/all-that-glisters/)。根据你的项目使用你的构建工具，无论是 Grunt，Gulp，Webpack，Parcel，还是工具间的组合。只要你能快速的得到结果，并且保证你的构建过程没问题。那么，你就可以选择该构建工具。

9. **渐进式增强**

安全的选择是将 [渐进式增强](https://www.aaron-gustafson.com/notebook/insert-clickbait-headline-about-progressive-enhancement-here/) 作为前端架构和项目部署的指导原则。首先设计和构建核心体验，然后为有能力的浏览器使用高级特性增强体验，创造 [弹性](https://www.aaron-gustafson.com/notebook/insert-clickbait-headline-about-progressive-enhancement-here/) 体验。如果你的网站是在一个网络不佳的并且有个糟糕的显示屏上糟糕的浏览器上运行，速度还很快的话，那么，当它运行在一个快速网络下快速的浏览器的机器上，它只会运行得更快。

10. **选择一个强大的性能基准**

有这么多未知因素影响加载 —— 网络、热保护、缓存回收、第三方脚本、解析器阻塞模式、磁盘的读写、IPC jank、插件安装、CPU、硬件和内存限制、L2/L3缓存、RTTS、图像、Web字体加载行为的差异 —— [JavaScript 的代价是最大的](https://youtu.be/_srJ7eHS3IM?t=3m2s)，web 字体阻塞默认渲染和图片的加载消耗了大量的内存。随着性能瓶颈从 [服务器端转移到客户端](https://calendar.perfplanet.com/2017/tracking-cpu-with-long-tasks-api/)，作为开发人员，我们必须更仔细地考虑所有这些未知因素。

在 170kb 的预算中，已经包括了关键路径的 HTML / CSS / JavaScript、路由器、状态管理、实用程序、框架和应用程序逻辑，我们必须彻底[检查网络传输成本，解析/编译时间和运行时间来选择我们的框架](https://www.twitter.com/kristoferbaxter/status/908144931125858304)。

[![[现代化加载的最佳实践](https://speakerdeck.com/addyosmani/fast-by-default-modern-loading-best-practices)来自 Addy Osmani(幻灯片18、19)。](https://user-gold-cdn.xitu.io/2018/2/28/161db9ea338362e7?w=400&h=225&f=png&s=5935)](https://speakerdeck.com/addyosmani/fast-by-default-modern-loading-best-practices)

正如 Seb Markbage 所 [指出的](https://twitter.com/sebmarkbage/status/829733454119989248)，测量框架的启动成本的好方法是首先渲染视图，再删除它，然后再渲染，因为它可以告诉你框架是如何扩展的。

第一次渲染倾向于预热一堆编译迟缓的代码，当它扩展时，更大的分支可以从中受益。第二次渲染基本上是仿效页面上的代码重用是如何随着页面复杂度的增长来影响性能特征。

[并不是每个项目都需要框架](https://twitter.com/jaffathecake/status/923805333268639744)。事实上，某些项目 [可以完全移除某些框架并从中受益](https://twitter.com/jaffathecake/status/925320026411950080)。一旦选择了一个框架，你最少会使用好几年。所以，如果你需要使用它，确保你的选择是经过[深思熟虑的](https://medium.com/@ZombieCodeKill/choosing-a-javascript-framework-535745d0ab90#.2op7rjakk) 并且 [对其完全了解](https://www.youtube.com/watch?v=6I_GwgoGm1w)。在进行选择前，至少要考虑总大小的成本 + 初始解析时间：轻量级的选项像 [Preact](https://github.com/developit/preact)，[Inferno](https://github.com/infernojs/inferno)，[Vue](https://vuejs.org/)，[Svelte](https://svelte.technology/) 或者 [Polymer](https://github.com/Polymer/polymer) 都做得很好。框架的大小基线将为你的应用程序代码定义约束条件。。

[![JavaScript 解析成本可能有很大差异。[现代化加载的最佳实践](https://speakerdeck.com/addyosmani/fast-by-default-modern-loading-best-practices) 来自Addy Osmani (幻灯片 10)。](https://user-gold-cdn.xitu.io/2018/2/28/161db9eaf5239ccc?w=400&h=224&f=png&s=9389)](https://speakerdeck.com/addyosmani/fast-by-default-modern-loading-best-practices)


请记住，在移动设备上，与台式计算机相比，预计速度会有 4-5 倍的下降。因为移动设备的 GPU、CPU、内存及电池特性都不同。在手机上的解析时间[比桌面设备的要高 36%](https://github.com/GoogleChromeLabs/discovery/issues/1)。所以总在一个最能代表普遍用户的[平均的设备上测试](https://www.webpagetest.org/easy-load)。

不同的框架将会对性能产生不同的影响，并且需要不同的优化策略。因此，你必须清楚地了解你所依赖的框架的所有细节。当创建一个 web 应用的时候，参考 [PRPL 模式](https://developers.google.com/web/fundamentals/performance/prpl-pattern/) 和 [应用程序 shell 体系结构](https://developers.google.com/web/updates/2015/11/app-shell)。这个想法很简单: 用最少的代码来将初始路由的交互快速呈现，然后使用 service worker 进行缓存和预缓存资源，然后使用懒加载异步加载所需的路由。

[![PRPL Pattern in the application shell architecture](https://user-gold-cdn.xitu.io/2018/2/28/161db9eb007722c6?w=400&h=216&f=png&s=5822)](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)

[PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/) 代表的是保持推送关键资源，渲染初始路由，预缓存剩余路由和延迟加载必要的剩余路由。

[![Application shell architecture](https://user-gold-cdn.xitu.io/2018/2/28/161db9eb044bb892?w=400&h=295&f=png&s=22708)](https://developers.google.com/web/updates/2015/11/app-shell)

[应用程序 shell](https://developers.google.com/web/updates/2015/11/app-shell) 是最小的 HTML、CSS 和 JavaScript 驱动的用户界面。


11. **你的项目需要使用 AMP 和 Instant Articles 么？**

译者注:AMP 即加速移动页面，是一种制作可快速加载的轻量型网页的方法，特别适合于移动设备。

依赖于你的组织优先级和战略，你可以考虑使用谷歌的 [AMP](https://www.ampproject.org/) 和 Facebook 的 [Instant Articles](https://instantarticles.fb.com/) 或者苹果的 [Apple News](https://www.apple.com/news/)。如果不使用它们，你也可以实现很好的性能，但是 AMP 确实提供了一个免费的内容分发网络（CDN）的性能框架，而 Instant Articles 将提高你在 Facebook 上的知名度和表现。

对于用户而言，这些技术主要的优势是确保性能，所以有时他们更喜欢 AMP-/Apple News/Instant Pages 链接，而不是“常规”和潜在的臃肿页面。对于那些以内容为主的网站，主要处理很多第三方法内容，这些选择极大地加速渲染的时间。

对于站长而言，这些样式在各个平台可发现性并且 [增强在搜索引擎中的可见性](https://ethanmarcotte.com/wrote/ampersand/)。你也可以重新使用 AMP 作为你的 PWA 数据源来构建[渐进的 Web AMPs](https://www.smashingmagazine.com/2016/12/progressive-web-amps/)。有什么缺点呢？显然，在一个有围墙的区域里，开发者可以创造并维持与内容分离的单独版本，防止 Instant Articles 和 Apple News [没有实际的URLs](https://www.w3.org/blog/TAG/2017/07/27/distributed-and-syndicated-content-whats-wrong-with-this-picture/)。（**谢谢，Addy，Jeremy**）

12. **合理使用 CDN**

根据你拥有的动态数据量，你可以将部分内容外包给[静态站点生成工具](https://www.smashingmagazine.com/2015/11/static-website-generators-jekyll-middleman-roots-hugo-review/) 如 Jekyll、Hexo 生成的静态文件，接着把静态文件推到 CDN  中，最后 CDN 只是提供静态文件的静态版本。所以这样就可以避免发起对数据库的读写请求。你甚至可以选择一个基于 CDN 的[静态主机平台](https://www.smashingmagazine.com/2015/11/modern-static-website-generators-next-big-thing/)，(这样就可以)通过给页面添加可交互组件的方式来丰富你的页面，并以此作为性能提升的标志 ([JAMStack](https://jamstack.org/))。

请注意，CDN 也是可以托管并卸载（offload）动态内容的，所以咱们没有必要把 CDN 的服务范围限定在静态资源。（另外需要你记住的是），不管你的 CDN 是否执行内容压缩（GZip）、内容转换、HTTP/2 传输以及 ESI（一种标记语言，可以用它把网页划分为单独的可缓存的实体）等操作，我们还是需要复核上述操作的，这是因为上述操作不仅会在 CDN 的 edge 处（服务器最接近用户的地方）聚合页面中的静态以及动态内容，也还会执行其它任务。

### 构建优化

13. **分清轻重缓急**

你应该知道优先处理什么。运行你所有静态资源（JavaScript、图片、字体、第三方脚本和页面中“昂贵的”模块，比如：轮播图、复杂的图表和多媒体内容），并将它们划分成组。

先搞清楚资源（assets）可以分为几类，大致可以分为：
- 针对传统的浏览器，定义基本的**核心**功能（比如：完全可访问的核心内容）
- 针对多功能浏览器**提升**功能（比如：丰富多彩的，完美的体验）
- 其他资源（不是绝对需要而且可以被延迟加载的资源，如 Web 字体、不必要的样式、旋转木马脚本、视频播放器、社交媒体按钮、大型图像）

我们在“[Improving Smashing Magazine's Performance](https://www.smashingmagazine.com/2014/09/improving-smashing-magazine-performance-case-study/)”上发布了一篇文章，上面详细描述了该方法。

14. **考虑使用“cutting-the-mustard”模式**

虽然这个技术已经很老了，但我们仍然可以使用 [cutting-the-mustard 技术](http://responsivenews.co.uk/post/18948466399/cutting-the-mustard) 使传统浏览器使用核心功能并增强对现代浏览器的体验。严格限制加载的资源：优先加载核心功能，然后是提升的，最后是其他的。注意：该技术可以从浏览器版本中推断出设备功能，而现在我们已经不再这样做了。

例如：在发展中国家，廉价的安卓手机主要运行 Chrome，他们的内存和 CPU 有限。[PRPL 模式](https://developers.google.com/web/fundamentals/performance/prpl-pattern/) 就是一个好的选择。最终，使用 [Device Memory Client Hints Header](https://github.com/w3c/device-memory)，我们就能够更可靠地识别出低端设备。现在，只有在 Blink 中才支持 header （Blink 支持[client hints](https://caniuse.com/#search=client%20hints)）。因为设备存储也有一个在 [Chrome 中可以调用的](https://developers.google.com/web/updates/2017/12/device-memory) JavaScript API，一种选择是基于 API 的特性检测，只在不支持的情况下回退到“符合标准”技术（**谢谢，Yoav！**）。

15. **减少解析JavaScript 的成本**

当我们处理单页面应用时，在你的页面渲染之前你需要初始化应用。寻找模块和技术加快初始化渲染时间（例如：[如何调试 React 性能](https://building.calibreapp.com/debugging-react-performance-with-react-16-and-chrome-devtools-c90698a522ad)，以及[如何提高 Angular 性能](https://www.youtube.com/watch?v=p9vT0W31ym8)），因为大多数性能问题来自于启动应用程序的初始解析时间。

[JavaScript 有成本](https://youtu.be/_srJ7eHS3IM?t=9m33s)，但不一定是文件大小影响性能。解析和执行时间的不同很大程度依赖设备的硬件。在一个普通的手机上（Moto G4），仅解析 1MB （未压缩的）的 JavaScript 大概需要 1.3-1.4 秒，会有 15 - 20% 的时间耗费在手机的解析上。在执行编译过程中，只是用在 JavaScript 准备平均需要 4 秒，在手机上页面展示其主要内容所需的时间（First Meaningful Paint）需要 11 秒。解释：在低端移动设备上，[解析和执行时间可以轻松提高 2 至 5 倍](https://medium.com/reloading/javascript-start-up-performance-69200f43b201)。

Ember 最近做了一个实验，使用[二进制模板（binary templates ）](https://emberjs.com/blog/2017/10/10/glimmer-progress-report.html#toc_binary-templates)巧妙的避免解析开销的方式。这些模板不需要解析。（**感谢，Leonardo！**）

这就是检查每个 JavaScript 依赖性的关键，像 [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)、[Source Map Explorer](https://github.com/danvk/source-map-explorer) 和 [Bundle Buddy](https://github.com/samccone/bundle-buddy) 这样的工具可以帮助你完成这些。[度量 JavaScript 解析和编译时间](https://medium.com/reloading/javascript-start-up-performance-69200f43b201#7557)。Etsy 的 [DeviceTiming](https://github.com/danielmendel/DeviceTiming)，一个小工具可以让你的 JavaScript 测量任何设备或浏览器上的解析和执行时间。重要的是，虽然文件的大小重要，但它不是最重要的。解析和编译时间并不是随着脚本大小增加而[线性增加](https://medium.com/reloading/javascript-start-up-performance-69200f43b201)。

<iframe src="https://player.vimeo.com/video/249525818" width="640" height="384" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>


[Webpack Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) visualizes JavaScript dependencies.



16. **你使用 ahead-of-time 编译器么？**

使用 [ahead-of-time 编译器](https://www.lucidchart.com/techblog/2016/09/26/improving-angular-2-load-times/) 来 [减轻从客户端](https://www.smashingmagazine.com/2016/03/server-side-rendering-react-node-express/) 到 [服务端的渲染](http://redux.js.org/docs/recipes/ServerRendering.html) 的开销，因此快速输出有用的结果。最后，考虑使用 [Optimize.js](https://github.com/nolanlawson/optimize-js) 通过包装可快速调用的函数来实现(在app初始时能够)快速载入（尽管，它[可能不需要](https://twitter.com/tverwaes/status/809788255243739136)）。

17. **你使用 tree-shaking、scope hoisting、code-splitting 么**

[Tree-shaking](https://medium.com/@roman01la/dead-code-elimination-and-tree-shaking-in-javascript-build-systems-fb8512c86edf) 是一种清理构建过程的方法通过只加载生产中实际使用的代码并清除 [在 Webpack 中](http://www.2ality.com/2015/12/webpack-tree-shaking.html) 未使用的 `import`。使用 Webpack 3 和 Rollup，我们还可以使用 [scope hoisting(作用域提升)](https://medium.com/webpack/brief-introduction-to-scope-hoisting-in-webpack-8435084c171f)，`scope hoisting` 允许工具检测哪些 `import` 可以被提升或者可以转换成一个内联函数。有了 Webpack 4，你现在可以使用 [JSON Tree Shaking](https://react-etc.net/entry/json-tree-shaking-lands-in-webpack-4-0)。[UnCSS](https://github.com/giakki/uncss) 或者 [Helium](https://github.com/geuis/helium-css) 可以帮助你去删除未使用 CSS 样式。

而且，你需要考虑 [如何编写有效的 CSS 选择器](http://csswizardry.com/2011/09/writing-efficient-css-selectors/) 以及 [如何避免编写臃肿和开销浪费的样式](https://benfrain.com/css-performance-revisited-selectors-bloat-expensive-styles/)。你也可以使用 Webpack 缩短类名和在编译时使用独立作用域来 [动态地重命名 CSS 类](https://medium.freecodecamp.org/reducing-css-bundle-size-70-by-cutting-the-class-names-and-using-scope-isolation-625440de600b)

[Code-splitting](https://webpack.github.io/docs/code-splitting.html) 是 Webpack 的另一个特性，可将你的代码分解为按需加载的“块”。并不是所有的 JavaScript 都是必须下载、解析和编译的。一旦你在代码中确定了分割点，Webpack 会处理这些依赖关系和输出文件。在应用发送请求的时候，这样基本上确保初始的下载足够小并且实现按需加载。另外，考虑使用 [preload-webpack-plugin](https://github.com/GoogleChromeLabs/preload-webpack-plugin) 获取代码拆分的路径，然后使用 `<link rel="preload">` or `<link rel="prefetch">` 提示浏览器预加载它们。

在哪里定义分离点？通过追踪哪些 CSS/JavaScript 块被使用和哪些没有被使用。Umar Hansa [解释了](https://vimeo.com/235431630#t=11m37s)你如何使用 Devtools 的 Code Coverage 来实现。

如果你没有使用 Webpack，那么相比于 Browserify 的输出结果， [Rollup](http://rollupjs.org/) 的输出更好一些。当使用 Rollup 时，推荐你了解下 [Rollupify](https://github.com/nolanlawson/rollupify)，它可以将 ECMAScript 2015 modules 转化为一个大的 CommonJS module —— 因为小的模块会有[令人惊讶的高性能开销](https://nolanlawson.com/2016/08/15/the-cost-of-small-modules/)（取决于打包工具和模块加载系统的选择）。

![Addy Osmani 的“默认快速：现代化加载的最佳实践”](https://user-gold-cdn.xitu.io/2018/2/28/161db9eb1a1ab2f1?w=400&h=224&f=png&s=17813)

Addy Osmani 的从[快速默认：现代加载的最佳实践](https://speakerdeck.com/addyosmani/fast-by-default-modern-loading-best-practices)。幻灯片76。

最后，随着[现代浏览器](http://kangax.github.io/compat-table/es6/)对 ES2015 支持越来越好，考虑 [使用`babel-preset-env`](http://2ality.com/2017/02/babel-preset-env.html) 只转换现代浏览器不支持的 ES2015+ 的特性。然后[设置两个构建](https://gist.github.com/newyankeecodeshop/79f3e1348a09583faf62ed55b58d09d9)，一个为 ES6 一个为 ES5。我们可以 [使用`script type="module"`](https://matthewphillips.info/posts/loading-app-with-script-module) 让具有 ES 模块浏览器支持加载文件，而老的浏览器可以加载传统的 `script nomodule`。

对于 loadsh，[使用 `babel-plugin-lodash`](https://github.com/lodash/babel-plugin-lodash) 将只加载你仅在源码中使用的模块。这可能会为你节省相当多的 JavaScript 负载。

18. **利用你使用的 JavaScript 引擎对其进行优化**

研究 JavaScript 引擎在用户基础中占的比例，然后探索优化它们的方法。例如，当优化的 V8 引擎是用在 Blink 浏览器，Node.js 运行和 Electron 的时候，对每个脚本使用[脚本流](https://blog.chromium.org/2015/03/new-javascript-techniques-for-rapid.html)。一旦下载开始，它允许 `async` 或 `defer scripts` 在一个单独的后台线程进行解析，因此在某些情况下，提高 10% 的页面加载时间。实际上，在 `<head>` 中 [使用 `<script defer>`](https://medium.com/reloading/javascript-start-up-performance-69200f43b201#3498)，以便 [浏览器更早地可以发现资源](https://medium.com/reloading/javascript-start-up-performance-69200f43b201#3498)，然后在后台线程中解析它。

**Caveat**：**Opera Mini [不支持 defement 脚本](https://caniuse.com/#search=defer)，如果你正在印度和非洲从事开发工作，`defer` 将会被忽略，导致阻塞渲染直到脚本加载（感谢 Jeremy）!**。

[![渐进引导](https://user-gold-cdn.xitu.io/2018/2/28/161db9eb1464952f?w=400&h=191&f=jpeg&s=13384)](https://aerotwist.com/blog/when-everything-is-important-nothing-is/)

[渐进引导](https://aerotwist.com/blog/when-everything-is-important-nothing-is/)：使用服务器端呈现获得首次有效绘制，但也包含一些最小必要的 JavaScript 来保持实时交互来接近首次有效绘制。

19. **客户端渲染还是服务端渲染？**

在两种场景下，我们的目标应该是建立 [渐进引导](https://aerotwist.com/blog/when-everything-is-important-nothing-is/)：使用服务端呈现获得首次有效绘制，而且还要包含一些最小必要的 JavaScript 来**保持实时交互来接近首次有效绘制**。如果 JavaScript 在首次有效绘制没有获取到，那么浏览器可能会在解析时[锁住主线程](https://davidea.st/articles/measuring-server-side-rendering-performance-is-tricky)，编译和执行最新发现的 JavaScript，[从而对站点或应用程序的交互性造成限制](https://philipwalton.com/articles/why-web-developers-need-to-care-about-interactivity/)。

为了避免这样做，总是将执行函数分离成一个个，异步任务和可能用到 `requestIdleCallback` 的地方。考虑 UI 的懒加载部分使用 WebPack [动态 `import` 支持](https://developers.google.com/web/updates/2017/11/dynamic-import)，避免加载、解析和编译开销直到用户真的需要他们（**感谢  Addy!**）。

在本质上，交互时间（TTI）告诉我们导航和交互之间的时间。度量是通过在窗口初始内容呈现后的第一个五秒来定义的，在这个过程中，JavaScript 任务都不超过 50ms。如果发生超过 50ms 的任务，则重新开始搜索五秒钟的窗口。因此，浏览器首先会假定它达到了交互式，只是切换到冻结状态，最终切换回交互式。

一旦我们达到交互式，然后，我们可以按需或等到时间允许，启动应用程序的非必需部分。不幸的是，随着 [Paul Lewis 提到的](https://aerotwist.com/blog/when-everything-is-important-nothing-is/#which-to-use-progressive-booting)，框架通常没有优先级的概念，因此渐进式引导很难用大多数库和框架实现。如果你有时间和资源，使用该策略可以极大地改善前端性能。

20. **你是否限制第三方脚本的影响？**

随着所有性能优化的到位，我们常常无法控制来自业务需求的第三方脚本。第三方脚本的度量不受用户体验的影响，所以，一个单一的脚本常常会以调用令人讨厌的，长长的第三方脚本为结尾，因此，破坏了为性能专门作出的努力。为了控制和减轻这些脚本带来的性能损失，仅异步加载（[可能通过 defer](https://www.twnsnd.com/posts/performant_third_party_scripts.html)）和通过资源提示，如：`dns-prefetch` 或者 `preconnect` 加速他们是不足够的。

正如 Yoav Weiss 在他的[必须关注第三方脚本的通信](http://conffab.com/video/taking-back-control-over-third-party-content/)中解释的，在很多情况下，下载资源的这些脚本是动态的。页面负载之间的资源是变化的，因此我们不知道主机是从哪下载的资源以及这些资源是什么。

这时，我们有什么选择？考虑 **通过一个超时来使用 service workers 下载资源**，如果在特定的时间间隔内资源没有响应，返回一个空的响应告知浏览器执行解析页面。你可以记录或者限制那些失败的第三方请求和没有执行特定标准请求。

另一个选择是建立一个 **内容安全策略（CSP）** 来限制第三方脚本的影响，比如：不允许下载音频和视频。最好的选择是通过 `<iframe>` 嵌入脚本使得脚本运行在 iframe 环境中，因此如果没有接入页面 DOM 的权限，在你的域下不能运行任何代码。Iframe 可以 使用 `sandbox` 属性进一步限制，因此你可以禁止 iframe 的任何功能，比如阻止脚本运行，阻止警告、表单提交、插件、访问顶部导航等等。

例如，它可能必须要允许脚本运行 `<iframe sandbox="allow-scripts">`。每一个限制都可以通过多种允许值在 'sandbox' 属性中（[几乎处处支持](https://caniuse.com/#search=sandbox)）解除，所以将它们限制在允许做的最低限度。考虑使用 [Safeframe](https://github.com/interactiveadvertisingbureau/safeframe) 和 Intersection Observer；这将使广告嵌入 iframe 的同时仍然调度事件或需要从 DOM 获取信息（例如广告知名度）。注意新的策略如 [特征策略](https://wicg.github.io/feature-policy/)）、资源的大小限制、CPU 和带宽优先级限制损害的网络功能和会减慢浏览器的脚本，例如：同步脚本，同步 XHR 请求，document.write 和超时的实现。

要对第三方进行 [压力测试](https://csswizardry.com/2017/07/performance-and-resilience-stress-testing-third-parties/)，在 DevTools 上自底向上概要地检查页面的性能，测试在请求被阻止或超时后会发生什么情况，对于后者，你可以使用 WebPageTest 的 Blackhole 服务器 `72.66.115.13`，你可以在你的 `hosts` 文件中指定特定的域名。最好是[最好是自主主机并使用单个主机名](https://www.twnsnd.com/posts/performant_third_party_scripts.html)，但是同时[生成一个请求映射](https://www.soasta.com/blog/10-pro-tips-for-managing-the-performance-of-your-third-party-scripts/)，当脚本变化时，暴露给第四方调用和检测。

![请求块](https://user-gold-cdn.xitu.io/2018/2/28/161db9eb17714858?w=400&h=238&f=png&s=20877)

[Harry Roberts](https://csswizardry.com/2017/07/performance-and-resilience-stress-testing-third-parties/#request-blocking)

21. **HTTP cache 头部设置是否合理？**

再次检查一遍 `expires`，`cache-control`，`max-age` 和其他 HTTP cache 头部都是否设置正确。通常，资源应该是可缓存的，不管是短时间的（它们是否很可能改变），还是无限期的（它们是否是静态的）。 你可以在需要更新的时候，改变它们 URL 中的版本即可。在任何资源上禁止头部 `Last-Modified` 都会导致一个 `If-Modified-Since` 条件查询，即使资源在缓存中。与 `Etag` 一样，即使它在使用中。

使用 `Cache-control: immutable`，(其实是为了解决fingerprinted静态资源的缓存问题而被设计出来的，解决了客户端revalidation问题（截至 2017年12月，[在 FireFox，Edge 和 Safari 中支持](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)；只有 FireFox 在 HTTPS 中支持）。你也可以使用 [Heroku 的 HTTP 缓存头部](https://devcenter.heroku.com/articles/increasing-application-performance-with-http-cache-headers)，Jake Archibald 的 "[Caching Best Practices](https://jakearchibald.com/2016/caching-best-practices/)" ，以及 Ilya Grigorik 的 [HTTP caching primer](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=en) 作为指导。而且，注意[不同的头部](https://www.smashingmagazine.com/2017/11/understanding-vary-header/)，尤其是[在关系到 CDN 时](https://www.fastly.com/blog/getting-most-out-vary-fastly)，并且注意[并且要注意关键头文件](https://www.greenbytes.de/tech/webdav/draft-ietf-httpbis-key-latest.html)，有助于避免在新请求稍有差异时进行额外的验证，但从以前请求标准，并不是必要的（**感谢，Guy！**）。


### 静态资源优化

22. **你是否使用 Brotli 或 Zopfli 进行纯文本压缩？**

在 2005 年，[Google 推出了](https://opensource.googleblog.com/2015/09/introducing-brotli-new-compression.html) [Brotli](https://github.com/google/brotli)，一个新的开源无损数据压缩格式，现在已经 [被所有的现代浏览器所支持](http://caniuse.com/#search=brotli)。实际上，Brotli 比 Gzip 和 Deflate [更有效](https://samsaffron.com/archive/2016/06/15/the-current-state-of-brotli-compression)。压缩速度可能会非常慢，取决于设置信息。但是缓慢的压缩过程会提高压缩率，并且仍然可以快速解压。当然，解压缩速度很快。

只有当用户通过 HTTPS 访问网站时，浏览器才会采用。Brotli 现在还不能预装在某些服务器上，而且如果不自己构建 NGINX 和 UBUNTU 的话很难部署。[不过这也并不难](https://www.smashingmagazine.com/2016/10/next-generation-server-compression-with-brotli/)。实际上，[一些 CDN 是支持的](https://community.akamai.com/community/web-performance/blog/2017/08/18/brotli-support-enablement-on-akamai)，甚至 [也可以通过服务器在不支持 CDN 的情况下启用 Brotli](http://calendar.perfplanet.com/2016/enabling-brotli-even-on-cdns-that-dont-support-it-yet/)。

在最高级别的压缩下，Brotli 的速度会变得非常慢，以至于服务器在等待动态压缩资源时开始发送响应所花费的时间可能会使我们对文件大小的优化无效。但是，对于静态压缩，[高压缩比的设置比较受欢迎](https://css-tricks.com/brotli-static-compression/) —— （**感谢 Jeremy!**）

或者，你可以考虑使用 [Zopfli 的压缩算法](https://blog.codinghorror.com/zopfli-optimization-literally-free-bandwidth/)，将数据编码为 Deflate，Gzip 和 Zlib 格式。Zopfli 改进的 Deflate 编码使得任何使用 Gzip 压缩的文件受益，因为这些文件大小比 用Zlib 最强压缩后还要小 3％ 到 8％。问题在于压缩文件的时间是原来的大约 80倍。这就是为什么虽然 使用 Zopfli 是一个好主意但是变化并不大，文件都需要设计为只压缩一次可以多次下载的。

比较好的方法是你可以绕过动态压缩静态资源的成本。Brotli 和 Zopfli 都可以用于明文传输 —— HTML，CSS，SVG，JavaScript 等。

有什么方法呢？在最高等级和 Brotli 的 1-4 级动态压缩 HTML 使用 Brotli+Gzip 预压缩静态资源。同时，检查 Brotli 是否支持 CDN，（例如 **KeyCDN，CDN77，Fastly**）。确保服务器能够使用 Brotli 或 gzip 处理内容。如果你不能安装或者维护服务器上的 Brotli，那么请使用 Zopfli。

23. **图像是否进行了适当的优化？**

尽可能通过 `srcset`，`sizes` 和 `<picture>` 元素使用 [响应式图片](https://www.smashingmagazine.com/2014/05/responsive-images-done-right-guide-picture-srcset/)。也可以通过 `<picture>` 元素使用 WebP 格式的图像（Chrom，Opera，[Firefox soon](https://bugzilla.mozilla.org/show_bug.cgi?id=1294490)支持），或者一个 JPEG 的回调（见 Andreas Bovens 的 [code snippet](https://dev.opera.com/articles/responsive-images/#different-image-types-use-case)）或者通过使用内容协商（使用 `Accept` 头信息）。

Sketch 本身就支持 WebP 并且 WebP 图像可以通过使用 [WebP 插件](http://telegraphics.com.au/sw/product/WebPFormat#webpformat) 从 PhotoShop 中导出。也有其他选择可以使用，如果你使用 WordPress 或者 Joomla，也有可以轻松支持 WebP 的扩展，例如 [Optimus](https://wordpress.org/plugins/optimus/) 和 [Cache Enabler](https://wordpress.org/plugins/cache-enabler/)（通过 [Cody Arsenault](https://css-tricks.com/comparing-novel-vs-tried-true-image-formats/)）

你可以仍然使用 [client hints](https://www.smashingmagazine.com/2016/01/leaner-responsive-images-client-hints/)，但仍需要获得一些浏览器支持。没有足够的资源支持响应式图片？使用 [断点发生器](http://www.responsivebreakpoints.com/) 或者类似 [Cloudinary](http://cloudinary.com/documentation/api_and_access_identifiers) 这样的服务自动优化图片。同样，在许多情况下，只使用 `srcset` 和 `sizes` 会有不错的效果。

[![响应图像断点发生器](https://user-gold-cdn.xitu.io/2018/2/28/161db9ebbae11df1?w=400&h=229&f=jpeg&s=19729)](http://www.responsivebreakpoints.com/)

[响应图像断点生成器](http://www.responsivebreakpoints.com/)自动生成图像和标记生成。


24. **图片优化进阶别**

现在有一个至关重要着陆页，有一个特定的图片的加载速度非常关键，确保 JPEGs 是渐进式的并且使用 [Adept](https://github.com/technopagan/adept-jpg-compressor)、 [mozJPEG](https://github.com/mozilla/mozjpeg) （通过操纵扫描级来改善开始渲染时间）或者 [Guetzli](https://github.com/google/guetzli) 压缩，谷歌新的开源编码器重点是能够感官的性能，并借鉴 Zopfli 和 WebP。唯一的 [不足](https://medium.com/@fox/talk-the-state-of-the-web-3e12f8e413b3) 是：处理的时间慢（每百万像素 CPU 一分钟）。至于 png，我们可以使用 [Pingo](http://css-ig.net/pingo)，和 [svgo](https://www.npmjs.com/package/svgo)，对于 SVG 的处理，我们使用 [SVGO](https://www.npmjs.com/package/svgo) 或 [SVGOMG](https://jakearchibald.github.io/svgomg/)

每一个图像优化的文章会说明，但始终会提醒要保持矢量资源干净和紧密。确保清理未使用的资源，删除不必要的元数据，并减少图稿中的路径点数量（从而减少SVG代码）。（**感谢，Jeremy！**）

到目前为止，这些优化只涵盖了基础知识。 Addy Osmani 已经发布了 [一个非常详细的基本图像优化指南](https://images.guide/)，深入到图像压缩和颜色管理的细节。 例如，您可以模糊图像中不必要的部分（通过对其应用高斯模糊滤镜）以减小文件大小，最终甚至可以开始移除颜色或将图像变成黑白色，以进一步缩小图像尺寸。 对于背景图像， 从Photoshop 导出的照片质量为 0 到 10％ 也是绝对可以接受的。

那么 GIF 图片呢？我们可以使用 [循环的 HTML5 视频](https://bitsofco.de/optimising-gifs/)，而不是影响渲染性能和带宽的重度 GIF 动画，而使用循环的 HTML5 视频，虽然 [`<video>`](https://calendar.perfplanet.com/2017/animated-gif-without-the-gif/#-but-we-already-have-video-tags) 会使得 [浏览器的性能很慢](https://calendar.perfplanet.com/2017/animated-gif-without-the-gif/#-but-we-already-have-video-tags)，但是与图像不同的是，浏览器不会预先加载 `<video>` 内容。我们也可以使用 [Lossy GIF](https://kornel.ski/lossygif), [gifsicle](https://github.com/kohler/gifsicle) 或者 [giflossy](https://github.com/pornel/giflossy) 添加有损压缩 GIF。

[好](https://developer.apple.com/safari/technology-preview/release-notes/) [消息](https://bugs.chromium.org/p/chromium/issues/detail?id=791658): 希望不久以后我们可以使用 `<img src=".mp4">` 来加载视频, 早期的测试表明 `img` 标签比同等大小的 GIF [显示速度的要快 20 多倍，解析速度要快 7 倍多](https://calendar.perfplanet.com/2017/animated-gif-without-the-gif/)。

还不够好？那么，你也可以使用 [多个](http://csswizardry.com/2016/10/improving-perceived-performance-with-multiple-background-images/)[背景](https://jmperezperez.com/medium-image-progressive-loading-placeholder/)[图像](https://manu.ninja/dominant-colors-for-lazy-loading-images#tiny-thumbnails)[技术](https://css-tricks.com/the-blur-up-technique-for-loading-background-images/) 提高图像的感知性能。 记着，[减少对比度](https://css-tricks.com/contrast-swap-technique-improved-image-performance-css-filters/)  和模糊不必要的细节（或消除颜色）也可以减小文件的大小。 你需要放大一个小照片而不失真？考虑使用 [Letsenhance.io](https://letsenhance.io)

![Zach Leatherman 的字体加载策略综合指南](https://user-gold-cdn.xitu.io/2018/2/28/161db9ebc446bcf5?w=400&h=243&f=png&s=4932)

Zach Leatherman 的 [字体加载策略综合指南](https://www.zachleat.com/web/comprehensive-webfonts/) 提供了十几种更好的网页字体发送选项

25. **是否对 Web字体进行了优化？**

首先需要问一个问题，你是否能不使用 [UI 系统字体](https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/)。 如果不可以，那么你有很大可能使用 Web 网络字体，会包含字形和额外的功能以及用不到的加粗。你可以向字体设计公司获取网络字体子集或子集，如果您使用的是开源字体（例如，通过仅包含带有某些特殊的重音字形的拉丁语），则可以只选择部分 Web 字体来减少其文件大小。

[WOFF2](http://caniuse.com/#search=woff2)  的支持非常好，对于不支持WOFF2的浏览器，你可以使用 WOFF 和 OTF 作为不支持它的浏览器的备选。另外，从 Zach Leatherman 的《[字体加载策略综合指南](https://www.zachleat.com/web/comprehensive-webfonts/)》（代码片段也可以作为 [Web字体加载片段](https://github.com/zachleat/web-font-loading-recipes)）中选择一种策略，并使用服务器缓存持久地缓存字体。是不是感觉小有成就？Pixel Ambacht 有一个 [快速教程和案例研究](https://pixelambacht.nl/2016/font-awesome-fixed/)，让你的字体按顺序排列。

如果你无法从你的服务器拿到字体并依赖于第三方主机，请确保使用 [字体加载事件](https://www.igvita.com/2014/01/31/optimizing-web-font-rendering-performance/#font-load-events)（或对不支持它的浏览器使用 [Web字体加载器](https://github.com/typekit/webfontloader)）[FOUT 要优于 FOIT](https://www.filamentgroup.com/lab/font-events.html); 立即开始渲染文本，并异步加载字体 —— 也可以使用 [loadCSS](https://github.com/filamentgroup/loadCSS)。 你也可以 [摆脱本地安装的操作系统字体](https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/)，也可以使用 [可变的](https://alistapart.com/blog/post/variable-fonts-for-responsive-design) [字体](https://www.smashingmagazine.com/2017/09/new-font-technologies-improve-web/)。

怎么才能是一个无漏洞的字体加载策略？ 从 `font-display` 开始，然后到 Font Loading API，**然后**到 Bram Stein 的 [Font Face Observer](https://github.com/bramstein/fontfaceobserver)（**感谢 Jeremy！**）如果你有兴趣从用户的角度来衡量字体加载的性能， Andreas Marschke 探索了 [使用 Font API 和 UserTiming API 进行性能跟踪](ttps://www.andreas-marschke.name/posts/2017/12/29/Fonts-API-UserTiming-Boomerang.html)

此外，不要忘记包含 [`font-display：optional`](https://font-display.glitch.me/) 描述符来提供弹性和快速的字体回退，[`unicode-range`](https://www.nccgroup.trust/uk/about-us/newsroom-and-events/blogs/2015/august/how-to-subset-fonts-with-unicode-range/) 将大字体分解成更小的语言特定的字体，以及Monica Dinculescu [的字体样式匹配器](https://meowni.ca/font-style-matcher/) 用来解决由于两种字体之间的大小差异，最大限度地减少了布局上的震动的问题。


### 交付优化

26. **你是否异步加载 JavaScript？**

当用户请求页面时，浏览器获取 HTML 并构造 DOM，然后获取 CSS 并构造 CSSOM，然后通过匹配 DOM 和 CSSOM 生成一个渲染树。如果有任何的 JavaScript 需要解决，浏览器将不会开始渲染页面，直到 JavaScript 解决完毕，这样就会延迟渲染。 作为开发人员，我们必须明确告诉浏览器不要等待并立即开始渲染页面。 为脚本执行此操作的方法是使用 HTML 中的 `defer` 和 `async` 属性。

事实证明，我们 [应该把 `async` 改为 `defer`](http://calendar.perfplanet.com/2016/prefer-defer-over-async/)（因为 ie9 及以下不支持 async）。 另外，如上所述，限制第三方库和脚本的影响，特别是使用社交共享按钮和嵌入的 `<iframe>` 嵌入（如地图）。 [大小限制](https://github.com/ai/size-limit) 有助于防止 JavaScript 库过大：如果您不小心添加了大量依赖项，该工具将通知你并抛出错误。 你可以使用 [静态社交分享按钮](https://www.savjee.be/2015/01/Creating-static-social-share-buttons/)（如通过 [SSBG](https://simplesharingbuttons.com) ）和 [静态链接](https://developers.google.com/maps/documentation/static-maps/intro) 来代替交互式地图。

27. **你对开销很大的 JS 是否使用懒加载并使用 Intersection Observer？**

如果您需要延迟加载图片、视频、广告脚本、A/B 测试脚本或任何其他资源，则可以使用 [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)，它提供了一种方法异步观察目标元素与 祖先元素或顶层文档的视口。基本上，你需要创建一个新的 IntersectionObserver 对象，它接收一个回调函数和一组选项。 然后我们添加一个目标来观察。

当目标变得可见或不可见时执行回调函数，所以当它拦截视口时，可以在元素变得可见之前开始采取一些行动。 事实上，我们可以精确地控制观察者的回调何时被调用，使用 `rootMargin` 和 `threshold`（一个数字或者一个数字数组来表示目标可见度的百分比）。Alejandro Garcia Anglada 发表了一个 [简单的教程](https://medium.com/@aganglada/intersection-observer-in-action-efc118062366) 关于如何实际实施的教程。

你甚至可以通过向你的网页添加 [渐进式图片加载](https://calendar.perfplanet.com/2017/progressive-image-loading-using-intersection-observer-and-sqip/) 来将其提升到新的水平。 与 Facebook，Pinterest 和 Medium 类似，你可以首先加载低质量或模糊的图像，然后在页面继续加载时，使用 Guy Podjarny 提出的 [LQIP (Low Quality Image Placeholders) technique](https://www.guypo.com/introducing-lqip-low-quality-image-placeholders/)（低质量图像占位符）技术替换它们的清晰版本。（可以参考知乎）

如果技术提高了用户体验，观点就不一样了，但它肯定会提高第一次有意义的绘画的时间。我们甚至可以通过使用 [SQIP](https://github.com/technopagan/sqip) 创建图像的低质量版本作为 SVG 占位符来实现自动化。 这些占位符可以嵌入 HTML 中，因为它们自然可以用文本压缩方法压缩。 Dean Hume 在他的文章中 [描述了](https://calendar.perfplanet.com/2017/progressive-image-loading-using-intersection-observer-and-sqip/) 如何使用 Intersection Observer 来实现这种技术。

浏览器支持程度如何呢？[Decent](https://caniuse.com/#feat=intersectionobserver)，与 Chrome，火狐，Edge 和 Samsung Internet 已经支持了。 WebKit 目前 [正在开发中](https://webkit.org/status/#specification-intersection-observer)。如果浏览器不支持呢？ 如果不支持Intersection Observer，我们仍然可以 [延迟加载](https://medium.com/@aganglada/intersection-observer-in-action-efc118062366) 一个 [polyfill](https://github.com/jeremenichelli/intersection-observer-polyfill) 或立即加载图像。甚至还有一个 [library](https://github.com/ApoorvSaxena/lozad.js)。

通常，我们会使用懒加载来处理所有代价较大的组件，如字体，JavaScript，轮播，视频和 iframe。 你甚至可以根据网络质量调整内容服务。[网络信息 API](https://googlechrome.github.io/samples/network-information/)，特别是 `navigator.connection.effectiveType`（Chrome 62+）使用 RTT 和下行链路值来更准确地表示连接和用户可以处理的数据。 您可以使用它来完全删除视频自动播放，背景图片或 Web 字体，以便连接速度太慢。

28. **你是否优先加载关键的 CSS？**

为确保浏览器尽快开始渲染页面，[通常](https://www.smashingmagazine.com/2015/08/understanding-critical-css/) 会收集开始渲染页面的第一个可见部分所需的所有 CSS（称为 “关键CSS” 或 “首屏 CSS”）并将其内联添加到页面的 `<head>` 中，从而减少往返。 由于在慢启动阶段交换包的大小有限，所以关键 CSS 的预算大约是 14 KB。

如果超出这个范围，浏览器将需要额外往返取得更多样式。  [CriticalCSS](https://github.com/filamentgroup/criticalCSS) 和 [Critical](https://github.com/addyosmani/critical) 可以做到这一点。 你可能需要为你使用的每个模板执行此操作。 如果可能的话，考虑使用 Filament Group 使用的 [条件内联方法](https://www.filamentgroup.com/lab/modernizing-delivery.html)。

使用 HTTP/2，关键 CSS 可以存储在一个单独的 CSS 文件中，并通过 [服务器推送](https://www.filamentgroup.com/lab/modernizing-delivery.html) 来传递，而不会增大 HTML 的大小。 问题在于，服务器推送是很 [麻烦](https://twitter.com/jaffathecake/status/867699157150117888)，因为浏览器中存在许多问题和竞争条件。 它一直不被支持，并有一些缓存问题（参见 [Hooman Beheshti介绍的文章]([Hooman Beheshti's presentation](http://www.slideshare.net/Fastly/http2-what-no-one-is-telling-you)) 114 页内容）。事实上，这种影响可能是 [负面的](https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/)，会使网络缓冲区膨胀，从而阻止文档中的真实帧被传送。 而且，由于 TCP 启动缓慢，似乎服务器推送在热连接上 [更加有效](https://docs.google.com/document/d/1K0NykTXBbbbTlv60t5MyJvXjqKGsCVNYHyLEXIxYMv0/edit)。

即使使用 HTTP/1，将关键 CSS 放在根目录上的单独文件中也是有 [好处的](http://www.jonathanklein.net/2014/02/revisiting-cookieless-domain.html)，有时甚至比缓存和内联更为有效。 Chrome 请求这个页面的时候会再发送一个 HTTP 连接到根目录，从而不需要 TCP 连接来获取这个 CSS（**感谢 Philip！**）

需要注意的一点是：和 `preload` 不同的是，`preload` 可以触发来自任何域的预加载，而你只能从你自己的域或你所授权的域中推送资源。 一旦服务器得到来自客户端的第一个请求，就可以启动它。 服务器将资源压入缓存，并在连接终止时被删除。 但是，由于可以在多个选项卡之间重复使用 HTTP/2 连接，所以推送的资源也可以被来自其他选项卡的请求声明（**感谢 Inian！**）。

目前，服务器并没有一个简单的方法得知被推送的资源 [是否已经存在于用户的缓存中](https://blog.yoav.ws/tale-of-four-caches/)，因此每个用户的访问都会继续推送资源。因此，您可能需要创建一个 [缓存监测 HTTP/2 服务器推送机制](https://css-tricks.com/cache-aware-server-push/)。如果被提取，您可以尝试从缓存中获取它们，这样可以避免再次推送。

但请记住，[新的 `cache-digest` 规范](http://calendar.perfplanet.com/2016/cache-digests-http2-server-push/) 无需手动建立这样的 “缓存感知” 的服务器，基本上在 HTTP/2 中声明的一个新的帧类型就可以表达该主机的内容。因此，它对于 CDN 也是特别有用的。

对于动态内容，当服务器需要一些时间来生成响应时，浏览器无法发出任何请求，因为它不知道页面可能引用的任何子资源。 在这种情况下，我们可以预热连接并增加 TCP 拥塞窗口大小，以便将来的请求可以更快地完成。 而且，所有内联配置对于服务器推送都是较好的选择。事实上，Inian Parameshwaran 对 [HTTP/2 Push 和 HTTP Preload 进行了比较 深入的研究](https://dexecure.com/blog/http2-push-vs-http-preload/)，内容很不错，其中包含了您可能需要的所有细节。服务器到底是推送还是不推送呢？你可以阅读一下 Colin Bendell 的  [Should I Push?](https://shouldipush.com/)。

底线：正如 Sam Saccone [所说](https://medium.com/@samccone/performance-futures-bundling-281543d9a0d5)，`preload` 有利于将资源的开始下载时间更接近初始请求， 而服务器推送是一个完整的 RTT（或 [更多](https://blog.yoav.ws/being_pushy/)，这取决于您的服务器反应时间 —— 如果你有一个服务器可以防止不必要的推送。

<iframe data-src="https://www.youtube.com/embed/Cjo9iq8k-bc" width="600" height="480" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>

你使用 [流响应](https://jakearchibald.com/2016/streams-ftw/) 吗？通过流，在初始导航请求中呈现的 HTML 可以充分利用浏览器的流式 HTML 解析器。

29. **你使用流响应吗?**

[streams](https://streams.spec.whatwg.org/) 经常被遗忘和忽略，它提供了异步读取或写入数据块的接口，在任何给定的时间内，只有一部分数据可能在内存中可用。 基本上，只要第一个数据块可用，它们就允许原始请求的页面开始处理响应，并使用针对流进行优化的解析器逐步显示内容。

我们可以从多个来源创建一个流。例如，您可以让服务器构建一个壳子来自于缓存，内容来自网络的流，而不是提供一个空的 UI 外壳并让它填充它。 正如 Jeff Posnick [指出](https://developers.google.com/web/updates/2016/06/sw-readablestreams)的，如果您的 web 应用程序由 CMS 提供支持的，那么服务器渲染 HTML 是通过将部分模板拼接在一起来呈现的，该模型将直接转换为使用流式响应，而模板逻辑将从服务器复制而不是你的服务器。Jake Archibald 的 [The Year of Web Streams](https://jakearchibald.com/2016/streams-ftw/) 文章重点介绍了如何构建它。对于性能的提升是非常明显的。

流式传输整个 HTML 响应的一个重要优点是，在初始导航请求期间呈现的 HTML 可以充分利用浏览器的流式 HTML 解析器。 在页面加载之后插入到文档中的 HTML 块（与通过 JavaScript 填充的内容一样常见）无法利用此优化。

浏览器支持程度如何呢? [详情请看这里](https://caniuse.com/#search=streams) Chrome 52+、Firefox 57、Safari 和 Edge 支持此 API 并且服务器已经支持所有的 [现代浏览器](https://caniuse.com/#search=serviceworker).

30. **你使用 `Save-Data` 存储数据吗**?

特别是在新兴市场工作时，你可能需要考虑优化用户选择节省数据的体验。 [Save-Data 客户端提示请求头](https://developers.google.com/web/updates/2016/02/save-data) 允许我们为成本和性能受限的用户定制应用程序和有效载荷。 实际上，您可以将 [高 DPI 图像的请求重写为低 DPI 图像](https://css-tricks.com/help-users-save-data/)，删除网页字体和花哨的特效，关闭视频自动播放，服务器推送，甚至更改提供标记的方式。

该头部目前仅支持 Chromium，Android 版 Chrome 或 桌面设备上的 Data Saver 扩展。最后，你还可以使用 service worker 和 Network Information API 来提供基于网络类型的低/高分辨率的图像。

31. **你是否激活了连接以加快传输？**

使用 [资源提示](https://w3c.github.io/resource-hints) 来节约时间，如 [`dns-prefetch`](http://caniuse.com/#search=dns-prefetch) （在后台执行 DNS 查询），[`preconnect`](http://www.caniuse.com/#search=preconnect) （告诉浏览器在后台进行连接握手（DNS, TCP, TLS）），[`prefetch`](http://caniuse.com/#search=prefetch) (告诉浏览器请求一个资源) 和 [`preload`](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/) (预先获取资源而不执行他们)。

最近，我们至少会使用 `preconnect` 和 `dns-prefetch`，我们会小心使用 `prefetch` 和 `preload`；前者只能在你非常确定用户后续需要什么资源的情况下使用（类似于采购渠道）。注意，`prerender` 已被弃用，不再被支持。

请注意，即使使用 `preconnect` 和 `dns-prefetch`，浏览器也会对它将并行查找或连接的主机数量进行限制，因此最好是将它们根据优先级进行排序（**感谢 Philip！**）。

事实上，使用资源提示可能是最简单的提高性能的方法，[它确实很有效](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)。什么时候该使用呢？Addy Osmani [已经做了解释](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)，我们应该预加载确定将在当前页面中使用的资源。预获取可能用于未来页面的资源，例如用户尚未访问的页面所需的 Webpack 包。

Addy 的关于 Chrome 中加载优先级的文章[展示了](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf) Chrome 是如何精确地解析资源提示的，因此一旦你决定哪些资源对页面渲染比较重要，你就可以给它们赋予比较高的优先级。你可以在 Chrome DevTools 网络请求表格（或者 Safari Technology Preview）中启动“priority”列来查看你的请求的优先级。

![the priority column in DevTools](https://user-gold-cdn.xitu.io/2018/2/28/161db9ebed0d24b3?w=400&h=136&f=gif&s=645590)

DevTools 中的 "Priority" 列。图片来源于：Ben Schwarz，[重要的请求](https://css-tricks.com/the-critical-request/)

例如，由于字体通常是页面上的重要资源，所以最好使用 [`preload`](https://css-tricks.com/the-critical-request/#article-header-id-2) [请求浏览器下载字体](https://css-tricks.com/the-critical-request/#article-header-id-2)。你也可以 [动态加载 JavaScript ](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/#dynamic-loading-without-execution)，从而有效的执行延迟加载。同样的，因为 `<link rel="preload">` 接收一个 `media` 的属性，你可以基于 `@media` 查询规则来有选择性地优先加载资源。

[需要注意的一些问题是](https://dexecure.com/blog/http2-push-vs-http-preload/)：`preload` 可以 [将资源的下载时间移到请求开始时](https://www.youtube.com/watch?v=RWLzUnESylc)，但是这些缓存在内存中的预先加载的资源是绑定在所发送请求的页面上，也就是说预先加载的请求不能被页面所共享。而且，`preload` 与 HTTP 缓存配合得也很好：如果缓存命中则不会发送网络请求。

因此，它对后发现的资源也非常有用，如：通过 background-image 加载的一幅 hero image，内联关键 CSS （或 JavaScript），并预先加载其他 CSS （或 JavaScript）。此外，只有当浏览器从服务器接收 HTML，并且前面的解析器找到了 `preload` 标签后，`preload` 标签才可以启动预加载。由于我们不等待浏览器解析 HTML 以启动请求，所以通过 HTTP 头进行预加载要快一些。[早期提示](https://tools.ietf.org/html/draft-ietf-httpbis-early-hints-05)将有助于进一步，在发送 HTML 响应标头之前启动预加载。

请注意：如果你正在使用 `preload`，`as` **必须**定义否则[什么都不会加载](https://twitter.com/yoavweiss/status/873077451143774209)，还有，[预加载字体时如果没有 `crossorigin` 属性将会获取两次](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)

32. **你优化渲染性能了吗？**

使用 [CSS containment](http://caniuse.com/#search=contain) 隔离昂贵的组件 - 例如，限制浏览器样式、用于非画布导航的布局和绘画工作，第三方组件的范围。确保在滚动页面没有延迟，或者当一个元素进行动画时，持续地达到每秒 60 帧。如果这是不可能的，那么至少要使每秒帧数持续保持在 60 到 15 的范围。使用 CSS 的 [`will-change`](http://caniuse.com/#feat=will-change) 通知浏览器哪个元素的哪个属性将要发生变化。

此外，评估[运行时渲染性能](https://aerotwist.com/blog/my-performance-audit-workflow/#runtime-performance)（例如，[使用 DevTools](https://developers.google.com/web/tools/chrome-devtools/rendering-tools/)）。可以通过学习 Paul Lewis 免费的[关于浏览器渲染优化的 Udacity 课程](https://www.udacity.com/course/browser-rendering-optimization--ud860)和 Emily Hayman 的文章[优化网页动画和交互](https://blog.algolia.com/performant-web-animations/)来入门。

同样，我们有 Sergey Chikuyonok 这篇文章关于如何[正确使用 GPU 动画](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/)。注意：对 GPU-composited 层的更改是[代价最小的](https://blog.algolia.com/performant-web-animations/)，如果你能通过“不透明”和“变形”来触发合成，那么你就是在正确的道路上。

33. **你优化过渲染体验吗？**

组件以何种顺序显示在页面上以及我们如何给浏览器提供资源固然重要，但是我们同样也不能低估了[感知性能](https://www.smashingmagazine.com/2015/09/why-performance-matters-the-perception-of-time/)的角色。这一概念涉及到等待的心理学，主要是让用户在其他事情发生时保持忙碌。这就涉及到了[感知管理](https://www.smashingmagazine.com/2015/11/why-performance-matters-part-2-perception-management/)，[优先开始](https://www.smashingmagazine.com/2015/11/why-performance-matters-part-2-perception-management/#preemptive-start)，[提前完成](https://www.smashingmagazine.com/2015/11/why-performance-matters-part-2-perception-management/#early-completion)和[宽容管理](https://www.smashingmagazine.com/2015/12/performance-matters-part-3-tolerance-management/)。

这一切意味着什么？在加载资源时，我们可以尝试始终领先于客户一步，所以将很多处理放置到后台，响应会很迅速。让客户参与进来，我们可以用[骨架屏幕](https://twitter.com/lukew/status/665288063195594752)（[实例演示](https://twitter.com/razvancaliman/status/734088764960690176)），而不是当没有更多优化可做时、用加载指示，添加一些动画/过渡[欺骗用户体验](https://blog.stephaniewalter.fr/en/cheating-ux-perceived-performance-and-user-experience/)。

### HTTP/2

34. **迁移到 HTTPS，然后打开 HTTP/2.**

在谷歌提出[向更安全的网页进军](https://security.googleblog.com/2016/09/moving-towards-more-secure-web.html)以及Chrome 会把（所有使用 HTTP 的）网页认定为“不安全”的大环境下，迁移到[HTTP/2](https://http2.github.io/faq/)是不可避免的。HTTP/2 从目前来看支持得非常好，并且，在某些场景下，使用 HTTP/2 会让你大力出奇迹。一旦运行在 HTTPS 上，你至少能够在 service workers 和 server push 方面获得[显著的性能提升](https://www.youtube.com/watch?v=RWLzUnESylc&t=1s&list=PLNYkxOF6rcIBTs2KPy1E6tIYaWoFcG3uj&index=25)。

![HTTP/2](https://user-gold-cdn.xitu.io/2018/2/28/161db9ebffdfc09e?w=400&h=194&f=png&s=4896)

最终，谷歌计划将所有 HTTP 页面标记为不安全的，并将有问题的 HTTPS 的 HTTP 安全指示器更改为红色三角形。（[图片来源](https://security.googleblog.com/2016/09/moving-towards-more-secure-web.html)）

最耗时的任务将是[迁移到 HTTPS](https://https.cio.gov/faq/)，取决于你的 HTTP/1.1 用户基础有多大（即使用旧版操作系统或浏览器的用户），你将不得不为旧版的浏览器性能优化发送不同的构建版本，这需要你采用[不同的构建流程](https://rmurphey.com/blog/2015/11/25/building-for-http2)。注意：开始迁移和新的构建过程可能会很棘手，而且耗费时间。接下来所讲的内容，都是针对之前切过 HTTP/2 环境或者现在正准备切 HTTP/2 环境（的读者）来展开的。

35. **正确地部署 HTTP/2.**

再次强调一下，需要对现阶段正如何提供在你开始使用 HTTP/2 请求资源之前，需要搞清楚你以前是如何请求资源的。另外需要你在载入大模块以及并行载入小模块之间找到一个平衡点。 。最终，仍然是[最好的请求就是没有请求](http://alistapart.com/article/the-best-request-is-no-request-revisited)，然而我们的目标是在快速传输资源和缓存之间找到一个好的平衡点。

一方面，你可能想要避免合并所有资源，而是把整个界面分解成许多小模块，然后在构建过程中压缩这些小模块，最后通过[ “scount” approach 的方法](https://rmurphey.com/blog/2015/11/25/building-for-http2)引用和并行加载这些小模块。这样的话，一个文件的更改就不需要重新下载整个样式表或 JavaScript。这样还可以 [最小化解析时间](https://css-s.com/musings-on-http2-and-bundling/) ，并将单个页面的负荷保持在较低的水平。

另一方面，[打包仍然很重要](http://engineering.khanacademy.org/posts/js-packaging-http2.htm)。首先，**压缩将获益**。在压缩大文件的过程中，借助目录重用的特点，达到优化性能的目的，而小的单独的文件则不会。有标准的工作来解决这个问题，但现在还远远不够。其次，浏览器还**没有为这种工作流优化**。例如，Chrome 将触发[进程间通信](https://www.chromium.org/developers/design-documents/inter-process-communication)（IPCs），与资源的数量成线性关系，因此页面中如果包含数以百计的资源将会造成浏览器性能损失。

![Progressive CSS loading](https://user-gold-cdn.xitu.io/2018/2/28/161db9ebe6234eb0?w=400&h=291&f=png&s=15674)

为了获得使用 HTTP/2 最好的效果，可以考虑使用[渐进地加载 CSS](https://jakearchibald.com/2016/link-in-body/)，正如 Chrome 的 Jake Archibald 所推荐的。

你可以尝试[渐进地加载 CSS](https://jakearchibald.com/2016/link-in-body/)。显然，通过这样做，这种做法不利于 HTTP/1.1 的用户，因此在部署 HTTP/2 的过程中，你可能需要针对不同的浏览器创建并发送该浏览器支持的 HTTP 协议的报头，这还只是部署过程中稍微复杂的地方。你可以使用 [HTTP/2 的 connection coalescing](https://daniel.haxx.se/blog/2016/08/18/http2-connection-coalescing/)，可以让你在 HTTP/2 环境使用域名共享）来避开这些，但在实践中实现这一目标是很困难的。

怎么做呢？如果你运行在 HTTP/2 之上，发送 **6-10 个包**是个理想的折中（对旧版浏览器也不会太差）。对于你自己的网站，你可以通过实验和测量来找到最佳的折中。

36. **你的服务和 CDNs 支持 HTTP/2 吗？**

不同的服务和 CDNs 可能对 HTTP/2 的支持情况不一样，但是可以使用[TLS ](https://istlsfastyet.com)来查看你的可选服务，或者快速的查看你的服务的性能以及你想要其支持的特性。
TLS工具功能如下：

![Is TLS Fast Yet?](https://user-gold-cdn.xitu.io/2018/2/28/161db9ebe6383ad3?w=400&h=255&f=png&s=11926)

[Is TLS Fast Yet?](https://istlsfastyet.com) 允许你检查你转换到 HTTP
/2 时你的服务器和 CDN 的选项。

37. **是否启动了 OCSP stapling？**

通过[在你的服务上启动 OCSP stapling](https://www.digicert.com/enabling-ocsp-stapling.htm)，你可以加速 TLS 握手。在线证书状态协议（OCSP）的提出是为了替代证书注销列表（CRL）协议。两个协议都是用于检查一个 SSL 证书是否已被撤回。但是，OCSP 协议不需要浏览器花时间下载然后在列表中搜索认证信息，因此减少了握手时间。

38. **你是否已采用了 IPv6？**

因为[ IPv4 即将用完](https://en.wikipedia.org/wiki/IPv4_address_exhaustion)以及主要的移动网络正在迅速采用 IPv6（美国已经[达到](https://www.google.com/intl/en/ipv6/statistics.html#tab=ipv6-adoption&tab=ipv6-adoption)50% 的 IPv6 使用阈值），[将你的 DNS 更新到 IPv6](https://www.paessler.com/blog/2016/04/08/monitoring-news/ask-the-expert-current-status-on-ipv6) 以应对未来是一个好的想法。只要确保在网络上提供双栈支持，就可以让 IPv6 和 IPv4 同时运行。毕竟，IPv6 不是向后兼容的。[研究显示](https://www.cloudflare.com/ipv6/)，也是正因为 IPv6 自带 NDP 以及路由优化，所以才能够让网站的载入速度提升10%到15%。

39. **你使用（针对 HTTP 响应头压缩的）HPACK 压缩算法了吗？**

如果你使用 HTTP/2，请再次检查，确保您的服务针对 HTTP 响应头部[实现 HPACK 压缩](https://blog.cloudflare.com/hpack-the-silent-killer-feature-of-http-2/)以减少不必要的开销。由于 HTTP/2 服务相对较新，它们可能不完全支持该规范，HPACK 就是一个例子。可以使用 [H2spec](https://github.com/summerwind/h2spec) 这个伟大的（如果技术上很详细）工具来检查。[HPACK作品](https://www.keycdn.com/blog/http2-hpack-compression/)。

![h2spec](https://user-gold-cdn.xitu.io/2018/2/28/161db9ec7f519ed6?w=400&h=468&f=png&s=38725)

H2spec ([View large version](https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/15891f86-c883-434a-8517-209273356ee6/h2spec-example-large-opt.png)) ([Image source](https://github.com/summerwind/h2spec))

H2spec ([超大图](https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/15891f86-c883-434a-8517-209273356ee6/h2spec-example-large-opt.png)) ([图片来源](https://github.com/summerwind/h2spec))

40. **务必保证服务器的安全性**

所有实现了 HTTP/2 的浏览器都在 TLS 上运行的大背景下，如果你遇到以下问题：
- 浏览器中出现安全警告
- 页面上的某些元素不起作用。

那么，你需要
- [仔细检查那些与安全相关的 HTTP 头部，看是否设置正确](https://securityheaders.io/)
- [使用一些工具来排除已知漏洞](https://www.smashingmagazine.com/2016/01/eliminating-known-security-vulnerabilities-with-snyk/)，
- [检查你的证书看是否失效](https://www.ssllabs.com/ssltest/)
- 确保所有外部插件和跟踪脚本通过 HTTPS 加载，不允许跨站点脚本
- 正确设置 HTTP 中的 [strict-transport-security](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security_Cheat_Sheet)和[ content-security-policy](https://content-security-policy.com/)请求头。

41. **是否使用了 service workers 来缓存以及用作网络回退？**

没有什么网络性能优化能快过用户机器上的本地缓存。如果你的网站运行在 HTTPS 上，那么请参考使用 “[Service Workers 的实用指南](https://github.com/lyzadanger/pragmatist-service-worker)”。使用 service worker 中缓存静态资源并存储离线资源（甚至离线页面）的目的，而且还会教你如何从用户的设备里面拿数据，也就是说，你现在是不需要通过网络的方式去请求之前的数据。同时，参考
Jake 的 [Offline Cookbook](https://jakearchibald.com/2014/offline-cookbook/) 和 Udacity 免费课程“[离线 Web 应用程序](https://www.udacity.com/course/offline-web-applications--ud899)”。浏览器支持？如上所述，它得到了[广泛支持](http://caniuse.com/#search=serviceworker) （Chrome、Firefox、Safari TP、Samsung Internet、Edge 17+），但不管怎么说，它都是网络。它有助于提高性能吗？[是的，Service Workers确实会提升性能](https://developers.google.com/web/showcase/2016/service-worker-perf)。

### 测试和监控

42. **你是了解否在代理浏览器和旧版浏览器中测试过？**

在 Chrome 和 Firefox 中进行测试是不够的。你应该去了解你的网站在代理浏览器和旧版浏览器中是如何工作的。例如，UC 浏览器和 Opera Mini，这些浏览器 [在亚洲有大量的市场份额](http://gs.statcounter.com/#mobile_browser-as-monthly-201511-201611) （达到 35%）。在你感兴趣的国家[测量平均网络速度](https://www.webworldwide.io/)从而避免在未来发现“大惊喜”。测试网络节流，并仿真一个高 DPI 设备。[BrowserStack](https://www.browserstack.com) 很不错，但也要在实际设备上测试。

[![](https://user-gold-cdn.xitu.io/2018/2/28/161db9eca1eb411c?w=725&h=572&f=gif&s=817417)](https://github.com/loadimpact/k6)

[k6](https://github.com/loadimpact/k6) 可以让你像写单元测试一样编写性能测试用例。

43. **是否启用了持续监控？**

有一个[WebPagetest](http://www.webpagetest.org/)私人的实例总是有利于快速和无限的测试。但是，一个带有自动警报的连续监视工具将会给您提供更详细的性能描述。设置您自己的用户计时标记来度量和监视特定的业务度量。同时，考虑添加[自动化性能回归警报](https://calendar.perfplanet.com/2017/automating-web-performance-regression-alerts/)来监控随着时间而发生的变化。

使用 RUM 解决方案来监视性能随时间的变化。对于自动化的类单元测试的负载测试工具，您可以使用 [k6](https://github.com/loadimpact/k6) 脚本 API。此外，可以了解下 [SpeedTracker](https://speedtracker.org)、[Lighthouse](https://github.com/GoogleChrome/lighthouse) 和 [Calibre](https://calibreapp.com)。

### 速效方案

这个列表非常全面，完成所有的优化可能需要很长时间。所以，如果你只有一个小时的时间来进行重大的改进，你会怎么做？让我们把这一切归结为**10个低挂的水果**。显然，在你开始之前和完成之后，测量结果，包括开始渲染时间以及在 3G 和电缆连接下的速度指数。

1. 测量实际环境的体验并设定适当的目标。一个好的目标是：第一次有意义的绘制 < 1 s，速度指数 < 1250，在慢速的 3G 网络上的交互 < 5s，对于重复访问，TTI < 2s。优化渲染开始时间和交互时间。

2. 为您的主模板准备关键的 CSS，并将其包含在页面的 `<head>` 中。（你的预算是 14 KB）。对于 CSS/JS，文件大小[不超过 170 KB gzipped](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)（解压后 0.8-1 MB）。

3. 延迟加载尽可能多的脚本，包括您自己的和第三方的脚本——特别是社交媒体按钮、视频播放器和耗时的 JavaScript 脚本。

4. 添加资源提示，使用 `dns-lookup`、`preconnect`、`prefetch` 和 `preload` 加速传输。

5. 分离 web 字体，并以异步方式加载它们（或切换到系统字体）。

6. 优化图像，并在重要页面（例如登录页面）中考虑使用 WebP。

7. 检查 HTTP 缓存头和安全头是否设置正确。

8. 在服务器上启用 Brotli 或 Zopfli 压缩。（如果做不到，不要忘记启用 Gzip 压缩。）

9. 如果 HTTP/2 可用，启用 HPACK 压缩并开启混合内容警告监控。如果您正在运行 LTS，也可以启用 OCSP stapling。

10. 在 service worker 缓存中尽可能多的缓存资产，如字体、样式、JavaScript 和图像。

### 清单下载（PDF, Apple Pages）

记住了这个清单，您就已经为任何类型的前端性能项目做好了准备。请随意下载该清单的打印版PDF，以及一个**可编辑的苹果页面文档**，以定制您需要的清单：

* [Download the checklist PDF](https://www.dropbox.com/s/8h9lo8ee65oo9y1/front-end-performance-checklist-2018.pdf?dl=0) (PDF, 0.129 MB)
* [Download the checklist in Apple Pages](https://www.dropbox.com/s/yjedzbyj32gzd9g/performance-checklist-1.1.pages?dl=0) (.pages, 0.236 MB)

如果你需要其他选择，你也可以参考 [Rublic 的前端清单](https://github.com/drublic/checklist)和 Jon Yablonski 的“[设计师的 Web 性能清单](http://jonyablonski.com/designers-wpo-checklist/)”。

### 动身吧

一些优化可能超出了您的工作或预算范围，或者由于需要处理遗留代码而显得过度滥用。没问题！使用这个清单作为一个通用（并且希望是全面的）指南，并创建适用于你的环境的你自己的问题清单。但最重要的是，测试和权衡您自己的项目，以在优化前确定问题。祝大家 2018 年的性能大涨！

**非常感谢 Guy Podjarny, Yoav Weiss, Addy Osmani, Artem Denysov, Denys Mishunov, Ilya Pukhalski, Jeremy Wagner, Colin Bendell, Mark Zeman, Patrick Meenan, Leonardo Losoviz, Andy Davies, Rachel Andrew, Anselm Hannemann, Patrick Hamann, Andy Davies, Tim Kadlec, Rey Bango, Matthias Ott, Mariana Peralta, Philipp Tellis, Ryan Townsend, Mohamed Hussain S H, Jacob Groß, Tim Swalling, Bob Visser, Kev Adamson, Aleksey Kulikov and Rodney Rehm 对这篇文章的校对，同样也感谢我们出色的社区，分享了他们在性能优化工作中学习到的技术和经验，供大家使用。你们真正的非常了不起！**


> 写文章可以得 [异步社区](https://user-gold-cdn.xitu.io/2018/1/31/1614acfd01c10633) 的书！爱读书的技术人都在异步社区。我想要读 [《JavaScript忍者秘籍（第2版）》](http://www.epubit.com.cn/book/details/4699)，希望你也能够喜欢。参与写作换书活动。


