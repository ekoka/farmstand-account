// components
import Index from '@/components/'
import Login from '@/components/auth/login'
import Registration from '@/components/auth/registration'
import PasscodeSignin from '@/components/auth/passcode-signin'
import Activate from '@/components/auth/activate'
import Tenant from '@/components/auth/tenant'

export default {
    name: 'Index', 
    path: '/',
    component: Index,
    children: [
        {
            path: 'login',  
            name: 'Login',
            component: Login,
            props:true
        },
        {
            path: 'register',
            name: 'Registration',
            component: Registration,
            props:true
        },
        {
            path: 'passcode-signin',
            name: 'PasscodeSignin',
            component: PasscodeSignin, 
            props: true,
        },
        {
            path: 'account-confirmation',
            name: 'AccountConfirmation',
            component: PasscodeSignin, 
            props: true,
        },
        {
            path: '/activate',
            name: 'Activate',
            component: Activate,
            props:true
        },
        {
            path: '/tenant',
            name: 'Tenant',
            component: Tenant
        },
    ],
}

