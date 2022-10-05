const AccessToken = require('../models/AccessToken');

var AccessTokenObj = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteToken: deleteToken,
    updateAccessToken: updateAccessToken,
    findToken:findToken
}

function findAll() {
    
    return AccessToken.findAll();
}

async function findToken(){
    let token = await AccessToken.findOne({
        order: [ [ 'id', 'DESC' ]],
        });

    return token;
}

function findById(id) {
    
    return AccessToken.findByPk(id);
}


function deleteToken() {
    return AccessToken.destroy({ truncate : true, cascade: false });
}

function create(accessToken) {
    var newAccessToken = new AccessToken(accessToken);
    return newAccessToken.save();
}

function updateAccessToken(accessToken, id) {
    var updateAccessToken = {
        token: accessToken.token
    };

    return AccessToken.update(updateAccessToken, { where: { id: id } });
}


module.exports = AccessTokenObj;
