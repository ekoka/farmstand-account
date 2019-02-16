import CatalogIndex from '@/components/account/catalogs'
import CatalogItem from '@/components/account/catalogs/item'
import CatalogList from '@/components/account/catalogs/list'

export default {
    path: 'catalogs',
    component: CatalogIndex,
    children: [
        {
            name: 'CatalogList',
            path: '',
            component: CatalogList,
        },
        {
            name: 'CatalogItem',
            path: 'catalogs/new',
            component: CatalogItem,
        },
    ],
}
