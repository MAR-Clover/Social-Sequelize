// In index.js, define the following associations:
// A User can have one Profile and vice versa.
// A User can have many Post instances, but a Post can only have one User.
// A Post can have many Comment instances, but a Comment can only have one Post.
// A User can have many Like instances and vice versa.

// Write unit tests to ensure that the connection works and the associations are set up correctly.
// Seed data has been created in the seed directory. Feel free to use this in your test creation!

const { Comment, Like, Post, Profile, User } = require("./models/index");

// Define your associations here

// User-Profile associations:
User.hasOne(Profile);
Profile.belongsTo(User);  // Profile belongs to User

// User-Post associations:
User.hasMany(Post);   // A user can have many posts
Post.belongsTo(User); // A post belongs to one user

// Post-Comment associations:
Post.hasMany(Comment);    // A post can have many comments
Comment.belongsTo(Post); // A comment belongs to one post

// User-Like associations (Many-to-many relationship):
User.belongsToMany(Like, { through: 'UserLikes' });
Like.belongsToMany(User, { through: 'UserLikes' });









module.exports = {
    Comment,
    Like,
    Post,
    Profile,
    User
}