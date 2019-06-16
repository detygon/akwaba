import { DefaultLayout } from './layouts'

export default [
  {
    path: '/',
    component: DefaultLayout,
    meta: { title: 'Home', authRequired: true },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { title: 'Dashboard', group: 'main', icon: 'dashboard' },
        component: () => import('./views/dashboard.vue'),
      },
    ],
  },
  {
    path: '/forms',
    component: DefaultLayout,
    meta: { title: 'Forms', authRequired: true },
    redirect: { name: 'forms' },
    children: [
      {
        path: 'all',
        meta: { title: 'List forms', group: 'form', icon: 'list' },
        name: 'forms',
        component: () => import('./views/form/form-list.vue'),
      },
      {
        path: 'builder',
        meta: { title: 'Form builder', group: 'form', icon: 'list' },
        name: 'form-builder',
        hidden: true,
        component: () => import('./views/form/form-builder.vue'),
      },
      {
        path: ':id/fill',
        meta: { title: 'Add data', group: 'form', icon: 'edit' },
        name: 'data-entry',
        hidden: true,
        component: () => import('./views/data-entry.vue'),
      },
      {
        path: ':id',
        meta: { title: 'Check data', group: 'form', icon: 'list' },
        name: 'data-list',
        hidden: true,
        component: () => import('./views/data-list.vue'),
      },
    ],
  },
  {
    path: '/statistics',
    component: DefaultLayout,
    meta: { title: 'Statistics', authRequired: true },
    redirect: { name: 'statistics' },
    children: [
      {
        path: 'explore',
        meta: { title: 'Explore dataset', group: 'form', icon: 'dashboard' },
        name: 'statistics',
        hidden: true,
        component: () => import('./views/statistics.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: 'Login' },
    component: () => import('./views/auth/login.vue'),
    hidden: true,
  },
  {
    path: '/register',
    name: 'register',
    meta: { title: 'Create an account' },
    component: () => import('./views/auth/registration.vue'),
    hidden: true,
  },
  {
    path: '*',
    component: () => import('./views/error/not-found.vue'),
  },
]
