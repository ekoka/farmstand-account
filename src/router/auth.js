// components
import Signin from '@/components/auth/signin'
import Signup from '@/components/auth/signup'

export default [
    {path: 'signin',  name: 'Signin', component: Signin, props:true},
    {path: 'signup',  name: 'Signup', component: Signup, props:true},
]
