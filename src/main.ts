import './style.less'
import 'ant-design-vue/dist/reset.css'
import 'remixicon/fonts/remixicon.css'
import App from './App.vue'
import Antd from 'ant-design-vue'
import Router from './router'
import { mockXHR } from './mock'

if (import.meta.env.MODE === 'mock') {
    // 判断是否为mock模式
    console.log(import.meta.env.MODE)
    mockXHR()
}

const pinia = createPinia()
createApp(App).use(pinia).use(Router).use(Antd).mount('#app')
