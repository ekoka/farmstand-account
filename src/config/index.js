const env = process.env
const cnf = Object.freeze({
    PROJECT_NAME: env.VUE_APP_PROJECT_NAME,
    PROJECT_INDEX: env.VUE_APP_PROJECT_INDEX,
    API_DOC: env.VUE_APP_API_DOC,
    API_HOST: env.VUE_APP_API_HOST,
    API_ROOT: env.VUE_APP_API_ROOT,
    API_PUBLIC_ROOT: env.VUE_APP_API_PUBLIC_ROOT,
    ID_TOKEN_COOKIE_DOMAIN: env.VUE_APP_ID_TOKEN_COOKIE_DOMAIN,
    DOMAIN_HOST_TEMPLATE: env.VUE_APP_DOMAIN_HOST_TEMPLATE,
    DOMAIN_BASE_NAME: env.VUE_APP_DOMAIN_BASE_NAME,
    DOMAIN_PROTOCOL: env.VUE_APP_DOMAIN_PROTOCOL,
    STRIPE_PUBLIC_KEY : env.VUE_APP_STRIPE_PUBLIC_KEY,
})

export default cnf
