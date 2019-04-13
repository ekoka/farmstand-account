const Index= ()=>import( '@/components/account/profile')
const  Card= ()=>import( '@/components/account/profile/card')
const  Edit= ()=>import( '@/components/account/profile/edit')

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
