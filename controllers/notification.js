const { Sequelize } = require('sequelize');

//custom
const sequelize = require("../database/connection");
const Notification = require('../database/models/notification')(sequelize, Sequelize.DataTypes);

const createNotification = async function(userId, text){
    try {
        await Notification.create({
            user_id: userId,
            text: text//"Liked your post"
        });
        return await Notification.findAll({
            where: {
                user_id: userId
            },
            order: [
                ['id', 'DESC']
            ]
        })
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    createNotification
}