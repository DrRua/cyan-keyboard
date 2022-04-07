import { createApp } from 'vue'
import router from '@/routes/routes'
import App from './App.vue'
import './styles/index.scss'
import components from './components'

const app = createApp(App)

app.use(router)
app.use(components)

app.mount('#app')
