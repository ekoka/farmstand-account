import CatalogIndex from '@/components/account/catalogs'
import CatalogItem from '@/components/account/catalogs/item'
import CatalogSettings from '@/components/account/catalogs/settings'
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
            path: 'new',
            component: CatalogItem,
        },
        {
            path: ':domain',
            name: 'CatalogSettings',
            component: CatalogSettings,
        },
    ],
}
