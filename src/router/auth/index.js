// components
import Index from '@/components/'
import Login from '@/components/auth/login'
import Registration from '@/components/auth/registration'
import PasscodeLogin from '@/components/auth/passcode-login'
import Activate from '@/components/auth/activate'

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
            name: 'PasscodeLogin',
            component: PasscodeLogin, 
            props: true,
        },
        {
            path: 'account-confirmation',
            name: 'AccountConfirmation',
            component: PasscodeLogin, 
            props: true,
        },
        {
            path: '/activate',
            name: 'Activate',
            component: Activate,
            props:true
        },
    ],
}

