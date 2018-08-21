/* eslint-disable no-unused-vars */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// Require Froala Editor js file.
require('froala-editor/js/froala_editor.pkgd.min')
// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css')
require('font-awesome/css/font-awesome.css')
require('froala-editor/css/froala_style.min.css')
import Vue from 'vue'
import App from './App'
import router from './router'
import jQuery from 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import VueFroala from 'vue-froala-wysiwyg'
import VueLocalStorage from 'vue-localstorage'
import Paginate from 'vuejs-paginate'
global.jQuery = jQuery
global.$ = jQuery
let Bootstrap = require('bootstrap')
Vue.config.productionTip = false
Vue.component('paginate', Paginate)
Vue.use(VueFroala)
Vue.use(VueLocalStorage)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
