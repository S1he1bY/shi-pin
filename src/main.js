import { createApp } from 'vue'
import './style.css'
import './assets/iconfont/iconfont'
import App from './App.vue'
import router from './router'
import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css
import { ShareSheet } from 'vant';

const app = createApp(App)

app.use(router)
app.mount('#app')
app.use(vue3videoPlay)
app.use(ShareSheet);