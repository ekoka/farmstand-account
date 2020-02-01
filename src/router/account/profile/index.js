const Index= ()=>import( '@/components/account/profile')
const  Card= ()=>import( '@/components/account/profile/card')
const  EditProfile= ()=>import( '@/components/account/profile/edit-profile')

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
            component: EditProfile,
            path: 'edit-profile',
        },
    ],
}
