# Authentication Rest Api Boilerplate

Simple authentication rest api with express, mongoose and express sessions. Built with typescript.

## Installation

```bash
git clone https://github.com/stevekanger/nodejs-api-session-auth.git
```

```bash
npm install
```

### Replace the information in the `.env` file with your variables.

```
# Mongo db uri
MONGO_URI=mongodb://127.0.0.1:27017/example_database

# Session secret code used for express-session
SESSION_SECRET=YOUR_SESSION_SECRET_CODE_HERE

# JSON web token secret used to sign jwt for email verification
JWT_SECRET=YOUR_JWT_SECRET_HERE


```

### Replace the data in the `config.ts` file

Email verification is done with jsonwebtokens so the `jwtVerificationLifespan` is the amount of time you want to give the user to verify their email. Session lifespan is how long you want the user to be logged in for before they need to login again.

```javascript
const config: TConfig = {
  appName: 'nodejs-api-session-auth',
  clientDomain: 'http://localhost:5173',
  jwtVerificationLifespan: '2m',
  sessionLifespan: '2m',
}
```

### Replace your smtp settings in `utils/sendEmail.ts`

Right now the email is set to nodemailers test client. Change these variables to your smpt client for production. It should look something like the following when done.

```javascript
export default async function sendEmail({
  from,
  to,
  subject,
  html,
}: {
  from: string
  to: string
  subject: string
  html: string
}) {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.your-email-host.com',
      port: 465,
      secure: true,
      auth: {
        user: 'Your Username',
        pass: 'Your password',
      },
    })

    await transporter.sendMail({ from, to, subject, html })
  } catch (error) {
    throw new Error('There was an error sending email')
  }
}
```

## Commands

to develop

```bash
npm run dev
```

to build

```bash
npm run build
```

and to start

```bash
npm run start
```
