require('dotenv').config()

import type { SessionOptions } from 'express-session'
import express from 'express'
import { connect } from 'mongoose'
import cors from 'cors'
import session from 'express-session'
import ConnectMongoDBSession from 'connect-mongodb-session'
import ms from 'ms'
import routes from './routes'
import config from './config'

declare module 'express-session' {
  interface SessionData {
    user: {
      _id: string
    }
  }
}

const app = express()
const MongoDbSessionStore = ConnectMongoDBSession(session)

connect(`${process.env.MONGO_URI}`)
  .then(() => {
    console.log('Successfully connected To Database')
  })
  .catch((error) => {
    console.log('Error Connecting To DataBase', error)
  })

const corsOptions = {
  origin: config.clientDomain,
  credentials: true,
}

const store = new MongoDbSessionStore({
  uri: process.env.MONGO_URI as string,
  collection: 'authSessions',
})

const sessionOptions: SessionOptions = {
  secret: process.env.SESSION_SECRET as string,
  name: config.appName + '_xAuth',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ms(config.sessionLifespan),
    secure: process.env.NODE_ENV === 'production' ? true : false,
    httpOnly: true,
  },
  store,
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(session(sessionOptions))
routes(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`)
})
