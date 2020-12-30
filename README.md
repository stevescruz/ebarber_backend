<h1 align="center">
    <br>
    eBarber API
</h1>

<h4 align="center">
  eBarber allows you to join as a client or a barber! If you are a client pick your favorite barber and schedule an available
	appointment. If you are a barber disclose your available times.
  This API makes the data that is required to provide the services available to be consumed by our front-end applications:
  eBarber web and eBarber mobile.
</h4>

<p align="center">
  <a href="#goal">Goal</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#requirements">Requirements</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

<div style="display: flex; flex-wrap: wrap;">
  <img style="margin: 5px" alt="API Endpoint Request" src="https://res.cloudinary.com/dmct8cfu9/image/upload/v1596000133/ebarber_api_endpoints1.png" width="306.85" />

  <img style="margin: 5px" alt="API Endpoint Response" src="https://res.cloudinary.com/dmct8cfu9/image/upload/v1596000133/ebarber_api_endpoints2.png" width="278.35" />
</div>

## Goal

The goal is to create a full project using Node.js, ReactJS, and React Native from start to finish, fulfilling all possible steps: preparing the development environment with Docker, configuring tools that help maintain code quality (EditorConfig, ESLint and Prettier), to applying DDD methodologies, automated testing with Jest, deploying, and all the coding in between.

eBarber API makes the data that is required to provide the services available to be consumed by our front-end applications:
  eBarber web and eBarber mobile.

**NOTE**: Check the eBarber web [here](https://github.com/stevescruz/ebarber_web).

## Requirements

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
- [x] Domain-driven Design (DDD) Methodologies
  - [x] Reorganized Project File Structure
  - [x] Refactored code to comply with Liskov Substitution Principle
  - [x] Refactored code to comply with Dependency Inversion
  - [x] Applied Dependency Injection with TSyringe
  - [x] Isolated Hash Provider
  - [x] Isolated Storage Provider
- [x] Test-driven Development (TDD)
  - [x] Jest
  - [x] Coverage Reports
  - [x] Unit Tests for every Service related to Users
  - [x] Unit Tests for every Service related to Appointments
- [x] Password Recovery
  - [x] Nodemailer to handle emails
  - [x] Ethereal fake SMTP server for development environment
  - [x] Email templates with Handlebars template engine
  - [x] Send Password Recovery Email
  - [x] Password Reset
- [ ] More steps coming soon...

## Technologies

This project was developed with the following technologies:

-  [TypeScript](https://www.typescriptlang.org/)
-  [Node.js](https://nodejs.org/en/)
-  [Express.js](https://expressjs.com/)
-  [TS-Node-Dev](https://github.com/whitecolor/ts-node-dev)
-  [TypeORM](https://typeorm.io/#/)
-  [PostgreSQL](https://www.postgresql.org/)
-  [CORS](https://expressjs.com/en/resources/middleware/cors.html)
-  [UUIDv4](https://github.com/uuidjs/uuid)
-  [Date-fns](https://date-fns.org/)
-  [JSON Web Token](https://github.com/auth0/node-jsonwebtoken)
-  [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js/)
-  [Multer](https://github.com/expressjs/multer)
-  [Nodemailer](https://nodemailer.com/about/)
-  [Handlebars](https://handlebarsjs.com/)
-  [Ethereal](https://ethereal.email/)
-  [Jest](https://jestjs.io/)
-  [TSyringe](https://github.com/microsoft/tsyringe)
-  [VS Code][vc] with [EditorConfig][vceditconfig], [ESLint][vceslint] and [Prettier][vcprettier]
-  [Docker](https://www.docker.com/)
-  [DBeaver](https://dbeaver.io/)
-  [Insomnia](https://insomnia.rest/)

## How To Use

To clone and run this application, you need [Git](https://git-scm.com), [Docker](https://www.docker.com/), [Node.js v10.16][nodejs] (or higher), and [Yarn v1.13][yarn] (or higher) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/stevescruz/ebarber_backend.git

# Go into the repository
$ cd ebarber_backend

# Install dependencies
$ yarn install

# Create and run the docker container with the PostgreSQL database
$ docker run --name ebarber-postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

# Run the app
$ yarn dev:server
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
[vcprettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
