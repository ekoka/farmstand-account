const CatalogIndex= ()=>import( '@/components/account/catalogs')
const  CatalogItem= ()=>import( '@/components/account/catalogs/item')
const  CatalogSettings= ()=>import( '@/components/account/catalogs/settings')
const  CatalogList= ()=>import( '@/components/account/catalogs/list')

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
