import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'

const Home = () => import('@/views/Home')
const House = () => import('@/views/House')
const Info = () => import('@/views/Info')
const My = () => import('@/views/My')
const Login = () => import('@/views/Login')
const City = () => import('@/views/Home/City')
const Detail = () => import('@/views/House/components/Detail.vue')
const Add = () => import('@/views/Rent/add.vue')
const Search = () => import('@/views/Search')
const Rent = () => import('@/views/Rent/rent.vue')
const Favorate = () => import('@/views/Rent/favorate.vue')
const Map = () => import('@/views/Map')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: '/home', component: Home },
      {
        path: '/home/house',
        component: House
      },
      { path: '/home/info', component: Info },
      { path: '/home/my', component: My, name: 'my' }

    ]
  },
  {
    path: '/login', component: Login
  },
  { path: '/city', component: City, name: 'city' },
  { path: '/detail/:houseCode', component: Detail, name: 'detail', props: true },
  { path: '/add', component: Add, name: 'add', props: true },
  { path: '/search', name: 'search', component: Search },
  { path: '/rent', name: 'rent', component: Rent },
  { path: '/favorate', name: 'favorate', component: Favorate },
  { path: '/map', name: 'map', component: Map }
]

const router = new VueRouter({
  routes
})

export default router
