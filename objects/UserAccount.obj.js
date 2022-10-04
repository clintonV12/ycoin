const UserAccount = require('../models/UserAccount');

var UserAccountObj = {
    findAll: findAll,
    create: create,
    findById: findById,
    findByPhone: findByPhone,
    deleteById: deleteById,
    updateUserAccount: updateUserAccount,   
}

function findAll() {
    return UserAccount.findAll();
}

function findById(id) {
    return UserAccount.findByPk(id);
}

function findByPhone(phone) {
    return UserAccount.findOne({ where: { phone: phone} });
}

function deleteById(id) {
    return UserAccount.destroy({ where: { id: id } });
}

function create(userAccount) {
    var newUserAccount = new UserAccount(userAccount);
    return newUserAccount.save();
}

function updateUserAccount(userAccount, id) {
    var updateUserAccount = {
        y_balance: userAccount.y_balance,
        phone: userAccount.phone,
        wallet_address: userAccount.wallet_address
    };
    return UserAccount.update(updateUserAccount, { where: { id: id } });
}
module.exports = UserAccountObj;
