const MasterAccount = require('../models/MasterAccount');

var MasterAccountObj = {
    findAll: findAll,
    create: create,
    findById: findById,
    findByWalletAddress: findByWalletAddress,
    deleteById: deleteById,
    updateMasterAccount: updateMasterAccount,   
}

function findAll() {
    return MasterAccount.findAll();
}

function findById(id) {
    return MasterAccount.findByPk(id);
}

function findByWalletAddress(wallet_address) {
    return MasterAccount.findOne({ where: { wallet_address: wallet_address} });
}

function deleteById(id) {
    return MasterAccount.destroy({ where: { id: id } });
}

function create(masterAccount) {
    var newMasterAccount = new MasterAccount(masterAccount);
    return newMasterAccount.save();
}

function updateMasterAccount(masterAccount, id) {
    var updateMasterAccount = {
        current_balance: masterAccount.current_balance,
        total_in_circulation: masterAccount.total_in_circulation,
        wallet_address: masterAccount.wallet_address
    };
    return MasterAccount.update(updateMasterAccount, { where: { id: id } });
}
module.exports = MasterAccountObj;
