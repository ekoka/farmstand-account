// components
const Index= ()=>import( '@/components/auth')
const Login= ()=>import( '@/components/auth/login')
const Logout= ()=>import( '@/components/auth/logout')
const Registration= ()=>import( '@/components/auth/registration')
const PasscodeLogin= ()=>import( '@/components/auth/passcode-login')
const Activate= ()=>import( '@/components/auth/activate')

export default {
    name: 'AuthIndex', 
    path: '',
    component: Index,
    children: [
        {
            path: '/login',  
            name: 'Login',
            component: Login,
            props:true
        },
        {
            path: '/logout',  
            name: 'Logout',
            component: Logout,
            props:true
        },
        {
            path: '/register',
            name: 'Registration',
            component: Registration,
            props:true
        },
        {
            path: '/passcode-signin',
            name: 'PasscodeLogin',
            component: PasscodeLogin, 
            props: true,
        },
        {
            path: '/account-confirmation',
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

