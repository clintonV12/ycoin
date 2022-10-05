const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const tokenObj = require('../objects/AccessToken.obj');
//TODO::get phone number value
var userPhone = 78679654;

var cashoutController = {
    createAccessToken     : createAccessToken,
    getReserveBalance     : getReserveBalance,
    transferToUserAccount : transferToUserAccount,
    validateAccountHolder : validateAccountHolder
}

function convertTokenToLocalCurrency(numberOfTokens,userLocalCurrencyISO){
    userLocalCurrencyISO = userLocalCurrencyISO.toUpperCase();
    numberOfTokens       = Number(numberOfTokens);
    localCurrencyValue   = randToLocalCurrency(userLocalCurrencyISO, numberOfTokens);

    return localCurrencyValue;
}

function randToLocalCurrency(currencySymbol,amount){
    let localCurrency = null;

    axios.get(`https://api.exchangerate.host/convert?from=ZAR&to=${currencySymbol}&amount=${amount}`,{
    })
    .then(function (response) {
        localCurrency = Number(response.data.result);
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        // always executed
    });
    
    return localCurrency;
}

function localCurrencyToRand(currencySymbol,amount){
    let randValue = null;

    axios.get(`https://api.exchangerate.host/convert?from=${currencySymbol}&to=ZAR&amount=${amount}`,{
    })
    .then(function (response) {
        randValue = Number(response.data.result);
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        // always executed
    });
    
    return randValue;
}

//X-Ref-ID: c72777f5-5cd1-4630-99e4-8ba4722fad58
//Ocp-Apim-Subscription-Key: c15a7b0a076243f0ba3603ff4d8742ec
//"apiKey": "dc302ff08bee4a2aaf146e640df352e2"
//authorization: Basic YzcyNzc3ZjUtNWNkMS00NjMwLTk5ZTQtOGJhNDcyMmZhZDU4OmRjMzAyZmYwOGJlZTRhMmFhZjE0NmU2NDBkZjM1MmUy

function createAccessToken(req, res){
    let token = null;
    let token_type = null;
    let expires_in = 0;

    var data = JSON.stringify({"providerCallbackHost":"ycoin.com"});

    var config = {
        method: 'post',
        url: 'https://sandbox.momodeveloper.mtn.com/remittance/token/',
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json', 
          'Ocp-Apim-Subscription-Key': 'c96699dabe264244b5fba5a16bce5dd2', 
          'Host': 'sandbox.momodeveloper.mtn.com', 
          'Authorization': 'Basic YzcyNzc3ZjUtNWNkMS00NjMwLTk5ZTQtOGJhNDcyMmZhZDU4OmRjMzAyZmYwOGJlZTRhMmFhZjE0NmU2NDBkZjM1MmUy'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        token = response.data.access_token;
        res.send(response.data);
      })
      .catch(function (error) {
        res.status(401).send(error.data);
      });
      
    return token;
}

async function getReserveBalance(req, res){
    tkn = await tokenObj.findToken();

    let token               = tkn.token;
    //let token = req.body.token;

    let data = JSON.stringify({"providerCallbackHost":"ycoin.com"});
    let config = {
    method: 'get',
    url: 'https://sandbox.momodeveloper.mtn.com/remittance/v1_0/account/balance',
    headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json', 
        'Ocp-Apim-Subscription-Key': 'c96699dabe264244b5fba5a16bce5dd2', 
        'Authorization': `Bearer ${token}`, 
        'X-Target-Environment': 'sandbox'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        res.send(response.data);
    })
    .catch(function (error) {
        console.log(error);
        res.status(401).send(error.data);
    });
}

async function transferToUserAccount(req, res){
    tkn = await tokenObj.findToken();
    let token               = tkn.token;

    let amount    = req.body.amount; 
    let currency  = req.body.currency; 
    let userPhone = req.body.userPhone; 
    //let token     = req.body.token;
    let refID     = uuidv4();

    var data = `{\n  "amount": ${amount},\n  
                "currency": ${currency},\n  
                "externalId": "string",\n  
                "payee": {\n    "partyIdType": "MSISDN",\n    "partyId": ${userPhone}\n  },\n  
                "payerMessage": "Y-coin cashout made",\n  
                "payeeNote": "Have a nice day"\n}\n`;

    var config = {
        method: 'post',
        url: 'https://sandbox.momodeveloper.mtn.com/remittance/v1_0/transfer',
        headers: { 
            'Authorization': `Bearer ${token}`, 
            'X-Reference-Id': refID, 
            'X-Target-Environment': 'sandbox', 
            'Ocp-Apim-Subscription-Key': 'c15a7b0a076243f0ba3603ff4d8742ec', 
            'Content-Type': 'text/plain'
        },
        data : data
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        
        getTransferStatus(token,refID,res);
    })
    .catch(function (error) {
        console.log(error);
        res.status(401).send(error.data);
    });

}

function getTransferStatus(token,refID,res){

    var config = {
    method: 'get',
    url: `https://sandbox.momodeveloper.mtn.com/remittance/v1_0/transfer/${refID}`,
    headers: { 
        'X-Target-Environment': 'sandbox', 
        'Ocp-Apim-Subscription-Key': 'c15a7b0a076243f0ba3603ff4d8742ec', 
        'Authorization': `Bearer ${token}`
    }
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        res.send(response.data);
    })
    .catch(function (error) {
        console.log(error);
        res.status(401).send(error.data);
    });

}

async function validateAccountHolder(req, res){
    tkn = await tokenObj.findToken();

    let token               = tkn.token;
    let accountHolderIdType = req.body.accountHolderIdType;
    let accountHolderId     = req.body.accountHolderId;
    /*accountHolderIdType - Specifies the type of the party id. Allowed values [msisdn, email, party_code].*/

    /*
    accountHolder - The party number. Validated according to the party id type.
                    MSISDN - Mobile Number validated according to ITU-T E.164. Validated with IsMSISDN
                    EMAIL - Validated to be a valid e-mail format. Validated with IsEmail
                    PARTY_CODE - UUID of the party. Validated with Is Uuid*/
    var config = {
        method: 'get',
        url: `https://sandbox.momodeveloper.mtn.com/remittance/v1_0/accountholder/${accountHolderIdType}/${accountHolderId}/active`,
        headers: { 
            'Authorization': `Bearer ${token}`, 
            'Ocp-Apim-Subscription-Key': 'c15a7b0a076243f0ba3603ff4d8742ec', 
            'X-Target-Environment': 'sandbox'
        }
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        res.send(response.data);
    })
    .catch(function (error) {
        console.log(error);
        res.status(401).send(error.data);
    });

}

module.exports = cashoutController;
