import { AuthLayout, DefaultLayout } from './layouts'

export const publicRoute = [
  {
    path: '*',
    component: () => import('./views/error/not-found.vue'),
  },
  {
    path: '/auth',
    component: AuthLayout,
    meta: { title: 'Login' },
    redirect: '/auth/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        meta: { title: 'Login' },
        component: () => import('./views/auth/login.vue'),
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    meta: { title: 'Not Found' },
    component: () => import('./views/error/not-found.vue'),
  },
  {
    path: '/500',
    name: '500',
    meta: { title: 'Server Error' },
    component: () => import('./views/error/error.vue'),
  },
]

export const protectedRoute = [
  {
    path: '/',
    component: DefaultLayout,
    meta: { title: 'Home', group: 'main', icon: '' },
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
    meta: { title: 'Forms', group: 'form', icon: '' },
    children: [
      {
        path: '',
        meta: { title: 'Forms', group: 'form', icon: 'dashboard' },
        name: 'forms',
        component: () => import('./views/form/form-list.vue'),
      },
      {
        path: 'new',
        meta: { title: 'New form', group: 'form', icon: 'dashboard' },
        name: 'new-form',
        component: () => import('./views/form/form-editor.vue'),
      },
    ],
  },
]
