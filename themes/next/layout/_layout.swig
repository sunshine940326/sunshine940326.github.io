<!doctype html>

{% set html_class = 'theme-next ' + theme.scheme %}
{% if theme.use_motion %}
  {% set html_class = html_class + ' use-motion' %}
{% endif %}

<html class="{{ html_class | lower }}" lang="{{ config.language }}">
<head>
  {% include '_partials/head.swig' %}
     <title>{% block title %}{% endblock %}</title>
</head>

<body itemscope itemtype="http://schema.org/WebPage" lang="{{ page.lang || page.language || config.language }}">

  {% include '_third-party/analytics/index.swig' %}

  {% set container_class = "container " %}
  {% if theme.sidebar.position %}
    {% set container_class = container_class + 'sidebar-position-' + theme.sidebar.position %}
  {% endif %}

  <div class="{{ container_class }} {% block page_class %}{% endblock %} ">
    <div class="headband"></div>

    <header id="header" class="header" itemscope itemtype="http://schema.org/WPHeader">
      <a href="https://github.com/sunshine940326"><img style="position: absolute; top: 0; left: 0; border: 0;" src="https://camo.githubusercontent.com/567c3a48d796e2fc06ea80409cc9dd82bf714434/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_darkblue_121621.png"></a>
      <div class="header-inner"> {%- include '_partials/header.swig' %} </div>
    </header>

    <main id="main" class="main">
      <div class="main-inner">
        <div class="content-wrap">
          <div id="content" class="content">
            {% block content %}{% endblock %}
          </div>
          {% include '_third-party/duoshuo-hot-articles.swig' %}
          {% include '_partials/comments.swig' %}
        </div>
        {% if theme.sidebar.display !== 'remove' %}
          {% block sidebar %}{% endblock %}
        {% endif %}
      </div>
    </main>

    <footer id="footer" class="footer">
      <div class="footer-inner">
        {% include '_partials/footer.swig' %}
        {% include '_third-party/analytics/busuanzi-counter.swig' %}
        {% block footer %}{% endblock %}
      </div>
    </footer>

    {% if not theme.sidebar.b2t %}
      <div class="back-to-top">
        <i class="fa fa-arrow-up"></i>
        {% if theme.sidebar.scrollpercent %}
          <span id="scrollpercent"><span>0</span>%</span>
        {% endif %}
      </div>
    {% endif %}

  </div>

  {% include '_scripts/vendors.swig' %}
  {% include '_scripts/commons.swig' %}

  {% set scheme_script = '_scripts/schemes/' + theme.scheme | lower + '.swig' %}
  {% include scheme_script %}

  {% block script_extra %}{% endblock %}

  {% include '_scripts/boostrap.swig' %}

  {% include '_third-party/comments/index.swig' %}
  {% include '_third-party/search/index.swig' %}
  {% include '_third-party/analytics/lean-analytics.swig' %}
  {% include '_third-party/seo/baidu-push.swig' %}
  {% include '_third-party/mathjax.swig' %}
  {% include '_third-party/exturl.swig' %}

  <div class="bg_content">
      <div class="landscape"></div>
      <div class="filter"></div>
      <canvas id="canvas"></canvas>
  </div>
  <script>
    //360站长平台

    (function(){
       var src = (document.location.protocol == "http:") ? "http://js.passport.qihucdn.com/11.0.1.js?940223423bbed5ceb474bec1058bc6fb":"https://jspassport.ssl.qhimg.com/11.0.1.js?940223423bbed5ceb474bec1058bc6fb";
       document.write('<script src="' + src + '" id="sozz"><\/script>');
    })();

     //百度站长
    (function(){
        var bp = document.createElement('script');
        var curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https'){
       bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
      }
      else{
      bp.src = 'http://push.zhanzhang.baidu.com/push.js';
      }
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
    })();

    function Star(id, x, y){
      this.id = id;
      this.x = x;
      this.y = y;
      this.r = Math.floor(Math.random()*2)+1;
      var alpha = (Math.floor(Math.random()*10)+1)/10/2;
      this.color = "rgba(255,255,255,"+alpha+")";
    }

    Star.prototype.draw = function() {
      ctx.fillStyle = this.color;
      ctx.shadowBlur = this.r * 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
    }

    Star.prototype.move = function() {
      this.y -= .15;
      if (this.y <= -10) this.y = HEIGHT + 10;
      this.draw();
    }

    Star.prototype.die = function() {
        stars[this.id] = null;
        delete stars[this.id];
    }


    function Dot(id, x, y, r) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.r = Math.floor(Math.random()*5)+1;
      this.maxLinks = 2;
      this.speed = .5;
      this.a = .5;
      this.aReduction = .005;
      this.color = "rgba(255,255,255,"+this.a+")";
      this.linkColor = "rgba(255,255,255,"+this.a/4+")";

      this.dir = Math.floor(Math.random()*140)+200;
    }

    Dot.prototype.draw = function() {
      ctx.fillStyle = this.color;
      ctx.shadowBlur = this.r * 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
    }

    Dot.prototype.link = function() {
      if (this.id == 0) return;
      var previousDot1 = getPreviousDot(this.id, 1);
      var previousDot2 = getPreviousDot(this.id, 2);
      var previousDot3 = getPreviousDot(this.id, 3);
      if (!previousDot1) return;
      ctx.strokeStyle = this.linkColor;
      ctx.moveTo(previousDot1.x, previousDot1.y);
      ctx.beginPath();
      ctx.lineTo(this.x, this.y);
      if (previousDot2 != false) ctx.lineTo(previousDot2.x, previousDot2.y);
      if (previousDot3 != false) ctx.lineTo(previousDot3.x, previousDot3.y);
      ctx.stroke();
      ctx.closePath();
    }

    function getPreviousDot(id, stepback) {
      if (id == 0 || id - stepback < 0) return false;
      if (typeof dots[id - stepback] != "undefined") return dots[id - stepback];
      else return false;//getPreviousDot(id - stepback);
    }

    Dot.prototype.move = function() {
      this.a -= this.aReduction;
      if (this.a <= 0) {
        this.die();
        return
      }
      this.color = "rgba(255,255,255,"+this.a+")";
      this.linkColor = "rgba(255,255,255,"+this.a/4+")";
      this.x = this.x + Math.cos(degToRad(this.dir))*this.speed,
      this.y = this.y + Math.sin(degToRad(this.dir))*this.speed;

      this.draw();
      this.link();
    }

    Dot.prototype.die = function() {
        dots[this.id] = null;
        delete dots[this.id];
    }


    var canvas  = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      WIDTH,
      HEIGHT,
      mouseMoving = false,
      mouseMoveChecker,
      mouseX,
      mouseY,
      stars = [],
      initStarsPopulation = 80,
      dots = [],
      dotsMinDist = 2,
      maxDistFromCursor = 50;

    setCanvasSize();
    init();

    function setCanvasSize() {
      WIDTH = document.documentElement.clientWidth,
        HEIGHT = document.documentElement.clientHeight;

      canvas.setAttribute("width", WIDTH);
      canvas.setAttribute("height", HEIGHT);
    }

    function init() {
      ctx.strokeStyle = "white";
      ctx.shadowColor = "white";
      for (var i = 0; i < initStarsPopulation; i++) {
        stars[i] = new Star(i, Math.floor(Math.random()*WIDTH), Math.floor(Math.random()*HEIGHT));
        //stars[i].draw();
      }
      ctx.shadowBlur = 0;
      animate();
    }

    function animate() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        for (var i in stars) {
          stars[i].move();
        }
        for (var i in dots) {
          dots[i].move();
        }
        drawIfMouseMoving();
        requestAnimationFrame(animate);
    }

    window.onmousemove = function(e){
      mouseMoving = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
      clearInterval(mouseMoveChecker);
      mouseMoveChecker = setTimeout(function() {
        mouseMoving = false;
      }, 100);
    }


    function drawIfMouseMoving(){
      if (!mouseMoving) return;

      if (dots.length == 0) {
        dots[0] = new Dot(0, mouseX, mouseY);
        dots[0].draw();
        return;
      }

      var previousDot = getPreviousDot(dots.length, 1);
      var prevX = previousDot.x;
      var prevY = previousDot.y;

      var diffX = Math.abs(prevX - mouseX);
      var diffY = Math.abs(prevY - mouseY);

      if (diffX < dotsMinDist || diffY < dotsMinDist) return;

      var xVariation = Math.random() > .5 ? -1 : 1;
      xVariation = xVariation*Math.floor(Math.random()*maxDistFromCursor)+1;
      var yVariation = Math.random() > .5 ? -1 : 1;
      yVariation = yVariation*Math.floor(Math.random()*maxDistFromCursor)+1;
      dots[dots.length] = new Dot(dots.length, mouseX+xVariation, mouseY+yVariation);
      dots[dots.length-1].draw();
      dots[dots.length-1].link();
    }
    //setInterval(drawIfMouseMoving, 17);

    function degToRad(deg) {
      return deg * (Math.PI / 180);
    }
    </script>
</body>
</html>
