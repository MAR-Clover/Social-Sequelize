// In models/User.js, define a User model with the following properties:
// username: A string
// email: A string

const { db, Sequelize } = require("../db/connection"); 

let User = db.define('User', {
    username:Sequelize.STRING,
    email:Sequelize.STRING,
});


module.exports = User;