<h1 align="center">
    <br>
    eBarber API
</h1>

<h4 align="center">
  eBarber allows you to join as a client or a barber! If you are a client pick your favorite barber and schedule an available 
	appointments. If you are a barber disclose your available times.
  This API makes the necessary data that is required to provide the services available to be consumed by our front-end applications: 
  eBarber web and eBarber mobile.
</h4>

<p align="center">
  <a href="#goal">Goal</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#work-in-progress">Work in Progress</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

![App Screenshot](https://res.cloudinary.com/dmct8cfu9/image/upload/v1594288835/ebarber_backend_insomnia1.png)
![App Screenshot2](https://res.cloudinary.com/dmct8cfu9/image/upload/v1594288835/ebarber_backend_insomnia2.png)

## Goal

The goal is to create a full project using Node.js, ReactJS, and React Native from start to finish, fulfilling all possible steps since
preparing the development environment with Docker, configuring tools that help maintain code quality (EditorConfig, ESLint and Prettier)
to testing with Jest, deploying and all the coding in between.

eBarber API makes the necessary data that is required to provide the services available to be consumed by our front-end applications: 
  eBarber web and eBarber mobile.

**NOTE**: Check the eBarber web [here](https://github.com/stevescruz/ebarber_web).

## Work in Progress

- [x] Project structure
  - [x] Add ts-node-dev
  - [x] Prepare EditorConfig
  - [x] Configure ESLint
  - [x] Set up Prettier
- [x] Database
  - [x] Docker PostgreSQL container
  - [x] TypeORM
  - [x] Appointments table
  - [x] Users table
  - [x] Migrations
- [x] Create User
  - [x] User Model
  - [x] Password Cryptography
- [x] Authentication
  - [x] JWT
  - [x] Session
  - [x] Authentication Middleware
- [x] Avatar Images
  - [x] Upload Files
  - [x] Save Files in Local Disk
  - [x] Serve Static Files
- [x] Exception Handling
  - [x] Error Class
  - [x] Global Exception Handler (Middleware)
- [ ] More steps comming soon...

## Technologies

This project was developed with the following technologies:

-  [TypeScript](https://www.typescriptlang.org/)
-  [Node.js](https://nodejs.org/en/)
-  [Express.js](https://expressjs.com/)
-  [ts-node-dev](https://github.com/whitecolor/ts-node-dev)
-  [TypeORM](https://typeorm.io/#/)
-  [PostgreSQL](https://www.postgresql.org/)
-  [CORS](https://expressjs.com/en/resources/middleware/cors.html)
-  [UUID V4](https://github.com/uuidjs/uuid)
-  [date-fns](https://date-fns.org/)
-  [JSON Web Token](https://github.com/auth0/node-jsonwebtoken)
-  [bcrypt.js](https://github.com/dcodeIO/bcrypt.js/)
-  [Multer](https://github.com/expressjs/multer)
-  [VS Code][vc] with [EditorConfig][vceditconfig] and [ESLint][vceslint]
-  [Docke](https://www.docker.com/)
-  [DBeaver](https://dbeaver.io/)
-  [Insomnia](https://insomnia.rest/)

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v10.16][nodejs] (or higher), and [Yarn v1.13][yarn] (or
higher) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/stevescruz/ebarber_backend.git

# Go into the repository
$ cd explore_github

# Install dependencies
$ yarn install

# Run the app
$ yarn start
```

## :memo: License
This project is under the MIT license.

---

[Get in touch with me!](https://www.linkedin.com/in/stevescruz/)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
