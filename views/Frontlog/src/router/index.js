import Vue from 'vue'
import Router from 'vue-router'
import Blog from '@/components/Blog'
import BlogHome from '@/components/BlogHome'
import BlogWrite from '@/components/BlogWrite'
import BlogFavorited from '@/components/BlogFavorited'
import BlogWritedByUser from '@/components/BlogWritedByUser'
import Meta from 'vue-meta'
Vue.use(Router)
Vue.use(Meta)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'blog-home',
      component: BlogHome
    },
    {
      path: '/blog/:id',
      name: 'blog',
      component: Blog
    },
    {
      path: '/blog-home',
      name: 'blog-home',
      component: BlogHome
    },
    {
      path: '/write',
      name: 'blog-write',
      component: BlogWrite
    },
    {
      path: '/user/favorited-post',
      name: 'blog-favorited',
      component: BlogFavorited
    },
    {
      path: '/user/my-post',
      name: 'blog-writed-by-user',
      component: BlogWritedByUser
    }
  ],
  mode: 'history'
})
