// In models/Post.js, create a Post model with the following properties:
// title: A string
// body: A string
// createdAt: A date formatted as a string
const {db, Sequelize } = require('../db/connection')

let Post = db.define('Post',{
    title:Sequelize.STRING,
    body:Sequelize.STRING,
    createdAt:Sequelize.STRING
});


module.exports = Post;