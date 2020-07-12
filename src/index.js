// we use requestAnimationFrame to be called by the browser before every repaint
let requestAnimationFrame;

// Get the top position of an element in the document
const getTop = function(element, start) {
  // return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
  if (element.nodeName === 'HTML') return -start;
  return element.getBoundingClientRect().top + start;
};

function getDefaultConfig() {
  return {
    duration: 500,
    offset: 0,
    container: window,
    updateHistory: true,
    easingFunction: null,
  };
}

const smoothScrollCtx = Symbol('smoothScrollCtx')

function _smoothScroll({ scrollTo, offset, duration, container, updateHistory, hash, easingFunction }) {
  if (!requestAnimationFrame) {
    requestAnimationFrame = window.requestAnimationFrame ||
    function(fn) {
      window.setTimeout(fn, 16);
    };
  }

  // Using the history api to solve issue: back doesn't work
  // most browser don't update :target when the history api is used:
  // THIS IS A BUG FROM THE BROWSERS.
  if (updateHistory && window.history.pushState && location.hash !== hash) window.history.pushState('', '', hash);


  const startPoint = container.scrollTop || window.pageYOffset;
  // Get the top position of an element in the document
  // return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
  let end = getTop(scrollTo, startPoint);

  // Ajusts offset from the end
  end += offset;

  const clock = Date.now();
  const easeFn = (typeof easingFunction === 'function' && easingFunction) || easeInOutCubic;
  const step = function() {
    // the time elapsed from the beginning of the scroll
    const elapsed = Date.now() - clock;
    // calculate the scroll position we should be in
    let position = end;
    if (elapsed < duration) {
      position = startPoint + (end - startPoint) * easeFn(elapsed / duration);

      requestAnimationFrame(step);
    } else if (updateHistory) {
      location.replace('#' + scrollTo.id);
      // this will cause the :target to be activated.
    }

    container === window ? container.scrollTo(0, position) : (container.scrollTop = position);
  };
  step();
}

const VueSmoothScroll = {
  install(Vue, config) {
    Vue.directive('smooth-scroll', {
      inserted(el, binding, vnode) {
        // Do not initialize smoothScroll when running server side, handle it in client
        // We do not want this script to be applied in browsers that do not support those
        // That means no smoothscroll on IE9 and below.
        if (typeof window !== 'object' || window.pageYOffset === undefined) return;

        let resolvedConfig = Object.assign({}, getDefaultConfig());
        if (config) {
          Object.assign(resolvedConfig, config);
        }

        let { duration, offset, container, updateHistory, easingFunction } = binding.value || {};
        duration = duration || resolvedConfig.duration;
        offset = offset || resolvedConfig.offset;
        container = container || resolvedConfig.container;
        updateHistory = updateHistory !== undefined ? updateHistory : resolvedConfig.updateHistory;
        easingFunction = easingFunction || resolvedConfig.easingFunction;

        if (typeof container === 'string') {
          container = document.querySelector(container);
        }

        const clickHandler = function(ev) {
          ev.preventDefault();
          const hash = vnode.data.attrs.href;
          const scrollTo = document.getElementById(hash.substring(1));
          if (!scrollTo) return; // Do not scroll to non-existing node

          _smoothScroll({ scrollTo, offset, duration, container, updateHistory, hash, easingFunction });
        }
        // Attach the smoothscroll function
        el.addEventListener('click', clickHandler);

        el[smoothScrollCtx] = {
          clickHandler
        }
      },
      unbind(el) {
        el.removeEventListener('click', el[smoothScrollCtx].clickHandler)
        el[smoothScrollCtx] = null
      }
    });

    Vue.prototype.$smoothScroll = (args) => {
      const resolvedArgs = Object.assign({}, getDefaultConfig(), config, args);
      return _smoothScroll(resolvedArgs)
    }
  }
};

export default VueSmoothScroll

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueSmoothScroll)
}

/**
 * ease in out function
 * @see https://gist.github.com/gre/1650294
 */
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}
