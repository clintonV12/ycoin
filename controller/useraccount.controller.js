const uaObj = require('../objects/UserAccount.obj');

var uaController = {
    addUserAccount: addUserAccount,
    findUserAccounts: findUserAccounts,
    findUserAccountById: findUserAccountById,
    findUserAccountByPhone: findUserAccountByPhone,
    updateUserAccount: updateUserAccount,
    deleteById: deleteById,
    transfer:transfer,
}

async function addUserAccount(req, res) {
    
    let UserAccount = req.body;
    uaObj.create(UserAccount).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
            res.status(401).send("Error creating account");
        });
}

function findUserAccountById(req, res) {
    uaObj.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findUserAccountByPhone(req, res) {
    uaObj.findByPhone(req.params.phone).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    uaObj.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "UserAccount deleted successfully",
                UserAccount: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

async function updateUserAccount(req, res) {
    
    let UserAccount = req.body;
    
    uaObj.updateUserAccount(UserAccount, req.params.phone).
        then((data) => {
            res.status(200).json({
                message: "UserAccount updated successfully",
                UserAccount: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findUserAccounts(req, res) {
    uaObj.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function transfer(req,res){
    console.log(req.body.senderPhone);

    uaObj.transferYcoin(req.body.senderPhone,req.body.receiverPhone,req.body.amount).
    then((data) => {
        res.send(data);
    })
    .catch((error) => {
        console.log(error);
        res.status(401).send("Unknown error occured, might be invalid phone number");
    });
}




module.exports = uaController;
