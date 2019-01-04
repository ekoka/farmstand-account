import Index from '@/components/'
import Login from '@/components/auth/login'
import Registration from '@/components/auth/registration'

export default {
    name: 'KISS', path:'/kiss', 
    component: Index,
    children: [
        {path: 'login',  name: 'Login', component: Login, props:true},
        {path: 'registration',  name: 'Registration', 
            component: Registration, props:true},
    ],
}
