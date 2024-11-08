const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require('./db/connection.js');

describe('Social Sequelzie Test', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the test suite is run
        await db.sync({ force: true });
        //changed sequelize to db since that is what I named it in connection
    })

    // Write your tests here
    
    test("User and profile association", async function() {

        //create user
        //create profile
        //set profile to user
        //get user with profile, test it
        const user = await User.create({
            username:"Abraham",
            email:"Lincoln@gmail.com"
        })
        const profile = await Profile.create({
            bio:'former president',
            profilePicture:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/1200px-Abraham_Lincoln_O-77_matte_collodion_print.jpg',
            birthday: '2/12/1809'
        })

        await user.setProfile(profile)
        //get user with profile
        const userWithProfile = await User.findOne({where:{username:"Abraham"}, include:Profile})

        expect(userWithProfile.username).toBe("Abraham")
        expect(userWithProfile.Profile.bio).toBe("former president")

    })

    test("User and post associations", async function() {
        const user2 = await User.create({
            username: "George",
            email: "Washington@gmail.com"
        });
    
        const post = await Post.create({
            title: 'Introduction George',
            body: 'Hello my name is George',
            createdAt: '11/8/2024'
        });
    
        await user2.addPost(post); // Associates the post with the user
    
        // Get the user with their posts
        const userWithPost = await User.findOne({
            where: { username: 'George' },
            include: Post
        });
    
        console.log(userWithPost); // Check the structure of userWithPost

        expect(userWithPost.username).toBe("George");
        expect(userWithPost.Posts[0].title).toBe("Introduction George");
    });
    

    
    test("Post and comment associations", async function() {

        const post = await Post.findOne({
            where:{title:'Introduction George'}
        })

        const comment = await Comment.create({
            body: "Hi George",
            createdAt: "11/8/2024"
        });
    
        await comment.setPost(post);
    
        // Get the user with their posts
        const postWithComment = await Post.findOne({
            where: { title: 'Introduction George' },
            include: Comment
        });
    
        console.log(postWithComment); // Check the structure of userWithPost

        expect(postWithComment.title).toBe("Introduction George");
        expect(postWithComment.Comments[0].body).toBe("Hi George");
    });


    test("User and Like associations", async function() {
        // Find existing users
        const user1 = await User.findOne({ where: { username: 'Abraham' } });
        const user2 = await User.findOne({ where: { username: 'George' } });
    
        // Create likes
        const like1 = await Like.create({
            reactionType: "Laugh",
            createdAt: "11/8/2024"
        });
    
        const like2 = await Like.create({
            reactionType: "frown",
            createdAt: "11/7/2024"
        });
    
        // Create associations
        await user1.addLike(like1);
        await user1.addLike(like2);
        await user2.addLike(like1);
    
     
        const user1WithLikes = await User.findOne({
            where: { username: 'Abraham' },
            include: [Like]
        });
    
        const user2WithLikes = await User.findOne({
            where: { username: 'George' },
            include: [Like]
        });
    
        const like1WithUsers = await Like.findOne({
            where: { reactionType: "Laugh" }, 
            include: [User]
        });
    
        // Debug logging
        console.log("User1 with likes:", JSON.stringify(user1WithLikes, null, 2));
        console.log("User2 with likes:", JSON.stringify(user2WithLikes, null, 2));
        console.log("Like1 with users:", JSON.stringify(like1WithUsers, null, 2));
    
        // Test user1's likes
        expect(user1WithLikes).not.toBeNull();
        expect(user1WithLikes.Likes).toBeDefined();
        expect(user1WithLikes.Likes.length).toBe(2);
        expect(user1WithLikes.Likes.map(l => l.reactionType).sort()).toEqual(["Laugh", "frown"]);
    
        // Test user2's likes
        expect(user2WithLikes).not.toBeNull();
        expect(user2WithLikes.Likes).toBeDefined();
        expect(user2WithLikes.Likes.length).toBe(1);
        expect(user2WithLikes.Likes[0].reactionType).toBe("Laugh");
    
        // Test like1's users
        expect(like1WithUsers).not.toBeNull();
        expect(like1WithUsers.Users).toBeDefined();
        expect(like1WithUsers.Users.length).toBe(2);
        expect(like1WithUsers.Users.map(u => u.username).sort()).toEqual(["Abraham", "George"]);
    });



})