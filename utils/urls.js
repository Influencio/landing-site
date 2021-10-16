const getLanding = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'https://landing.influencio.dk'
    case 'staging':
      return 'https://landing.staging.influencio.dk'
    default:
      return 'http://localhost:3000'
  }
}

export default {
  hydra: 'https://auth.influencio.dk/hydra',
  helios: 'https://auth.influencio.dk/helios',
  auth: 'https://auth.staging.influencio.dk/auth',
  accounts: 'https://api.staging.influencio.dk/accounts',
  tags: 'https://api.influencio.dk/tags',
  webApp: 'https://influencio.dk',
  landing: getLanding()
}