import { createVaporApp, vaporInteropPlugin } from 'vue'
import App from './App.vue'
import { router } from './router'
import './styles'

const app = createVaporApp(App)
app.use(vaporInteropPlugin)
app.use(router)
app.mount('#app')
