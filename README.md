# Vue2 Smooth Scroll
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Vue 2.x](https://img.shields.io/badge/Vue-2.x-brightgreen.svg)](https://vuejs.org/v2/guide/)
[![npm](https://img.shields.io/npm/v/vue2-smooth-scroll.svg)](https://www.npmjs.com/package/vue2-smooth-scroll)
[![npm-downloades](https://img.shields.io/npm/dm/vue2-smooth-scroll.svg)](https://www.npmjs.com/package/vue2-smooth-scroll)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Yuliang-Lee/vue2-smooth-scroll/blob/master/LICENSE)

Lightweight Vue plugin for smooth-scrolling extended from [vue-smooth-scroll](https://github.com/alamcordeiro/vue-smooth-scroll).

For simple use-cases, the native [`scroll-behavior` CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior) (working draft) may be enough.


## Features

- Directive and programmatic API with global and local config overrides
- SSR
- Smooth, non-blocking animation using `requestAnimationFrame` (with fallback)
- Y-axis or vertical scrolling
- Specific scroll containers
- 1.3kB gzipped, 2.9kB min


## Installation
``` bash
npm install --save vue2-smooth-scroll
```

``` js
import VueSmoothScroll from 'vue2-smooth-scroll'
Vue.use(VueSmoothScroll)
```


## Usage
### Directive
``` html
<a href="#sec-3" v-smooth-scroll>Section 3</a>

<section id="sec-3"></section>
```

### Programmatic
``` js
const myEl = this.$refs.myEl || this.$el || document.getElementById(...)

this.$smoothScroll({
  scrollTo: myEl,
  hash: '#sampleHash'  // required if updateHistory is true
})
```

### Direct in `<script>`
``` html
<body>
  <div id="app">
    <a href="#bottom" v-smooth-scroll>Let's go to #bottom!</a>
    <div style="height: 2000px;"></div>
    <span id="bottom">bottom</span>
  </div>

  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/vue2-smooth-scroll"></script>
  <script>
    var app = new Vue({
      el: '#app'
    })
  </script>
</body>
```


## Custom options
### Defaults
``` js
{
  duration: 500,       // animation duration in ms
  offset: 0,           // offset in px from scroll element, can be positive or negative
  container: '',       // selector string or Element for scroll container, default is window
  updateHistory: true  // whether to push hash to history
  easingFunction: null // gives the ability to provide a custom easing function `t => ...`
                       // (see https://gist.github.com/gre/1650294 for examples)
                       // if nothing is given, it will defaults to `easeInOutCubic`
}
```

### Global
``` js
import VueSmoothScroll from 'vue2-smooth-scroll'

Vue.use(VueSmoothScroll, {
  duration: 400,
  updateHistory: false,
})
```

### Directive:
``` html
<div id="container">
  <a href="#div-id" v-smooth-scroll="{ duration: 1000, offset: -50, container: '#container' }">Anchor</a>

  <div id="div-id"></div>
</div>
```

### Programmatic
``` js
this.$smoothScroll({
  scrollTo: this.$refs.myEl,
  duration: 1000,
  offset: -50,
})
```


## License

[MIT](./LICENSE)


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/jwhitmarsh"><img src="https://avatars2.githubusercontent.com/u/8026009?v=4" width="100px;" alt=""/><br /><sub><b>James</b></sub></a><br /><a href="https://github.com/Yuliang-Lee/vue2-smooth-scroll/commits?author=jwhitmarsh" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/a-kriya"><img src="https://avatars3.githubusercontent.com/u/26761352?v=4" width="100px;" alt=""/><br /><sub><b>a-kriya</b></sub></a><br /><a href="https://github.com/Yuliang-Lee/vue2-smooth-scroll/commits?author=a-kriya" title="Code">💻</a> <a href="https://github.com/Yuliang-Lee/vue2-smooth-scroll/issues?q=author%3Aa-kriya" title="Bug reports">🐛</a> <a href="https://github.com/Yuliang-Lee/vue2-smooth-scroll/commits?author=a-kriya" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
