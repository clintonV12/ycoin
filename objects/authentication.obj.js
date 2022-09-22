const Authentication = require('../models/Authentication');

var AuthenticationObj = {
    findAll: findAll,
    create: create,
    findById: findById,
    findByUserId: findByUserId,
    deleteById: deleteById,
    updateAuthentication: updateAuthentication,
    login: login
}

function findAll() {
    return Authentication.findAll();
}

function findById(id) {
    return Authentication.findByPk(id);
}

function findByUserId(id) {
    return Authentication.findOne({ where: { user_id: id} });
}

function login(username) {
    return Authentication.findOne({ where: { username: username} }); 
}

function deleteById(id) {
    return Authentication.destroy({ where: { id: id } });
}

function create(authentication) {
    var newAuthentication = new Authentication(authentication);
    return newAuthentication.save();
}

function updateAuthentication(authentication, id) {
    var updateAuthentication = {
        user_id: authentication.user_id,
        username: authentication.username,
        email: authentication.email,
        password: authentication.password,
        wallet_address: authentication.wallet_address
    };
    return Authentication.update(updateAuthentication, { where: { id: id } });
}
module.exports = AuthenticationObj;
