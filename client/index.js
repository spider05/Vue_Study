import Vue from 'vue'
import App from './app.vue'
import './plugins/element'

// import  './assets/styles/test.css';
// import './assets/styles/test2.styl';

const root = document.createElement('root')
document.body.appendChild(root)
new Vue({
  render: h => h(App)
}).$mount(root)
