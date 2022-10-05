const UserAccount = require('../models/UserAccount');

var UserAccountObj = {
    findAll: findAll,
    create: create,
    findById: findById,
    findByPhone: findByPhone,
    deleteById: deleteById,
    updateUserAccount: updateUserAccount,
    transferYcoin:transferYcoin,
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

function updateUserAccount(userAccount, phone) {
    var updateUserAccount = {
        y_balance: userAccount.y_balance,
        phone: userAccount.phone,
        wallet_address: userAccount.wallet_address
    };
    return UserAccount.update(updateUserAccount, { where: { phone: phone } });
}

async function transferYcoin(senderPhone,receiverPhone,amount) {
    
    sAccount = await UserAccount.findOne({ where: { phone: senderPhone} }); 
    rAccount = await UserAccount.findOne({ where: { phone: receiverPhone} });

    if(sAccount.y_balance >= amount && rAccount.phone != null && senderPhone != receiverPhone){
        let newReceiverBalance = rAccount.y_balance + amount;
        let newSenderBalance   = sAccount.y_balance - amount;

        let senderAccount = {y_balance:newSenderBalance,phone:senderPhone,wallet_address:sAccount.wallet_address}
        let receiverAccount = {y_balance:newReceiverBalance,phone:receiverPhone,wallet_address:rAccount.wallet_address} 
    
        UserAccount.update(senderAccount, { where: { phone: senderPhone } });
        return UserAccount.update(receiverAccount, { where: { phone: receiverPhone } });
    }else{
        //cant transfer
        return "Insufficient funds";
    }
}


module.exports = UserAccountObj;
