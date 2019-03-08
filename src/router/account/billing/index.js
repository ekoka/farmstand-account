import Index from '@/components/account/billing'
import List from '@/components/account/billing/list'
import Transaction from '@/components/account/billing/transaction'

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
