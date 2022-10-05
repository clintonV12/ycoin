const authObj = require('../objects/authentication.obj');
const UserAccount = require('../models/UserAccount');
const uaObj = require('../objects/UserAccount.obj');
const bcrypt = require ('bcrypt');
const saltRounds = 10;

var authController = {
    addAuthentication: addAuthentication,
    findAuthentications: findAuthentications,
    findAuthenticationById: findAuthenticationById,
    findAuthenticationByUserId: findAuthenticationByUserId,
    updateAuthentication: updateAuthentication,
    deleteById: deleteById,
    login:login,
    logout: logout
}

async function addAuthentication(req, res) {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    let authentication = req.body;

    authObj.create(authentication).
        then((data) => {
            
            let UserAccount = {phone: data.phone,y_balance:0.00,wallet_address:data.wallet_address};

            uaObj.create(UserAccount).
                then((data) => {
                    
                })
                .catch((error) => {
                    console.log(error);
                    res.status(401).send("Error creating account");
                });

            res.send(data);
        })
        .catch((error) => {
            console.log(error);
            res.status(401).send("Credentials already exist. Try editing instead.");
        });
}

function findAuthenticationById(req, res) {
    authObj.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findAuthenticationByUserId(req, res) {
    authObj.findByUserId(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    authObj.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Authentication deleted successfully",
                authentication: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

async function updateAuthentication(req, res) {
    req.body.password  = await bcrypt.hash(req.body.password, saltRounds);
    let authentication = req.body;
    
    authObj.updateAuthentication(authentication, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Authentication updated successfully",
                authentication: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findAuthentications(req, res) {
    authObj.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

async function login(req, res) {

    const user = await authObj.login(req.body.username); 
    

    //check to see if the user exists in the list of registered users
    if (user == null) res.status(404).send ("User does not exist!");
    //if user does not exist, send a 400 response
    else if (await bcrypt.compare(req.body.password, user.password)) {
        res.json ({
            user_id     : user.id, 
            username    : user.username, 
            phone       : user.phone,
            email       : user.email,
            wallet_address: user.wallet_address
        });
    } 
    else {
        res.status(401).send("Password Incorrect!");
    }

}

function logout (req,res){
    //remove the old refreshToken from the refreshTokens list
    res.status(204).send("Logged out!");
}


module.exports = authController;
