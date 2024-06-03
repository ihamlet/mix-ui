/*-- univer css --*/
import '@univerjs/design/lib/index.css'
import '@univerjs/ui/lib/index.css'
import '@univerjs/docs-ui/lib/index.css'
import '@univerjs/sheets-ui/lib/index.css'
import '@univerjs/sheets-formula/lib/index.css'
import '@univerjs/sheets-data-validation/lib/index.css'
import '@univerjs/sheets-zen-editor/lib/index.css'
import '@univerjs/find-replace/lib/index.css'
import '@univerjs/sheets-conditional-formatting-ui/lib/index.css'
import '@univerjs/sheets-numfmt/lib/index.css'
/*-- global css --*/
import './style.less'
/*-- antd css --*/
import 'ant-design-vue/dist/reset.css'
/*-- remixicon css --*/
import 'remixicon/fonts/remixicon.css'
/*-- app --*/
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
