import Account from '@/components/account'
import Catalog from './catalogs'
import Profile from './profile'
import Billing from './billing'

export default {
    path: '/account',
    name: 'Account',
    component: Account,
    children: [
        Catalog,
        Profile,
        Billing,
    ],
}
