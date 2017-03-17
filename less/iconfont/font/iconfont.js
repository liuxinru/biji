;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-apple" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M673.73995 163.499557c38.391443-43.334341 64.321663-103.544921 57.267236-163.499557-55.331667 2.079536-122.324735 34.23237-162.059878 77.518722-35.592067 38.407439-66.705132 99.593801-58.386986 158.460681C572.306558 240.458404 635.300517 206.753916 673.73995 163.499557zM812.269073 544.118721c-1.375693-129.715088 113.638671-191.909225 118.805519-195.044526-64.641592-87.964394-165.355144-100.041702-201.171161-101.417395-85.644911-8.094196-167.178737 46.949535-210.657047 46.949535-43.366334 0-110.471377-45.765799-181.495546-44.59806-93.419178 1.295711-179.511988 50.56473-227.597271 128.419377-97.018376 156.653083-24.826466 388.825334 69.728458 515.980993 46.229696 62.162145 101.337413 132.08256 173.641297 129.523131 69.696465-2.55943 96.0106-41.942651 180.231828-41.942651 84.285214 0 107.911947 41.942651 181.623518 40.64694 74.943296-1.263718 122.452706-63.329884 168.314484-125.715979 53.07617-72.207906 74.911303-142.144317 76.223011-145.663533C958.236538 750.50472 813.772738 698.980204 812.269073 544.118721z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)