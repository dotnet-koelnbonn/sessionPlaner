import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/home/Home.vue';
import About from '@/views/About.vue';
import Speakers from '@/speakers/Speakers.vue';
import Speaker from '@/speakers/Speaker.vue';
import Sessions from '@/sessions/Sessions.vue';
import SessionDetail from '@/sessions/Session.vue';
import Favorites from '@/favorites/Favorites.vue';
import { Session } from 'inspector';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/speakers',
      name: 'speakers',
      component: Speakers
    },
    {
      path: '/speakers/:id',
      name: 'speaker',
      component: Speaker
    },
    {
      path: '/sessions',
      name: 'sessions',
      component: Sessions
    },
    {
      path: '/sessions/:id',
      name: 'onesession',
      component: SessionDetail
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites
    }
  ]
})



export default router;