const axios = require('axios').default;
const ejs = require('ejs').default;
const express = require('express');
const app = express();
const jsStringify = require('js-stringify');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use("/styles",express.static(__dirname + "/styles"));

app.get('/homepage', function(req,res)
{
    res.render('homepage'); 
});

app.get('/createAccount', function(req,res)
{
    res.render('createAccount'); 
});

app.get('/getAccount', function(req,res)
{
    res.render('getAccountInfo'); 
});

app.get('/deposit', function(req,res)
{
    res.render('deposit'); 
});

app.get('/withdraw', function(req,res)
{
    res.render('withdraw'); 
});


app.get('/operations', function(req,res)
{
    res.render('operations'); 
});

app.get('/standingorder', function(req,res)
{
    res.render('standingorder'); 
});

app.post('/createAccountResponse', function(req,res)
{
    
    axios.post("http://localhost:666/BankingSystem/v1.0/accounts/", req.body).then( 
      (response) => { 
          var account = response.data; 
          res.render('createAccountResponse',  account);
      }, 
      (error) => { 
          console.log(error); 
      } 
    );  
});

app.post('/getAccountInfoResponse', function(req,res)
{
    var url= 'http://localhost:666/BankingSystem/v1.0/accounts/'+req.body.accNo;
    axios.get(url).then(
        (response) => {
     
            var account = response.data; 
            res.render('getAccountInfoResponse',  account);

        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
        
        });
});

app.post('/depositResponse', function(req,res)
{
    let config = {
        headers: {
            'Content-type': 'application/json;charset=utf-8',
        }
      }

    var url= 'http://localhost:666/BankingSystem/v1.0/accounts/'+req.body.accNo+'/deposits';
    var amount= req.body.amount;
    axios.post(url, amount, config).then( 
      (response) => { 
          var account = response.data; 
          res.render('depositResponse',  account);
      }, 
      (error) => { 
          console.log(error); 
      } 
    ); 
});

app.post('/withdrawResponse', function(req,res)
{
    let config = {
        headers: {
            'Content-type': 'application/json;charset=utf-8',
        }
      }

    var url= 'http://localhost:666/BankingSystem/v1.0/accounts/'+req.body.accNo+'/withdrawals';
    var amount= req.body.amount;
    axios.post(url, amount, config).then( 
      (response) => { 
          var account = response.data; 
          res.render('withdrawResponse',  account);
      }, 
      (error) => { 
          console.log(error); 
      } 
    ); 
});

app.post('/standingOrderResponse', function(req,res)
{

    var url= 'http://localhost:666/BankingSystem/v1.0/accounts/'+req.body.fromAccNo+'/standing-orders';
    var toAccNo= req.body.toAccNo;
    var amount= req.body.amount;

    var obj= {
        'toAccount': toAccNo,
        'amount': amount
    }

    axios.post(url, obj).then( 
      (response) => { 
          var standingOrder = response.data; 
          res.render('standingorderResponse',  standingOrder);
      }, 
      (error) => { 
          console.log(error); 
      } 
    ); 
});

app.post('/operationsResponse', function(req,res)
{

    var url= 'http://localhost:666/BankingSystem/v1.0/accounts/'+req.body.accNo+'/operations';
  
    axios.get(url).then(
        (response) => {
     
            //console.log(response.data);
            res.render('operationsResponse',  {jsStringify, operationsList: response.data});

        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
        
        });
});


var server = app.listen(process.env.PORT || 5556, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})