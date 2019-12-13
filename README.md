# Vue2 Smooth Scroll

[![Vue 2.x](https://img.shields.io/badge/Vue-2.x-brightgreen.svg)](https://vuejs.org/v2/guide/)
[![npm](https://img.shields.io/npm/v/vue2-smooth-scroll.svg)](https://www.npmjs.com/package/vue2-smooth-scroll)
[![npm-downloades](https://img.shields.io/npm/dm/vue2-smooth-scroll.svg)](https://www.npmjs.com/package/vue2-smooth-scroll)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Yuliang-Lee/vue2-smooth-scroll/blob/master/LICENSE)

> Simple vue smooth scroll extended from [vue-smooth-scroll](https://github.com/alamcordeiro/vue-smooth-scroll)

## Features

- **fixed SSR**
- fixed `duration` problem, now animation work good.
- support **scroll down** and **scroll up**
- support specific scroll container
- Optimize code

## Instalation
``` bash
# install dependency
npm install --save vue2-smooth-scroll
```

``` javascript
// import on your project (less then 1KB gziped)
import vueSmoothScroll from 'vue2-smooth-scroll'
Vue.use(vueSmoothScroll)
```

## Directive usage
``` html
<a href="#div-id" v-smooth-scroll>Anchor</a>
<div id="div-id"></div>
```

## Programmatic usage
``` js
const exampleElement = this.$refs.exampleElement || this.$el || document.getElementById(...)
this.$smoothScroll({
  scrollTo: exampleElement,
  hash: '#exampleHash' // only required if updateHistory is true
  ... // optional overrides for global config
})
```

## Custom options
### Defaults
``` js
  {
    duration: 500, // Animation speed
    offset: 0, // Offset from element, you can use positive or negative values
    container: '', // the scroll container, default is window,use document.querySelector to query the Element,
    updateHistory: true //Push hash to history or not
  }
```
### Example:
``` html
<div id="container">
  <a href="#div-id" v-smooth-scroll="{ duration: 1000, offset: -50, container: '#container', updateHistory: false }">Anchor</a>
  <div id="div-id"></div>
</div>
```


### Without Browserify or Webpack
``` html
<body>
  <div id="app">
    <a href="#bottom" v-smooth-scroll>click me will scroll to bottom!</a>
    <div style="height: 2000px;"></div>
    <span id="bottom">bottom</span>
  </div>
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/vue2-smooth-scroll"></script>
  <script>
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
  })
</script>
</body>
```

## License

[MIT](./LICENSE)
