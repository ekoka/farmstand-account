const Index= ()=>import( '@/components/account/billing')
const  List= ()=>import( '@/components/account/billing/list')
const  Transaction= ()=>import( '@/components/account/billing/transaction')

export default {
    path: 'billing',
    component: Index,
    children: [
        {
            path:'',
            name: 'Billing',
            component: List,
        },
        //{
        //    name: 'Transaction',
        //    path: 'make-payment',
        //    component: Transaction,
        //}
    ],
}
