# ebvr

[Angular Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.0.2.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview. (`grunt serve` = localhost)
Run `grunt buildcontrol:openshift` for pushing to Openshift.

## Testing

Running `npm test` will run the unit tests with karma.

## Location & info

[EBVR-Server](http://ebvr-ebvr.rhcloud.com/)
Database -> Name: ebvr User: admin Password: CPEi_YwL56mM

.
|-- bower.json                            Bower packages(Client-side libraries)
|-- package.json                          npm packages(Server-side libraries)
|
|-- client                                Client-side codes
|   |-- app
|   |   |-- app.js                        Client-side main JavaScript code
|   |   `-- main
|   |       |-- main.controller.js        Client-side controller code
|   |       |-- main.controller.spec.js   Client-side test code
|   |       |-- main.html                 HTML template file
|   |       |-- main.js                   Client-side routing configuration
|   |       `-- main.scss                 CSS file
|   |-- components
|   |   |-- navbar
|   |   |   |-- navbar.controller.js      Navbar controller
|   |   |   `-- navbar.html               Navbar HTML template file
|   |   `-- socket
|   |       `-- socket.service.js         Client-side WebSocket code
|   `-- index.html
|
`-- server                                Server-side code
    `-- api
        `-- thing
            |-- index.js                  Server-side API routing configuration
            |-- thing.controller.js       Server-side controller(API implementation)
            |-- thing.model.js            Server-side DB model
            |-- thing.socket.js           Server-side WebSocket implementation
            `-- thing.integration.js      Server-side test code

