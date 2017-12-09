# Final Project : CollabGoals (AKA Collaborative to-do-list)

[CS 491 Secure Web Application Design](https://www.cs.uic.edu/~ckanich/swad/f17/) - 

For this final project we will be building a CollabToDO protal where users can compete with each other for productivity.  

# Functionalities :
Our application will do the following:

* ([Pramod](#Pramod)) Allow visitors to register a new account with some basic user information which is visible on a user profile page.
* ([Pramod](#Pramod)) Allows user view profiles of other users.
* ([Pramod](#Pramod)) Allows users to create new friend circles.
* ([Pramod](#Pramod)) Allow users to create their to-do-lists. 
* ([Mohammed](#Mohammed)) Allows user to Create a private to-do-list item. Visible to only the user.
* ([Mohammed](#Mohammed)) Allows user to send friend circle requests to other users.
* ([Mohammed](#Mohammed)) Allows user to accept friend circle requests from other users.
* ([Mohammed](#Mohammed)) Check rankings of all members in the circle and compete with them for productivity.

# Testing :

* We have additionally written test cases to check the sanity of the functionalities that we have implemented. We have used mocha, axios and cheerio for this purpose.

All the test cases can be run using the command.

```
npm test

```


## Getting Started : Running Guide

Download or clone the master branch of this repository

Set the working directory
```
cd collaborativetodo/app/
```
Download the newest version of Node and set it to default
```
nvm install 8
nvm alias default 8
```

Run the node web server
```
npm install && npm start
```

(optional for development)
Run nodemon instead of npm start
```
nodemon start
```

### Prerequisites

For this assignment we will assume a fresh HTML5 [Cloud9](https://c9.io) instance as a starting point.

Clone the project from the master branch

```
git clone https://github.com/uic-networking/collaborativetodo.git
```

## Built With
* [Node.js](https://nodejs.org) - Server runtime
* [Express](https://expressjs.com/) - Web Framework for Node
* [express-generator](https://www.npmjs.com/package/express-generator) - Used to generate a skeleton site
* [express-session](https://github.com/expressjs/session) - Used for session middleware
* [Pug](https://github.com/pugjs/pug) - Used for templating
* [serve-favicon](https://www.npmjs.com/package/serve-favicon) - Used for our [favicon](https://en.wikipedia.org/wiki/Favicon)
* [Mlabs](ttps://mlab.com/) - Online mongo store
* [Mocha](https://mochajs.org/) - Used for testing



## Authors
* **<a id="Pramod"></a>Pramod Anantha <panant4@uic.edu>** - [GitHub](https://github.com/Panant4))
* **<a id="Mohammed"></a>Mohammed Motasim <mmotas2@uic.edu>** - [GitHub](https://github.com/mmotas)
