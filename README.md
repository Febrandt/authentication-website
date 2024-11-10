# Express Authentication Website

Register, Login and Email Verification Website. Made in Express.js.
Includes libraries:
- Sequelize
- Bootstrap
- NodeMailer
- Bootstrap
- Jquery
- Bcrypt

## Setup

Create the folder you want the project to be in:

```
cd authentication-website
git clone https://github.com/Febrandt/authentication-website.git

npm install

```

### Database Configuration

In the `src/shared/config/database.config.ts` file:

```typescript
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    database: 'authentication_website',
    dialect: 'mysql',
    username: 'root',
    password: 'root',
    define: {timestamps: false}
});

sequelize.authenticate().then(() => {
    console.log('Database Connection Successfull!');
    }).catch(err => {
        console.error('Database Connection Error: ', err);
    });

```

Change the `database`, `dialect`, `username`, `password` of your's.

### Email Configuration

Same thing for `src/shared/config/email.config.ts`:

```typescript
import { createTransport } from "nodemailer";

export const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'dustin58@ethereal.email',
        pass: 'jKkFT6seh1EXZxvxCt'
    }
});
```


## Start

In the terminal:

```
npx tsx src/app.ts
```


