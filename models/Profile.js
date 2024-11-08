// In models/Profile.js, create a Profile model with the following properties:
// bio: A string
// profilePicture: A string
// birthday: A date formatted as a string
const { db, Sequelize } = require('../db/connection')

let Profile = db.define('Profile',{
    bio:Sequelize.STRING,
    profilePicture:Sequelize.STRING,
    birthday:Sequelize.STRING
});


module.exports = Profile;