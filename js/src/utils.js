/* global NexT: true */

NexT.utils = NexT.$u = {
  /**
   * Wrap images with fancybox support.
   */
  wrapImageWithFancyBox: function () {
    $('.content img')
      .not('[hidden]')
      .not('.group-picture img, .post-gallery img')
      .each(function () {
        var $image = $(this);
        var imageTitle = $image.attr('title');
        var $imageWrapLink = $image.parent('a');

        if ($imageWrapLink.size() < 1) {
          $imageWrapLink = $image.wrap('<a href="' + this.getAttribute('src') + '"></a>').parent('a');
        }

        $imageWrapLink.addClass('fancybox fancybox.image');
        $imageWrapLink.attr('rel', 'group');

        if (imageTitle) {
          $imageWrapLink.append('<p class="image-caption">' + imageTitle + '</p>');

          //make sure img title tag will show correctly in fancybox
          $imageWrapLink.attr('title', imageTitle);
        }
      });

    $('.fancybox').fancybox({
      helpers: {
        overlay: {
          locked: false
        }
      }
    });
  },

  lazyLoadPostsImages: function () {
    $('#posts').find('img').lazyload({
      placeholder: '/images/loading.gif',
      effect: 'fadeIn'
    });
  },

  registerESCKeyEvent: function () {
    $(document).on('keyup', function (event) {
      var shouldDismissSearchPopup = event.which === 27 &&
        $('.search-popup').is(':visible');
      if (shouldDismissSearchPopup) {
        $('.search-popup').hide();
        $('.search-popup-overlay').remove();
        $('body').css('overflow', '');
      }
    });
  },

  registerBackToTop: function () {
    var THRESHOLD = 50;
    var $top = $('.back-to-top');

    $(window).on('scroll', function () {
      $top.toggleClass('back-to-top-on', window.pageYOffset > THRESHOLD);

      var scrollTop = $(window).scrollTop();
      var docHeight = $(document).height();
      var winHeight = $(window).height();
      var scrollPercent = (scrollTop) / (docHeight - winHeight);
      var scrollPercentRounded = Math.round(scrollPercent*100);
      $('#scrollpercent>span').html(scrollPercentRounded);
    });

    $top.on('click', function () {
      $('body').velocity('scroll');
    });
  },

  /**
   * Transform embedded video to support responsive layout.
   * @see http://toddmotto.com/fluid-and-responsive-youtube-and-vimeo-videos-with-fluidvids-js/
   */
  embeddedVideoTransformer: function () {
    var $iframes = $('iframe');

    // Supported Players. Extend this if you need more players.
    var SUPPORTED_PLAYERS = [
      'www.youtube.com',
      'player.vimeo.com',
      'player.youku.com',
      'music.163.com',
      'www.tudou.com'
    ];
    var pattern = new RegExp( SUPPORTED_PLAYERS.join('|') );

    $iframes.each(function () {
      var iframe = this;
      var $iframe = $(this);
      var oldDimension = getDimension($iframe);
      var newDimension;

      if (this.src.search(pattern) > 0) {

        // Calculate the video ratio based on the iframe's w/h dimensions
        var videoRatio = getAspectRadio(oldDimension.width, oldDimension.height);

        // Replace the iframe's dimensions and position the iframe absolute
        // This is the trick to emulate the video ratio
        $iframe.width('100%').height('100%')
          .css({
            position: 'absolute',
            top: '0',
            left: '0'
          });


        // Wrap the iframe in a new <div> which uses a dynamically fetched padding-top property
        // based on the video's w/h dimensions
        var wrap = document.createElement('div');
        wrap.className = 'fluid-vids';
        wrap.style.position = 'relative';
        wrap.style.marginBottom = '20px';
        wrap.style.width = '100%';
        wrap.style.paddingTop = videoRatio + '%';

        // Add the iframe inside our newly created <div>
        var iframeParent = iframe.parentNode;
        iframeParent.insertBefore(wrap, iframe);
        wrap.appendChild(iframe);

        // Additional adjustments for 163 Music
        if (this.src.search('music.163.com') > 0) {
          newDimension = getDimension($iframe);
          var shouldRecalculateAspect = newDimension.width > oldDimension.width ||
                                        newDimension.height < oldDimension.height;

          // 163 Music Player has a fixed height, so we need to reset the aspect radio
          if (shouldRecalculateAspect) {
            wrap.style.paddingTop = getAspectRadio(newDimension.width, oldDimension.height) + '%';
          }
        }
      }
    });

    function getDimension($element) {
      return {
        width: $element.width(),
        height: $element.height()
      };
    }

    function getAspectRadio(width, height) {
      return height / width * 100;
    }
  },

  /**
   * Add `menu-item-active` class name to menu item
   * via comparing location.path with menu item's href.
   */
  addActiveClassToMenuItem: function () {
    var path = window.location.pathname;
    path = path === '/' ? path : path.substring(0, path.length - 1);
    $('.menu-item a[href="' + path + '"]').parent().addClass('menu-item-active');
  },

  hasMobileUA: function () {
    var nav = window.navigator;
    var ua = nav.userAgent;
    var pa = /iPad|iPhone|Android|Opera Mini|BlackBerry|webOS|UCWEB|Blazer|PSP|IEMobile|Symbian/g;

    return pa.test(ua);
  },

  isTablet: function () {
    return window.screen.width < 992 && window.screen.width > 767 && this.hasMobileUA();
  },

  isMobile: function () {
    return window.screen.width < 767 && this.hasMobileUA();
  },

  isDesktop: function () {
    return !this.isTablet() && !this.isMobile();
  },

  /**
   * Escape meta symbols in jQuery selectors.
   *
   * @param selector
   * @returns {string|void|XML|*}
   */
  escapeSelector: function (selector) {
    return selector.replace(/[!"$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, '\\$&');
  },

  displaySidebar: function () {
    if (!this.isDesktop() || this.isPisces()) {
      return;
    }
    $('.sidebar-toggle').trigger('click');
  },

  isMist: function () {
    return CONFIG.scheme === 'Mist';
  },

  isPisces: function () {
    return CONFIG.scheme === 'Pisces';
  },

  getScrollbarWidth: function () {
    var $div = $('<div />').addClass('scrollbar-measure').prependTo('body');
    var div = $div[0];
    var scrollbarWidth = div.offsetWidth - div.clientWidth;

    $div.remove();

    return scrollbarWidth;
  },

  /**
   * Affix behaviour for Sidebar.
   *
   * @returns {Boolean}
   */
  needAffix: function () {
    return this.isPisces();
  }
};

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
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Circle = function () {
  function Circle(x, y) {
    _classCallCheck(this, Circle);

    this.x = x;
    this.y = y;
    this.r = Math.random() * 10;
    this._mx = Math.random();
    this._my = Math.random();
  }

  _createClass(Circle, [{
    key: 'drawCircle',
    value: function drawCircle(ctx) {
      ctx.beginPath();
      //arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
      ctx.arc(this.x, this.y, this.r, 0, 360);
      ctx.closePath();
      ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
      ctx.fill();
    }
  }, {
    key: 'drawLine',
    value: function drawLine(ctx, _circle) {
      var dx = this.x - _circle.x;
      var dy = this.y - _circle.y;
      var d = Math.sqrt(dx * dx + dy * dy);
      if (d < 150) {
        ctx.beginPath();

        ctx.moveTo(this.x, this.y); //起始点
        ctx.lineTo(_circle.x, _circle.y); //终点
        ctx.closePath();
        ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)';
        ctx.stroke();
      }
    }


  }, {
    key: 'move',
    value: function move(w, h) {
      this._mx = this.x < w && this.x > 0 ? this._mx : -this._mx;
      this._my = this.y < h && this.y > 0 ? this._my : -this._my;
      this.x += this._mx / 2;
      this.y += this._my / 2;
    }
  }]);

  return Circle;
}();



var currentCirle = function (_Circle) {
  _inherits(currentCirle, _Circle);

  function currentCirle(x, y) {
    _classCallCheck(this, currentCirle);

    return _possibleConstructorReturn(this, (currentCirle.__proto__ || Object.getPrototypeOf(currentCirle)).call(this, x, y));
  }

  _createClass(currentCirle, [{
    key: 'drawCircle',
    value: function drawCircle(ctx) {
      ctx.beginPath();

      //this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2;
      this.r = 8;
      ctx.arc(this.x, this.y, this.r, 0, 360);
      ctx.closePath();
      //ctx.fillStyle = 'rgba(0,0,0,' + (parseInt(Math.random() * 100) / 100) + ')'
      ctx.fillStyle = 'rgba(255, 77, 54, 0.6)';
      ctx.fill();
    }
  }]);

  return currentCirle;
}(Circle);


window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var w = canvas.width = canvas.offsetWidth;
var h = canvas.height = canvas.offsetHeight;
var circles = [];
var current_circle = new currentCirle(0, 0);

var draw = function draw() {
  ctx.clearRect(0, 0, w, h);
  for (var i = 0; i < circles.length; i++) {
    circles[i].move(w, h);
    circles[i].drawCircle(ctx);
    for (j = i + 1; j < circles.length; j++) {
      circles[i].drawLine(ctx, circles[j]);
    }
  }
  if (current_circle.x) {
    current_circle.drawCircle(ctx);
    for (var k = 1; k < circles.length; k++) {
      current_circle.drawLine(ctx, circles[k]);
    }
  }
  requestAnimationFrame(draw);
};

var init = function init(num) {
  for (var i = 0; i < num; i++) {
    circles.push(new Circle(Math.random() * w, Math.random() * h));
  }
  draw();
};
window.addEventListener('load', init(60));
window.onmousemove = function (e) {
  e = e || window.event;
  current_circle.x = e.clientX;
  current_circle.y = e.clientY;
};
window.onmouseout = function () {
  current_circle.x = null;
  current_circle.y = null;
};
