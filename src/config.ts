type TConfig = {
  appName: string
  clientDomain: string
  jwtVerificationLifespan: string
  sessionLifespan: string
}

// appName must not have spaces will be used to name session

const config: TConfig = {
  appName: 'nodejs-api-session-auth',
  clientDomain: 'http://localhost:5173',
  jwtVerificationLifespan: '2m',
  sessionLifespan: '2m',
}

export default config
