import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '../components/HomeComponent.vue'
import TypingComponent from '../components/TypingComponent.vue'
import ResultComponent from '../components/ResultComponent.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent
  },
  {
    path: '/typing',
    name: 'Typing',
    component: TypingComponent
  },
  {
    path: '/result',
    name: 'Result',
    component: ResultComponent,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router