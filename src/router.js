import { createRouter, createWebHashHistory } from 'vue-router'
import CountriesPage from './pages/CountriesPage.vue'
import CountryDetailPage from './pages/CountryDetailPage.vue'
import WeatherPage from './pages/WeatherPage.vue'

const routes = [
  { path: '/', component: CountriesPage },
  { path: '/countries', component: CountriesPage },
  { path: '/country/:code', component: CountryDetailPage, props: true },
  { path: '/weather', component: WeatherPage }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
