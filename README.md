# Internet software architectures and methodologies of software development group project
### Team members

* [Stefan Kandić](https://github.com/ssttefann)
* [Stefan Stegić](https://github.com/phuskus)
* [Mijat Miletić](https://github.com/Mijat019)


### Technology stack
* MySQL
* Express.js
* Vue.js
* Node.js

### Setup on your local machine

1. Install [node](https://nodejs.org/en/)
2. Install [xampp](https://www.apachefriends.org/download.html)
   1. Run xampp
   2. Start Apache and MySQL
   3. Open phpmyadmin by clicking on "Admin" for MySQL
   4. Create a database called "covid19Clinic" in phpmyadmin
3. Clone this repository `git clone https://github.com/Mijat019/MRSISA2020_T3.git`
4. cd into the folder
5. Run `npm run build` (it may take a while) which will run `npm install` and `npm run build` for front-end and back-end
6. Run `npm start`
7. Go to http://localhost:4200

### Deployment

This application is deployed to heroku [link](https://covid19-clinic.herokuapp.com/).
Automatic deployment is setup so that each time someone pushes to the master branch, deployment is triggered. Heroku then builds the application and deploys it. For a database server, we used https://freemysqlhosting.net.
