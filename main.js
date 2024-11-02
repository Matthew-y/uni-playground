import App from './App'
import uviewPlus from '@/uni_modules/uview-plus'
import i18nConfig from './utils/i18n'
import router from './router'

// #ifndef VUE3
import Vue from 'vue'
const i18n = new VueI18n(i18nConfig)
import './uni.promisify.adaptor'
Vue.config.productionTip = false
Vue.use(router)
App.mpType = 'app'
const app = new Vue({
  ...App,
  i18n,
  uviewPlus
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { createI18n } from 'vue-i18n'// v9.x
export function createApp() {
  const app = createSSRApp(App)
  app.use(createI18n(i18nConfig))
  app.use(uviewPlus)
  app.use(router)
  return {
    app
  }
}
// #endif