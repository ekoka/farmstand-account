import Index from '@/components/account/billing'
import List from '@/components/account/billing/list'
import PaymentMethod from '@/components/account/billing/payment-method'
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
        {
            name: 'PaymentMethod',
            component: PaymentMethod,
            path: 'payment-method/:payment_method_id',
            props: true,
                
        },
        {
            name: 'NewPaymentMethod',
            path: 'payment-method/new',
            component: PaymentMethod,
        },
        //{
        //    name: 'Transaction',
        //    path: 'make-payment',
        //    component: Transaction,
        //}
    ],
}
