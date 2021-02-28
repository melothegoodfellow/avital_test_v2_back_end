const { Sequelize } = require('sequelize');

//custom
const sequelize = require("../database/connection");
const Post = require('../database/models/post')(sequelize, Sequelize.DataTypes);
const Comment = require('../database/models/comment')(sequelize, Sequelize.DataTypes);
const Like = require('../database/models/like')(sequelize, Sequelize.DataTypes);

const list = async function(){
    try {
        const posts = await sequelize.query(`
        SELECT 
        p.*,
        u.username,
        CASE WHEN c.text IS NOT NULL THEN JSON_ARRAYAGG(c.text) END as comment_text,
        CASE WHEN uc.username IS NOT NULL THEN JSON_ARRAYAGG(uc.username) END as comment_user,
        CASE WHEN c.createdAt IS NOT NULL THEN JSON_ARRAYAGG(c.createdAt) END as comment_date,
        CASE WHEN ul.id IS NOT NULL THEN JSON_ARRAYAGG(ul.id) END as like_user_id,
        CASE WHEN ul.username IS NOT NULL THEN JSON_ARRAYAGG(ul.username) END as like_username
        FROM posts as p
        INNER JOIN users u ON p.user_id = u.id
        LEFT JOIN comments c ON c.post_id = p.id
        LEFT JOIN users uc ON c.user_id = uc.id
        LEFT JOIN likes l ON l.post_id = p.id
        LEFT JOIN users ul ON l.user_id = ul.id
        GROUP BY p.id
        ORDER BY p.id DESC
        `, { type: Sequelize.QueryTypes.SELECT });
        return {
            data: posts,
            message: "posts return success",
            error: [],
            status: 200
        }
    }
    catch(error){
        console.log(error);
        return {
            data: [],
            message: "posts not found",
            error: [],
            status: 404 
        }
    }
}

const listPostComments = async function(postId){
    try {
        const posts = await Comment.findAll({
            order: [
                ['id', 'DESC']
            ],
            where: {
                post_id: postId
            }
        });
        return {
            data: posts,
            message: "post comments return success",
            error: [],
            status: 200
        }
    }
    catch(error){
        console.log(error);
        return {
            data: [],
            message: "posts not found",
            error: [],
            status: 404 
        }
    }
}

const create = async function(userId, text, image){
    try {
        await Post.create({
            user_id: userId,
            text: text,
            image: image
        });
        return list();
    }
    catch(error){
        console.log(error);
        return {
            data: [],
            message: "post not created",
            error: [],
            status: 409 
        }
    }
}

const deletePost = async function(postId){
    try {
        await Post.update({
            is_deleted: true
        },
        {
        where:{
                id: postId
            }
        });
        return list();
    }
    catch(error){
        console.log(error);
        return {
            data: [],
            message: "post not created",
            error: [],
            status: 409 
        }
    }
}

const createCommentOnPost = async function(userId, postId, commentText){
    try {
        await Comment.create({
            user_id: userId,
            post_id: postId,
            text: commentText
        });
        return listPostComments(postId);
    }
    catch(error){
        console.log(error);
        return {
            data: [],
            message: "comment not created",
            error: [],
            status: 409 
        }
    }
}

const createLikePost = async function(userId, postId){
    try {
        await Like.create({
            user_id: userId,
            post_id: postId
        });
        return listPostComments(postId);
    }
    catch(error){
        console.log(error);
        return {
            data: [],
            message: "like not created",
            error: [],
            status: 409 
        }
    }
}

module.exports = {
    create,
    list,
    createCommentOnPost,
    listPostComments,
    createLikePost,
    deletePost
}