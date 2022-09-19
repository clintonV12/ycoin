const axios = require('axios');

//TODO::get phone number value
var userPhone = 78679654;

var tbnController = {
    createAccessToken: createAccessToken
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

function createAccessToken(){
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
      })
      .catch(function (error) {
        console.log(error);
      });
      
    return token;
}

function getReserveBalance(token){
    var data = JSON.stringify({"providerCallbackHost":"ycoin.com"});

    var config = {
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
    })
    .catch(function (error) {
        console.log(error);
    });
}

function transferToUserAccount(amount,currency,userPhone,token){
    var data = `{\n  "amount": ${amount},\n  "currency": ${currency},\n  "externalId": "string",\n  "payee": {\n    "partyIdType": "MSISDN",\n    "partyId": ${userPhone}\n  },\n  "payerMessage": "string",\n  "payeeNote": "string"\n}\n`;

    var config = {
    method: 'post',
    url: 'https://sandbox.momodeveloper.mtn.com/remittance/v1_0/transfer',
    headers: { 
        'Authorization': `Bearer ${token}`, 
        'X-Reference-Id': 'c72777f5-5cd1-4630-99e4-8ba4722fad58', 
        'X-Target-Environment': 'sandbox', 
        'Ocp-Apim-Subscription-Key': 'c15a7b0a076243f0ba3603ff4d8742ec', 
        'Content-Type': 'text/plain'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });

}

function getTransferStatus(token){

    var config = {
    method: 'get',
    url: 'https://sandbox.momodeveloper.mtn.com/remittance/v1_0/transfer/c72777f5-5cd1-4630-99e4-8ba4722fad58',
    headers: { 
        'X-Target-Environment': 'sandbox', 
        'Ocp-Apim-Subscription-Key': 'c15a7b0a076243f0ba3603ff4d8742ec', 
        'Authorization': `Bearer ${token}`
    }
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });

}


module.exports = tbnController;