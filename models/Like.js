// In models/Like.js, create a Like model with the following properties:
// reactionType: A string
// createdAt: A date formatted as a string

const {db, Sequelize } = require('../db/connection')

let Like = db.define('Like',{
    reactionType: Sequelize.STRING,
    createdAt: Sequelize.STRING,
});

module.exports = Like;