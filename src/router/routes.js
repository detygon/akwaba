import { AuthLayout, DefaultLayout } from './layouts'

export const publicRoute = [
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
    path: '*',
    component: () => import('./views/error/not-found.vue'),
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
    meta: { title: 'Forms' },
    redirect: { name: 'forms' },
    children: [
      {
        path: 'all',
        meta: { title: 'List forms', group: 'form', icon: 'dashboard' },
        name: 'forms',
        component: () => import('./views/form/form-list.vue'),
      },
      {
        path: 'new',
        meta: { title: 'New form', group: 'form', icon: 'dashboard' },
        name: 'new-form',
        hidden: true,
        component: () => import('./views/form/form-editor.vue'),
        props: (route) => ({ form: route.params.form || {} }),
      },
      {
        path: ':id',
        meta: { title: 'Add data', group: 'form', icon: 'dashboard' },
        name: 'data-entry',
        hidden: true,
        component: () => import('./views/data-entry.vue'),
      },
    ],
  },
]
