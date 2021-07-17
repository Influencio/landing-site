import urls from './urls';

export const loginUrl = `${urls.hydra}/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_AUTH_CLIENT_ID}&response_type=code&scope=offline_access+openid&state=${urls.webApp}/login-redirect&redirect_uri=${urls.helios}/oauth/callback`