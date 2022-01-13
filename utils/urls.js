const getLanding = () => {
  switch (process.env.NEXT_PUBLIC_APP_ENV) {
    case 'production':
      return 'https://influenc.io'
    case 'staging':
      return 'https://landing.staging.influencio.dk'
    default:
      return 'http://localhost:3000'
  }
}

const getApi = () => {
  switch (process.env.NEXT_PUBLIC_APP_ENV) {
    case 'production':
      return 'https://api.influenc.io'
    case 'staging':
      return 'https://api.staging.influencio.dk'
    default:
      return 'https://api.influenc.io'
  }
}

const getAuth = () => {
  switch (process.env.NEXT_PUBLIC_APP_ENV) {
    case 'production':
      return 'https://auth.influenc.io'
    case 'staging':
      return 'https://auth.staging.influencio.dk'
    default:
      return 'https://auth.influenc.io'
  }
}

export default {
  hydra: 'https://auth.influenc.io/hydra',
  helios: 'https://auth.influenc.io/helios',
  auth: getAuth() + '/auth',
  accounts: getApi() + '/accounts',
  // accountsOld: 'https://api.influencio.dk/accounts',
  tags: 'https://api.influenc.io/tags',
  payment: getApi() + '/payment',
  webApp: 'https://app.influenc.io',
  landing: getLanding()
}