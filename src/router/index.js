import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)

const routes = [
  {
    path: '/PopularMovie',
    name: 'PopularMovie',
    component: () => import(/* webpackChunkName: "PopularMovie" */ '../views/PopularMovie.vue')
  },
  {
    path: '/TopRated',
    name: 'TopRated',
    component: () => import(/* webpackChunkName: "TopRated" */ '../views/TopRated.vue')
  },
  {
    path: '/Movie/:id',
    name: 'Movie',
    component: () => import(/* webpackChunkName: "Movie" */ '../views/Movie.vue')
  },
  {
    path: '*',
    redirect: '/PopularMovie'
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
