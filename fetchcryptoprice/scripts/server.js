 
let price = require('crypto-price') // to fetch the crypto price
var express = require('express');
const url = require('url');
const fs = require('fs')
var path = require('path');


const Web3 = require('web3')

//web3
/*
const address = '0x181f92EeEabB05Dc04F0C2cbD70753f9ddCa576A' 
const contAddr = '0xc717092d19E7B4D7035809216f57837bb7ED38b3'
const abi = [
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "fetchCurrencyMean",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "valInDollar",
        "type": "uint256"
      }
    ],
    "name": "currentMeanCalc",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "last_completed_migration",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "completed",
        "type": "uint256"
      }
    ],
    "name": "setCompleted",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
const web3 = new Web3("http://127.0.0.1:7545") //pointing to in memory ganache blockchain.
const contract = new web3.eth.Contract(abi, contAddr)
*/


//var base ="USD"
//var crypto="BTC"

//expressjs
var app = express();
app.listen(8081);
console.log("server is up");

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/price', function(req, res) {
     console.log("fetching...")
     var token = req.query.token
     var cur = req.query.cur
      let curPrice;
      price.getCryptoPrice(cur, token).then(obj => { // Base for ex - USD, Crypto for ex - ETH 
        // console.log(obj.price)
           curPrice = obj.price;
           console.log(curPrice);
           res.end(curPrice);

    }).catch(err => {
        // console.log(err)
    })

});

app.put('/store', function(req, res) {
  res.end('sving in ledger');
  var token = req.query.token
  var cur = req.query.cur
  let curPrice;

  price.getCryptoPrice(cur, token).then(obj => { // cur for ex - USD, token for ex - ETH 
    // console.log(obj.price)
       curPrice = obj.price;
       console.log(curPrice);
       res.end(curPrice);

}).catch(err => {
    // console.log(err)
})
  storeVal(token,curPrice);
});

app.get('/mean', function(req, res) {
  res.end('fetching the current mean');
  var token = req.query.token
  let mean = currentMean(token);
});


var curr="ETH"
var usdValue=78
async function storeVal(curr,usdValue) {
    console.log("Calling storeVal")
   // var resetVal = await contract.methods.currentMeanCalc(curr,usdValue).send({from:address});
    console.log("Called storeVal")
} 
//storeVal(curr,usdValue)

async function currentMean(curr) {
    console.log("Calling currentMean")
    let mean=0;

    /*
    let valu =  await contract.methods.fetchCurrencyMean(curr).call(  
        (err, result) => {
          console.log("current value ")
          console.log(result)
          mean = result;
          console.log("error ")
          console.log(err)
        }

    )
    */

    return mean;
} 

//currentMean(curr);

// app.get("/user", function(req, res){
  
//   var name = req.query.name
//   var age = req.query.age
    
//   console.log("Name :", name)
//   console.log("Age :", age)
//   res.end("done");
// })

// price.getCryptoPrice(base, crypto).then(obj => { // Base for ex - USD, Crypto for ex - ETH 
//    // console.log(obj.price)
// }).catch(err => {
//    // console.log(err)
// })

// price.getBasePrice(base, crypto).then(obj => { // Base for ex - USD, Crypto for ex - ETH 
//    // console.log(obj.price)
// }).catch(err => {
//    // console.log(err)
// })