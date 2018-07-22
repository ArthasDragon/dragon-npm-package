import Main from '@components/Main'
import Error from '@components/Error'
import localMerchant from './localMerchant'

export default [
  {
    path: '/',
    component: Main,
    indexRoute: {
      onEnter(ns, replace) {
        replace('/localMerchant')
      }
    },
    childRoutes: [localMerchant]
  },
  {
    path: '*',
    component: Error
  }
]
