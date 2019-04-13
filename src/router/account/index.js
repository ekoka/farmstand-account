const Account= ()=>import( '@/components/account')
const Authorize= ()=>import( '@/components/account/authorize')

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
        {
            component: Authorize,
            path: 'authorize',
            name: 'AccessToken',
        },
    ],
}
