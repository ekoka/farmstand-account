import Index from '@/components/account/profile'
import Card from '@/components/account/profile/card'
import Edit from '@/components/account/profile/edit'

export default {
    path: 'profile',
    component: Index,
    children: [
        {
            name: 'Profile',
            component: Card,
            path: '',
        },
        {
            name: 'EditProfile',
            component: Edit,
            path: 'edit',
        },
    ],
}
