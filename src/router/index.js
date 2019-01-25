import Vue from 'vue'
import VueRouter from 'vue-router'
import CategoryDetail from '../components/CategoryDetail.vue'
import NotFound from '../components/NotFound.vue'
import ViewCategoryList from '../components/ViewCategoryList.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode:'history',
    routes: [
        { path:'/', component: ViewCategoryList },
        { path: '/detail', component:  CategoryDetail},
        { path: '*', component: NotFound }
    ]
})

export default router