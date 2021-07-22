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
  webApp: 'https://influencio.dk',
  landing: getLanding()
}