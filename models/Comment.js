// In models/Comment.js, create a Comment
// body: A string
// createdAt: A date formatted as a string
const { db, Sequelize } = require("../db/connection");

let Comment = db.define('Comment', {
    body: Sequelize.DataTypes.STRING, // Correct reference to DataTypes
    createdAt: Sequelize.DataTypes.STRING // Correct reference to DataTypes
});

module.exports = Comment;
