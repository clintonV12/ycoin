const masterObj = require('../objects/MasterAccount.obj');

var masterController = {
    addMasterAccount: addMasterAccount,
    findMasterAccounts: findMasterAccounts,
    findMasterAccountById: findMasterAccountById,
    findMasterAccountByWalletAddress: findMasterAccountByWalletAddress,
    updateMasterAccount: updateMasterAccount,
    deleteById: deleteById,
}

async function addMasterAccount(req, res) {
    
    let MasterAccount = req.body;

    masterObj.create(MasterAccount).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
            res.status(401).send("Error creating account");
        });
}

function findMasterAccountById(req, res) {
    masterObj.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findMasterAccountByWalletAddress(req, res) {
    masterObj.findByWalletAddress(req.params.wallet_address).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    masterObj.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "MasterAccount deleted successfully",
                MasterAccount: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

async function updateMasterAccount(req, res) {
    
    let MasterAccount = req.body;
    
    masterObj.updateMasterAccount(MasterAccount, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "MasterAccount updated successfully",
                MasterAccount: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findMasterAccounts(req, res) {
    masterObj.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}



module.exports = masterController;
