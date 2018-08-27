import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
require('vuetify/src/stylus/app.styl')
 
import {
  Vuetify,
  VApp,
  VAutocomplete,
  VBtn,
  VCard,
  VGrid,
  VList,
  VProgressCircular,
  VTextField,
  VToolbar,
  VIcon,
  VNavigationDrawer
} from 'vuetify';

import { Resize } from 'vuetify/es5/directives'

Vue.use(Vuetify, {
  components: {
    VApp,
    VAutocomplete,
    VBtn,
    VCard,
    VGrid,
    VList,
    VProgressCircular,
    VTextField,
    VToolbar,
    VIcon,
    VNavigationDrawer
  },
  directives:{
    Resize
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
