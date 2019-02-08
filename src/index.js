// Get the top position of an element in the document
const getTop = function(element, start) {
  // return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
  if (element.nodeName === 'HTML') return -start;
  return element.getBoundingClientRect().top + start;
};
export default {
  install(Vue) {
    Vue.directive('smooth-scroll', {
      inserted(el, binding) {
        // Do not initialize smoothScroll when running server side, handle it in client
        // We do not want this script to be applied in browsers that do not support those
        // That means no smoothscroll on IE9 and below.
        if (typeof window !== 'object' || window.pageYOffset === undefined) return;

        const defaultValue = {
          duration: 500,
          offset: 0,
          container: window
        };

        // we use requestAnimationFrame to be called by the browser before every repaint
        const requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
        function(fn) {
          window.setTimeout(fn, 16);
        };

        let { duration, offset, container } = binding.value;
        duration = duration || defaultValue.duration;
        offset = offset || defaultValue.offset;
        container = container || defaultValue.container;

        if (typeof container === 'string') {
          container = document.querySelector(container);
        }

        // Attach the smoothscroll function
        el.addEventListener('click', function(ev) {
          ev.preventDefault();
          const scrollTo = document.getElementById(this.hash.substring(1));
          if (!scrollTo) return; // Do not scroll to non-existing node

          // Using the history api to solve issue: back doesn't work
          // most browser don't update :target when the history api is used:
          // THIS IS A BUG FROM THE BROWSERS.
          if (window.history.pushState && location.hash !== this.hash) window.history.pushState('', '', this.hash);


          const startPoint = container.scrollTop || window.pageYOffset;
          // Get the top position of an element in the document
          // return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
          let end = getTop(scrollTo, startPoint);

          // Ajusts offset from the end
          end += offset;

          const clock = Date.now();
          const step = function() {
            // the time elapsed from the beginning of the scroll
            const elapsed = Date.now() - clock;
            // calculate the scroll position we should be in
            let position = end;
            if (elapsed < duration) {
              position = startPoint + (end - startPoint) * easeInOutCubic(elapsed / duration);

              requestAnimationFrame(step);
            } else {
              location.replace('#' + scrollTo.id);
              // this will cause the :target to be activated.
            }

            container === window ? container.scrollTo(0, position) : (container.scrollTop = position);
          };
          step();
        });
      }
    });
  }
};

/**
 * ease in out function
 * @see https://gist.github.com/gre/1650294
 */
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}
