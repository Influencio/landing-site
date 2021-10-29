const getLanding = () => {
  switch (process.env.APP_ENV) {
    case 'production':
      return 'https://influenc.io'
    case 'staging':
      return 'https://landing.staging.influencio.dk'
    default:
      return 'http://localhost:3000'
  }
}

const getApi = () => {
  switch (process.env.APP_ENV) {
    case 'production':
      return 'https://api.influenc.io'
    case 'staging':
      return 'https://api.staging.influencio.dk'
    default:
      return 'http://localhost:3001'
  }
}

const getAuth = () => {
  switch (process.env.APP_ENV) {
    case 'production':
      return 'https://auth.influenc.io'
    case 'staging':
      return 'https://auth.staging.influencio.dk'
    default:
      return 'http://localhost:3002'
  }
}

export default {
  hydra: 'https://auth.influencio.dk/hydra',
  helios: 'https://auth.influencio.dk/helios',
  auth: getAuth() + '/auth',
  accounts: getApi() + '/accounts',
  // accountsOld: 'https://api.influencio.dk/accounts',
  tags: 'https://api.influencio.dk/tags',
  webApp: 'https://influencio.dk',
  landing: getLanding()
}