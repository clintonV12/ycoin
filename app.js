require("dotenv").config();
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const tokenObj = require('./objects/AccessToken.obj');
//Database Connection
const db = require('./config/database');
db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors("*"));  

//App routes
app.use('/', require('./routes/routes'));

const PORT = process.env.PORT || 5000;
db.sync().then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(err => console.log("Error: " + err));


getAccessTokenAndSave();
console.log("start hour task");
var now = new Date();
var delay = 60 * 60 * 1000; // 1 hour in msec
var start = delay - (now.getMinutes() * 60 + now.getSeconds()) * 1000 + now.getMilliseconds();

setTimeout(function doSomething() {
   console.log("start hour task");
   getAccessTokenAndSave();

   // schedule the next tick
   setTimeout(doSomething, delay);
}, start);

function getAccessTokenAndSave(){
    let token = null;
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
        expires_in = response.data.expires_in;

        //res.send(response.data);
        //save in database
        console.log(token);
        let AccessToken = {token:token};
        tokenObj.deleteToken();

        tokenObj.create(AccessToken).
            then((data) => {
                res.send(data);
            })
            .catch((error) => {
                console.log("Token created successfully");
            });
      })
      .catch(function (error) {
        console.log("Token create error");
      });
      
}

