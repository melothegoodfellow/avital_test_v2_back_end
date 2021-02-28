const { Sequelize } = require('sequelize');

//custom
const sequelize = require("../database/connection");
const { passwordCompare } = require('../library/data-encryption');
const { getToken } = require('../library/token-generation');
const User = require('../database/models/user')(sequelize, Sequelize.DataTypes);

const login = async function(username, password){
    const userData = await User.findOne({
        where:{
            username: username
        }
    });

    if(!passwordCompare(password, userData.password)){
        return {
            data: [],
            message: "passwords dont match",
            status: 401,
            error: []
        }
    }
    const token = getToken(userData.id);
    return {
        data: [{
            username: userData.username,
            photo: userData.photo,
            token: token
        }],
        message: "user logged in",
        error: [],
        status: 200
    }
}

module.exports = {
    login
}